<!DOCTYPE html>
<html lang="en" >

<?php require_once('header.php'); ?>

<!-- Begin of Body -->
<?php
    $hasPostData = False;
    if(isset($_POST)) {
        if (array_key_exists("course-object-id", $_POST) ) {
            $courseObjectId = json_encode($_POST["course-object-id"]);
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
        				<h3 id="js-populate-name-prof"></h3>
        				<p id="js-populate-id-numreviews"></p>
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
                        <!--
                        On the Internet today, popular services like Google, Facebook, and
						many others are too large to be hosted by just a few servers.
						Instead, service providers "scale out" across a coordinated set of
						hundreds to thousands of machines.  Such clusters yield an interesting
						operating environment, the data center, in which a single
						administrative entity owns a network at the scale that resembles the
						Internet. To meet customer demands, administrators often face
						stringent inter-machine coordination constraints.

						In this course, we'll examine the current state of the art in
						providing cloud-based services, including many interesting problems in
						distributed systems, networking, failure recovery, and OS
						virtualization.
                        -->
						</p>
					</div>
        		</div>
        		<div class="row closedetails">
        			<div class="left">
        				<h4>Details</h4>
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
                                <p class="tag ratingbigger">Overall Rating:</p>
                                <div class="ratingbigger" id="id-review-rating-bar" data-rating-max="5"></div>
                            </div>
                            <div class="add-review">
                                <form action="details.php" id="id-form-add-review" method="post">
                                    <textarea rows="2" name="reviewText" id="id-review-text" required placeholder="Add a Review..."></textarea>
                                    <input type="submit" type="button" class="add-review-btn" value="Add Review"/>
                                </form>
                            </div>
                        </div>
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