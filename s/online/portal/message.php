<?php include("header.php"); ?>


<?php
if(isset($_POST['msg'])){
	$regard =$_POST['regard'];
	$ount =$_POST['account'];
	$subject =$_POST['subject'];
	$msg =$_POST['msg'];
	$sender = 1;
	mysqli_query($con, "INSERT INTO message(accid,date,regard, account, subject, msg, sender)
		
VALUES('".$id."','".$date1."','".$regard."','".$ount."','".$subject."','".$msg."','".$sender."')")or die(mysqli_error($con));
	}
?>
<style>
td{font-size:12px;}
</style>
<ul><li class="active"><a href="#">Overview</a></li><li><a href="accounts.php">Accounts</a></li><li><a href="transfer.php">Transfers</a></li><li>

<a href="home.php?bills">Pay Bills</a></li><li>

<a href="message.php#contactus">Contact Us</a></li></ul></div>


	<?php
	if(isset($_GET['message'])){ ?>
	
	
	<div id="content"><h2><?php echo $_GET['subject'];?></h2><table class="tbdetail"><tbody><tr><td style="width:80px">Date: </td><td><?php echo $_GET['date'];?></td></tr><tr><td>Account</td><td><?php echo $_GET['account'];?></td></tr><tr><td>Topic: </td><td><?php echo $_GET['topic'];?></td></tr><tr><td valign="top">Message</td><td valign="top"><?php echo $_GET['message'];?></td></tr><tr><td></td><td>&nbsp;<br>&nbsp;<br><a href="message.php?sent"  >Back to Messages</a></td></tr></tbody></table></div>
	
	
	<?php }else{
?>

<div id="content">


<h2>Secure Message Center</h2><div style="width:300px;float:left"><div id="pageContentNav"><ul><li><a href="?inbox">Inbox</a></li><li class=""><a href="?sent">Sent</a></li></ul></div>
<style type="text/css">.tbmsg a{font-weight:normal;}.tbmsg td:first-child{vertical-align:top; width:70px}</style>
<?php
if(isset($_GET['inbox'])){$em =2;}else{$em =1;}
$quercas= mysqli_query($con, "SELECT * FROM message WHERE accid='".$id."' AND sender ='".$em."' ")or die(mysqli_error($con));
if(mysqli_num_rows($quercas)==0){ echo "<i class='f10'>No Messages in Inbox</i>"; }else{
	echo "<table class='tbmsg'><tbody><tr style='border-bottom:1px solid #cccccc;'><td><b>Date</b></td><td><b>Subject</b></td></tr>";
	while($ert= mysqli_fetch_array($quercas)){ ?>
		<tr class=""><td><?php echo $ert['date'];?></td><td><a href="?message=<?php echo $ert['msg'];?>&amp;&amp;account=<?php echo $ert['account'];?>&amp;&amp;subject=<?php echo $ert['subject'];?>&amp;&amp;topic=<?php echo $ert['regard'];?>&amp;&amp;date=<?php echo $ert['date'];?>"><?php echo $ert['subject'];?></a></td></tr>
	 <?php 	}
		echo "</tbody></table>";
	}
?>

</div><div style="width:400px; margin-left:320px; border-top:solid 1px #cccccc; padding-top:5px"><b>Send a Message</b><br>&nbsp;<div class="red"><b></b></div>



<form action="<?php echo $_SERVER['PHP_SELF']?>?sent" method="post"><table class="tbdetail"><tbody><tr><td>Regarding: &nbsp;</td><td><select name="regard" required><option value="">Select a Topic</option><option value="">----------</option><option value="Accounts">Accounts</option><option value="Auto Loans">Auto Loans</option><option value="Bill Payments">Bill Payments</option><option value="Business Accounts">Business Accounts</option><option value="Credit Card">Credit Card</option><option value="Check Card">Check Card</option><option value="Credit Card Rewards">Credit Card Rewards</option><option value="Enrollment">Enrollment</option><option value="Online Banking">Online Banking</option><option value="Item(s) from Statement">Item(s) from Statement</option><option value="Money Market Account">Money Market Account</option><option value="Photocopy of Check(s)">Photocopy of Check(s)</option><option value="Photocopy of Statement">Photocopy of Statement</option><option value="Stop Payment">Stop Payment</option><option value="Transfers">Transfers</option><option value="Other">Other</option></select></td></tr>

<tr><td>Account:</td><td><select name="account" required><option selected="selected" value="">Select an Account</option><option value="">----------</option><option value="Checking - <?php echo substr($accno, -4); ?>">Checking - <?php echo substr($accno, -4); ?></option><option value="General Questions">General Questions</option></select></td></tr>

<tr><td>Subject:</td><td><input type="text" name="subject" style="width:320px" value="" maxlength="80" required></td></tr><tr><td valign="top">Message</td><td>

<textarea style="width:318px; height:150px" name="msg" required></textarea></td></tr><tr><td></td><td>&nbsp;<br><input type="submit" value="Send Message"></td></tr></tbody></table></form></div></div>
<?php } ?>

<?php  include("side.html"); ?>
<?php include("footer.html"); ?>

</body></html>