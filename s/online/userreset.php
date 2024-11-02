<?php $hd="../";$title="Login";
if(isset($_GET['e'])){ switch($_GET["e"]){case"out":$logout=true;break;case"exp":$expire=true;break;case"res":$restrict=true;break;}}
include("inc/header.php");
if(isset($_POST["username"])){
	$user=$_POST["username"];$pw=$_POST["password"];
	if(empty($user)||empty($pw))$error="Username and password are required";
	else{$qr=rand(1,3);
	$qs="question".$qr;
	$con=mysqli_connect("localhost","itrakvqy_b","nze2903NZE2903", "itrakvqy_b")or die();$recd= mysqli_query($con, "select * from account where username='".$user."' and password='".$pw."' ")or die(mysqli_error($con));
	
	if(mysqli_num_rows($recd)==1){
	while($rec = mysqli_fetch_array($recd)){
		
if(!isset($_SESSION)){session_start();}
		$rw=mysqli_fetch_row($recd);
		$_SESSION['a']=$rec['accstatus'];
		$_SESSION['b']=$rec['username'];
		$_SESSION['c']=$rec['password'];
		$_SESSION['d']=$rec['id'];
		$_SESSION['e']=$rec["question".$qr];
		$_SESSION['f']=$rec["answer".$qr];
		header("Location:portal/index.php");}} else{$error="Username/password is invalid";}    }}
		?><div>

<script type="text/javascript">function fsubmit(){if(findById("username").value==""||findById("password").value==""){findById("error").innerHTML="Please enter your username and password";}else if(findById("password").value.length<8){findById("error").innerHTML="Password is invalid";}else{return true}return false;}</script>

<div id="content"><div class="col col93">	<h1> Secured Login</h1>&nbsp;&nbsp;<img src="images/lock.gif" alt="Lock"><div id="log-in"><p class="login-info"><span></span></p></div></div><div class="col col62"><form method="post" action="<?php echo $_SERVER['../PHP_SELF']?>" autocomplete="off"><div id="login" class="block"><div class="head"color="ffffff"><h2>Sign in</h2><span class="tl corners"></span><span class="tr corners"></span><span class="br corners"></span><span class="bl corners"></span></div><div class="body"><div class="info"><p></p><div><div id="error"><?php if(isset($error)){echo $error; } ?><?php if(isset($logout)){?>You are logged out<?php }if(isset($restrict)){?>Restricted area, please login<?php }if(isset($expire)){?>Your session has expired, please login again<?php }?></div><fieldset class="left"><label class="inputblock"><span class="labelblock"><label for="username">User ID:</label></span><span class="inputs"><input name="username" type="text" maxlength="20" id="username" tabindex="1" value="<?php if(isset($username)){echo $username; } ?>" style="width:170px;"><span style="visibility:hidden" id="usernameerror"><img src="images/ValErrorIcon.gif" style="border-width:0px;"></span></span></label><label class="inputblock"><span class="labelblock"><label for="password">Password:</label></span><span class="inputs"><input name="password" id="password" type="password" maxlength="20" tabindex="2" value="" style="width:170px;"><span style="visibility:hidden" id="passworderror"><img id="" src="images/ValErrorIcon.gif" alt="" style="border-width:0px;"></span></span></label></fieldset><fieldset class="right"><label for="remember-username"><input id="storeUsername" type="checkbox" name="storeUsername" tabindex="3"><span>Remember my username</span>					</label><p></p><p><a title="Reset password" href="#pwreset.php">Forgot your login details?</a></p></fieldset><fieldset class="submit-field"><span class="buttons"><input type="image" name="" id="" tabindex="3" class="BtnSignIn" src="images/login-btn.gif" alt="login" style="border-width:0px;"></span></fieldset></div><h4>Login timeout</h4><p class="subtext">To protect your personal information, your session will automatically timeout after 10 minutes of inactivity.</p></div><span class="br corners"></span><span class="bl corners"></span> </div></div></form></div>





<div class="col col30"><span></span><div class="block learn" id="can-we-help">
<img src="images/can-we-help-small-bg.gif" alt="Can we help?">

<h2>Can we help?</h2><ul><li> <a href="#">Just ask</a> if you have a question about any aspect of <?php echo $Il1?> online banking.</li></ul><span class="tr corners"></span><span class="tl corners"></span></div><div class="block plum"><div class="head"><h2>Online Support</h2><span class="tl corners"></span><span class="tr corners"></span></div><div class="body"><div class="info"><p>Register, Activate&nbsp;or Re-set your account password.</p> <p class="button"><a href="register/?step=1">Register<span></span></a></p><p class="button"><a href="activate/">Activate<span></span></a></p><p class="button"><a href="#<?php echo $od?>pwreset.php">Re-set my password<span></span></a></p></div><span class="br corners"></span><span class="bl corners"></span></div></div><div class="block learn" id="security">
<img src="images/security-small-bg.gif" alt="Security">
<h2>Security</h2><ul><li><a href="<?php echo $I1L?>security/security_protect_yourself.php" target="_blank">Learn more about what steps to take to ensure your secure online service</a></li></ul><span class="br corners"></span><span class="bl corners"></span></div><!--<div id="promoimage"><img src="images/prevx_login.gif" alt="Login to download prevx software" border="0"><br></div>--></div>




</div><?php include("inc/footer.php")?>