<!DOCTYPE html>
<html lang="en" >

	<?php require_once('header.php'); ?>
	<?php include_once("analyticstracking.php") ?>

	<!-- Begin of Body -->

	<div class="body">
	<div class="loader"></div>

	<section class="welcome bgParallax" data-speed="2">
		<div class="wrapper">
			<h1><strong>Swat</strong>CoRe</h1>
			<h2>Helping you find the right classes at Swarthmore.</h2>
			<form id="id-form-search" action="results.php" method="get">
			    <div class="row-select">
				    <input type="string" name="search-string" id="search" placeholder="Search for your class">
			    </div>
			</form>
			<a href="signup.php" class="white btn searchbtn" id="signup-now" value="Sign Up Now!">Sign Up Now!</a>
			<a href="#hello" class="arrow">▾</a>
		</div><!-- wrapper -->
	</section>

	<section class = "hello" id = "hello">
		<div class="wrapper">
			<div class="intro-text">
				<h3>Hello Swarthmore!</h3>
				<p id="welcome"><br>Welcome to SwatCoRe, the student-built Swarthmore Course Review Website. 
					Are your classes interesting? Engaging professors? 
					Want to let your peers to know more about your classes? 
					Share your experience with us!
					This website is built and maintained by Yenny Cheung and Peng Zhao. 
					Feel free to reach us at <a href="mailto:swatcoreteam@gmail.com?Subject=Feedback">
swatcoreteam@gmail.com</a> for any feedback.</p>
			</div>
		</div>
	</section>

	<section class = "stats bgParallax" data-speed="4">
		<div class="wrapper">
			<h1 id="num-reviews">0</h1>
			<p>courses reviewed... and still counting!</p>
		</div>
	</section>


	<section class="testimonial">
		<div class = "wrapper">
			<h3>Meet your developers!</h3>
		</div>
		<div class="wrapper">
			<div class="col dev">
				<img src="img/yenny.jpg" alt="">
				<p class = "desc">I believe that academic resources should be more transparent to students. SwatCoRe has a clean interface for searching and reviewing courses, helping students pick the right classes, so that we can get the most out of our 4-year Swat experience.</p>
				<p class="dev-name">Yenny Cheung</p>
				<p class="dev-title">Designer and Frontend Developer</p>
			</div>
			<div class="col dev">
				<img src="img/peng.jpg" alt="">
				<p class = "desc">Taking on this project gives me hands-on experience in working with the database. It is a fascinating task designing and implementing the backend of SwatCoRe. I think the data on SwatCoRe will be useful for students in the coming years.</p>
				<p class="dev-name">Peng Zhao</p>
				<p class="dev-title">Backend Developer</p>
			</div>
			<div class="col">
			</div>
		</div>
	</section>

	<section class="test">
		<div class = "wrapper">
		</div>
	</section>


	</div>

	<!-- End of Body -->

	<?php require_once('footer.php'); ?>

	<!--<script data-main="js/page_index" src="js/require.js"></script>-->

	<!-- JS INCLUDES -->

	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/ezValidation.js"></script>
	<script type="text/javascript" src="js/parse-1.3.1.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="js/page_index.js"></script>


</body>
</html>

