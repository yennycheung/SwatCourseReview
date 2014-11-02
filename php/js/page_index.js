// Execute code without declaring global variables.
jQuery(document).ready(function() {

    // Number increasing when scroll.
    var start = 0, 
    max = 30,
    scrollPos = $(window).scrollTop();
    $(window).scroll(function() {  
    	if (scrollPos > 550 && scrollPos < 1655 && start < max) {
    		start += 1 
       		$("#num-reviews").text(start);
    	} 
    	scrollPos = $(window).scrollTop();
    });

    // Add login-check functionality before form submit
    $("#id-form-search").submit( function (event) {
        // If not logged in, prevent submitting form.
        if (!Parse.User.current()) {
            alert('Must login before search');
            return false;
        }
    }); 

});