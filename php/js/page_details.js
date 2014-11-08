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
		$('#reviews').append("<div class='review'><p>"+content+"</p><div class='actions'><p class='action' id='upvote'>Upvote</p><p class='action comment' id='"+ commentCount +"'>Comment</p></div><div class='comments'><div class='comment-textbox'><textarea rows='1' name='commentText' id='commentText' placeholder='Add a Comment...''></textarea><input type='submit' type='button' class='add-comment-btn' value='Comment'/></div></div></div>");
		commentCount += 1;
	});

	$(".comment").click(function(){
		console.log(commentCount);
		console.log($(this).attr('id'));
        $(".comment-textbox").toggle();
        $(".comment-thread").toggle();
	});

	$(".add-comment-btn").click(function(){
		var comment = document.getElementById('commentText').value;
        $(".comments").prepend('<div class="comment-thread"><p>'+comment+'</p></div>');
	});

});