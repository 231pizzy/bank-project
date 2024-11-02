<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="robots" content="noindex,nofollow"></head><body style="background:none; background-color:#990033">
<?php 
session_start();
	$con=mysqli_connect("localhost","itrakvqy_b","nze2903NZE2903", "itrakvqy_b")or die();$id=$_SESSION['d'];
	$recd= mysqli_query($con, "select pw from admin ")or die(mysqli_error($con));
	
	if($rec = mysqli_fetch_array($recd)){
	$weee = $rec['pw']; }
	if(isset($_POST['pw'])){
		if($weee == $_POST['pw']){
			$_SESSION['admin']='set';
			header("location:home.php?list");}else{header("location:?err");}
		
		}
?>
<form action="" method="post">

<div style="color:#00ffff; text-align:center; padding-top:250px">
<?php 
if(isset($_GET['err'])){
	?>
Invalid password!	
	<?php
	}
?>

<br>&nbsp;</div>

<table cellspacing="15"><tbody><tr><td nowrap="nowrap" style="text-align:right; width:52%"><input name="pw" type="password" maxlength="20"></td><td nowrap="nowrap"><input type="submit" name="Submit" value="Enter">&nbsp;<input type="button" name="Submit2" value="Cancel" onClick="javascript:window.location.href='/';"></td></tr></tbody></table></form></body></html>