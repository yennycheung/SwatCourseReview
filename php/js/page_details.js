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


	$(".ratingbigger").starRating({
		//minus: true // step minus button
	});

	$("id-update-button").hide();

	$(document).ready(function(){
	    $('textarea').autosize();   
	});

	var courseParseObject = null;
	var reviewArray = null;
	var myReview = null;

	/* Backend Stuff */
	function main() {

		// If not logged in, display the remind string.
		if ( !Parse.User.current()) {
			$("div.row.top").html("<div class='title'><h3>Please log in before visiting this page!</h3></div>");
			hideAllLayouts();
			return;
		}

				// If these data DOM components don't exist, then page didn't receive POST data.
		if ( ! $("#data-course-object-id").length > 0) {
			$("div.row.top").html("<div class='title'><h3>We are sorry, the page you are looking for is not found!</h3></div>");
			hideAllLayouts();
			return;
		} 


		// Extract course id from DOM objects.
		var courseObjectId = getCourseObjectId();

		// Query parse about course info
		queryCourseInfoFromParse(courseObjectId);
	}

	function hideAllLayouts() {
		$("div.row.classdesc").hide();
		$("div.row.closedetails").hide();
		$("div.footer").hide()

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

		// Include review contents in the results, instead of an array of pointers.
		// This applies to the save() query as well.
		query.include("reviews");
		
		// Query for results.
		query.find({
			success: function(results) {
				if (results.length != 1) {
					hideAllLayouts();
					$("div.row.top").html("<div class='title'><h3>We are sorry, the page you are looking for is not found!</h3></div>");
				}
				courseParseObject = results[0];
				displayCourseInfo(results[0]);
				reviewArray = courseParseObject.get("reviews");
				displayReviews(reviewArray);
				initializeAddUpdateReview(reviewArray);
			},

			error: function(error) {
				console.log("search error!");
			}
		});
	}

	function displayCourseInfo(courseObject) {
		$("#js-populate-course-title").html(
			courseObject.get("dept") + " " + courseObject.get("courseId") + ": " + 
			courseObject.get("courseName") + 
			"&nbsp;&nbsp;&nbsp;by " + courseObject.get("profFirstName") +
			" " + courseObject.get("profLastName") );

		$("#js-populate-summary").html(courseObject.get("summary").replace(/\n/g, "<br/>"));


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




	
	function getReviewParseOBject() {
		var comment = $("#id-review-text").val();
		var rating = $('#id-overall-rating-bar').attr('data-val');

		//var newDate = new Date();
		//var datetime = "     Posted on " + newDate.today() + " at " + newDate.timeNow();
		
		var reviewInstance;
		if (myReview) {
			reviewInstance = myReview;
		}
		else{
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
		    reviewInstance = new ReviewClass();			
		}

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


	function cleanReviewArray(reviewArray) {
		if (!reviewArray) {
			return [];
		}

		// If some of the reviews are deleted but the pointers in course's "review" array
		// aren't deleted, the value of that review will be null. Clean them.
		cleanedArray = []
		for (var i=0; i<reviewArray.length; i++) {
			if (reviewArray[i]) {
				cleanedArray.push(reviewArray[i]);
			}
		} 

		if (cleanedArray.length < reviewArray.length) {
			console.log("Warning: " + (reviewArray.length - cleanedArray.length) + " reviews are null!");
		}

		return cleanedArray;
	}


	function displayReviews(reviewArray) {

		if (!reviewArray) {
			$("#js-populate-review-summary").html("0 Reviews");
			return;
		}

		cleanedArray = cleanReviewArray(reviewArray);

		// Sort array based on update time, decending.
		cleanedArray.sort(function(review1, review2) {
			return (review2.updatedAt.getTime() - review1.updatedAt.getTime() ) ;
		});

		// Display them in the reviews list.
		$('#reviews').html("");
		var sumRating = 0.0;
		for (var i=0; i<cleanedArray.length; i++) {
			var reviewParseObject = cleanedArray[i];

			var rating = reviewParseObject.get("overallRating");
			var comment = reviewParseObject.get("comment");
			var datetime = reviewParseObject.updatedAt.toDateString() + "&nbsp;&nbsp;&nbsp;" +
							reviewParseObject.updatedAt.toLocaleTimeString();
			var parsedDOMs = $.parseHTML(
				"<div class='review'> " + 
					"<p class = 'tag rating'>Rating: "+rating+"</p>" + 
					"<p>"+comment+"</p>" + 
					"<div class='actions'>" + 
						"<p class='action' >"+datetime+"</p>" +
					"</div>" +
				"</div>");

			if (parsedDOMs.length < 1) {
				return;
			}

			var newReviewDOM = parsedDOMs[0];
			$('#reviews').append(newReviewDOM);

			sumRating += rating;
		}

		// Display review summary
		var reviewSummary = "" + cleanedArray.length + " Reviews";
		if (cleanedArray.length > 0) {
			var avgRating = sumRating / cleanedArray.length;
			avgRating = Math.round(avgRating*100)/100;
			reviewSummary += (" | Rating: " + (avgRating) );
		}

		$("#js-populate-review-summary").html(reviewSummary);

	}

	function initializeAddUpdateReview(reviewArray) {

		// Initialize popover for star rating
		$("#id-overall-rating-bar").popover();
		$("#id-overall-rating-bar").click(function() {
			$(this).popover("hide");
		});

		if (!reviewArray) {
			return;
		}
		
		var cleanedArray = cleanReviewArray(reviewArray);	
		for (var i=0; i<cleanedArray.length; i++) {
			var reviewParseObject = cleanedArray[i];
			if (reviewParseObject.get("userObjectId") == Parse.User.current().id) {
				myReview = reviewParseObject;
			}
		}

		if (myReview) {
			$("div.review-textbox").hide();
			$("#id-update-button").show();

			$("#id-update-button").click(function() {
				$("#id-update-button").hide();
				$("div.review-textbox").show();	
				$("#id-overall-rating-bar")[0].setRating(reviewParseObject.get("overallRating")-1);
				$("#id-review-text").html(reviewParseObject.get("comment"));
				$("#id-form-add-review>input").attr("value", "Update");
			});
		}
		else {
			$("div.review-textbox").show();
			$("#id-update-button").hide();
		}
	}



	$("#id-form-add-review").submit( function (event) {
		event.preventDefault();
		
		var rating = $('#id-overall-rating-bar').attr('data-val');
		if (!rating || rating < 0) {
			$("#id-overall-rating-bar").popover("show");
			return;
		}

		var reviewParseObject = getReviewParseOBject();



		if (myReview) {
			$("div.review-textbox").hide();
			$("#id-update-button").show();

			reviewParseObject.save(null, {
				success: function(newReviewObject) {
					myReview.updatedAt = newReviewObject.updatedAt;
					displayReviews(reviewArray);
				},
				error : function(error) {
					console.log("save error!");
				}
			});
		}
		else {
			myReview = reviewParseObject;

			// Construct the review Parse object.
		 	courseParseObject.add("reviews", reviewParseObject);

		 	// Add it to the review array of this course, and save the course.
			// This will save the review object as well.
			courseParseObject.save(null, {
				success: function (newCourseParseObject) {
					// save is successful. Display the updated reviews.
					reviewArray = courseParseObject.get("reviews");
					displayReviews(reviewArray);
					initializeAddUpdateReview(reviewArray);
				},
				error : function (error) {
					console.log("save error!");
				}
			});
		}
		
		return false;
	});

	main();
});

