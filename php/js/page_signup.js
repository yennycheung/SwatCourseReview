jQuery(document).ready(function() {
	$('.loader').fadeOut(500);
	$('#footer-signup').hide();

	$("#form-signup").submit( function (event) {
		event.preventDefault();
		var email = document.getElementById("signup-email").value.trim();
		var password = document.getElementById("signup-password").value;
		var errorMsg = $("#signup-error");
		if (validateEmail(email, errorMsg) && validatePassword(password, errorMsg)){
			Parse.User.signUp(email, password, {email:email, ACL: new Parse.ACL()}, {
				 success: function(user) {
				 	window.location.replace("index.php");
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
		var emailValid = /[^@]@gmail.com/.test(email);
		if (!emailValid){
			errorMsg.text("*Please enter your Swarthmore email address.");
			errorMsg.css("visibility","visible");
			return false;
		}
		return true;
	}

	function validatePassword(password, errorMsg){
		var passwordLen = password.length;
		if (passwordLen < 6){
			errorMsg.text("*Password must be at least 6 characters");
			errorMsg.css("visibility","visible");
			return false;
		}
		return true;
	}


});