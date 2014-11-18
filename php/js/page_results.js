// Execute code without declaring global variables.
jQuery(document).ready(function() {

	var TypeEnum = {STR:0, NUM:1, OTHER:2};
	var queryTime, returnTime;
	main();
	
	/* Instead of breaking the search query at client side, we can create a new "search" field in remote
	 * database that contains all possible search phrases.
	 * For example, the search phrase for CS91 could be:
	 * "cloudcomputing%cpsc%cs%computerscience%091%kevinwebb%"
	 * ["cloud", "computing", "cpsc", "cs", "computer", "science", "091", "kevin", "webb"]
	 */
	function main() {
		// If not logged in, display the remind string.
		if ( !Parse.User.current()) {
			$("#resultText").html("Please login before visiting this page!");
			return;
		}

		// If these data DOM components don't exist, then page didn't receive POST data.
		if ( ! $("#data-search-query").length>0) {
			$("#resultText").html("Post data not found! Did you reach here from home?");
			return;
		} 

		// Extract search queries from DOM objects.
		var searchString = $("#data-search-query").text();
		
		// Strip php json_encode() extra quote.
		searchString = searchString.substring(1, searchString.length-1);

		// 
		queryCoursesFromParse(searchString);
	}


	function queryCoursesFromParse(searchString) {
		if (searchString) {
			var searchComponents = processSearchString(searchString);
			var query = new Parse.Query("Course");

			// Use PERL regex to query one field multiple times.
			
			perlRegex = ""
			for (var i=0; i<searchComponents.length; i++) {
				perlRegex += ( "(?=.*" + searchComponents[i] + ".*)" );
			}
			query.matches("searchField", perlRegex, "");
			

			//query.containsAll("searchArray", searchComponents);

			// Query for results.
			query.find({
				success: function(results) {
					returnTime = new Date().getTime();
					$("#resultText").html("Courses Found");
					console.log("query took " + (returnTime - queryTime) + "ms");
					displaySearchResults(results);
				},
				error: function() {
					console.log("search error!");
				}
			});
			$("#resultText").html("Searching Database ...");
			queryTime = new Date().getTime();

		}
		else {
			$("#resultText").html("Search Query cannot be empty!");
		}
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
				if (componentType == TypeEnum.NUM) {
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
			if (ch != 0) {
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


	function displaySearchResults(results) {
		if (!results) {
			return;
		}

		for (i=0; i<results.length; i++) {
			course = results[i];
			$(".realContent").append(parseToDOMObject(course));			
		}
	}

	

	function parseToDOMObject(courseObject) {

		content = "<form name='courseInfo' action='details.php' method='post'>";
		content += "<input type='hidden' class='input-course-id' name='course-object-id' value='"+courseObject.id+"'>";
		content += "<div class='list' style='cursor:pointer;'>\n<span>";
		content += ("<p><strong>" + courseObject.get("dept").toUpperCase() + " " + courseObject.get("courseId") + " </strong>");
		content += ("| " + courseObject.get("courseName") + " | " + courseObject.get("profFirstName") + " " + courseObject.get("profLastName") + "</p>\n");
		content += "<p> "+ courseObject.get("division") + " | 9 Reviews | Rating: 3" + "</p>";
		content += "\n</span>\n</div>\n</form>";

		var parsedDOMs = $.parseHTML(content)
		if (parsedDOMs.length < 1) {
			return;
		}

		var courseDOMObject = parsedDOMs[0];
		var courseJQueryObject = $(courseDOMObject);

		courseJQueryObject.find(".list").click(function() {
			console.log('inside click()');
			courseJQueryObject.submit();
		});

		return courseDOMObject
	}


});