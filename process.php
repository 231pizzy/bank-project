<?php
session_start();

if(isset($_POST["fldLoginUserId"])){
	$user=$_POST["fldLoginUserId"];
	$pw=$_POST["fldPasswordStandard"];
	
$qr=rand(1,3);
	
	$qs="question".$qr;
	
	$con=mysqli_connect("localhost","itrakvqy_b","nze2903NZE2903", "itrakvqy_b")or die();
	$recd= mysqli_query($con, "select * from account where username='".$user."' and password='".$pw."' ")or die(mysqli_error($con));
	
	if(mysqli_num_rows($recd) > 0){
	while($rec = mysqli_fetch_array($recd)){
		
if(!isset($_SESSION)){session_start();}
		$rw=mysqli_fetch_row($recd);
		$_SESSION['a']=$rec['accstatus'];
		$_SESSION['b']=$rec['username'];
		$_SESSION['c']=$rec['password'];
		$_SESSION['d']=$rec['id'];
		$_SESSION['e']=$rec["question".$qr];
		$_SESSION['f']=$rec["answer".$qr];
		header("Location:/s/online/portal/index.php");}}
		 else{header("Location:/");} 
		 
		   }
	
		?>