// Execute code without declaring global variables.
$(function() {	
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
		console.log(content);
		$('#reviews').append('<p>'+content+'</p>');
	});

});