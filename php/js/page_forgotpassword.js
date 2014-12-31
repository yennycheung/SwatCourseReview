jQuery(document).ready(function() {
	$('.loader').fadeOut(500);
	$("#form-resetpw").submit( function (event) {
		event.preventDefault();
		var email = document.getElementById("resetpw-email").value.trim();
		var errorMsg = $("#resetpw-error");	
		Parse.User.requestPasswordReset(email, {
			 success: function(user) {
			 	errorMsg.text("Please check your Swatmail to reset your password.");
			 	errorMsg.css({
			 		color:"green",
			 		visibility:"visible"
			 	});
			  },
			  error: function(user, error) {
			  	errorMsg.text("*We can't find your account. Please sign up.");
			  	errorMsg.css("visibility","visible");
			  }
			}
		);

	});
});