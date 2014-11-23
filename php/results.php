<!DOCTYPE html>
<html lang="en" >

<?php require_once('header.php'); ?>

<?php
	$hasPostData = False;
	if(isset($_POST)) {
		if (array_key_exists("search-string", $_POST) ) {
			$searchQuery = json_encode($_POST["search-string"]);
			$hasPostData = True;
		}
	}
?>

<div id = "container-fluid">
<!-- Invisible Div to store Metadata -->
<?php if ($hasPostData): ?>
	<div id="data-search-query" style="display: none;"><?php echo $searchQuery ?></div>
<?php endif ?>   

<!-- Begin of Body -->
<div class="body results">
<div class="loader"></div>

	<div class="table">
        <div class="hidden-xs hidden-sm sidebar">
        	<?php include('sidebar.php'); ?>
        </div>
        <div class="content"> 
        	<h3 id="resultText"></h3>
        	<div class="realContent"></div>
        </div>
    </div>
</div>

<!-- End of Body -->
</div>


<!-- JS INCLUDES -->
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/ezValidation.js"></script>
<script type="text/javascript" src="js/star-rating.min.js"></script>
<script type="text/javascript" src="js/parse-1.3.1.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/auto_size.js"></script>
<script type="text/javascript" src="js/page_results.js"></script>

</body>
</html>


<!-- Format of .realContent -->
<!--
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
-->