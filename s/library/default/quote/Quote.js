//Global declaration, if any
var response;
var cXMLHTTP,innerHTMLDiv,qXMLHTTP,quoteDiv,xmlHttp,isStarted,isLoadingFlag, showPlanFlag;
var idleTime = 0;
showPlanFlag = true;
isStarted = false;
$(document).ready(function () {
    //Increment the idle time counter every minute.
    var idleInterval = setInterval("timerIncrement()", 60000); // 1 minute

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });

})
function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 19) { // 20 minutes
        window.location =  window.location.href;
    }
}

//**************************************
//Common object
//**************************************
function Create_cXMLHttp_Object(){
	//Creating Object

	try{
		// Firefox, Opera 8.0+, Safari
		cXMLHTTP = new XMLHttpRequest();							
	}
	catch (e){
		// IE
		try{
			cXMLHTTP = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e){
			try{
				cXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e){
				alert("Your browser does not support AJAX!");
				return;
			}
		}
	} 
	
	return;

}

//****************************************
//Ajax function
//***************************************
function checkTimeOut(){
	Create_cXMLHttp_Object();
	cXMLHTTP.onreadystatechange= cXMLHTTPTimeOut;
	var url = "SessionTimeOut.asp";
	cXMLHTTP.open("GET",url,true);
	cXMLHTTP.send();
} 
/*-------------------------------------------------------------------------------------*/
  function getQuoteReturn(qUrl)
  {

	  try{
		// Firefox, Opera 8.0+, Safari
		qXMLHTTP = new XMLHttpRequest();							
	}
	catch (e){
		// IE
		try{
			qXMLHTTP = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e){
			try{
				qXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e){
				alert("Your browser does not support AJAX!");
				return;
			}
		}
	}

	qXMLHTTP.onreadystatechange= QuoteAjaxReturn;
	var url = qUrl
		if(document.forms[0].NoOfPets!=null)
		url = url + '&NoOfPets='+document.forms[0].NoOfPets.value;
	
	url = url + '&rac='+Math.random()
	
		//alert(url)
	qXMLHTTP.open("GET",url,true);
	qXMLHTTP.send();	
  
  }
  function QuoteAjaxReturn()
  {
	  
	  if (qXMLHTTP.readyState==4 && qXMLHTTP.status==200)
	   {
			response = qXMLHTTP.responseText;					
			url = "Basket.asp?dummy=dummy&BasketFlag=True";
			document.getElementById('QuoteReturn').innerHTML =response;
			getBasketReturn(url)

		}
  
  }

/*-------------------------------------------------------------------------------------*/
	 function getBasketReturn(qUrl)
  {
// alert(qUrl)
	  try{
		// Firefox, Opera 8.0+, Safari
		bXMLHTTP = new XMLHttpRequest();							
	}
	catch (e){
		// IE
		try{
			bXMLHTTP = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e){
			try{
				bXMLHTTP = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e){
				alert("Your browser does not support AJAX!");
				return;
			}
		}
	}
	bXMLHTTP.onreadystatechange= BasketAjaxReturn;
	var url = qUrl
	url = url + '&rac='+Math.random()
		//alert(url)
	bXMLHTTP.open("GET",url,true);
	bXMLHTTP.send();	
  
  }
  function BasketAjaxReturn()
  {
	  if (bXMLHTTP.readyState==4 && bXMLHTTP.status==200)
	   {
			if(document.getElementById('thisLoader')!=null)
		   {
				//document.getElementById('thisLoader').click(); ' to fix the Mac Safari issue
				TriggerClickOfThis(".modalCloseImg")
			}
			response = bXMLHTTP.responseText;					
			document.getElementById('BasketReturn').innerHTML =response;
			try
			{
			AutoLoad2() // Function Available in common.js 19-Jun-2013  , Wednesday  / Alexander.R  
			AutoLoad1() // Function available in modal_basics.js in JS Folder 
			document.getElementById('Quote_Ajax_Popup').style.display='none';
			}
			catch (ee)
			{
			}
		  	//cookie function
			checkExpand();
		}
  
  }


function GetAjaxvalue(Url,DivId){
	if(document.getElementById('Quote_Ajax_Popup')!=null){
		//document.getElementById('Quote_Ajax_Popup').style.display='block';
//		 ShowQuoteLoader('CAT')
		//	 $("#loader").dialog("close");
		//$("#loader").modal('destroy',true);
		}
	// QuoteReturn // QuoteReturn 
	if(DivId=='QuoteReturn')
	{
		getQuoteReturn(Url)
	}
	else if (DivId=='BasketReturn')
	{
		getBasketReturn(url)
	}
	else
	{
	cXMLHTTP =null;
	innerHTMLDiv = DivId
	Create_cXMLHttp_Object();
	cXMLHTTP.onreadystatechange= AjaxReturn;
	var url = Url
		url = url + '&rac='+Math.random()
	cXMLHTTP.open("GET",url,true);
	cXMLHTTP.send();
	}
}


function AjaxReturn()
{

	response =""
	//alert(cXMLHTTP.readyState  + ' ' + cXMLHTTP.status)
   if (cXMLHTTP.readyState==4 && cXMLHTTP.status==200)
	   {
			response = cXMLHTTP.responseText;				
			cXMLHTTP = null;
			if(document.getElementById('thisLoader')!=null)
			{
				//document.getElementById('thisLoader').click();
				TriggerClickOfThis(".modalCloseImg")
				
				}
			if(innerHTMLDiv=='')
			{	if(document.forms[0].Isvalidnc!=null)
				{
				document.forms[0].Isvalidnc.value=response;
				document.getElementById('Quote_Ajax_Popup').style.display='none';
					return response;
				}
				//alert(response)
				
			}
				if(innerHTMLDiv=="QuoteReturn"){
					url = "Basket.asp?dummy=dummy&BasketFlag=True"
					document.getElementById(innerHTMLDiv).innerHTML =response;
					GetAjaxvalue(url,'BasketReturn')
				}
				else if (innerHTMLDiv=="BasketReturn")  
					{
					document.getElementById(innerHTMLDiv).innerHTML =response;
					window.document.body.style.cursor='auto';
					document.getElementById('Quote_Ajax_Popup').style.display='none';
					AutoLoad1() // Function available in modal_basics.js in JS Folder 
					AutoLoad2() // Function Available in common.js 19-Jun-2013  , Wednesday  / Alexander.R  
					}
					else
					{
						if(response="YES"){
							
							//alert(response)
							GetAjaxvalue('QuoteDetails.asp?dummy=dummy','QuoteReturn')
						}
						else
						{
						return response; //  Do not Change this 
						}
					}

	   }
   return;

}
function cXMLHTTPTimeOut(){
	   if (cXMLHTTP.readyState==4 && cXMLHTTP.status==200) {
			var response = cXMLHTTP.responseText;				
			if($.trim(response) == "-1"){
				window.location = "Index.asp";
			}
	   }
   return;
}


//////////////////////////////////////////////////////////////////////////////////
var strParameter
function UpdatePlans(Pobj)
	{
if (isStarted)
{
	return false;
}
	try
	{
		$(" #DateError").qtip('destroy',true);	
	}
	catch (er)
	{ 
	}
	
	if(document.forms[0].CoverstartdateStatus.value=="FALSE")
	{	
		CSDValidation();
		//ShowPlans(); ' 6-Aug-2013  , Tuesday  / Alexander.R  / T06393
		return false;
	}
	//isLoadingFlag= false;
	var B1,B2,B3;
	var SH_SBB,SH_SBS,SH_SBT
	B1 = false
		var elementToFade
	if(document.getElementById("SBB") != null){
		 elementToFade = $('#SH_SBB')//.parents('.box').find('table');
		 SH_SBB = elementToFade.hasClass('active');
		B1 = $.trim(document.getElementById("SBB").value);
	}
	B2 = false;
	if(document.getElementById("SBS") != null){
		elementToFade = $('#SH_SBS')//.parents('.box').find('table');
		 SH_SBS = elementToFade.hasClass('active');
		// alert(elementToFade.hasClass('active'))
		B2 = $.trim(document.getElementById("SBS").value);
	}
	B3 =false;
	if(document.getElementById("SBT") != null){
		elementToFade = $('#SH_SBT');//.parents('.box').find('table');
		 SH_SBT = elementToFade.hasClass('active');
		B3 = $.trim(document.getElementById("SBT").value);
	}
	var url = "QuoteDetails.asp"; // bundle 1 - SBB// Bundle 2 -SBS // Bundle 3 - SBT
	var url = "SubmitForRatingCAlls.asp"; // This will be submitin to the iframe;

	if(Pobj!=null)
		{
	PID =  Pobj.value;
	var Petspecies =	$('#CurrentPetName').val();
	isStarted= true;
	if(document.getElementById('thisLoader')==null){
	ShowQuoteLoader(Petspecies)
	}

		}
		else{
		return 
		}
	//if (PetId == "" || PID == ""){return false;}
	

	  strParameter = "?B1="+B1+"&B2="+B2+"&B3="+B3+"&PID="+PID; 
		strParameter = strParameter + '&SD='+ document.getElementById('startdate_day').value;
		strParameter = strParameter + '&SM='+ document.getElementById('startdate_month').value;
		strParameter = strParameter + '&SY='+ document.getElementById('startdate_year').value;
		
		strParameter = strParameter + '&SH_SBB='+SH_SBB;
		strParameter = strParameter + '&SH_SBS='+SH_SBS;
		strParameter = strParameter + '&SH_SBT='+SH_SBT;

		strParameter = strParameter + '&BasketFlag=True'
		url = url + strParameter;
// alert(url)
 	document.frm.action=url;
	document.frm.target="YourQuote";
	document.frm.submit();
	//GetAjaxvalue(url,'QuoteReturn')
}
function CallQuoteReturn(strQuery)
{
	isStarted= false;
	document.frm.target="";
	var strParameter ='';
	var url = 'QuoteDetails.asp?dummy=dummy'
	strParameter = strParameter + '&strQuery='+escape(strQuery);
	url = url + strParameter;
	//alert(url)
	GetAjaxvalue(url,'QuoteReturn')
}


//


/*******************************************************************************/
function DeletePetDetails(PetId,ThisPetName,Petspecies)
	{
		try
		{	
			if(document.forms[0].DeletePet==null)
				return false;
			else 
				document.forms[0].DeletePet.value = PetId;
			
			$('#Delete_pet span').html('<b>' + ThisPetName.replace(/#/g,"'") + '<\/b>')
			$('#Delete_pet').modal({
						minWidth: 500,
						minHeight: 200,
						autoResize: false,
						onOpen: function (dialog) {
							dialog.overlay.fadeIn(1, function () {
								dialog.container.fadeIn(1, function () {
									dialog.data.fadeIn(1);
								});
							});
						},
						closeHTML: '<a class="modalCloseImg" title="Press Esc to close"></a>'
					});
		}
		catch (dd)
		{
		}
	}
function confirmDeletePet()
	{
		$("#DateError").qtip('destroy',true);
		var PetId = document.forms[0].DeletePet.value; 
		var url = "DeletePet.asp?pID="+PetId+"&func=1";
		document.forms[0].NoOfPets.value = 5;
		var Petspecies = $('#CurrentPetName').val();
		if(Petspecies=='')Petspecies='CAT';
		if(document.getElementById('thisLoader')==null){
		ShowQuoteLoader(Petspecies)
		}
		var a =	GetAjaxvalue(url,'')
		
		//document.getElementById('Delete_pet').style.display='none'
	}

function getDaysInMonth(m, y) {
   return /8|3|5|10/.test(--m)?30:m==1?(!(y%4)&&y%100)||!(y%400)?29:28:31;
}

function ChangeCurrentPet(PID,Petspecies)
{
	//alert(PetName)
	$('#CurrentPetName').val(Petspecies);
	if(document.getElementById('thisLoader')==null){
	ShowQuoteLoader(Petspecies)
	}
//	window.document.body.style.cursor='wait';
	var url = "DeletePet.asp?pID="+PID+"&func=0";
	var a  = GetAjaxvalue(url,'');
	//alert(response)
	if(a=="YES")
	{//GetAjaxvalue('QuoteDetails.asp?dummy=dummy','QuoteReturn');
	}	
}


function UpdateSelectedTrPlan()
{
// Function Called at Comman.js in Js/comman.js
try
{

	var a = $('#cover_selection').val().replace('#','');	
		PlanObj  = document.forms[0].PlanType[a]
		UpdatePlans(PlanObj)
}
catch (ee)
{
}

}

function AddNewPets()
{
if(document.forms[0].CoverstartdateStatus!=null)
	{
	if(document.forms[0].CoverstartdateStatus.value=="FALSE")
		{	
			CSDValidation() //ShowPlans(); ' 6-Aug-2013  , Tuesday  / Alexander.R  / T06393
			return false;
		}
	}
if(document.forms[0].NoOfPets.value >=6 )
	{
	$('#Maximum_pet').modal({
				minWidth: 500,
				minHeight: 200,
				autoResize: false,
				onOpen: function (dialog) {
					dialog.overlay.fadeIn(1, function () {
						dialog.container.fadeIn(1, function () {
							dialog.data.fadeIn(1);
						});
					});
				},
				closeHTML: ''
			});
return false;
	}
document.forms[0].Addpet.value=true; 
document.forms[0].target="";
document.forms[0].action ="index.asp"
document.forms[0].submit();
}

/*Madhava*/

function AlignCenter(idClass){
	$(idClass).position({
		of: $(window)
	});
	return ;
}

$(document).ready(function(){
	$('.Quote_Ajax_Popup').bind('contextmenu', function(e) {
		return false;
	}); 
	$('.Quote_Ajax_Loader').bind('contextmenu', function(e) {
		return false;
	}); 
	AlignCenter('.Quote_Ajax_Popup');
	AlignCenter('.Quote_Ajax_Loader');
});


//======================================================== Cover St6art Date ====================


function ShowPlans(){
	//alert("HI");
	var rqStartDay ,rqStartMonth , rqStartYear , petDob;

	rqStartDay = $.trim(document.getElementById("startdate_day").value);
	rqStartMonth = $.trim(document.getElementById("startdate_month").value);
	rqStartYear = $.trim(document.getElementById("startdate_year").value);
//	alert(rqStartMonth)
	if(rqStartDay=='' || rqStartMonth=='' || rqStartYear=='' )
	{
		$("#DateError").qtip('destroy',true);
		RoundErrorBox('#DateError', "right middle","left middle","Please select a valid cover start date");
		return false;
	}
	$("#DateError").qtip('destroy',true);
	createXMLHttpObject();
	xmlHttp.onreadystatechange= xmlHTTPShowPlans;
	var url = "ShowPlans.asp?coverstartdateday="+rqStartDay+"&coverstartdatemonth="+rqStartMonth+"&coverstartdateyear="+rqStartYear+ '&rac='+Math.random()
	xmlHttp.open("GET",url,true);
	xmlHttp.send();
}


function createXMLHttpObject(){
	//Creating Object

	try{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();							
	}
	catch (e){
		// IE
		try{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e){
			try{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e){
				alert("Your browser does not support AJAX!");
				return;
			}
		}
	} 
	
	return;

}

function xmlHTTPShowPlans(){
//alert(xmlHttp.readyState + " " + xmlHttp.status);
  if (xmlHttp.readyState==4 && xmlHttp.status==200){
		showPlanFlag = false;
		var response ,arrResponse ,retBool ,retMsg , retDate, splitDate, strDay, strMonth, strYear, strMonthName;
		var objDay ,objMonth , objYear;
		response = xmlHttp.responseText	;
		document.forms[0].CoverStartDateResponse. value = response;
		CSDValidation()
  }
}


function CSDValidation() /* Cover Start Validation */
	{
		var response ,arrResponse ,retBool ,retMsg , retDate, splitDate, strDay, strMonth, strYear, strMonthName;
		var objDay ,objMonth , objYear;
		response = document.forms[0].CoverStartDateResponse. value;
		if(response=="")
		{
		//if(document.forms[0].CoverstartdateStatus.value=="FALSE")
		ShowPlans();
		return false;
		}

		if($.trim(response) == "-1"){
			window.location = "index.asp";
		}
		arrResponse = response.split("//");
		retBool = $.trim(arrResponse[0]);
		retMsg = arrResponse[1];
		retDate = arrResponse[2];
		splitDate = retDate.split("/");
		strDay = splitDate[0];
		strMonth = splitDate[1];
		strYear = splitDate[2];
		retDate = new Date(strYear,strMonth-1,strDay)
		//objDay,objMonth,objYear //strDay,strMonth ,strYear 
		objDay = document.getElementById("startdate_day");
		objMonth = document.getElementById("startdate_month");
		objYear = document.getElementById("startdate_year");
		var arrShowPlanMonth  = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
		//strMonthName = arrShowPlanMonth[strMonth-1].toUpperCase();
		
		if(document.forms[0].CoverstartdateStatus!=null)
		{	
			document.forms[0].CoverstartdateStatus.value= retBool.toUpperCase();
		}
		if(retBool.toUpperCase() == "FALSE"){ 
			document.forms[0].PlanType[0].checked = false;
			document.forms[0].PlanType[1].checked = false;
			document.forms[0].PlanType[2].checked = false;
			//alert(1)
			$("#DateError").qtip('destroy',true);
			RoundErrorBox('#DateError', "right middle","left middle",retMsg);			
			document.getElementById("invalid_date_mgs").innerHTML= retMsg;
			return false;
			$('#invalid_date').modal({
					minWidth: 150,
					minHeight: 200,
					autoResize: true,
					onOpen: function (dialog) {
						dialog.overlay.fadeIn('fast', function () {
							dialog.container.fadeIn('fast', function () {
								dialog.data.fadeIn('fast');
							});
						});
					},
					closeHTML: ''
				});
			return false;
		}
		else if(retBool.toUpperCase() == "TRUE" && retMsg=="FUTURE" )
			{
				$('#date_range_error').modal({
					minWidth: 600,
					minHeight: 290,
					autoResize: true,
					onOpen: function (dialog) {
						dialog.overlay.fadeIn('fast', function () {
							dialog.container.fadeIn('fast', function () {
								dialog.data.fadeIn('fast');
							});
						});
					},
					closeHTML: ''
				});	
			}
		else if(retBool.toUpperCase() == "TRUE")
			{
			}
		
		if (retBool.toUpperCase() == "TRUE")
		{
			var DefaultPlan = 1;
			DefaultPlan = document.forms[0].cover_selection.value;
			if(DefaultPlan==""){DefaultPlan = 1;}
			UpdatePlans(document.forms[0].PlanType[DefaultPlan]);
		}
	}

function RoundErrorBox(param1,param2,param3,errMsg){
	$(param1).qtip({
		content: { 
			text: function(api) {
				// Retrieve content from custom attribute of the $('.selector') elements.
				if(errMsg == "" ){
					var element = $(this).next('.errormsg');
					return element.html(); 
				}
				else{
					return errMsg;
				}
			}
		},
		show : {
			event: false,
			ready : true, // show when created on orderError call
			when : false // never show unless explicitly called
		},
		hide: function(event, api) {
			event.preventDefault(); // Stop it!
		},
		position: {
			viewport: $(window),
			at: param2,
			my: param3
		},
		style: {
			classes: 'qtip-orange qtip-shadow'
		}

	});
	return
}




function ShowQuoteLoader(species){		
	var strSpecies = species.toUpperCase()
		$('#loader').modal({
				containerId: 'loadingpanel',
				autoResize: true,
				onOpen: function (dialog){
					dialog.overlay.fadeIn('fast', function () {
						dialog.container.fadeIn('fast', function () {
							dialog.data.fadeIn('fast');
						});
					});
					if(strSpecies== 'DOG' || strSpecies =='CAT'){
						elVal = strSpecies.toLowerCase();
						$('#loader').find('.loadertitle .sicon').attr('class', 'sicon ' + elVal + 'loader');

					}
				},
				onShow: function(dialog){
					$('.progress_slider').stop(true,true).animate({width: '100%'}, 3000, function(){
					});
				},
				closeHTML: '<a id="thisLoader" class="modalCloseImg" title="Press Esc to close"></a>'
		});
}

	function moveOnMax(field,nextFieldID){
	//	alert(field.name)
  if(field.value.length >= field.maxLength && event.keyCode!= 16 && event.keyCode !=9 ){
    document.getElementById(nextFieldID).focus();
	if(document.getElementById(nextFieldID).type=='text')
	  { 
	//	document.getElementById(nextFieldID).select();
	}
  }
  else
		{
		  field.focus();
	  }
}