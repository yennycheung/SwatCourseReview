// Execute code without declaring global variables.
$(function() {	
	// For todays date;
	Date.prototype.today = function () { 
	    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
	}

	// For the time now
	Date.prototype.timeNow = function () {
	     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
	}

	//var commentCount = 1;
	//star rating
	$(".rating").starRating({
		//minus: true // step minus button
	});

	$(".ratingbigger").starRating({
		//minus: true // step minus button
	});

	$(document).ready(function(){
	    $('textarea').autosize();   
	});


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

});