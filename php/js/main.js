jQuery(document).ready(function() {
	//validation
	ezValidation.init();


	// scroll to div
	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top - 72
	        }, 1000);
	        return false;
	      }
	    }
	});


	// parrlax effect
	$('.bgParallax').each(function(){
		var $obj = $(this);

		$(window).scroll(function() {
			var yPos = -($(window).scrollTop() / $obj.data('speed'));

			var bgpos = '50% '+ yPos + 'px';

			$obj.css('background-position', bgpos ) ;

		});
	});


	// loader
	$(window).load(function() {
	  $('.loader').fadeOut(500);
	});

	// Initialize Parse
	Parse.initialize("rxgRS4EuA2QMKJX6ptoz6jcAdUOa0IwJD7jFWjXG", "MbqgQljkBjOWK6mFlQTnKB612dsE7cbVPSKkEPJU");


	/* Login / Logout Control */
	if (Parse.User.current()) {
		updateHeaderOnLogin();
	}
	else {
		updateHeaderOnLogout();
	}

	function updateHeaderOnLogin() {
		$("#id-btn-logout").show();
		$("#id-form-login").hide();
		$("#signup-now").hide();
	}

	function updateHeaderOnLogout() {
		$("#id-btn-logout").hide();
		$("#id-form-login").show();
		$("#signup-now").show();
	}	

	// Add login functionality form.
	// We don't submit the form, because we don't want to POST username / password without encryption.
	// Instead, we stop it here (by returning false), and give information to Parse, which handles validation / encryption.
	$("#id-form-login").submit( function (event) {
		var userName = $("#id-form-login .email").val();
		var password = $("#id-form-login .password").val();

		Parse.User.logIn(userName, password, {
			success: function(user) {
				updateHeaderOnLogin();
  			},
			error: function(user, error) {
				alert("Invalid username or password. Please try again.");
  			}
		});

		return false;
    }); 

    // Logout button
    $("#id-btn-logout").click( function () {
    	Parse.User.logOut();
    	updateHeaderOnLogout();

    	// redirect to home page because logged out users can't search.
    	window.location.replace("index.php");
    });

});
