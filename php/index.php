<?php require_once('header.php'); ?>
	<div class="body">
	<div class="loader"></div>

	<section class="welcome bgParallax" data-speed="2">
		<div class="wrapper">
			<h1>Swat<strong>C</strong>o<strong>R</strong>e</h1>
			<h2>Helping you find the right classes at Swarthmore.</h2>
			<div class="row-select">
				<div class="select-style">
					<select name="" id="search-criteria">
						<option value="" name="course-id">Course ID</option>
						<option value="" name="course-name">Course Name</option>
						<option value="" name="professor">Professor</option>
						<option value="" name="department">Department</option>
					</select>
				</div>
			</div>
			<div class="row-select">
				<input type="string" style="width:48%; height:31px; font-size:13px; padding:6px 10px;" name="" id="search" placeholder="Search for your class" >
			</div>
			<a href="#roomsearch" class="white btn searchbtn" >Search Now!</a>
			<a href="#hello" class="arrow">▾</a>
		</div><!-- wrapper -->
	</section>
<!--
		<section class="room-search" id="roomsearch">
			<div class="wrapper">
				<h3>My Perfect Room</h3><br>
				<form action="results.php" method="post">
					<div class="left">
						<div class="row">
							<input type="checkbox" id="airconditioning"  name="ac">
							<label for="airconditioning"><span></span>Has Air Conditioning.</label>
						</div>
						<div class="row">
							<input type="checkbox" id="laundry"  name="laundry">
							<label for="laundry"><span></span>Its building has Laundry Machines.</label>
						</div>
						<div class="row">
							<input type="checkbox" id="printer"  name="printer">
							<label for="printer"><span></span>Its building has a printer.</label>
						</div>
						<div class="row">
							<input type="checkbox" id="substancefree" name="subfree">
							<label for="substancefree"><span></span>Is Substance Free.</label>
						</div>
					</div>
					<div class="right">
						<div class="row select">
							<label for="located">Is Located on</label>
							<div class="select-style">
								<select name="" id="location">
									<option value="" name="North">North</option>
									<option value="" name="South">South</option>
									<option value="" name="East">East</option>
									<option value="" name="West">West</option>
								</select>
							</div>
						</div>
						<div class="row select" style="display:none" >
							<label for="located">Is on the floor</label>
							<div class="select-style">
								<select id="location">
									<option value="" name="pit">Pit</option>
									<option value="">First</option>
									<option value="">Second</option>
								</select>
							</div>
						</div>
						<div class="row select"  style="display:none">
							<label for="located">Is a</label>
							<div class="select-style">
								<select name="location" id="location">
									<option value="">Single</option>
								</select>
							</div>
						</div>
						<div class="row select">

							<label for="#" style="line-height:40px;">Room Number</label>
							<input type="number" style="width:70%; height:35px; font-size:13px; padding:6px 10px;" name="room" id="roomNumber" placeholder="(Optional)" >

						</div>

					</div>
					<div class="row submit">
						<input type="submit" value="Search" >
					</div>

				</form>
			</div>
		</section>
-->
		
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

<!--
		<section class="intro">
			<div class="wrapper">
				<div class="left">
					<h3>How can DORMSBP<br> help you?</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias adipisci et ratione dolorum. Alias adipisci et ratione dolorum.</p>
				</div>
				<div class="right">
					<img src="img/intro.jpg" alt="">
				</div>
			</div>
		</section>
-->

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
