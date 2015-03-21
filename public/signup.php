<?php
	if(array_key_exists('password', $_POST) && array_key_exists('cpassword', $_POST)){
		$password = $_POST['password'];
		$cpassword = $_POST['cpassword'];
		if($password !== $cpassword){
			$error_msg = "Passwords do not match";
		}
	}
?>

<!DOCTYPE html>
<html lang="en" >

<?php require_once('header.php'); ?>
	<div class="body">
	<div class="loader"></div>	
		
		<section class="welcome bgParallax signup" data-speed="2">
			<div class="wrapper">
				<div class="container">
					<div class=\"top\"> <h3>Sign Up Now!</h3> </div>

					<div class="bottom">
						<div class="form" id= "form-signup">
						<form action="signup.php" method="post">
						    <input type="email" id="signup-email" placeholder="Your Swatmail" name="email" required><br>
							<input type="password" id="signup-password" placeholder="Password" name="password" required><br>
							<input type="password" id="cpassword" placeholder="Confirm password" name="cpassword" required><br>
							<p class="error-msg" id="signup-error">Error message</p>	
							<?php if(isset($error_msg)) echo $error_msg."<br/>" ?>
							<input value="Submit" type="submit" >
						</form>
					</div>
				</div>
			</div><!-- wrapper -->
		</section>				
	</div><!-- body -->

<?php require_once('footer.php'); ?>

<!-- JS INCLUDES -->
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/ezValidation.js"></script>
<script type="text/javascript" src="js/parse-1.3.1.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/page_signup.js"></script>

</body>
</html>
