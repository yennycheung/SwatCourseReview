<div class="fixed">
	<h3>Advanced course search</h3><br>
	<form action="#">
		<div class="row">
			<input type="checkbox" id="iswritingcourse">
			<label for="iswritingcourse" ><span></span>Is a writing course.</label>
		</div>
		<div class="row">
			<input type="checkbox" id="lab">
			<label for="lab"><span></span>Has a lab.</label>
		</div>
		<div class="row">
			<input type="checkbox" id="prereq">
			<label for="prereq"><span></span>Has no prerequisites.</label>
		</div>
		<div class="row">
			<input type="checkbox" id="firstyearsem">
			<label for="firstyearsem"><span></span>Is a first-year seminar.</label>
		</div>
		<div class="row select" >
			<label for="semester">Semester</label>
			<div class="select-style">
				<select name="" id="semester">
					<option value="">All</option>
					<option value="">Fall</option>
					<option value="">Spring</option>
				</select>
			</div>
		</div>
		<div class="row select">
			<label for="category">Category</label>
			<div class="select-style">
				<select name="" id="category">
					<option value="">All</option>
					<option value="">Natural Sciences</option>
					<option value="">Humanities</option>
					<option value="">Social Sciences</option>
					<option value="">PE</option>
				</select>
			</div>
		</div>
		<div class="row select">
			<label for="mode">Mode</label>
			<div class="select-style">
				<select name="" id="mode">
					<option value="">All</option>
					<option value="">Lecture</option>
					<option value="">Seminar</option>
					<option value="">Studio</option>
					<option value="">Others</option>
				</select>
			</div>
		</div>
		<div class="row select">
			<label for="ratings" style="line-height:40px;">Greater than</label>
			<input type="text" style="width:66%; height:35px; font-size:13px; padding:6px 10px; float:right;" placeholder="Ratings out of 5" >
		</div>
		<div class="row submit">
			<input type="submit" value="Search" >
		</div>
	</form>	
</div>