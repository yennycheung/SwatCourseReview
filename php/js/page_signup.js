jQuery(document).ready(function() {
	$('.loader').fadeOut(500);
	$('#footer-signup').hide();

	$("#form-signup").submit( function (event) {
		event.preventDefault();
		var email = document.getElementById("signup-email").value.trim();
		var password = document.getElementById("signup-password").value;
		if (validateEmail(email) && validatePassword(password)){
			Parse.User.signup(email, password, {email:email});
			window.location.replace("/index.php")	
		}
	});

	function validateEmail(email){		
		var emailValid = /[^@]@swarthmore.edu/.test(email);
		if (!emailValid){
			var errorMsg = document.getElementById("signup-error");
			errorMsg.textContent="*Please enter your Swarthmore email address.";
			$("#signup-error").css("visibility","visible");
			return false;
		}
		return true;
	}

	function validatePassword(password){
		var passwordLen = password.length;
		if (passwordLen < 6){
			var errorMsg = document.getElementById("signup-error");
			errorMsg.textContent = "*Password must be at least 6 characters";
			$("#signup-error").css("visibility","visible");
			return false;
		}
		return true;
	}


});