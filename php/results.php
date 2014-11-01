<?php 

require_once('header.php'); 

$searchCriteria = json_encode($_POST["search-criteria"]);
$searchString = json_encode($_POST["search-string"]);
if(isset($_POST)){
?>
	<script>
		var searchCriteria = <?php echo $searchCriteria; ?>;
		var searchString = <?php echo $searchString; ?>;
		console.log(searchCriteria);
		console.log(searchString);
	</script>
<?php } ?>
	<div class="body results">
	<div class="loader"></div>

		<div class="table">
	        <div class="sidebar">
	        	<?php include('sidebar.php'); ?>
	        </div>
	        <div class="content">
	        	<h3 id="resultText">Courses Found</h3>
	        	<div class="realContent">
					<div class = "list" onclick="location.href='details.php';" style="cursor:pointer;">
						<span>
							<p><strong>CPSC 91</strong> | CLOUD COMPUTING  | Kevin Webb</p>
							<p>NS | 9 Reviews | Rating: 3
						</span>
					</div>
					<div class = "list" onclick="location.href='details.php';" style="cursor:pointer;">
						<span>
							<p><strong>CPSC 65</strong> | NATURAL LANGUAGE PROCESSING | Richard Wicentowski </p>
							<p>NS | 4 Reviews | Rating: 4
						</span>
					</div>
					<div class = "list" onclick="location.href='details.php';" style="cursor:pointer;">
						<span>
							<p><strong>CPSC 21</strong> | INTRO TO COMPUTER SCIENCE | Lisa Meeden</p>
							<p>NS | 13 Reviews | Rating: 5
						</span>
					</div>
					<div class = "list" onclick="location.href='details.php';" style="cursor:pointer;">
						<span>
							<p><strong>CPSC 68</strong> | BIOINFORMATICS | Ameet Soni</p>
							<p>NS | 3 Reviews | Rating: 4
						</span>
					</div>
					<div class = "list" onclick="location.href='details.php';" style="cursor:pointer;">
						<span>
							<p><strong>CPSC 68</strong> | BIOINFORMATICS | Ameet Soni</p>
							<p>NS | 3 Reviews | Rating: 4
						</span>
					</div>
					<div class = "list" onclick="location.href='details.php';" style="cursor:pointer;">
						<span>
							<p><strong>CPSC 68</strong> | BIOINFORMATICS | Ameet Soni</p>
							<p>NS | 3 Reviews | Rating: 4
						</span>
					</div>
					<div class = "list" onclick="location.href='details.php';" style="cursor:pointer;">
						<span>
							<p><strong>CPSC 68</strong> | BIOINFORMATICS | Ameet Soni</p>
							<p>NS | 3 Reviews | Rating: 4
						</span>
					</div>
	        	</div>


	        </div>
	    </div>
	</div><!-- end body -->

<?php require_once('footer.php'); ?>
