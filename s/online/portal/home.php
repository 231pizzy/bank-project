<?php include("header.php"); ?>
<ul><li class="active"><a href="#">Overview</a></li><li><a href="accounts.php">Accounts</a></li><li><a href="transfer.php">Transfers</a></li><li>

<a href="home.php?bills">Pay Bills</a></li><li>

<a href="message.php#contactus">Contact Us</a></li></ul></div>

<?php if(isset($_GET['bills'])){
?><div id="content"><h2>Pay Bills</h2><hr><div style="padding-top:10px; color:#f45815">This service is not available for this account</div></div><?php	
	
	}else{ ?>

<div id="content"><span id="header-right"><b>Email:</b> <?php echo $email; ?> <a href="profile.php?edit=email" class="normal">Edit</a></span><h2>Accounts Overview</h2><div id="side-left"><div class="message"><h5 style="background:none">At a Glance</h5><div style="margin:10px 20px"><a href="message.php">No New Message(s)</a>
<div style="margin-top:8px"><a href="#">Mobile Banking Center</a></div></div></div><table class="data-table" style="border-top:solid 1px #cccccc"><tbody><tr class="table-header"><td colspan="2">Stocks</td><td><a href="profile.php?edit=stock">Edit</a></td></tr><tr class="table-subheader"><td>Index</td><td>Last</td><td>Change</td></tr><tr><td style=" font-weight:bold; font-size:12px">STI</td><td style=" font-weight:bold; font-size:12px"><?php echo rand(0,100); ?>.<?php echo rand(0,100); ?></td><td style=" font-weight:bold; font-size:12px">-0.<?php echo rand(0,100); ?></td></tr></tbody></table><p style="font-size:10px; font-style:italic; color:#555;">Note: Stocks delayed 20 minutes</p></div><div id="content-inner"><table class="data-table" style="border-top:solid 1px #cccccc"><tbody><tr class="table-header"><td>Accounts</td><td><a href="accounts.php">Manage Accounts</a></td></tr><tr class="table-subheader"><td>Current, Savings  and Checking</td><td>Available Balance</td></tr><tr><td><a href="accounts.php?summary" style="color:#000066; font-weight:bold; font-size:12px">Checking - xxxxxx<?php echo substr($accno, -4); ?></a></td><td style=" font-weight:bold; font-size:12px">$<?php echo number_format($accbal, 2); ?></td></tr><tr><td colspan="2">&nbsp;</td></tr><tr class="table-subheader"><td>Credit Cards</td><td>Available Balance</td></tr><tr><td>(<a href="" target="_blank">Apply-Visit your bank</a>)</td><td>N/A</td></tr></tbody></table><a href="https://www.popmoney.com"><img src="../images/PopmoneyRentXMktgTileX1213.jpg" style="cursor:pointer;" width="500px" height="100px" border="0"></a></div></div><?php } ?>


<?php include("side.html"); ?>
<?php include("footer.html"); ?>

</body></html>