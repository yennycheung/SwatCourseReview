jQuery(document).ready(function() {
	$('.loader').fadeOut(500);
	$('#footer-signup').hide();
	var height = $(window).innerHeight();
    $(".welcome").css("height", (height-60).toString());

	$("#form-signup").submit( function (event) {
		event.preventDefault();
		var email = document.getElementById("signup-email").value.trim();
		var password = document.getElementById("signup-password").value;
		var errorMsg = $("#signup-error");
		if (validateEmail(email, errorMsg) && validatePassword(password, errorMsg)){
			Parse.User.signUp(email, password, {email:email, ACL: new Parse.ACL()}, {
				 success: function(user) {
				 	Parse.User.logOut();
				 	errorMsg.text("Please check your Swatmail to verify your account.");
				  	errorMsg.css({
				 		color:"green",
				 		visibility:"visible"
				 	});
				  },
				  error: function(user, error) {
				  	errorMsg.text("*You already have an account. Please log in.");
				  	errorMsg.css("visibility","visible");
				  }
				}
			);

		}
	});

	function validateEmail(email, errorMsg){		
		var emailValid = /[^@]@swarthmore.edu/.test(email);
		if (!emailValid){
			errorMsg.text("*Please enter your Swarthmore email address.");
			errorMsg.css("visibility","visible");
			return false;
		}
		return true;
	}

	function validatePassword(password, errorMsg){
		var passwordLen = password.length;
		var i = 0;
		var checkLetter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; 
		if (!checkLetter.test(password)){
			errorMsg.text("*Password must contain at least 6 characters and one uppercase letter.");
			errorMsg.css("visibility","visible");
			return false;
		}
		return true;
	}


});