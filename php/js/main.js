$(function() {
	//validation
	ezValidation.init();

	// scroll to div
	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top - 72
	        }, 1000);
	        return false;
	      }
	    }
	});


	// parrlax effect
	$('.bgParallax').each(function(){
		var $obj = $(this);

		$(window).scroll(function() {
			var yPos = -($(window).scrollTop() / $obj.data('speed'));

			var bgpos = '50% '+ yPos + 'px';

			$obj.css('background-position', bgpos ) ;

		});
	});
/*
	$('.divParallax').each(function(){
		var $obj = $(this);

		$(window).scroll(function() {
			var yPos = -($(window).scrollTop() / $obj.data('speed'));

			var bgpos = '50% '+ yPos + 'px';

			$obj.css('background-position', bgpos ) ;

		});
	});
*/
	// loader
	$(window).load(function() {
	  $('.loader').fadeOut(500);
	});

	//star rating
	$(".rating").starRating({
		//minus: true // step minus button
	});
	$(".ratingbigger").starRating({
		//minus: true // step minus button
	});


	//getting JSON SEARCH
	var url = "json/db.json";
	var search;
	if(typeof searchResultData != 'undefined'){
		search = searchResultData;
		console.log(search);
	}
	$.getJSON(url, function(response){

		var	endDiv = '</div>',
			title = '<div class="title">',
			description = '<div class="description">',
			type = '<span class="type">',
			reviews = '<span class="reviews">',
			campus = '<span class="campus">',
			endSpan = '</span>',
			rating = '<div class="right"><div class="rating" data-rating-max="'
			endRating = '"></div>';


	    for(var i = 0; i < response.results.length; i++) {
	    	var loop = i+1;
	    	if(loop>4){
	    		loop = loop%4+1;
	    	}
			var entryStart = '<div class="entry"><img src="img/room' + loop + '.jpg" alt=""><div class="bottom"><div class="left">';
	    	var room = 	response.results[i].room,
	    		$hall =  room.hall + '\n',
	    		$roomNum = "Room # " + room.room + '\n',
	    		$type = room.type,
	    		$rating = "rating : " + room.rating + '\n',
	    		$raters = "raters : " + room.raters + '\n',
	    		$ac = "ac : " +room.ac + '\n',
	    		$laundry = "laundry : " + room.laundry + '\n',
	    		$campus = "campus : " + room.campus + '\n';

	    		if($type == "D") $type = "Double" + '\n';
	    		if($type == "S") $type = "Single" + '\n';

	    		if(search.room == room.room){
	    			$('#resultText').text('Found your Room');
	    			$('.realContent').append('<a href="details.php">' + entryStart + title + $hall + " " + $roomNum + '</p>' + endDiv + description + type + $type + ' |' + endSpan + reviews + $rating + " Reviews |"+ endSpan + campus + $campus + endSpan + endDiv + endDiv + rating + $rating + endRating + endDiv + endDiv + endDiv + '</a> ');
	    			break;
	    		}else if(search.room != ""){
	    			$('#resultText').text('Didn\'t find your Room');
	    		}
				if(search.ac == "on" && room.ac == 1){
					$('#resultText').text('Found rooms with AC');
					$('.realContent').append('<a href="details.php">' + entryStart + title + $hall + " " + $roomNum + '</p>' + endDiv + description + type + $type + ' |' + endSpan + reviews + $rating + " Reviews |"+ endSpan + campus + $campus + endSpan + endDiv + endDiv + rating + $rating + endRating + endDiv + endDiv + endDiv + '</a> ');
				}else{
					$('.realContent').append('<a href="details.php">' + entryStart + title + $hall + " " + $roomNum + '</p>' + endDiv + description + type + $type + ' |' + endSpan + reviews + $rating + " Reviews |"+ endSpan + campus + $campus + endSpan + endDiv + endDiv + rating + $rating + endRating + endDiv + endDiv + endDiv + '</a> ');
				}

				

	    }
	});
});
