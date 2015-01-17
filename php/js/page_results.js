// Execute code without declaring global variables.
jQuery(document).ready(function() {

	var TypeEnum = {STR:0, NUM:1, OTHER:2};
	var queryTime, returnTime;
	var originalSearchResults = null;

	main();
	
	/* Instead of breaking the search query at client side, we can create a new "search" field in remote
	 * database that contains all possible search phrases.
	 * For example, the search phrase for CS91 could be:
	 * "cloudcomputing%cpsc%cs%computerscience%091%kevinwebb%"
	 * ["cloud", "computing", "cpsc", "cs", "computer", "science", "091", "kevin", "webb"]
	 */
	function main() {
		// Disable all advanced search options before we get search results.
		configureAdvancedSearch(false);
		
   		var emailVerified = Parse.User.current().get("emailVerified");
		// If not logged in or email not emailVerified, display the remind string.
		if ( !Parse.User.current()) {
			displayError("Please login before visiting this page!");
			return;
		}

		if ( !emailVerified) {
			displayError("Please verify your account before visiting this page!");
			return;
		}

		// If these data DOM components don't exist, then page didn't receive POST data.
		if ( ! $("#data-search-query").length>0) {
			displayError("We are sorry, the page you are looking for is not found!");
			return;
		} 

		var height = $(window).height();
		$('.table').css('height', height);

		// Extract search queries from DOM objects.
		var searchString = $("#data-search-query").text();
		
		// Strip php json_encode() extra quote.
		searchString = searchString.substring(1, searchString.length-1);
		$('#header-search').attr("value", searchString);
		
		// Search for courses
		queryCoursesFromParse(searchString);

		//var Mailgun = require('mailgun');
		//Mailgun.initialize('swatcoursereview.com', 'myAPIKey');
	}


	function displayError(msg) {
		$("#resultText").html(msg);
		$('.loader').fadeOut(500);
	}

	function configureAdvancedSearch(enable) {
		if (!enable) {
			$("input#id-write-course-checkbox").attr("disabled", true);
			$("input#id-has-lab-checkbox").attr("disabled", true);
			$("input#id-fys-checkbox").attr("disabled", true);
			$("select#id-semester-select").attr("disabled", true);
			$("select#id-division-select").attr("disabled", true);
			$("select#id-course-type-select").attr("disabled", true);
			$("select#id-rating-select").attr("disabled", true);
		}
		else {
			$("input#id-write-course-checkbox").removeAttr("disabled");
			$("input#id-has-lab-checkbox").removeAttr("disabled");
			$("input#id-fys-checkbox").removeAttr("disabled");
			$("select#id-division-select").removeAttr("disabled");
			$("select#id-rating-select").removeAttr("disabled");

			$("div.select-style>select, input[type='checkbox']").change(function() {
				doAdvancedSearch();
			});
		}
	}

	function doAdvancedSearch() {
		if (!originalSearchResults) {
			return;
		}

		var filteredResultsList = []
		for (var i=0; i<originalSearchResults.length; i++) {
			var courseObject = originalSearchResults[i];

			if ($("input#id-write-course-checkbox").is(":checked") && (!courseObject.get("isWritingCourse")) ) {
				continue;
			}

			if ($("input#id-has-lab-checkbox").is(":checked") && (!courseObject.get("hasLab")) ) {
				continue;
			}

			if ($("input#id-fys-checkbox").is(":checked") && (!courseObject.get("isFYS")) ) {
				continue;
			}

			var selectedDivision = $("#id-division-select>option:selected").text();
			if ((selectedDivision == "Natural Sciences" && courseObject.get("division") != "NS") ||
			 	(selectedDivision == "Humanities" && courseObject.get("division") != "HU") ||
			 	(selectedDivision == "Social Sciences" && courseObject.get("division") != "SS") ) {
				continue;
			}

			var ratingThreshold = $("#id-rating-select>option:selected").text();
			if (ratingThreshold != "All") {
				ratingThreshold = parseInt(ratingThreshold.charAt(ratingThreshold.length -1));
				if (courseObject.numberOfReviews <= 0 || courseObject.averageRating < ratingThreshold) {
					continue;
				}
			}


			filteredResultsList.push(courseObject);
		}

		displaySearchResults(filteredResultsList);

	}

	function queryCoursesFromParse(searchString) {
		var searchComponents = processSearchString(searchString);
		var query = new Parse.Query("Course");
		query.include("reviews");
		query.limit(1000);
		if (searchString) {
			// Use PERL regex to query one field multiple times.
			/*
			perlRegex = ""
			for (var i=0; i<searchComponents.length; i++) {
				perlRegex += ( "(?=.*" + searchComponents[i] + ".*)" );
			}
			query.matches("searchField", perlRegex, "");
			*/
			
			// Use search array method to find results. 
			query.containsAll("searchArray", searchComponents);
		}


		// Query for results.
		query.find({
			success: function(results) {
				
				// Debugging log
				returnTime = new Date().getTime();
				console.log("query took " + (returnTime - queryTime) + "ms");

				// update layout
				originalSearchResults = results;
				generateReviewAttrs(originalSearchResults);
				displaySearchResults(originalSearchResults);
				configureAdvancedSearch(true);

				// Fade out loader
				$('.loader').fadeOut(500);
			},
			error: function() {
				console.log("search error!");
			}
		});
		$("#resultText").html("Searching Database ...");
		queryTime = new Date().getTime();
	}


	function processSearchString(searchString) {

		var searchComponents = [];
		var component = "";
		var componentType = TypeEnum.OTHER;

		// For end handling.
		searchString += "%";

		for (var i=0; i<searchString.length; i++) {
			var ch = searchString.charAt(i);

			// Handle letter
			if (/^[a-zA-Z]$/.test(ch)) {
				if (componentType == TypeEnum.NUM ) {
					searchComponents.push(formatSearchNum(component));
					component = ch;
				}
				else {
					component += ch;
				}
				componentType = TypeEnum.STR;
				continue;
			}

			// Handle number
			if (/^[0-9]$/.test(ch)) {
				if (componentType == TypeEnum.STR) {
					searchComponents.push(formatSearchStr(component));
					component = ch;
				}
				else {
					component += ch;
				}
				componentType = TypeEnum.NUM;
				continue;
			}

			// Handle whitespace and other characters.
			if (componentType == TypeEnum.NUM) {
				searchComponents.push(formatSearchNum(component));				
			}
			else if (componentType == TypeEnum.STR) {
				searchComponents.push(formatSearchStr(component));
			}
			componentType = TypeEnum.OTHER;
			component = "";
		}
		return searchComponents;
	}


	function formatSearchNum(component) {
		var newComponent = "";
		for (var i=0; i<component.length; i++) {
			ch = component.charAt(i);
			if (ch != 0 || newComponent.length >= 0) {
				newComponent += ch;
			}
		}
		switch(newComponent.length) {
			case 1:
				newComponent = "00" + newComponent;
				break;
			case 2:
				newComponent = "0" + newComponent;
				break;
        	default:
        		break;
		}
		return newComponent
	}


	function formatSearchStr(component) {
		return component.toLowerCase();
	}

	function generateReviewAttrs(courseList) {
		for (var i=0; i<courseList.length; i++) {

			var courseObject = courseList[i];
			var reviewArray = courseObject.get("reviews");

			if (!reviewArray) {
				courseObject.numberOfReviews = 0;
				continue;
			}

			var numReviews = 0;
			var sumRating = 0;

			for (var j=0; j<reviewArray.length; j++) {
				var reviewParseObject = reviewArray[j];

				// If some of the reviews are deleted but the pointers in course's "review" array
				// aren't deleted, the value of that review will be null. Clean them.		
				if (reviewParseObject) {
					numReviews += 1;
					sumRating += reviewParseObject.get("overallRating");
				}
			} 

			courseObject.numberOfReviews = numReviews;
			if (numReviews > 0) {
				var avgRating = sumRating / numReviews;
				avgRating = Math.round(avgRating*100)/100;
				courseObject.averageRating = avgRating;
			}	
		}
	
	}

	function displaySearchResults(courseList) {
		var searchString = $("#data-search-query").text();	
		// Strip php json_encode() extra quote.
		searchString = searchString.substring(1, searchString.length-1);
		searchString = searchString.trim();

		if (searchString=='' || searchString==null){
			$("#resultText").html(courseList.length + " courses found");
		}
		else if (courseList.length == 1) {
			$("#resultText").html(courseList.length + " course found matching \"" + searchString + "\"");
		}
		else{
			$("#resultText").html(courseList.length + " courses found matching \"" + searchString + "\"");
		}
		
		if (!courseList) {
			return;
		}

		courseList.sort(function (course1, course2) {
			if ( course1.get("dept") > course2.get("dept") ) {
				return 1;
			}

			if ( course1.get("dept") < course2.get("dept") ) {
				return -1;
			} 

			if ( course1.get("courseId") > course2.get("courseId") ) {
				return 1;
			}

			if ( course1.get("courseId") < course2.get("courseId")) {
				return -1;
			}
			return 0;
		});

		$(".realContent").html("");
		for (i=0; i<courseList.length; i++) {
			course = courseList[i];
			$(".realContent").append(parseToDOMObject(course));			
		}
	}

	

	function parseToDOMObject(courseObject) {

		content = "<form name='courseInfo' action='details.php' method='get'>";
		content += "<input type='hidden' class='input-course-id' name='course-object-id' value='"+courseObject.id+"'>";
		content += "<div class='list' style='cursor:pointer;'>\n<span>";
		content += ("<p><strong>" + courseObject.get("dept").toUpperCase() + " " + courseObject.get("courseId") + " </strong>");
		content += ("&nbsp|&nbsp&nbsp" + courseObject.get("courseName") + "&nbsp&nbsp|&nbsp&nbsp" + courseObject.get("profFirstName") + " " + courseObject.get("profLastName") + "</p>\n");
		content += "<p> "+ courseObject.get("division") + getReviewSummary(courseObject) + "</p>";
		content += "\n</span>\n</div>\n</form>";

		var parsedDOMs = $.parseHTML(content)
		if (parsedDOMs.length < 1) {
			return;
		}

		var courseDOMObject = parsedDOMs[0];
		var courseJQueryObject = $(courseDOMObject);

		courseJQueryObject.find(".list").click(function() {
			courseJQueryObject.submit();
		});

		return courseDOMObject
	}


	function getReviewSummary(courseObject) {
		var reviewSummary = "&nbsp&nbsp|&nbsp&nbsp" + courseObject.numberOfReviews;
		if (courseObject.numberOfReviews == 1){
			reviewSummary += " Review";
		}
		else{
			reviewSummary += " Reviews";
		}
		if (courseObject.numberOfReviews > 0) {
			reviewSummary += ("&nbsp&nbsp|&nbsp&nbspRating: " + courseObject.averageRating );
		}
		return reviewSummary;
	}
});