<!DOCTYPE html>
<html lang="en" >

<?php require_once('header.php'); ?>

<!-- Begin of Body -->
<?php
    $hasPostData = False;
    if(isset($_GET)) {
        if (array_key_exists("course-object-id", $_GET) ) {
            $courseObjectId = json_encode($_GET["course-object-id"]);
            $hasPostData = True;
        }
    }
?>

<!-- Invisible Div to store Metadata -->
<?php if ($hasPostData): ?>
    <div id="data-course-object-id" style="display: none;"><?php echo $courseObjectId ?></div>
<?php endif ?>  

<div class="body details secondary">
<div class="loader"></div>	
	<div class="table">
        <div class="content">
        	<div class="deatlstext">
        		<div class="row top">
        			<div class="title">
        				<h3 id="js-populate-course-title"></h3>
        				<p id="js-populate-review-summary"></p>
        			</div>
        			<!--<div class="ratingbigger">
        				<div class="ratingbigger" data-rating-max="5"></div>
        			</div>-->
        		</div>

        		<div class="row classdesc">
        			<div class="left">
        				<h4>Course Summary</h4>
        			</div>
        			<div class="right">
	        			<p id="js-populate-summary">
						</p>
					</div>
        		</div>
        		<div class="row closedetails">
        			<div class="left">
        				<h4>Division</h4>
        			</div>
        			<div class="right">
        				<div id="js-populate-division" class="col">
        				</div>
        			</div>	
        		</div>
        		<div class="row closedetails two" style="padding-top:0;">
        			<div class="left">
        				<h4>Reviews</h4>
        			</div>
        			<div class="right">

        				<div id="reviews">
        			    </div>

                        <div class="review-textbox">
                            <div class="add-rating">
                                <p class="tag">Overall Rating:</p>
                                <div class="ratingbigger" id="id-overall-rating-bar" data-rating-max="5"></div>
                                <!--
                                <br/>
                                <p class="tag ratingbigger">Difficulty:</p>
                                <div class="ratingbigger" id="id-difficulty-rating-bar" data-rating-max="5"></div>
                                <p class="tag ratingbigger">Workload:</p>
                                <div class="ratingbigger" id="id-workload-rating-bar" data-rating-max="5"></div>
                                <br/>
                                <p class="tag ratingbigger">Fun:</p>
                                <div class="ratingbigger" id="id-fun-rating-bar" data-rating-max="5"></div>
                                <p class="tag ratingbigger">Usefulness:</p>
                                <div class="ratingbigger" id="id-useful-rating-bar" data-rating-max="5"></div>
                                -->
                            </div>
                            <div class="add-review">
                                <form action="details.php" id="id-form-add-review" method="post">
                                    <textarea rows="2" name="reviewText" id="id-review-text" required placeholder="Add a Review..."></textarea>
                                    <input type="submit" type="button" class="add-review-btn" value="Add Review"/>
                                </form>
                            </div>
                        </div>

                        <input type="button" class="add-review-btn" id="id-update-button" value="You have already reviewed this class. Click to update Review"/>
        		    </div>
        	    </div>
            </div>
        </div>
    </div>

<!-- End of Body -->		
	
<?php require_once('footer.php'); ?>

<!-- JS INCLUDES -->
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/ezValidation.js"></script>
<script type="text/javascript" src="js/star-rating.min.js"></script>
<script type="text/javascript" src="js/parse-1.3.1.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/auto_size.js"></script>
<script type="text/javascript" src="js/page_details.js"></script>

</body>
</html>