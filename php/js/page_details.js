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


	//$(".ratingbigger").starRating({
		//minus: true // step minus button
	//});

	var courseReviewObject_closure = null;
	var reviewArray_closure = null;
	var myReview_closure = null;

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

		initializeLayouts();

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


	function initializeLayouts() {
		$("id-update-button").hide();
		$('textarea').autosize(); 
		$('#id-avg-rating-bar').hide();
		$('#id-overall-rating-bar').hide();
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
				courseReviewObject_closure = results[0];
				displayCourseInfo(results[0]);
				reviewArray_closure = courseReviewObject_closure.get("reviews");
				displayReviews(reviewArray_closure);
				initializeAddUpdateReview(reviewArray_closure);

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

	
	function getReviewParseObject() {
		var comment = $("#id-review-text").val();
		var rating = parseInt($('#id-overall-rating-bar').attr('data-val'));

		//var newDate = new Date();
		//var datetime = "     Posted on " + newDate.today() + " at " + newDate.timeNow();
		
		var reviewInstance;
		if (myReview_closure) {
			reviewInstance = myReview_closure;
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
	    	courseReviewObject_closure.get("dept").toLowerCase() + "^" +
	    	courseReviewObject_closure.get("courseId").toLowerCase() + "^" +
	    	courseReviewObject_closure.get("profFirstName").toLowerCase() + "^" +
	    	courseReviewObject_closure.get("profLastName").toLowerCase()
	    	);

	    var acl = new Parse.ACL();
	    acl.setPublicReadAccess(true);
	    acl.setPublicWriteAccess(false);
	    acl.setWriteAccess(Parse.User.current().id, true);
	    reviewInstance.setACL(acl);
	    return reviewInstance;
	}


	function cleanReviewArray(inReviewArray) {
		if (!inReviewArray) {
			return [];
		}

		// If some of the reviews are deleted but the pointers in course's "review" array
		// aren't deleted, the value of that review will be null. Clean them.
		cleanedArray = []
		for (var i=0; i<inReviewArray.length; i++) {
			if (inReviewArray[i]) {
				cleanedArray.push(inReviewArray[i]);
			}
		} 

		if (cleanedArray.length < inReviewArray.length) {
			console.log("Warning: " + (inReviewArray.length - cleanedArray.length) + " reviews are null!");
		}

		return cleanedArray;
	}


	function displayReviews(inReviewArray) {

		if (!inReviewArray) {
			$("#js-populate-review-summary").html("0 Reviews");
			return;
		}

		cleanedArray = cleanReviewArray(inReviewArray);

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
					"<div class=\"rating\" data-average=\"" + rating + "\"/><br>" +
					"<p>"+comment+"</p>" + 
					"<div class='actions'>" + 
						"<p class='action' >"+datetime+"</p>" +
					"</div>" +
				"</div>");

			if (parsedDOMs.length < 1) {
				console.log("error in parsing review DOM!");
				return;
			}

			var newReviewDOM = parsedDOMs[0];
			var newReviewJQuery = $(newReviewDOM);
			newReviewJQuery.find("div.rating").jRating({rateMax:5, isDisabled:true});
			$('#reviews').append(newReviewJQuery);

			sumRating += rating;
		}

		// Display review summary
		var reviewSummary = "" + cleanedArray.length + " Reviews";
		$("#js-populate-review-summary").html(reviewSummary);

		if (cleanedArray.length > 0) {
			var avgRating = sumRating / cleanedArray.length;
			avgRating = Math.round(avgRating*100)/100;
			
			$("#id-avg-rating-bar").show();
			$("#id-avg-rating-bar").empty();
			$("#id-avg-rating-bar").attr("data-average", ""+avgRating);
			$('#id-avg-rating-bar').jRating({rateMax:5, isDisabled:true});
		}
	}

	function initializeAddUpdateReview(inReviewArray) {

		if (!inReviewArray) {
			return;
		}

		// Initialize popover for star rating
		$("#id-overall-rating-bar").show();
		$("#id-overall-rating-bar").popover();
		$("#id-overall-rating-bar").jRating({rateMax:5, infiniteRate: true, step:true, type:'big-grey', sendRequest:false});
		$('body').on('click', function (e) {
	    	console.log($("#popoverTrigger").next('div.popover:visible').length);
	    	if($(e.target).attr("id") !== "id-add-review-btn") {
	    		$('[data-toggle="popover"]').popover('hide');
	    	}
	    });

		var cleanedArray = cleanReviewArray(inReviewArray);	
		for (var i=0; i<cleanedArray.length; i++) {
			var reviewParseObject = cleanedArray[i];
			if (reviewParseObject.get("userObjectId") == Parse.User.current().id) {
				myReview_closure = reviewParseObject;
			}
		}

		if (myReview_closure) {
			$("div.review-textbox").hide();
			$("#id-update-button").show();

			$("#id-update-button").click(function() {
				$("#id-update-button").hide();
				$("div.review-textbox").show();	


				$("#id-overall-rating-bar")[0].setRating(myReview_closure.get("overallRating"));
				//$("#id-overall-rating-bar")[0].setRating(3);
				$("#id-review-text").html(myReview_closure.get("comment"));
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
		if (myReview_closure) {

			$("#id-form-add-review>input.add-review-btn").attr("value", "Updating ...");
			reviewParseObject.save(null, {
				success: function(newReviewObject) {
					myReview_closure.updatedAt = newReviewObject.updatedAt;
					$("div.review-textbox").hide();
					$("#id-update-button").show();
					displayReviews(reviewArray_closure);
					$("#id-form-add-review>input.add-review-btn").removeAttr("disabled");
				},
				error : function(newReviewObject, error) {
					console.log("save error!");
				}
			});
		}
		else {

			$("#id-form-add-review>input.add-review-btn").attr("value", "Adding ...");

			myReview_closure = reviewParseObject;

			// Construct the review Parse object.
		 	courseReviewObject_closure.add("reviews", reviewParseObject);

		 	// Add it to the review array of this course, and save the course.
			// This will save the review object as well.
			courseReviewObject_closure.save(null, {
				success: function (newCourseParseObject) {
					// save is successful. Display the updated reviews.
					reviewArray_closure = courseReviewObject_closure.get("reviews");
					displayReviews(reviewArray_closure);
					initializeAddUpdateReview(reviewArray_closure);
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

