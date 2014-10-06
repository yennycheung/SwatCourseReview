<?php 

require_once('header.php'); 

$postval = json_encode($_POST);
if(isset($_POST)){
?>
	<script>
		var searchResultData = <?php echo $postval; ?>;
	</script>
<?php } ?>
	<div class="body results">
	<div class="loader"></div>

		<div class="table">
	        <div class="sidebar">
	        	<?php include('sidebar.php'); ?>
	        </div>
	        <div class="content">
	        	<h3 id="resultText">149 Rooms Found</h3>
	        	<div class="realContent">

	        	</div>


	        </div>
	    </div>
	</div><!-- end body -->

<?php require_once('footer.php'); ?>
