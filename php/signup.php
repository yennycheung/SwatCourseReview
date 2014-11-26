<!DOCTYPE html>
<html lang="en" >

<?php require_once('header.php'); ?>
	<div class="body">
	<div class="loader"></div>	
		
		<section class="welcome bgParallax login" data-speed="2">
			<div class="wrapper">
				<div class="contactscontainer">
					<div class="top"> <span>Sign Up Now!</span> </div>
					<div class="bottom">
						<div class="form">
						<form action="" method="post">
							<input type="text" placeholder="First Name" name="forename" required><br>
							<input type="text" placeholder="Last Name" name="surname" required><br>
						    <input type="email" placeholder="Email Address" name="email" required><br>
							<input type="text" placeholder="Graduation Year" name="gradyear" required><br>
							<input type="password" placeholder="Password" name="password" required><br>
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
<script type="text/javascript" src="js/star-rating.min.js"></script>
<script type="text/javascript" src="js/parse-1.3.1.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/page_signup.js"></script>

</body>
</html>