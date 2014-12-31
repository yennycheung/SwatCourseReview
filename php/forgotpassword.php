<!DOCTYPE html>
<html lang="en" >

<?php require_once('header.php'); ?>
<?php include_once("analyticstracking.php") ?>
	<div class="body">
	<div class="loader"></div>	
		
		<section class="welcome bgParallax forgotpassword" data-speed="2">
			<div class="wrapper">
				<div class="container">
					<div class="top"> <h3>Forgot Password</h3> </div>
					<div class="bottom">
						<p>Please enter your Swatmail address. We will send you a password reset email.</p>
						<form id = "form-resetpw">
							<input type="email" id="resetpw-email" required="required" placeholder="Your Swatmail">
							<input type="submit" id="resetpw-submit" value="Submit">
							<p class="error-msg" id="resetpw-error">Error Message</p>
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
<script type="text/javascript" src="js/page_forgotpassword.js"></script>

</body>
</html>