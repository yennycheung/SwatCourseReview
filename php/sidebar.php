<div class="fixed">
	<h3>Filter</h3><br>
	<form action="#">
		<div class="row">
			<input type="checkbox" id="id-write-course-checkbox">
			<label for="id-write-course-checkbox" ><span></span>Writing course.</label>
		</div>
		<div class="row">
			<input type="checkbox" id="id-has-lab-checkbox">
			<label for="id-has-lab-checkbox"><span></span>Has a lab.</label>
		</div>
		<!--<div class="row">
			<input type="checkbox" id="prereq">
			<label for="prereq"><span></span>Has no prerequisites.</label>
		</div>-->
		<div class="row">
			<input type="checkbox" id="id-fys-checkbox">
			<label for="id-fys-checkbox"><span></span>First-year seminar.</label>
		</div>
		<div class="row select">
			<label for="id-division-select">Division</label>
			<div class="select-style">
				<select name="" id="id-division-select">
					<option value="">All</option>
					<option value="">Natural Sciences</option>
					<option value="">Humanities</option>
					<option value="">Social Sciences</option>
				</select>
			</div>
		</div>
		<div class="row select">
			<label for="id-rating-select" style="line-height:40px;">Rating</label>
			<div class="select-style">
				<select name="" id="id-rating-select">
					<option value="">All</option>
					<option value="">&geq; 1</option>
					<option value="">&geq; 2</option>
					<option value="">&geq; 3</option>
					<option value="">&geq; 4</option>
					<option value="">= 5</option>
				</select>
			</div>
			<!--<input type="text" style="width:66%; height:35px; font-size:13px; padding:6px 10px; float:right;" placeholder="Ratings out of 5" >-->
		</div>

		<!--
		<div class="row submit">
			<input type="submit" value="Search" >
		</div>
		-->
	</form>	
</div>