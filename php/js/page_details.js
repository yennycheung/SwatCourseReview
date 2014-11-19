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
		if ( ! $("#data-course-object-id").length > 0) {
			$("div.row.top").html("<div class='title'><h3>Post data not found! Did you reach here from search results?</h3></div>");
			return;
		} 

		// Extract course id from DOM objects.
		var courseObjectId = getCourseObjectId();

		// Query parse about course info
		queryCourseInfoFromParse(courseObjectId);
	}


	function getCourseObjectId() {
		if ( ! $("#data-course-object-id").length>0) {
			return null;
		}

		var rawId = $("#data-course-object-id").text();
		return rawId.substring(1, rawId.length-1);
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
		$("#js-populate-name-prof").html(
			courseObject.get("courseName") + 
			"  by  " + courseObject.get("profFirstName") +
			" " + courseObject.get("profLastName") );

		$("#js-populate-id-numreviews").html(
			courseObject.get("dept") + 
			" " + courseObject.get("courseId") +
			" " + "Rating: 5" + 
			" | " + "9 Reviews" );


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


	// Add review functionality
	$("#id-form-add-review").submit( function (event) {
		event.preventDefault();

		var reviewParseObject = createReviewParseObject();
		
		reviewParseObject.save(null, {
    		success: function(reviewParseObject) {
      			// The save was successful.
      			console.log(reviewParseObject);
    		},
    		error: function(reviewParseObject, error) {
      			// The save failed.  Error is an instance of Parse.Error.
    		}
  		});

		//var parsedDOMs = $.parseHTML("<div class='review'> <p class = 'tag rating'>Rating: "+rating+"</p><p>"+content+"</p><div class='actions'><p class='action' id='upvote'>Upvote</p><p class='action' id='timestamp'>"+datetime+"</p></div></div>")
		//if (parsedDOMs.length < 1) {
		//	return;
		//}


		//var newReviewDOM = parsedDOMs[0];
		//var newReviewJQuery = $(newReviewDOM);

		/*
		newReviewJQuery.find(".comment").click(function() {
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
		});
		*/
		//$('#reviews').append(newReviewDOM);
		
		return false;
	});

	
	function createReviewParseObject() {
		var comment = $("#id-review-text").val();
		var rating = $('#id-review-rating-bar').attr('data-val');
		rating = rating? parseInt(rating) : 0;

		//var newDate = new Date();
		//var datetime = "     Posted on " + newDate.today() + " at " + newDate.timeNow();
		
		var ReviewClass = Parse.Object.extend("Review", 
	        {initialize: function(attrs, options) {
	            this.set("overallRating", 0.0);
	            this.set("difficultyRating", 0.0);
	            this.set("workloadRating", 0.0);
	            this.set("interestRating", 0.0);
	            this.set("usefulRating", 0.0);
	            this.set("numUpVote", 0);
	            this.set("numDownVote", 0);
	            this.set("comment", "");
	        }},
	        null
	    );

	    var reviewInstance = new ReviewClass();
	    reviewInstance.set("comment", comment);
	    reviewInstance.set("overallRating", rating);
	    reviewInstance.set("difficultyRating", rating);
	    reviewInstance.set("workloadRating", rating);
	    reviewInstance.set("usefulRating", rating);
	    reviewInstance.set("interestRating", rating);
	    reviewInstance.set("courseObjectId", getCourseObjectId());
	    reviewInstance.set("userObjectId", Parse.User.current().id);
	    
	    return reviewInstance;
	}

	main();
});