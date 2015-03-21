<!-- You have opened developer tools! Please enjoy the marvelous work of
our many monkeys with typewriters.-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    
	<title>SwatCoRe - Swarthmore Course Review</title>

	<!-- SASS INCLUDES -->
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="shortcut icon" href="img/favicon.ico">


	<!--[if lt IE 9]>
	   <script>
	      document.createElement('header');
	      document.createElement('nav');
	      document.createElement('section');
	      document.createElement('article');
	      document.createElement('aside');
	      document.createElement('footer');
	   </script>
	<![endif]-->

</head>
<body>
	<div class="header">
		<div class="wrapper">
			<div class="logo"><a href="index.php"><span><strong>Swat</strong>CoRe</a></span></div>
			<form id = 'id-form-header-search' action="results.php" method="get">
				<input type='string' id='header-search' name='search-string' placeholder='Search for a class, professor, or department'>
			</form>
			<input id="id-btn-logout" type="submit" value="log out">
			<div class="login">
				<form action="#" id="id-form-login">
					<div class="col">
						<input type="email" class="email" required placeholder="Your Swatmail">	
					</div>
					<div class="col">
						<input type="password" class="password" placeholder="Password" required>
						<a href="forgotpassword.php" class="forgot-password-link">?</a>	
					</div>	
					<div class="col">
						<input type="submit" value="login" data-toggle="popover">
					</div>
				</form>
			</div><!-- end login -->
		</div><!-- end wrapper -->
	</div><!-- end header -->

	
