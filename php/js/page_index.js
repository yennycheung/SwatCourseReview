//define(["jquery", "ezValidation", "star-rating.min", "parse-1.3.1", "main"], 
//function(require_var_j, require_var_e, require_var_s, require_var_p, require_var_m) {

// Execute code without declaring global variables.
jQuery(document).ready(function() {
    $(".intro-text").hide();
    $("#id-form-header-search").hide();

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

    var start = 0, 
    done = 0,
    scrollPos = $(window).scrollTop();
    $(window).scroll(function() {  
        if (done == 0 && scrollPos > 500) {
            $(".intro-text").fadeIn("slow");
            done = 1;
        } 
    });

    $(".sel").click(function() {
        $("#search-criteria").val($(this).attr('data-value'));
        $(".sel").removeClass("sel-clicked");
        $(this).addClass("sel-clicked");
    });

    // Add login-check functionality before form submit
    $("#id-form-search").submit( function (event) {
        // If not logged in, prevent submitting form.
        if (!Parse.User.current()) {
            $("#id-form-login>div.col>input[type='submit']").popover("show");
            return false;
        }
    }); 

    $(".dev").click(function() {
        $(this).find($(".desc")).toggle();
        $(this).find($("img")).toggle();
    });


    $("#id-form-login>div.col>input[type='submit']").popover({
        container:"body",
        content:"Please login before search",
        placement:"bottom",
        trigger:"manual",
        delay: {show: 0, hide: 1000}
    });

    $('body').on('click', function (e) {
         $('[data-toggle="popover"]').popover('hide');
    });

    // Fade out loader
    $('.loader').fadeOut(500);
});


//});

