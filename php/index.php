<!DOCTYPE html>
<html lang="en" >

	<?php require_once('header.php'); ?>

	<!-- Begin of Body -->

	<div class="body">
	<div class="loader"></div>

	<section class="welcome bgParallax" data-speed="2">
		<div class="wrapper">
			<h1><strong>Swat</strong>CoRe</h1>
			<h2>Helping you find the right classes at Swarthmore.</h2>
			<form id="id-form-search" action="results.php" method="get">
				<!--<div class="icon-menu">
					<div class="sel" data-value="course-id">
						<img class="icon" src="img/CourseId.png">
						<p> Course ID </p>
					</div>
					<div class="sel" data-value="course-name">
						<img class="icon" src="img/CourseName.png">
						<p> Course Name </p>
					</div>
					<div class="sel" data-value="professor">
						<img class="icon" src="img/Professor.png">
						<p> Professor </p>
					</div>
					<div class="sel" data-value="department">
						<img class="icon" src="img/Department.png">
						<p> Department </p>
					</div>
					<input type="hidden" id="search-criteria" name="search-criteria" value="">
				</div>-->
			    <div class="row-select">
				    <input type="string" required name="search-string" id="search" placeholder="Search for your class">
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
			<p>courses reviewed... and the number is on the rise!</p>
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
				<p class = "desc">I believe that more academic resources should be more transparent to students. SwatCoRe has a clean interface for searching and reviewing courses, helping students pick the right classes, so that we can get the most out of our 4-year Swat experience.</p>
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

	<!-- JS INCLUDES -->
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/ezValidation.js"></script>
	<script type="text/javascript" src="js/star-rating.min.js"></script>
	<script type="text/javascript" src="js/parse-1.3.1.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="js/page_index.js"></script>

</body>
</html>

