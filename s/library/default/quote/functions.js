//This will disable autocomplete off for all input element
$(document).ready(function(){
	$( document ).on( 'focus', ':input', function(){
		$( this ).attr( 'autocomplete', 'off' );
	});
});

//Disable loading page inside iframe
try{
	if (self != top) {
		top.location = self.location;
	}
}catch(e){
	top.location = self.location;
}


function trimSpaces(id){
	var the = document.getElementById(id);
	//the.value =the.value.replace(/(^\s*)|(\s*$)|(^\n*)|(\n*$)/g, ""); 
	the.value = $.trim(the.value);
}

function removeSpaces(){ 
	return arguments[0].replace(/\s/g,'');
}

function isBlank(field){
	var rc = true;
	var alphastring = field.value;
	var alphalength = alphastring.length;

	for (i=0;i<alphalength;i++){
		var testchar = alphastring.charAt(i);
		if ( !(testchar == ' ')){
			rc = false;
			break;
		}
	}
	return rc;
}



function isIllegal(field){
	var legalChars = false;
	var aIllegalChars = new Array("=","+","#",",","~","<",">","/","\\","{","}","[","]","%","!","$","^","&","(",")","0","1","2","3","4","5","6","7","8","9")
	for (var i=0;i<aIllegalChars.length;i++){
		if (field.value.indexOf(aIllegalChars[i]) != -1){
			legalChars = false;
			break;
		}
		else legalChars = true;	
	}
	
	if (legalChars == true){
		return false;
	}
	else{
		return true;
	}
}


function getNumberOfDays(year, month) {
    var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
    return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}




function isIllegalwithNums(field){
	var legalChars = false;
	var aIllegalChars = new Array("=","+","#","~","<",">","/","\\","{","}","[","]","%","!","^","&","(",")","'","$")

	for (var i=0;i<aIllegalChars.length;i++){
		if (field.value.indexOf(aIllegalChars[i]) != -1){
			legalChars = false;
			break;
		}
		else legalChars = true;	
	}
	
	if (legalChars == true){
		return false;
	}
	else{
		return true;
	}
}



function isIllegalwithNumsNoAlpa(field){
	var legalChars = false;
	var aIllegalChars = new Array(",","=","+","#","~","<",">","/","\\","{","}","[","]","%","!"," "," ","^","&","(",")","-","'","$","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z")

	for (var i=0;i<aIllegalChars.length;i++)
	{
		if (field.value.indexOf(aIllegalChars[i]) != -1){
			legalChars = false;
			break;
		}
		else legalChars = true;	
	}
	if (legalChars == true){
		return false;
	}
	else{
		return true;
	}
}

function CheckEmail(str){
  //no spaces allowed (N Pope 03/05/01)
	var sTrim = str
  
	//trim left spaces 
	sTrim =  sTrim.replace(/^\s+/,'');
  
	//trim right spaces - although RegExp checks for trailing spaces
	//and will still throw an error if any are detected
	sTrim =  sTrim.replace(/\s+$/,'');

	//check if we have any spaces left - i.e. in the middle
	if (sTrim.indexOf(' ')!=-1)
	{		
		return false;
	}
	// are regular expressions supported?
	var supported = 0;
	if (window.RegExp)
	{
		var tempStr = "a";
		var tempReg = new RegExp(tempStr);
		if (tempReg.test(tempStr))
		{
			supported = 1;
		}
	}
	if (!supported)
	{
		// Do it the brute force way
  		var constrain='0123456789-_.@abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		// check for invalid chars first
		for (i = 0; i < constrain.length; i++) 
		{
			if (constrain.indexOf(email.charAt(i))==-1)
			{
				return false;
			}		
		}
		return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
	}
	var r1 = new RegExp("(@.*@)|(\\.\\.)|(@\\.)|(^\\.)");
	var r2 = new RegExp("^.+\\@(\\[?)[a-zA-Z0-9\\-\\.]+\\.([a-zA-Z]{2,5}|[0-9]{1,5})(\\]?)$");
	return (!r1.test(str) && r2.test(str));
}

function isDecimal(t){

		var patt = /(\d*)\.{1}(\d*)/;
		var donepatt = /^(\d*)\.{1}(\d*)$/;
		var str = t.value;
		var result;
		if (!str.match(donepatt)){
			result = str.match(patt);
			if (result!= null){
				t.value = t.value.replace(/[^\d]/gi,'');
				str = result[1] + '.' + result[2] ;
				t.value = str;
			}
			else{
			if (t.value.match(/[^\d]/gi))
				t.value = t.value.replace(/[^\d]/gi,'');
			}
		}
	
}


function isNumber(evt) {
	evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isCharacter(evt){
	 evt = (evt) ? evt : window.event;
	 var charCode = (evt.which) ? evt.which : evt.keyCode;
	if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 9){
		return true;
	}
	else {
       return false;
   }
}
				


function isPetName(evt){
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;

	if ( (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 9 || charCode ==39 || charCode == 45 || charCode==32 ) {
		return true;
	}
	else {
       return false;
   }
}


function isUKName(evt){
	 evt = (evt) ? evt : window.event;
	 var charCode = (evt.which) ? evt.which : evt.keyCode;
	if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 9 || charCode ==39 || charCode == 45 || charCode == 32){
		return true;
	}
	else {
       return false;
   }
}


function isCharacterWithNumbers(evt){
	 evt = (evt) ? evt : window.event;
	 var charCode = (evt.which) ? evt.which : evt.keyCode;
	if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 9 || ( charCode >= 48 && charCode <= 57 || charCode == 32)){
		return true;
	}
	else {
       return false;
   }
}

function isDecimal1(evt,ele) {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46 && charCode != 8){ 
             return false;}
         else {
             var len = ele.value.length;
             var index = ele.value.indexOf('.');
             

             if (charCode == 46) {
				if(index != -1){
                 return false; 
				}
             }
			 if (charCode == 8){
				 return true;
			 }	
             if (index != -1) {
                 var CharAfterdot = (len + 1) - index;
                 if (CharAfterdot > 3) {
                     return false;
                 }
             }	 

         }
         return true;
      }


function ArrangeThis(id,ty){
	var eleId = document.getElementById(id);
	if(ty == "Date"){
		if(eleId.value.length == 1){
			eleId.value = "0"+eleId.value
		}
	}
	else if(ty == "Month"){
		if($.trim(eleId.value) != ""){
			var arrMonth = Array("January","February","March","April","May","June","July","August","September","October","November","December")
			var strMonth = $.trim(eleId.value);
			strMonth = strMonth.toUpperCase();
			var monthLength = strMonth.length ;
			var subMonth;
			for(var i=0;i<=arrMonth.length-1;i++){
				subMonth = arrMonth[i].substring(0,monthLength);
				subMonth = subMonth.toUpperCase();
				if(strMonth ==subMonth){
					eleId.value = arrMonth[i];
					break;
				}
			}
		}
	}

}


function PrintConfirmation(param1,param2){
	var w=500,h=600;
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	try{
		window.open (param1, 'Window', 'location=no, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
	}catch(e){
		window.open (param1, '', 'location=no, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
	}
}

function NewWindow(param1,param2,w,h){
	if(w == ''){ w = screen.width;}

	if(h == ''){ h = screen.height;}

	//var w=500,h=600;
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
//	alert('location=no, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
	//window.open (param1, param2, 'location=no, toolbar=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
	try{
		window.open (param1, param2, 'location=no, toolbar=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
	}catch(e){
		window.open (param1, '', 'location=no, toolbar=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
	}
}


/*function autoFocus(thisID,nextID){

	if($("#"+thisID+"").val().length == $("#"+thisID+"").attr('maxlength')){
			$("#"+nextID+"").focus();
	}
		alert(1);	
	
}  */

//function autoFocus(field,nextFieldID,event){
//	if(($("#"+field+"").attr('placeholder')) == $("#"+field+"").val()){
//		$("#"+field+"").val('');
//	}
//	var charCode = (event.which) ? event.which : event.keyCode	;
//	if($("#"+field+"").val().length >= $("#"+field+"").attr('maxlength') && charCode!= 16 && charCode !=9 ){
//		$("#"+nextFieldID+"").focus();
//		/*if(document.getElementById(nextFieldID).type=='text'){ 
//			document.getElementById(nextFieldID).select();
//		} */
//	}
//	/*}else{
//		$("#"+field+"").focus();
//	} */
//}

function autoFocus(field,nextFieldID,event){
	if(($("#"+field+"").attr('placeholder')) == $("#"+field+"").val()){
		$("#"+field+"").val('');
	}
	var charCode = (event.which) ? event.which : event.keyCode	;
	if($("#"+field+"").val().length >= $("#"+field+"").attr('maxlength') && charCode!= 16 && charCode !=9 ){ 
		$("#"+nextFieldID+"").focus();
	}
	else
	{
	document.getElementById(field).focus()	
	}
}
