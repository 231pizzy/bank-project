<?php
if(!isset($_SESSION)){session_start();} 
	$con=mysqli_connect("localhost","itrakvqy_b","nze2903NZE2903", "itrakvqy_b")or die();if(is_array($_FILES) ) {
	
if(is_uploaded_file($_FILES['userImage']['tmp_name'])) {
$sourcePath = $_FILES['userImage']['tmp_name'];

$format = time();
 $files = $_FILES;
 $eft = time();
 $_FILES['files']['name'] = $eft.time().$_FILES['userImage']['name'];
 $_FILES['files']['type']= $files['userImage']['type'] ;
 $_FILES['files']['tmp_name']= $files['userImage']['tmp_name'];
 $_FILES['files']['error']= $files['userImage']['error'];
 $_FILES['files']['size']= $files['userImage']['size']; 
	$namesd = $_FILES['files']['name'];
 
$dfr = explode('.',$namesd);
 $file_ext=strtolower(end($dfr));
 
  $extensions= array("jpeg","jpg","png","gif");
   $file_size = $_FILES['files']['size'];
	$file_tmp = $_FILES['files']['tmp_name']; 
    $file_name	= $namesd	;
	$folder = "../images/uphoto/";
	if(!is_dir($folder)){
	   mkdir($folder,0755,true);
	   }			
		
 //["stat"]=> string(1) "4" ["file"]=> string(19) "boldmainlogo.fw.png" 		
		
	 $stat=	$_SESSION['d'].".".$file_ext;
	$targetPath = $folder.$_SESSION['d'].".".$file_ext;	
//	echo $targetPath;

$file_error = array( 
        0=>"There is no error, the file uploaded with success", 
        1=>"The uploaded file exceeds the upload_max_filesize directive", 
        2=>"The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form", 
        3=>"The uploaded file was only partially uploaded", 
        4=>"No file was uploaded", 
        6=>"Missing a temporary folder" 
);	
		
		
		
if(move_uploaded_file($sourcePath,$targetPath)) {		
		
mysqli_query($con, "UPDATE  account SET photo='".$stat."'  WHERE id='".$_SESSION['d']."' ")or die(mysqli_error($con));

$success = "Payment receipt uploaded successfully";
  header("location:profile.php");

}else{
	
	$error = $file_error[$_FILES['userImage']['error']];

  header("location:profile.php");

	}		
		
		}
}
		
		
		
	 
	 
?>