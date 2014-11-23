import urllib2
import string
import lxml
from lxml import html
from lxml import etree
import codecs
import re
import json

SEMEMSTER = None
SCHEDULE_TABLE_TOTAL_COLS = 13
SHORT_SUMMARY_THRESHOLD = 130

ROW_TYPE_COURSE = "course"
ROW_TYPE_INFO = "info"


DEPT_SEARCH_KEY = {}

"""
strings to add to search phrase for each department
"""
def populateDeptSearchKey():
	global DEPT_SEARCH_KEY
	DEPT_SEARCH_KEY["arth"] = ["arthistory"]
	DEPT_SEARCH_KEY["stua"] = ["studioart"]
	DEPT_SEARCH_KEY["asia"] = ["asianstudies", "asian", "study"]
	DEPT_SEARCH_KEY["biol"] = ["biology"]
	DEPT_SEARCH_KEY["blst"] = ["blackstudies", "black", "study"]
	DEPT_SEARCH_KEY["chem"] = ["chemistry"]
	DEPT_SEARCH_KEY["grek"] = ["greek", "classics"]
	DEPT_SEARCH_KEY["latn"] = ["latin"]
	DEPT_SEARCH_KEY["anch"] = ["ancienthistory", "ancient", "history"]
	DEPT_SEARCH_KEY["clst"] = ["classicalstudies"]
	DEPT_SEARCH_KEY["cogs"] = ["cognitivescience", "cogsci"]
	DEPT_SEARCH_KEY["cpsc"] = ["computerscience", "cs", "compsci"]
	DEPT_SEARCH_KEY["econ"] = ["economics"]
	DEPT_SEARCH_KEY["educ"] = ["educationalstudies", "educational", "study"]
	DEPT_SEARCH_KEY["engr"] = ["engineering", "e"]
	DEPT_SEARCH_KEY["engl"] = ["englishliterature", "english", "literature"]
	DEPT_SEARCH_KEY["envs"] = ["environmentalstudies", "environmental", "study"]
	DEPT_SEARCH_KEY["fmst"] = ["filmandmediastudies", "film", "media", "study"]
	DEPT_SEARCH_KEY["gsst"] = ["genderandsexualitystudies", "gender", "sexual", "study"]
	DEPT_SEARCH_KEY["hist"] = ["history"]
	DEPT_SEARCH_KEY["intp"] = ["interpretationtheory", "interpretation", "theory"]
	DEPT_SEARCH_KEY["islm"] = ["islamicstudies", "islamic", "study"]
	DEPT_SEARCH_KEY["lasc"] = ["latinamericanstudies", "latin", "american", "study"]
	DEPT_SEARCH_KEY["ling"] = ["linguistics"]
	DEPT_SEARCH_KEY["math"] = ["mathematics"]
	DEPT_SEARCH_KEY["stat"] = ["statistics", "stats"]
	DEPT_SEARCH_KEY["litr"] = ["modernlanguagesandliteratures", "literature", "language"]
	DEPT_SEARCH_KEY["arab"] = ["arabics", "arabs"]
	DEPT_SEARCH_KEY["chin"] = ["chinese", "china"]
	DEPT_SEARCH_KEY["fren"] = ["frenchandfrancophonestudies", "french", "francophone", "study", "france"]
	DEPT_SEARCH_KEY["gmst"] = ["germanstudies", "german", "study"]
	DEPT_SEARCH_KEY["jpns"] = ["japanese"]
	DEPT_SEARCH_KEY["russ"] = ["russian"]
	DEPT_SEARCH_KEY["span"] = ["spanish", "spain"]
	DEPT_SEARCH_KEY["musi"] = ["music"]
	DEPT_SEARCH_KEY["danc"] = ["dance", "dancing"]
	DEPT_SEARCH_KEY["peac"] = ["peaceandconflictstudies", "peace", "conflict", "study"]
	DEPT_SEARCH_KEY["phil"] = ["philosophy"]
	DEPT_SEARCH_KEY["phys"] = ["physics"]
	DEPT_SEARCH_KEY["astr"] = ["astronomy", "star"]
	DEPT_SEARCH_KEY["pols"] = ["politicalscience", "polisci"]
	DEPT_SEARCH_KEY["psyc"] = ["psychology", "psych"]
	DEPT_SEARCH_KEY["relg"] = ["religion", "religions"]
	DEPT_SEARCH_KEY["soci"] = ["sociology"]
	DEPT_SEARCH_KEY["anth"] = ["anthropology"]
	DEPT_SEARCH_KEY["soan"] = ["sociologyandanthropology", "sociology", "anthropology"]
	DEPT_SEARCH_KEY["thea"] = ["theater", "theatre", "theaters"]


"""
Given a list of words with punctuations:
	["(Cross-listed ", "with", "CPSC", "052.)"]
Return a list of same words without punctuations:
	["Crosslisted ", "with", "CPSC", "052"]
"""
def stripPunctuations(rawWords):
	punctuations = set(string.punctuation)	
	words = []
	for rawWord in rawWords:
		words.append("".join(ch for ch in rawWord if ch not in punctuations))
	return words

"""
Every page of course schedule contains a header with semester information.
This function extracts that information and sets a global semester variable.
"""
def setGlobalSemester(page):
	firstRow = page[0][0]
	semesterInfo = firstRow[0].text.split()

	global SEMESTER
	SEMESTER = semesterInfo[0][0] + semesterInfo[1][2:]



"""
There are two type of rows in the course schedule html:
	1. Course row: contains a course with all columns filled & >0 credit
	2. Info row  : things like "Cross listed" or "eligible for" or "labs"
"""
def getRowType(rowElement):
	if (len(rowElement) < SCHEDULE_TABLE_TOTAL_COLS):
			return ROW_TYPE_INFO

	for i in range(SCHEDULE_TABLE_TOTAL_COLS):
		if (rowElement[i].text == None or len(rowElement[i].text) < 1):
			return ROW_TYPE_INFO		

	try:
		cred = float(rowElement[5].text)
		if cred <= 0.0:
			return ROW_TYPE_INFO
	except:
			return ROW_TYPE_INFO

	return ROW_TYPE_COURSE


"""
The Course class. 
Populated from scraping and serialized to JSON.
"""
class Course:
	def __init__(self):
		pass

	def initFromJSON(self, jsonObject):
		self.courseId = jsonObject["courseId"]
		self.courseName = jsonObject["courseName"]
		self.courseType = jsonObject["courseType"]
		self.credit = float(jsonObject["credit"])
		self.crossList = jsonObject["crossList"]
		self.dept = jsonObject["dept"]
		self.division = jsonObject["division"]
		self.hasLab = jsonObject["hasLab"]
		self.isFYS = jsonObject["isFYS"]
		self.isWritingCourse = jsonObject["isWritingCourse"]
		self.profFirstName = jsonObject["profFirstName"]
		self.profLastName = jsonObject["profLastName"]
		self.reviews = jsonObject["reviews"]
		self.summary = jsonObject["summary"]



	"""
	Construct a course object from a course type row.
	Only fills basic information. Other fields are populated from info rows / web scraping.
	"""
	def initFromCourseRow(self, courseRow):
		# Basic info
		self.dept = courseRow[1].text.strip().replace(" ", "")
		self.courseId = courseRow[2].text.strip().replace(" ", "")
		self.courseName = courseRow[4].text.strip()

		# Replace things like (W) (W) with (W)
		self.courseName = re.compile(r'(\([A-Z]\)) *(\([A-Z]\))').sub(r'\1', self.courseName)

		self.isFYS = ("FYS: " in self.courseName)
		self.credit = float(courseRow[5].text)
		self.courseType = courseRow[9].text.strip().replace(" ", "")

		# Sometimes prof name is not specified (such as directed reading classes)
		profNames = courseRow[8].text.split(",")
		if len(profNames) < 2:
			self.profFirstName = "STAFF"
			self.profLastName = ""
		else:
			self.profFirstName = courseRow[8].text.split(',')[1].strip().replace(" ", "")
			self.profLastName = courseRow[8].text.split(',')[0].strip().replace(" ", "")

		# Distributions
		distributions = [x.strip() for x in courseRow[6].text.split(",")]
		self.division = distributions[0].strip()
		self.isWritingCourse = ('W' in distributions)


		# Infomation initialized here and populated later.
		self.summary = "Summary not available."
		self.crossList = []

		# Handle occasional mislabeling of Lab:
		if self.courseType == "Lab":
			self.courseType = "Course"
			self.hasLab = True
		else:
			self.hasLab = False

		# New course has no reviews
		self.reviews = []
		

	"""
	One course row may have multiple info rows following it.
	This function applies an info row to a constructed course object.
	Populates "hasLab" and "crossList" 
	"""
	def applyInfoRow(self, infoRow):
		# Populate hasLab
		itemType = infoRow[-4].text 
		if (itemType == "Lab"):
			self.hasLab = True

		# Populate Cross-list
		infoText = infoRow[1].text
		if (infoText != None and len(infoText) > 0):
			for sentence in infoText.split("."):
				words = sentence.split()
				if (len(words) < 1 or words[0].lower() != "cross-listed"):
					continue

				for i in range(len(words)):
					if words[i].isdigit():
						self.crossList.append( ( words[i-1].strip() + "^" + words[i].strip() ) )


	"""
	For a course, we only care about it's dept + id + professor.
	We don't care about it's semester / lab sections.
	There is one instance in database for each unique key.
	"""
	def generateUniqueKey(self):
		uniqueKey = ""
		uniqueKey += (self.dept.lower() + "^") 
		uniqueKey += (self.courseId.lower() + "^")
		uniqueKey += (self.profFirstName.lower() + "^")
		uniqueKey += (self.profLastName.lower() + "^")
		return uniqueKey


	"""
	Print course information for debugging purposes.
	"""
	def toString(self):
		description = self.dept + " " + self.courseId + ": " + self.courseName 
		if self.profFirstName != None:
			description += (" by prof. " + self.profLastName + ", " + self.profFirstName + " ")
		else:
			description += "prof. Unspecified"
		description += ("DIV: " + str(self.division) + " Type " + str(self.courseType) \
						+ " W: " + str(self.isWritingCourse) + " FYS: " + str(self.isFYS) )

		description += ( "\n    Lab: " + str(self.hasLab) + " cross-list: " + str(self.crossList) )

		return description

	"""
	Serialize this class to a JSON string.
	"""
	def toJSONObject(self):
		jsonObject = {}
		jsonObject["courseName"] = self.courseName
		jsonObject["dept"] = self.dept
		jsonObject["courseId"] = self.courseId
		jsonObject["profFirstName"] = self.profFirstName
		jsonObject["profLastName"] = self.profLastName
		jsonObject["summary"] = self.summary
		jsonObject["isWritingCourse"] = self.isWritingCourse
		jsonObject["hasLab"] = self.hasLab
		jsonObject["isFYS"] = self.isFYS
		jsonObject["division"] = self.division
		jsonObject["courseType"] = self.courseType
		jsonObject["credit"] = self.credit
		jsonObject["reviews"] = self.reviews
		jsonObject["crossList"] = self.crossList

		#jsonObject["searchField"] = self.generateSearchField()

		# It seems search array method gives more accurage results.
		jsonObject["searchArray"] = self.generateSearchArray()

		return jsonObject

	
	"""
	Generate the search field to support one-line no category search. 
	For example, the search field for cs91 is :
	"cloudcomputing%cpsc%cs%computerscience%091%kevinwebb%webbkevin%"
	"""
	def generateSearchField(self):
		global DEPT_SEARCH_KEY
		searchField = ""

		for word in stripPunctuations(self.courseName.split()):
			searchField += word.lower()
		searchField += "%"
		if ("intro" in self.courseName.lower() ) and (not "introduction" in self.courseName.lower()):
			searchField += "introduction%"

		searchField += (self.dept.lower() + "%")
		for extraKey in DEPT_SEARCH_KEY[self.dept.lower()]:
			searchField += extraKey
			searchField += "%"

		searchField += (self.courseId.lower() + "%" )
		searchField += (self.profFirstName.lower() + self.profLastName.lower() + "%")
		searchField += (self.profLastName.lower() + self.profFirstName.lower() + "%")

		return searchField


	def generateSearchArray(self):
		global DEPT_SEARCH_KEY
		searchArray = []

		for word in stripPunctuations(self.courseName.split()):
			searchArray.append(word.lower())
			if (word.lower().startswith("introduction") ):
				searchArray.append("intro");

		searchArray.append(self.dept.lower())
		for extraKey in DEPT_SEARCH_KEY[self.dept.lower()]:
			searchArray.append(extraKey)

		searchArray.append(self.courseId.lower())
		searchArray.append(self.profFirstName.lower())
		searchArray.append(self.profLastName.lower())

		if self.isFYS:
			searchArray.append("fys")

		return searchArray

"""
Structure that stores all course information. 
"""
class CourseDB:
	def __init__(self):
		self.uniqueKeyDictionary = {}

	"""
	Supports dictionary-like retrieval, using square brackets [].
	"""
	def __getitem__(self, key):
		return self.uniqueKeyDictionary[key];

	"""
	Supports dictionary-like in operator
	"""
	def __contains__(self, key):
		return key in self.uniqueKeyDictionary

	"""
	Supports for ... in ... iteration
	"""
	def __iter__(self):
		for course in self.uniqueKeyDictionary.values():
			yield course

	"""
	Insert a new course into database, throwing exception if uniqueKey is already present.
	"""
	def insertCourse(self, course):
		uniqueKey = course.generateUniqueKey();
		if uniqueKey in self.uniqueKeyDictionary:
			raise Exception("CourseDB::insertCourse() - course is already in dictionary!")
		else:
			self.uniqueKeyDictionary[uniqueKey] = course


	def toJSON(self):
		courseList = []
		for course in self.uniqueKeyDictionary.values():
			courseList.append(course.toJSONObject())

		jsonObject = {}
		jsonObject["results"] = courseList
		return json.dumps(jsonObject)


"""
Stores all summary information extracted from course catalog.
Will be eventually combined with CourseDB.
"""
class CourseSummaryDB:

	"""
	All course title in catalog looks like the following:
		<h5><a name="CPSC_043" id="CPSC_043"></a>CPSC 043. Computer Networks</h5>
	This function extracts all explicit text from the html node element:
		"CPSC 043. Computer Networks"
	"""
	@staticmethod
	def extractTitleText(element):
		titleText = ""
		if element.text != None:
			titleText += element.text
		for child in element:
			if child.tail != None:
				titleText += child.tail	

		return titleText


	"""
	Given the text in a course title:
		CPSC 043.                   JPNS 003-004
	Returns a list of (dept, id) tuples corresponding to that text, or [] if text is malformed.
		[("CPSC", "043")]           [("JPNS", "003"), ("JPNS", "004")]
	"""
	@staticmethod
	def extractCourseDeptId(titleText):
		try:
			rawWords = re.split(u'\u2013|-| ', titleText.split(".")[0])
		except:
			return []

		if len(rawWords) < 2 or len (rawWords) > 3:
			return []

		words = stripPunctuations(rawWords)
		if not words[0].isalpha():
			return []

		for word in words[1:]:
			if not ( (len(word) == 3 and word.isdigit() ) or 
				     ( ( len(word) == 4 or len(word) == 5) and word[0:3].isdigit() and word[3:].isalpha() ) ):
				return []

		if len(words) == 2:
			return [(words[0], words[1])]
		else:
			return [(words[0], words[1]), (words[0], words[2])]


	"""
	The course names in schedule pdf is often simplified (such as "Tea in China: Cult/Envir Perspe")
	Moreover, scraping PDF sometimes brings extra spaces (such as "Foundation Draw ing")
	Turns out course title in website is a better choice for most courses.
	"""
	@staticmethod
	def extractWebCourseName(titleText):
		try:
			courseName = titleText.split(".")[1].strip()
		except:
			return None

		return string.replace(courseName, "First-Year Seminar:", "").strip()

	"""
	Given a node element, decide whether it represents a course title.
	Typical course titles have the following structure:
		<h5><a name="CPSC_043" id="CPSC_043"></a>CPSC 043. Computer Networks</h5>
	"""
	@staticmethod
	def isCourseTitle(element):

		if element.tag != "h5":
			return False

		titleText = CourseSummaryDB.extractTitleText(element)
		if len(titleText) < 1:
			return False
		
		if len(CourseSummaryDB.extractCourseDeptId(titleText)) < 1:
			return False

		return True

	"""
	Given a list of information paragraphs (paragraphs that come after one course title and
	before the next one), extract valid course summary from them.
	"""
	@staticmethod
	def extractCourseSummary(infoParagraphs):
		summary = ""

		for paragraph in infoParagraphs:
			if paragraph.text != None:
				summary += paragraph.text

			for subtag in paragraph:
				if subtag.tag != "em" and subtag.text != None:
					summary += subtag.text

				if subtag.tag == "br":
					summary += "\n"
				
				if subtag.tail != None:
					summary += subtag.tail

			summary += "\n"

		return CourseSummaryDB.cleanSummary(summary)

	"""
	Clean all logistics information for the extracted summary.
	"""
	@staticmethod
	def cleanSummary(summary):
		lines = summary.split("\n")
		cleanedSummary = ""

		for line in lines:

			if line == None:
				continue

			newLine = line.strip().lower()
			rawWords = newLine.split()
			words = stripPunctuations(rawWords)

			if len(words) < 2:
				continue

			if ( words[0].startswith('fall') or words[0].startswith('spring') ) and words[1].isdigit():
				continue

			if ( words[0].startswith('eligible') and words[1].startswith('for') ) :
				continue

			try:
				credits = float(words[0])
				if words[1].startswith("credit") or words[1].startswith("credits"):
					continue
			except:
				pass

			if words[0].startswith("crosslisted"):
				continue

			if ( words[0].startswith("not") and words[1].startswith("offered") ):
				continue

			if ( words[0].startswith("writing") and words[1].startswith("course") ):
				continue

			cleanedSummary += (line + "\n\n") 

		return cleanedSummary


	def __init__(self):
		self.summaryDict = {}

	"""
	Supports dictionary-like retrieval, with square brackets []
	key is course info, which is a (dept, id) tuple.
	"""
	def __getitem__(self, key):
		if key in self.summaryDict:
			return self.summaryDict[key]
		else:
			return {"summary": None}


	"""
	Given a html node that contains course title, and several paragraphs that
	may contain course summary, insert this course->summary pair into DB.
	"""
	def insertCounrseSummary(self, titleElement, infoParagraphs):
		if titleElement == None or len(infoParagraphs) < 1:
			return

		courseSummary = CourseSummaryDB.extractCourseSummary(infoParagraphs)
		titleText = CourseSummaryDB.extractTitleText(titleElement)
		courseName = CourseSummaryDB.extractWebCourseName(titleText)

		for courseDeptId in CourseSummaryDB.extractCourseDeptId(titleText):
			if (courseDeptId not in self.summaryDict) or ( len(courseSummary) > self.summaryDict[courseDeptId] ):
				self.summaryDict[courseDeptId] = {"summary": courseSummary, "name": courseName}


def readExportedData():
	courseDB = CourseDB()

	try:
		exportedJSONFile = codecs.open('CourseExported.json', mode="r", encoding='utf-8')
	except:
		print "\nNo exported file. This is the first scraping\n"
		return courseDB

	print "\n Foudn exported file. Reading ... \n"
	jsonArray = json.loads(exportedJSONFile.read().strip())["results"]
	for jsonObject in jsonArray:
		course = Course()
		course.initFromJSON(jsonObject)
		courseDB.insertCourse(course)

	return courseDB


"""
Read a html course schedule file.
These files are obtained by uploadign course schedule PDFS to pdftables.com
"""
def readScheduleFile(filename):
	scheduleHTMLFile = codecs.open(filename, mode="r", encoding='utf-8')
	scheduleTree = lxml.html.parse(scheduleHTMLFile)
	return scheduleTree



"""
Given a list of page objects read from course shedule html,
Return a CourseDB containing all course information in these pages.
This is the only function for course schedule scraping (easy).
"""
def extractCoursesFromPages(pages, courseDB):
	currentCourse = None

	for page in pages:
		# Skip empty pages (if there are any).
		if (len(page) < 1 or page[0].tag != "table"):
			continue

		# Loop through rows in table.
		table = page[0]
		usefulRows = table[2:(len(table)-2)]
		for row in usefulRows:
			if getRowType(row) == ROW_TYPE_COURSE:
				# If we get a new course, insert the current course and create a new one
				if currentCourse != None and currentCourse.generateUniqueKey() not in courseDB:
					courseDB.insertCourse(currentCourse)
				currentCourse = Course()
				currentCourse.initFromCourseRow(row)
			else:
				# Else apply this info row to the current course.
				if currentCourse != None:
					currentCourse.applyInfoRow(row)

	if currentCourse != None and currentCourse.generateUniqueKey() not in courseDB:
		courseDB.insertCourse(currentCourse)

	return courseDB


"""
Scrape http://www.swarthmore.edu/college-catalog/ to find summaries for all courses.
Works by finding links to department catalogs, and scraping them one by one.
"""
def scrapeCatalog():

	summaryDB = CourseSummaryDB()

	response = urllib2.urlopen('http://www.swarthmore.edu/college-catalog/')
	if response.getcode() != 200:
		print "College Catalog page unreachable!"
		return None

	catalogTree = lxml.html.parse(response)
	tableBody = catalogTree.findall("//table/tbody")[0]
	contentRow = tableBody[1]
	deptCol = contentRow[1]
	
	for deptLink in deptCol.findall(".//a"):
		deptPath = deptLink.get("href")
		scrapeDeptPage(summaryDB, "http://www.swarthmore.edu" + deptPath)

	return summaryDB


"""
Given the url to a department, extract (dept, id) -> summary pairs and 
insert them into CourseSummaryDB.
"""
def scrapeDeptPage(summaryDB, deptURL):
	print "Scraping: " + deptURL
	response = urllib2.urlopen(deptURL)
	if response.getcode() != 200:
		print "  Department page unreachable!"
		return

	deptTree = lxml.html.parse(response)
	courseBlocks = getCourseBlocks(deptTree)

	for courseBlock in courseBlocks:
		courseElement = None
		infoParagraphs = []
		for element in courseBlock:


			if (CourseSummaryDB.isCourseTitle(element)):
				summaryDB.insertCounrseSummary(courseElement, infoParagraphs)
				courseElement = element
				infoParagraphs = []

			else:
				if (courseElement != None):
					infoParagraphs.append(element)

		summaryDB.insertCounrseSummary(courseElement, infoParagraphs)


"""
Every department page contains one or more "blocks" (usually <div>) that contains
course titles / course summaries as their depth-1 children.
This function finds all those "blocks" from the page html tree.
"""
def getCourseBlocks(deptTree):
	courseBlocks = []
	suspectTitles = deptTree.xpath("//h5/a[@name and @id]")

	for suspectTitle in suspectTitles:
		possibleContent = suspectTitle.getparent().getparent()

		found = False
		for courseBlock in courseBlocks:
			if courseBlock is possibleContent:
				found = True

		if not found:
			courseBlocks.append(possibleContent)

	return courseBlocks


"""
For every course in courseDB, look for summary in summaryDB.
	If summary for that course is too short or not found, report
	Else, populate its "summary" field.
"""
def combineDB(courseDB, summaryDB):

	for course in courseDB:
		summaryDBItem = summaryDB[(course.dept, course.courseId)]

		summary = summaryDBItem["summary"]
		if summary == None:
			print " Summary for " + course.dept + " " + course.courseId + " not found!"
		elif len(summary) < SHORT_SUMMARY_THRESHOLD:
			print " Summary for " + course.dept + " " + course.courseId + " is too short!"
		else:
			course.summary = summary

		if "name" in summaryDBItem:
			#print "name of " + course.dept + " " + course.courseId + " updated from: " + course.courseName + " to: " + summaryDBItem["name"]
			course.courseName = summaryDBItem["name"]


"""
Save courseDB to a json file understandable by Parse import
"""
def saveToFile(courseDB, filename):
	jsonFile = codecs.open(filename, mode="w", encoding='utf-8')
	jsonFile.write(courseDB.toJSON())
	jsonFile.close()


def main():

	# Read exported data from Parse (the courses scraped before)
	courseDB = readExportedData()

	# Read first 20 pages of course schedule.
	scheduleTree = readScheduleFile("schedule-pdf-extract-1.html")
	pages = scheduleTree.getroot().findall(".//page")

	# Read pages 20-40 of course schedule.
	scheduleTree = readScheduleFile("schedule-pdf-extract-2.html")
	for page in scheduleTree.getroot().findall(".//page"):
		pages.append(page)

	# Populate department search array
	populateDeptSearchKey()

	# Set global semester info from a page header.
	#setGlobalSemester(pages[0])

	# Extract courses from these pages in schedule
	extractCoursesFromPages(pages, courseDB)

	# Scrape College Catalog
	summaryDB = scrapeCatalog()

	# Conbine the two scrape result to get complete course information
	combineDB(courseDB, summaryDB)

	# Save the DB to a json file
	saveToFile(courseDB, "CourseScrape.json")


if __name__ == "__main__":
	main()