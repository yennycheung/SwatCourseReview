jQuery(document).ready(function() {
	$('.loader').fadeOut(500);
	$('#footer-signup').hide();
	var height = $(window).innerHeight();
    $(".welcome").css("height", (height-60).toString());

	$("#form-signup").submit( function (event) {
		event.preventDefault();
		var email = document.getElementById("signup-email").value.trim();
		var password = document.getElementById("signup-password").value;
		var rePassword = document.getElementById("reenter-password").value;		//password from the re-enter input box
		var errorMsg = $("#signup-error");
		if (validateEmail(email, errorMsg) && validatePassword(password, rePassword, errorMsg)){
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

	function validatePassword(password, rePassword, errorMsg){				//changed the validate password function to see if two passwords match
		var passwordLen = password.length;
		if (passwordLen < 6){
			errorMsg.text("*Password must be at least 6 characters");
			errorMsg.css("visibility","visible");
			return false;
		}
		if (password != rePassword){
			errorMsg.text("*Two passwords does not match");
			errorMsg.css("visibility","visible");
			return false;
		}
		return true;
	}


});
