jQuery(document).ready(function() {
	$('.loader').fadeOut(500);
	$('#footer-contact').hide();
	var height = $(window).innerHeight();
    $(".welcome").css("height", (height-60).toString());

});