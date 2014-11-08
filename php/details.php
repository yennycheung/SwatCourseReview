<!DOCTYPE html>
<html lang="en" >

<?php require_once('header.php'); ?>

<!-- Begin of Body -->

<div class="body details secondary">
<div class="loader"></div>	
	
	<div class="table">
        <div class="sidebar">
        	<?php include('sidebar.php'); ?>
        </div>
        <div class="content">
        	<div class="deatlstext">
        		<div class="row top">
        			<div class="title">
        				<h3>CPSC 91 Cloud Computing - Kevin Webb</h3>
        				<p>CPSC 91 | 9 reviews</p>
        			</div>
        			<div class="ratingbigger">
        				<div class="ratingbigger" data-rating-max="5"></div>
        			</div>
        			<div class="right">
    					<a href="#"><img src="img/iconheart.jpg" alt=""></a>
    					<a href="#"><img src="img/iconplus.jpg" alt=""></a>
        			</div>
        		</div>
        		<div class="row classdesc">
        			<div class="left">
        				<h4>Course Summary</h4>
        			</div>
        			<div class="right">
	        			<p>On the Internet today, popular services like Google, Facebook, and
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
						</p>
					</div>
        		</div>
        		<div class="row closedetails">
        			<div class="left">
        				<h4>Details</h4>
        			</div>
        			<div class="right">
        				<div class="col">
        					<p class="lab">
        						<i><img src="img/Lab.png" width="60" height="60" alt=""></i>
        						<span>Natural Sciences</span>
        					</p>
        				</div>
        			</div>	
        		</div>
        		<div class="row closedetails two" style="padding-top:0;">
        			<div class="left">
        				<h4>Reviews</h4>
        			</div>
        			<div class="right">
        				<div id="reviews">
	        				<div class="review">
                                <p>This class has quite a lot of reading per class. Reading research papers isn't the funnest thing in the world. The labs are interesting though.</p>
                                <div class="actions">
                                    <p class="action upvote" id = "0">Upvote</p>
                                    <p class="action comment" id = "0">Comment</p>
                                </div>
                                <div class="comments">
                                    <div class="comment-textbox">
                                        <textarea rows="1" name="commentText" id="commentText" required placeholder="Add a Comment..."></textarea>
                                        <input type="submit" type="button" class="add-comment-btn" value="Comment"/>
                                    </div>
                                </div>
                            </div><!-- end review -->  
        			    </div>
                        <div class="review-textbox">
                            <textarea rows="2" name="reviewText" id="reviewText" required placeholder="Add a Review..."></textarea>
                            <input type="submit" type="button" class="add-review-btn" value="Add Review"/>
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
<script type="text/javascript" src="js/page_details.js"></script>

</body>
</html>