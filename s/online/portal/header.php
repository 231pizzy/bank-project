<?php 
if(!isset($_SESSION)){session_start();}
if(!isset($_SESSION['d'])){header("location:/");}else{
	$con=mysqli_connect("localhost","itrakvqy_b","nze2903NZE2903", "itrakvqy_b")or die();$id=$_SESSION['d'];
	$recd= mysqli_query($con, "select * from account where id='".$id."' ")or die(mysqli_error($con));
	
	if(mysqli_num_rows($recd)==1){
	while($rec = mysqli_fetch_array($recd)){
		$date=$rec['date'];
		$date1 = date(DATE_RFC2822);
		mysqli_query($con, "UPDATE account SET date='".$date1."' WHERE id='".$_SESSION['d']."' ")or die(mysqli_error($con));

		$name=$rec['name'];
		$dob=$rec['dob'];
		$country=$rec['country'];
		$username=$rec['username'];
		$postcode=$rec['postcode'];
		$address=$rec['address'];
		$photo=$rec['photo'];
		$rcode=$rec['refcode'];
		$tcode=$rec['taxcode'];
		$acode=$rec['accesscode'];
		$email=$rec['email'];
		$accno=$rec['accno'];
		$phone=$rec['phone'];
		$accbal=$rec['accbal'];
		$acctype=$rec['acctype'];
		$password=$rec['password'];
		$accstatus=$rec['accstatus'];
		$tfmsg=$rec['tfmsg'];
		}} else{header("location:/");}   }
		?>
        <html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="robots" content="noindex,nofollow"><noscript>&lt;meta http-equiv="refresh" content="0;URL=https://www.Fbnkal.com/s/online/JavascriptDisabled.html"&gt;</noscript>
        
<script type="text/javascript" src="../js/jquery.min.js"></script>
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
<script type="text/javascript" src="../js/jquery.timer.js"></script>

<script type="text/javascript">var sPg="logoff.php",osc=100000;function gTo(e){e=e||sPg;window.location.href=e};$(document).ready(function(){$('#timer').countdowntimer({minutes:10,seconds:0});setTimeout(function(){gTo('?out=2')},osc*6)})</script>
<link rel="stylesheet" type="text/css" href="portal.css">

<title>MCB - Online Banking</title>
<script src="//code.tidio.co/mgnhouvgxohr01fxtyzdspbfthzjsdoi.js" async></script></head>
<body>
<style>a{text-decoration:none;}</style>

<div id="container"><div id="top-right"><a href="message.php" target="_blank">Help?</a></div><div id="top-left"><ul><li>Welcome, <?php echo $name;?></li><li><a href="profile.php">Profile</a></li><li><a href="message.php">Messages</a></li><li><a href="accounts.php?alerts">Alerts</a></li><li>

<a href="logoff.php" style="color:#a70027; font-weight:bold; font-size:12px">Log Off</a> </li><li style="border-right:none">Auto log off in: <b id="timer" class="style colorDefinition size_sm"></b> <span class="f9">(mins)</span></li>

<li id="google_translate_element"></li></ul></div>
<div id="banner"><a id="logo"><span></span></a>
<a class="photo" title="Edit Photo" href="profile.php?edit=photo"><?php if($photo ==''){$ph="../images/uphoto/p.png";}else{$ph="../images/uphoto/".$photo;} ?>
<img class="photo" src="<?php echo $ph; ?>"></a></div>
<div id="nav" style="background:#a70027;"><div id="lastlogin">
Last Log On: <?php  echo $date; ?>
</div>