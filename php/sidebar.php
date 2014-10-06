<div class="fixed">
	<h3>Filter your search</h3><br>
	<form action="#">
		<div class="row">
			<input type="checkbox" id="airconditioning">
			<label for="airconditioning" ><span></span>Has Air Conditioning.</label>
		</div>
		<div class="row">
			<input type="checkbox" id="laundry">
			<label for="laundry"><span></span>Its building has Laundry Machines.</label>
		</div>
		<div class="row">
			<input type="checkbox" id="printer">
			<label for="printer"><span></span>Its building has a printer.</label>
		</div>
		<div class="row">
			<input type="checkbox" id="substancefree">
			<label for="substancefree"><span></span>Is Substance Free.</label>
		</div>
		<div class="row select">
			<label for="located">Is Located on</label>
			<div class="select-style">
				<select name="" id="location">
					<option value="">North</option>
					<option value="">South</option>
					<option value="">East</option>
					<option value="">West</option>
				</select>
			</div>
		</div>
		<div class="row select" >
			<label for="located">Is on the floor</label>
			<div class="select-style">
				<select name="" id="location">
					<option value="">Pit</option>
					<option value="">First</option>
					<option value="">Second</option>
				</select>
			</div>
		</div>
		<div class="row select" >
			<label for="located">Is a</label>
			<div class="select-style">
				<select name="" id="location">
					<option value="">Single</option>
				</select>
			</div>
		</div>
		<div class="row select">
			<label for="#" style="line-height:40px;">Room Number</label>
			<input type="text" style="width:66%; height:35px; font-size:13px; padding:6px 10px; float:right;" placeholder="(Optional)" >
		</div>
		<div class="row submit">
			<input type="submit" value="Search" >
		</div>
	</form>	
</div>