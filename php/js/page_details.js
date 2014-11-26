// Execute code without declaring global variables.
jQuery(document).ready(function() {
	
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
			displayError("Please log in before visiting this page!")
			return;
		}

				// If these data DOM components don't exist, then page didn't receive POST data.
		if ( ! $("#data-course-object-id").length > 0) {
			displayError(">We are sorry, the page you are looking for does not exist")
			return;
		} 


		// Extract course id from DOM objects.
		var courseObjectId = getCourseObjectId();

		// Query parse about course info
		queryCourseInfoFromParse(courseObjectId);
	}

	function displayError(msg) {
		$("div.row.top").html("<div class='title'><h3>" + msg + "</h3></div>");
		hideAllLayouts();
		$('.loader').fadeOut(500);
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
					displayError("We are sorry, the page you are looking for is not found!");
					return;
				}
				courseParseObject = results[0];
				displayCourseInfo(results[0]);
				reviewArray = courseParseObject.get("reviews");
				displayReviews(reviewArray);
				initializeAddUpdateReview(reviewArray);

				// Fade out loader
				$('.loader').fadeOut(500);
			},

			error: function(error) {
				displayError("We are sorry, our database gave an error. Come back later ...");
				return;
			}
		});
	}

	function displayCourseInfo(courseObject) {
		$("#js-populate-course-title").html(
			courseObject.get("dept") + " " + courseObject.get("courseId") + ": " + 
			courseObject.get("courseName") + 
			"&nbsp;by " + courseObject.get("profFirstName") +
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


	function getRatingStars(rating){
		var ratingString = "<ul>"
		for (var i=0; i<5; i++){
			if (i<rating){
				ratingString+="<li class='on'></li>";
			}
			else{
				ratingString+="<li></li>";
			}
		}
		ratingString+="</ul>"
		return ratingString;

	}

	
	function getReviewParseObject() {
		var comment = $("#id-review-text").val();
		var rating = parseInt($('#id-overall-rating-bar').attr('data-val'));

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
	    reviewInstance.set("userObjectId", Parse.User.current().id);
	    reviewInstance.set("courseUniqueKey", 
	    	courseParseObject.get("dept").toLowerCase() + "^" +
	    	courseParseObject.get("courseId").toLowerCase() + "^" +
	    	courseParseObject.get("profFirstName").toLowerCase() + "^" +
	    	courseParseObject.get("profLastName").toLowerCase()
	    	);

	    var acl = new Parse.ACL();
	    acl.setPublicReadAccess(true);
	    acl.setPublicWriteAccess(false);
	    acl.setWriteAccess(Parse.User.current().id, true);
	    reviewInstance.setACL(acl);
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
			var ratingStars = getRatingStars(rating);
			var parsedDOMs = $.parseHTML(
				"<div class='review'> " + "<div class='rating'>" +
					ratingStars + "</div><br>" +
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
			//reviewSummary += (" | Rating: " + (avgRating) );
			var ratingStars = getRatingStars(avgRating);
			$(".rating").html(ratingStars);
			$("#js-populate-review-summary").html(reviewSummary);
		}
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
				$("#id-form-add-review>input.add-review-btn").attr("value", "Update");
			});
		}
		else {
			$("div.review-textbox").show();
			$("#id-update-button").hide();
		}
	}



	$("#id-form-add-review").submit( function (event) {
		event.preventDefault();
		
		var rating = parseInt($('#id-overall-rating-bar').attr('data-val'));
		if (!rating || rating < 0) {
			$("#id-overall-rating-bar").popover("show");
			return;
		}

		// Disable the button so user cannot click it while it's loading. 
		$("#id-form-add-review>input.add-review-btn").attr("disabled", true);

		var reviewParseObject = getReviewParseObject();
		if (myReview) {

			$("#id-form-add-review>input.add-review-btn").attr("value", "Updating ...");
			reviewParseObject.save(null, {
				success: function(newReviewObject) {
					myReview.updatedAt = newReviewObject.updatedAt;
					$("div.review-textbox").hide();
					$("#id-update-button").show();
					displayReviews(reviewArray);
					$("#id-form-add-review>input.add-review-btn").removeAttr("disabled");
				},
				error : function(newReviewObject, error) {
					console.log("save error!");
				}
			});
		}
		else {

			$("#id-form-add-review>input.add-review-btn").attr("value", "Adding ...");

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
					$("#id-form-add-review>input.add-review-btn").removeAttr("disabled");
				},
				error : function (newReviewObject, error) {
					console.log("save error!");
				}
			});
		}
		
		return false;
	});

	main();
});

