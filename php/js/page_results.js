// Execute code without declaring global variables.
jQuery(document).ready(function() {

	main();
	
	function main() {
		// If not logged in, display the remind string.
		if ( !Parse.User.current()) {
			$("#resultText").html("Please login before visiting this page!");
			return;
		}

		// If these data DOM components don't exist, then page didn't receive POST data.
		if ( !( $("#data-search-criteria").length>0 && $("#data-search-query").length>0 ) ) {
			$("#resultText").html("Post data not found! Did you reach here from home?");
			return;
		} 

		// Extract search queries from DOM objects.
		var searchCriteria = $("#data-search-criteria").text();
		var searchQuery = $("#data-search-query").text();
		
		// Strip php json_encode() extra string.
		searchCriteria = searchCriteria.substring(1, searchCriteria.length-1);
		searchQuery = searchQuery.substring(1, searchQuery.length-1);

		queryParseAndDisplayResult(searchCriteria, searchQuery);
	}


	function queryParseAndDisplayResult(searchCriteria, searchString) {
		var query = new Parse.Query("TestCourse");
		if (searchCriteria == "course-id") {
			query.equalTo("courseId", searchString);
		}
		if (searchCriteria == "course-name") {
			query.equalTo("courseName", searchString);
		}		
		if (searchCriteria == "professor") {
			query.equalTo("profLastName", searchString);
		}
		if (searchCriteria == "department") {
			query.equalTo("dept", searchString);
		}

		query.find({
			success: function(results) {
				for (i=0; i<results.length; i++) {
					course = results[i];
					$(".realContent").append(courseToContent(course));			
				}
			},
			error: function() {
				console.log("search error!");
			}
		});
	}

	function courseToContent(courseObject) {
		content = "<div class = \"list\" onclick=\"location.href='details.php';\" style=\"cursor:pointer;\">\n<span>";
		content += ("<p><strong>" + courseObject.get("dept") + " " + courseObject.get("courseId") + "</strong>");
		content += ("| " + courseObject.get("courseName") + " | " + courseObject.get("profFirstName") + " " + courseObject.get("profLastName") + "</p>\n");
		content += "<p>NS | 9 Reviews | Rating: 3";
		content += "\n</span>\n</div>";
		return content;
	}

});