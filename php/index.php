<?php require_once('header.php'); ?>
	<div class="body">
	<div class="loader"></div>

	<section class="welcome bgParallax" data-speed="2">
		<div class="wrapper">
			<h1>Swat<strong>C</strong>o<strong>R</strong>e</h1>
			<h2>Helping you find the right classes at Swarthmore.</h2>
			<form action="results.php" method="post">
			    <div class="row-select">
				    <div class="select-style">
					    <select name="" id="search-criteria">
						    <option value="" name="course-id">Course ID</option>
					    	<option value="" name="course-name">Course Name</option>
						    <option value="" name="professor">Professor</option>
						    <option value="" name="department">Department</option>
					    </select>
				    </div>
				    <input type="string" name="search-query" id="search" placeholder="Search for your class" >
			    </div>
				<input type="submit" class="white btn searchbtn" value="Search Now!">
			</form>
			<a href="#hello" class="arrow">▾</a>
		</div><!-- wrapper -->
	</section>

		
		<section class = "hello" id = "hello">
			<div class="wrapper">
				<h3>Hello Swarthmore!</h3>
				<p><br>Welcome to SwatCoRe, the student-built Swarthmore Course Review Website. 
					Are your classes interesting? Engaging professors? 
					Want to let your peers to know more about your classes? 
					Share your experience with us!
					This website is built and maintained by Yenny Cheung. 
					Feel free to reach me at swatcoreteam@gmail.com for any feedback.</p>
			</div>
		</section>

		<section class = "stats bgParallax" data-speed="3">
			<div class="wrapper">
				<h1>30</h1>
				<p>courses reviewed... and the number is on the rise!</p>
			</div>
		</section>


		<section class="testimonial">
			<div class="wrapper">
				<div class="col">
					<img src="img/yenny.jpg" alt="">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum facilis amet maiores consequatur doloremque esse aspernatur voluptate, rerum, delectus rem, veniam possimus sint minus perferendis! Quas vel a, quia soluta.</p>
				</div>
				<div class="col">
					<img src="img/shivam.jpg" alt="">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum facilis amet maiores consequatur doloremque esse aspernatur voluptate, rerum, delectus rem, veniam possimus sint minus perferendis! Quas vel a, quia soluta.</p>
				</div>
				<div class="col">
					<img src="img/alex.jpg" alt="">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum facilis amet maiores consequatur doloremque esse aspernatur voluptate, rerum, delectus rem, veniam possimus sint minus perferendis! Quas vel a, quia soluta.</p>
				</div>
			</div>
		</section>


	</div><!-- body -->
<?php require_once('footer.php'); ?>
