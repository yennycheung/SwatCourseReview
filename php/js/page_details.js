// Execute code without declaring global variables.
$(function() {	
	
	/* Layout stuff */

	// For todays date;
	Date.prototype.today = function () { 
	    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
	}

	// For the time now
	Date.prototype.timeNow = function () {
	     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
	}


	$(".rating").starRating({
		//minus: true // step minus button
	});

	$(".ratingbigger").starRating({
		//minus: true // step minus button
	});

	$(document).ready(function(){
	    $('textarea').autosize();   
	});



	/* Backend Stuff */
	function main() {
		// If not logged in, display the remind string.
		if ( !Parse.User.current()) {
			$("div.row.top").html("<div class='title'><h3>Please log in before visiting this page!</h3></div>");
			return;
		}

				// If these data DOM components don't exist, then page didn't receive POST data.
		if ( ! $("#data-course-object-id").length>0) {
			$("div.row.top").html("<div class='title'><h3>Post data not found! Did you reach here from search results?</h3></div>");
			return;
		} 

		// Extract course id from DOM objects.
		var courseObjectId = $("#data-course-object-id").text();

		// Strip php json_encode() extra quotes.
		courseObjectId = courseObjectId.substring(1, courseObjectId.length-1);

		// Query parse about course info
		queryCourseInfoFromParse(courseObjectId);
	}


	function queryCourseInfoFromParse(courseObjectId) {
		if (!courseObjectId) {
			return;
		}

		var query = new Parse.Query("Course");
		query.equalTo("objectId", courseObjectId);
		
		// Query for results.
		query.find({
			success: function(results) {
				if (results.length != 1) {
					console.log("page_details.js: wronglength of course list!");
					return;
				}
				displayCourseInfo(results[0]);
			},
			error: function() {
				console.log("search error!");
			}
		});
	}

	function displayCourseInfo(courseObject) {
		var nameAndProf = courseObject.get("courseName");
		nameAndProf += ("  by  " + courseObject.get("profFirstName") );
		nameAndProf += (" " + courseObject.get("profLastName") );
		$("#js-populate-name-prof").html(nameAndProf);

		var idAndNumReviews = courseObject.get("dept");
		idAndNumReviews += (" " + courseObject.get("courseId") );
		idAndNumReview += (" " + "Rating: 5");
		idAndNumReviews += (" | " + "9 Reviews");
		$("#js-populate-id-numreviews").html(idAndNumReviews);

		$("#js-populate-summary").html(courseObject.get("summary"));


		var division = courseObject.get("division");
		if (division == "NS") {
			$("#js-populate-division").append(
				"<div class=\"detail lab\">" +
					"<i><img src=\"img/Lab.png\" width=\"50\" height=\"55\" alt=\"\"></i>" +
					"<p>Natural Sciences</p>" +
				"</div>");
		}

		if (division == "SS") {
			$("#js-populate-division").append(
				"<div class=\"detail socialscience\">" +
					"<i><img src=\"img/socialscience.png\" width=\"50\" height=\"55\" alt=\"\"></i>" +
					"<p>Social Science</p>" +
				"</div>");
		}

		if (division == "HU") {
			$("#js-populate-division").append(
				"<div class=\"detail humanities\">" +
					"<i><img src=\"img/humanities.png\" width=\"50\" height=\"55\" alt=\"\"></i>" +
            		"<p>Humanities</p>" +
        		"</div>");
		}


		if (courseObject.get("isWritingCourse")) {
			$("#js-populate-division").append(
				"<div class=\"detail wcourse\">" +
            		"<i><img src=\"img/writingcourse.png\" width=\"50\" height=\"55\" alt=\"\"></i>" +
            		"<p>Writing Course</p>" +
        		"</div>");
		}
	}


	$(".add-review-btn").click(function(){
		var content = document.getElementById('reviewText').value;
		var rating = $('#ratingbigger').attr('data-val');
		console.log(rating);
		var newDate = new Date();
		var datetime = "     Posted on " + newDate.today() + " at " + newDate.timeNow();
		var parsedDOMs = $.parseHTML("<div class='review'> <p class = 'tag rating'>Rating: "+rating+"</p><p>"+content+"</p><div class='actions'><p class='action' id='upvote'>Upvote</p><p class='action' id='timestamp'>"+datetime+"</p></div></div>")
		if (parsedDOMs.length < 1) {
			return;
		}

		var newReviewDOM = parsedDOMs[0];
		var newReviewJQuery = $(newReviewDOM);

		/*newReviewJQuery.find(".comment").click(function() {
			newReviewJQuery.find(".comment-textbox").toggle();
			newReviewJQuery.find(".comment-thread").toggle();
		});

		newReviewJQuery.find(".add-comment-btn").click(function(){
			var comment = newReviewJQuery.find(".commentText").val();
			newReviewJQuery.find(".comments").prepend('<div class="comment-thread"><p>'+comment+'</p></div>');
			var count = newReviewJQuery.find(".comment").attr("data-value");
			count++;
		    newReviewJQuery.find(".comment").text("Comment ("+count+")");
		    newReviewJQuery.find(".comment").attr("data-value", count);
		});*/
		$('#reviews').append(newReviewDOM);

	});


	main();
});