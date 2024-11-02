<?php include("header.php"); ?>
<ul><li><a href="home.php">Overview</a></li><li class="active"><a href="#">Accounts</a></li><li><a href="transfer.php">Transfers</a></li><li>

<a href="home.php?bills">Pay Bills</a></li><li>

<a href="message.php#contactus">Contact Us</a></li></ul></div>
<style>
td{font-size:12px;}
</style>

<?php
if(isset($_GET['summary'])){
$null="";
$quercq= mysqli_query($con, "SELECT * FROM statement WHERE accid='".$id."' AND debit is NULL  ORDER BY id ASC LIMIT 1 ")or die(mysqli_error($con));
while($rt = mysqli_fetch_array($quercq)){
	$daet = $rt['date'];
	$credit = $rt['credit'];
	$balancea = $rt['balance'];

}

$querca= mysqli_query($con, "SELECT * FROM statement WHERE accid='".$id."' AND credit is NULL ORDER BY id ASC LIMIT 1 ")or die(mysqli_error($con));
while($rta = mysqli_fetch_array($querca)){
	$daeta = $rta['date'];
	$debit = $rta['debit'];
	

}
?>
<div id="content"><span id="header-right"><a href="accounts.php">View All Accounts</a></span>

<h2>Checking - <?php echo substr($accno, -4); ?><br></h2><div style="font-weight:normal; font-size:12px; margin:-10px 0 30px 0">Available Balance: $<?php echo number_format($accbal, 2); ?> <!--| <a href="#">Edit Nickname</a>--></div><div id="pageContentNav"><ul><li class="sel"><a href="?summary">Summary</a></li><li class=""><a href="?transaction">Transactions</a></li><li class=""><a href="?statements">Statements</a></li><li class=""><a href="?alerts">Alerts</a></li></ul></div><div style="margin-top:20px"><div class="right" style="width:300px"><table class="subBalance"><tbody><tr><td>


FAvailable Balance: </td><td>$<?php echo number_format($balancea, 2); ?> </td></tr><tr><td>Current Balance:</td><td>$<?php echo number_format($accbal, 2); ?> </td></tr><tr bgcolor="#FCFCF8"><td>Last Statement Date:</td><td><?php echo $daet; ?></td></tr><tr class="dv" bgcolor="#FCFCF8"><td>Last Transaction Date:</td><td><?php echo $daeta; ?>

</td></tr><tr bgcolor="#FCFCF8"><td>Last Deposit Date:</td><td><?php echo $daet; ?></td></tr>

<tr class="dv" bgcolor="#FCFCF8"><td>Last Deposit Amount:</td><td>$<?php
if(strpos(",", $credit)==true){
	echo number_format($credit, 2);
	}else{echo $credit;}
  ?>

 </td></tr><tr bgcolor="#FCFCF8"><td>Last Debit Date:</td><td><?php echo $daeta; ?></td></tr>
 
 <tr class="dv" bgcolor="#FCFCF8"><td>Last Debit Amount:</td><td>$<?php
 if(strpos(",", $debit)==true){
	echo number_format($debit, 2);
	}else{echo $debit;} ?> 

</td></tr><tr bgcolor="#FCFCF8"><td>Interest Paid (Year to Date):</td><td>$0.00</td></tr></tbody></table></div><table class="tbdetail" style="width:410px; margin-bottom:120px"><tbody><tr><td style="width:150px">Account Name:</td><td><?php echo $name; ?></td></tr><tr><td>Account Type:</td><td><?php echo $acctype; ?>
</td></tr><tr><td valign="top">Account Number:</td><td><span id="acP">xxxxxxxx - <?php echo substr($accno, -4); ?><br><a class="f11 normal" style="font-size:10px;" href="#" onclick="$('#acf').show();$('#acP').hide()">View Full Account Number</a></span><span id="acf" class="hide"><?php echo  $accno; ?></span></td></tr><tr><td>Account Status:</td><td>Active</td></tr><tr><td>Statement Delivery:</td><td>Online</td></tr><tr><td>Overdraft Protection:</td><td>No</td></tr><tr><td>Overdraft Coverage:</td><td>No <i class="f10">(effective 19/12/2019)</i> </td></tr></tbody></table></div></div>

<?php }else if(isset($_GET['transaction'])){
?>
<div id="content"><span id="header-right"><a href="accounts.php">View All Accounts</a></span>

<h2>Checking - <?php echo substr($accno, -4); ?><br></h2><div style="font-weight:normal; font-size:12px; margin:-10px 0 30px 0">Available Balance: $<?php echo number_format($accbal, 2); ?> <!--| <a href="#">Edit Nickname</a>--></div><div id="pageContentNav"><ul><li><a href="?summary">Summary</a></li><li class="sel"><a href="?transaction">Transactions</a></li><li class=""><a href="?statements">Statements</a></li><li class=""><a href="?alerts">Alerts</a></li></ul></div>
<table class="data-table tbstatement"><tbody><tr class="table-header"><td>Date</td><td class="left">Description</td><td>Debit ( - )</td><td>Credit ( + )</td><td>Balance</td></tr>

<?php
$quercaa= mysqli_query($con, "SELECT * FROM statement WHERE accid='".$id."'  ORDER BY id ASC")or die(mysqli_error($con));
while($rtaa = mysqli_fetch_array($quercaa)){
	
?><tr>
<td><?php echo $rtaa['date']; ?></td><td class="left"><a href="accounts.php?transactioninfo=<?php echo base64_encode(rand(1000,100000).'TE5OTA41')?>&amp;&amp;tid=<?php echo $rtaa['id']; ?>"><?php echo $rtaa['descn']; ?></a></td><td><?php if($rtaa['debit']!=''){  echo "$".$rtaa['debit'];} ?></td>
<td><?php if($rtaa['credit']!=''){  echo "$".$rtaa['credit'];} ?></td>
<td><?php echo "$".$rtaa['balance']; ?></td>
</tr>

<?php	

}
?>
</tbody></table></div>  <?php }else if(isset($_GET['statements'])){
?>
<div id="content"><span id="header-right"><a href="accounts.php">View All Accounts</a></span>

<h2>Checking - <?php echo substr($accno, -4); ?><br></h2><div style="font-weight:normal; font-size:12px; margin:-10px 0 30px 0">Available Balance: $<?php echo number_format($accbal, 2); ?> <!--| <a href="#">Edit Nickname</a>--></div><div id="pageContentNav"><ul><li><a href="?summary">Summary</a></li><li><a href="?transaction">Transactions</a></li><li class="sel"><a href="?statements">Statements</a></li><li class=""><a href="?alerts">Alerts</a></li></ul></div>

<ul class="pageContentSubNav ulnav" id=""><li>View all</li><li><a href="message.php?paper-statement">Order a Paper Copy</a></li></ul><table class="data-table tbstatement"><tbody><tr class="table-header"><td>Issue Date</td><td class="left">Document</td><td>Document Type</td></tr><tr class="table-subheader"><td colspan="3">There are no statements available</td></tr></tbody></table><div style="margin-bottom:150px"><i class="f10"><b>NOTE:</b> Only statements from the past 18 months are available online, but you can <a class="normal" href="message.php?paper-statement">order a paper copy</a> of any statement issued over the past 7 years.</i></div></div>

 <?php }else if(isset($_GET['alerts'])){
?>
<div id="content"><span id="header-right"><a href="accounts.php">View All Accounts</a></span>

<h2>Checking - <?php echo substr($accno, -4); ?><br></h2><div style="font-weight:normal; font-size:12px; margin:-10px 0 30px 0">Available Balance: $<?php echo number_format($accbal, 2); ?> <!--| <a href="#">Edit Nickname</a>--></div><div id="pageContentNav"><ul><li><a href="?summary">Summary</a></li><li class=""><a href="?transaction">Transactions</a></li><li class=""><a href="?statements">Statements</a></li><li class="sel"><a href="?alerts">Alerts</a></li></ul></div>

<b>Email Address:</b> &nbsp;&nbsp;&nbsp;<?php echo $email; ?> &nbsp;<a href="profile.php?edit=email" class="normal f10">Edit</a><br><b>Mobile Number:</b> &nbsp;&nbsp;<?php echo $phone; ?>  &nbsp;<a href="profile.php?edit=phone" class="normal f10">Edit</a><br>&nbsp;<style type="text/css">.data-table [type=text]{width:100px}.data-table tr{border-bottom: solid 1px #f0f0f0}</style><table class="data-table"><tbody><tr class="table-header"><td>Account Alerts</td><td>Alert Notification Type</td></tr><tr><td>Account Debit Notification</td><td><form method="post" action="accounts.php?alerts"><input type="checkbox" name="daily-balance">Email &nbsp; &nbsp; &nbsp; <input type="checkbox" name="daily-balance">Mobile</td></tr><tr><td>Account Credit Notification</td><td><input type="checkbox" name="daily-balance">Email &nbsp; &nbsp; &nbsp; <input type="checkbox" name="daily-balance">Mobile</td></tr><tr><td>Available Balance has fallen below&nbsp;&nbsp; $ <input type="number"></td><td><input type="checkbox" name="daily-balance">Email &nbsp; &nbsp; &nbsp; <input type="checkbox" name="daily-balance">Mobile</td></tr><tr><td>Available Balance has risen above&nbsp;&nbsp;&nbsp; $ <input type="number" required></td><td><input type="checkbox" name="daily-balance">Email &nbsp; &nbsp; &nbsp; <input type="checkbox" name="daily-balance">Mobile</td></tr><tr><td>Account Overdrawn</td><td><input type="checkbox" name="daily-balance">Email &nbsp; &nbsp; &nbsp; <input type="checkbox" name="daily-balance">Mobile</td></tr><tr><td>New Message Arrival</td><td><input type="checkbox" name="daily-balance">Email &nbsp; &nbsp; &nbsp; <input type="checkbox" name="daily-balance">Mobile</td></tr></tbody></table><div class="center"><input type="submit" class="button" value="submit"></div></div></form>

<?php }else if(isset($_GET['tid'])){
	$tid= $_GET['tid'];
		$recda= mysqli_query($con, "select * from statement where id='".$tid."' ")or die(mysqli_error($con));
	while($reca = mysqli_fetch_array($recda)){
?>

<div id="content"><span id="header-right"><select onchange="accsel(this)" id="dds"><option value="">Select a Differenct Account</option><option value="">----------</option><option value="me">Checking - xxxxxx<?php echo substr($accno, -4); ?></option><option value="">----------</option><option value="all">View All Accounts</option></select></span><h2>Checking - <?php echo substr($accno, -4); ?><br></h2><div style="font-weight:normal; font-size:12px; margin:-10px 0 30px 0">Available Balance: $<?php echo number_format($accbal, 2); ?> <!--| <a href="#">Edit Nickname</a>--></div><div id="pageContentNav"><ul><li class=""><a href="?summary">Summary</a></li><li class="sel"><a href="?transaction">Transactions</a></li><li class=""><a href="?statements">Statements</a></li><li class=""><a href="?alerts">Alerts</a></li></ul></div><table class="tbdetail"><tbody><tr><td style="width:180px">Transaction Date:</td><td><?php echo $reca['date']; ?></td></tr><tr><td>Description:</td>

<td><?php echo $reca['descn']; ?></td></tr><tr><td><?php if($reca['debit']==''){$cc=$reca['credit']; echo "Credit";}else{$cc=$reca['debit']; echo "debit";} ?>:</td><td>$<?php 
if(strpos(",", $cc)==true){
  echo number_format($cc, 2);
	}else{echo $cc;}
 ?></td></tr><tr><td>Balance after Transaction:</td><td>$<?php if(strpos(",", $reca['balance'])==true){ echo number_format($reca['balance'], 2);}else{echo $reca['balance'];}?></td></tr><tr><td>Transaction Status:</td><td><?php echo $reca['status']; ?></td></tr>
 <tr><td colspan="2">
 <?php if($reca['tfto_name']!=''){ ?>
 &nbsp;<br><u>Beneficiary Information</u></td></tr><tr><td>Name:</td><td><?php echo $reca['tfto_name']; ?></td></tr><tr><td>Account Number:</td><td>
 <?php  if($reca['tfto_acc']==''){echo "*****";}else{ echo $reca['tfto_acc'];} ?></td></tr><tr><td>IBAN Number:</td><td>
 <?php if($reca['tfto_iban']==''){echo "*****";}else{ echo $reca['tfto_iban'];} ?></td></tr><tr><td valign="top">Bank:</td><td><?php if($reca['tfto_bank']==''){echo "*****";}else{ echo $reca['tfto_bank'];} ?><br><?php if($reca['tfto_bankaddr']==''){echo "*****";}else{ echo $reca['tfto_bankaddr'];} ?></td></tr><tr><td>Country:</td><td><?php if($reca['tfto_country']==''){echo "*****";}else{ echo $reca['tfto_country'];} ?></td></tr>
<?php } ?>
 <tr><td></td><td>&nbsp;<br>&nbsp;<br><input type="button" class="button" value="Return to Transaction List" onclick="gTo('?transaction')"></td></tr></tbody></table></div>

<?php }}else 

 {
?>
<div id="content"><h2>Account List</h2><table class="data-table" style="margin-bottom:210px"><tbody><tr class="table-subheader"><td>Current, Savings  and Checking</td><td>Available Balance</td></tr><tr><td><a href="?transaction" style="color:#000066; font-weight:bold; font-size:14px">Checking - xxxxxx<?php echo substr($accno, -4); ?></a></td><td style="font-size:12px;">$<?php echo number_format($accbal, 2); ?></td></tr><tr><td colspan="2">&nbsp;</td></tr><tr class="table-subheader"><td>Credit Cards</td><td>Available Balance</td></tr><tr><td>(<a href="" target="_blank">Apply-Visit your bank</a>)</td><td>N/A</td></tr></tbody></table></div> <?php } ?>


<div id="side-right"><div class="title">I Want to ...</div><ul><li><a href="?statements">View or Print My Statement</a></li><li><a href="?alerts">Set Up Account Alerts</a></li><li><a href="?transaction">View My Transactions</a></li><li><a href="transfer.php">Make a Transfer</a></li><li><a href="message.php?paper-statement">Order a Statement Copy</a></li></ul><div class="title"></div></div>


<?php include("side.html"); ?>
<?php include("footer.html"); ?>

</body></html>