// Execute code without declaring global variables.
$(function() {	

	var commentCount = 1;
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
		//console.log(content);
		var parsedDOMs = $.parseHTML("<div class='review'><p>"+content+"</p><div class='actions'><p class='action' id='upvote'>Upvote</p><p class='action comment'>Comment</p></div><div class='comments'><div class='comment-textbox'><textarea rows='1' name='commentText' id='commentText' placeholder='Add a Comment...''></textarea><input type='submit' type='button' class='add-comment-btn' value='Comment'/></div></div></div>")
		if (parsedDOMs.length < 1) {
			return;
		}
		
		var newReviewDOM = parsedDOMs[0];
		var newReviewJQuery = $(newReviewDOM);

		newReviewJQuery.find(".comment").click(function() {
			newReviewJQuery.find(".comment-textbox").toggle();

		});

		newReviewJQuery.find(".add-comment-btn").click(function(){
			var comment = newReviewJQuery.find("#commentText").val();
			console.log(comment);
			newReviewJQuery.find(".comments").prepend('<div class="comment-thread"><p>'+comment+'</p></div>');
		});

		$('#reviews').append(newReviewDOM);

	});

});