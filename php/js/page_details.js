// Execute code without declaring global variables.
$(function() {	

	var commentCount = 0;
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
		$('#reviews').append("<div class='review'><p>"+content+"</p><div class='actions'><p class='action' id='upvote'>Upvote</p><p class='action' id='comment'>Comment</p></div><div class='comments'><div class='comment-textbox'><textarea rows='1' name='commentText' id='commentText' placeholder='Add a Comment...''></textarea><input type='submit' type='button' class='add-comment-btn' value='Comment'/></div></div></div>");
		commentCount += 1;
	});

	$("#comment:nth-child(n)").click(function(){
		console.log(commentCount);
        $(".comment-textbox:nth-child(n)").toggle();
        $(".comment-thread:nth-child(n)").toggle();
	});

	$(".add-comment-btn:nth-child(n)").click(function(){
		var comment = document.getElementById('commentText').value;
        $(".comments:nth-child(n)").prepend('<div class="comment-thread"><p>'+comment+'</p></div>');
	});

});