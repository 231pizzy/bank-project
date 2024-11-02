/* determining whether msie or netscape being used and what versions */
var IE4 = (document.all && !document.getElementById) ? 1 : 0;
var NS4 = (document.layers) ? 1 : 0;
var IE5 = (document.all && document.getElementById) ? 1 : 0;
var N6 = (document.getElementById && !document.all) ? 1 : 0;
var ie = (IE4 || IE5) ? 1 : 0;
var n = (NS4 || N6) ? 1 : 0;
var IE5MAC = false;
var NS4MAC = false;
var flashLink;

var MAC = (navigator.userAgent.indexOf("Mac")) // determines platform

/* Change URL from select */
function changeUrl(sel) {
  var val = sel.options[sel.selectedIndex].value
  if(val != "0") window.location.replace(val);
}

/* Link function */
function go(url) {
	document.location.href=url
}

/* Go function for drop down navigations - either default formname of specified in function call*/
function dropdownListGo(optValue){

	if (document.all) { 

		location.href = document.all[optValue].value;

	}
	else if (document.getElementById) {
		
		location.href = document.getElementById(optValue).value;
		
	}
}

/* Go function for drop down navigations - either default formname of specified in function call*/
function dropdownNavGo(optValue){
	if (optValue != null) {
		if (optValue.value != "none") {
		location.href = optValue.value
		}
	} else if (document.formNav.dropdownNav.value != "none") { 
		location = document.formNav.dropdownNav.value
		}
}

/* Image rollover & preloads for images */
function preload(imgObj,imgSrc) {
	if (document.images) {
		eval(imgObj+' = new Image()')
		eval(imgObj+'.src = "'+imgSrc+'"')
	}
}

function changeImage(imgName,imgObj) {
	document.images[imgName].src = eval(imgObj+".src")
}

/* Load flash file or alternate image */
function loadFlash(flashFile, altText, altImage, imageURL, width, height, loopOption)
{	
	var ShockMode = 0;
	if(CheckForFlash())
	{
		if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)
		{
			if (navigator.plugins && (navigator.plugins["Shockwave Flash"] || navigator.plugins["Shockwave Flash 3.0"]))
				ShockMode = 1;
		}
		else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0
			&& (navigator.userAgent.indexOf("Windows")>=0))
		{
			document.write('<' + 'script language="VBScript"' + '>\n');
			document.write('on error resume next \n');
			document.write('ShockMode = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash")))\n');
			document.write('<' + '/SCRIPT' + '> \n'); 
		
			ShockMode = 1;
		}
	
		if ( ShockMode )
		{
			if(width == '' && height == '')
			{
				document.write('<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" id="obj1" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" border="0" hspace="0" VIEWASTEXT>');
			}
			else
			{
				document.write('<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" id="obj1" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" border="0" width="' + width + '" height="' + height +'" hspace="0" VIEWASTEXT>');
			}
			
			document.write('<param name="movie" value=' + flashFile +'> ');
			document.write('<param name="quality" value="High" /> ');
			document.write('<param name="wmode" value="transparent" /> ');
			document.write('<param name="loop" value=' + loopOption +' /> ');
			document.write('<embed src="' + sURL+flashFile + '" pluginspage="https://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="obj1" width="' + width + '" height="' + height +'" quality="High" loop="false" wmode="transparent" /></object>');	
		}
		else if (!(navigator.appName && navigator.appName.indexOf("Netscape")>=0 && navigator.appVersion.indexOf("2.")>=0))
		{
			if(width == '' && height == '')
			{
				if(imageURL != '')
				{
					document.write('<a href="' + imageURL + '"><img src=' + altImage + ' alt="' + altText + '" border="0" /></a>');
				}
				else
				{
					document.write('<img src=' + altImage + ' alt="' + altText + '" border="0" />');
				}
			}
			else
			{
				if(imageURL != '')
				{
					document.write('<a href="' + imageURL + '"><img src=' + altImage + ' alt="' + altText + '" border="0" width=' + width + ' height=' + height + '"/></a>');
				}
				else
				{
					document.write('<img src=' + altImage + ' alt="' + altText + '" border="0" width=' + width + ' height=' + height + '"/>');
				}	
			}	
		}
	}
	else
	{
		if(width == '' && height == '')
		{
			if(imageURL != '')
			{
				document.write('<a href="' + imageURL + '"><img src=' + altImage + ' alt="' + altText + '" border="0" /></a>');
			}
			else
			{
				document.write('<img src=' + altImage + ' alt="' + altText + '" border="0" />');
			}	
		}
		else
		{
			if(imageURL != '')
			{
				document.write('<a href="' + imageURL + '"><img src=' + altImage + ' alt="' + altText + '" border="0" width=' + width + ' height=' + height + '"/></a>');
			}
			else
			{
				document.write('<img src=' + altImage + ' alt="' + altText + '" border="0" width=' + width + ' height=' + height + '"/>');
			}	
		}	
	}
}


function CheckForFlash()
{
	var flashinstalled = 0;
	var flashversion = 0;
	MSDetect = "false";
	
	if (navigator.plugins && navigator.plugins.length)	//Netscape check
	{	
		x = navigator.plugins["Shockwave Flash"];
		if (x)
		{
			flashinstalled = 2;
			if (x.description)
			{
				y = x.description;
				flashversion = y.charAt(y.indexOf('.')-1);
			}
		}
		else
		{
			flashinstalled = 1;
		}					
			
		if (navigator.plugins["Shockwave Flash 2.0"])
		{
			flashinstalled = 2;
			flashversion = 2;
		}
	}
	else if (navigator.mimeTypes && navigator.mimeTypes.length)	//Netscape check
	{
		
		x = navigator.mimeTypes['application/x-shockwave-flash'];
		if (x && x.enabledPlugin)
		{
			flashinstalled = 2;
		}	
		else
		{
			flashinstalled = 1;
		}
	}
	else	//IE Check
	{
		for(var i=7; i>0; i--)
		{
			flashVersion = 0;
			try
			{
				var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
				flashVersion = i;
				flashinstalled = 1;
				return flashinstalled;
			}
			catch(e){
			}
		}
	}	
	return flashinstalled;
}  


/* Check if a flash corner peel can be loaded on the page */
function CanDisplayFlashPeel()
{	
	var loadpeel = 0;
	var flashversion = 0;
			
			
	for(var i=7; i>0; i--)
	{
		flashVersion = 0;
		try
		{
			var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
			flashVersion = i;
			loadpeel = 1;
			return loadpeel;
		}
		catch(e){
		}
	}

	return loadpeel;	
}

/* Open Virtual Assistant */
function openVA(){
	URL = siteDir+"search.php";
	today = new Date();
	uid = today.getTime() + Math.floor(Math.random()*100);
	URL += '?uid='+uid;		//this parameter is required
	window.open(URL,'VA','width=500,height=465');
}
/* End Virtual Assistant Function */

/* Pop Up Code */
function PopUp(url,width,height)	{
	if (width=="new") {
		var newWindow = open (url, '_blank','width=740,height=410,location=1,status=1,toolbar=1,menubar=1,scrollbars=1,resizable=1');
	} else {
		if (width==null) width=437
		if (height==null) height=420
		var newWindow = open (url, '_blank','width='+width+',height='+height+',location=0,status=0,toolbar=0,menubar=0,scrollbars=1,resizable=1');
	}
	newWindow.focus ();
}

/* Thank you popup: Popup application, leaving thank you page in background */
function PopUpThankYou(popURL,thankURL,width,height)	{
	if (width==null) width=437
	if (height==null) height=420
	var newWindow = open (popURL,'_blank','width='+width+',height='+height+',location=0,status=0,toolbar=0,menubar=0,scrollbars=1,resizable=1');
	
	document.location.href=thankURL;
	newWindow.focus ();
}

/* moneymadesimple Microsite Popup */
function popUpMicroSite(URL) {
        day = new Date();
        id = day.getTime();
        eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=760,height=620,left = 20,top = 20');");
}

/* Random Popup: Randomly chooses one of two given urls */
function PopUpRd(url1,url2,width,height)	{
	//change value based on random percentage. Examples:
	//2 = 50% ; 5 = 20% ; 9 = 10%
	var url = (((Math.floor(Math.random()*7))==0) ? url1 : url2);
	if (width==null) width=437
	if (height==null) height=420
	var newWindow = open (url, '_blank','width='+width+',height='+height+',location=0,status=0,toolbar=0,menubar=0,scrollbars=1,resizable=1');
	newWindow.focus ();
}

/* Random Popup: Randomly chooses one of two given urls */
function PopUpRdPlusThankYou(url1,url2,thankURL,width,height)	{
	//Function copied from PopUpRd - now includes an option for thank you page
	//change value based on random percentage. Examples:
	//2 = 50% ; 5 = 20% ; 9 = 10%
	var url = (((Math.floor(Math.random()*7))==0) ? url1 : url2);
	if (width==null) width=437
	if (height==null) height=420
	var newWindow = open (url, '_blank','width='+width+',height='+height+',location=0,status=0,toolbar=0,menubar=0,scrollbars=1,resizable=1');
	document.location.href=thankURL;
	newWindow.focus ();
}

/* Corner Peel Code */
function PeelBackCorner() 
{
	document.all.corner_image.style.visibility="hidden";

	document.all.corner_flash.style.visibility="visible";
	document.all.corner_flash.style.display="inline";
	document.all.corner_flash.rewind();
	document.all.corner_flash.play();
 
}
		
function CloseFlashFile()
{		
	document.all.corner_flash.style.visibility="hidden";
   	document.all.corner_flash.style.display="none";	
  	
   	document.all.corner_image.style.visibility="visible";
   	document.all.corner_image.style.display="inline";
	document.all.corner_image.src=document.all.corner_image.src;
}
		
function LinkFromFlash()
{
	window.location=flashLink;
}
		
function LoadCornerPeel(Image,ImageAlt, flash, flashLinkURL,AlternativeURL)
{
	var ntfour = (navigator.userAgent.indexOf("Windows NT 4.0")!=-1) || (navigator.userAgent.indexOf("Windows NT;")!=-1) ||
									(navigator.userAgent.indexOf("Windows NT)")!=-1);

	var netscape= (navigator.userAgent.indexOf("Netscape6")!=-1)||(navigator.userAgent.indexOf("Netscape/7")!=-1);
	
	if((!netscape)&&(!ntfour)&&(CanDisplayFlashPeel()))
	{
		document.write('<div id=div_1ST_img style="position:absolute;height:94;width:94;top:0;left:0;visibility:visible;display:inline;z-index:103">'
				+ '<a href="" onclick="PeelBackCorner();return false">' +  '<img src="' + Image  +  '"' + ' width=94 height=94 border=0 				alt="' + ImageAlt + '" id="corner_image" style="visibility:visible;display:inline" ' +'/>' + '</a>' + '</div>');
		document.write('<div id=div_1ST style="position:absolute;height:420;width:520;top:0;left:0;visibility:hidden;display:inline;z-index:105">'
				+ '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ID="corner_flash" WIDTH=520 HEIGHT=420 						style="visibility:hidden;display:none"><PARAM NAME=movie VALUE="' 
				+ flash + '"><PARAM NAME=quality VALUE=autohigh><PARAM NAME=loop VALUE=false><param name=wmode value=transparent><param 					name=play value=false></OBJECT></div>');
				
		flashLink = flashLinkURL;
	}
	else
	{
		document.write('<div id=div_1ST_img style="position:absolute;height:94;width:94;top:0;left:0;visibility:visible;display:inline;z-index:103">'
				+ '<a href="' + AlternativeURL +'" >' +  '<img src="' + Image  +  '"' + ' width=94 height=94 border=0 alt="' + ImageAlt + '" 				id="corner_image" style="visibility:visible;display:inline" ' +'/>' + '</a>' + '</div>');
				
	}
			
}

// Google Search
function gSearch() {		

		var url = "https://www.google.com/cse"; 		
		
		var myParameters = "";
		
		myParameters += "cx=" + document.search.cx.value;
		myParameters += "&ie=" + document.search.ie.value;
		myParameters += "&q=" + document.search.q.value;

		var fullUrl = url + "?" + myParameters;
		window.location.href = fullUrl;

		return false;
}//end gSearch

// Virtual Assistant
var vaWindow = null; 
function openVA() {		
				
		//optional arguments
		var parameters = (arguments[0]) ? arguments[0] : {};		
		
		//Parameter Defaults (the url, height, and width need to be specified)	
		//url
		//specified the default base url of the Virtual Assistant (without any get parameters attached). 
		if (! parameters.url) parameters.url = siteDir+"search.php"; 		
		//height
		//specifies the default height of the Virtual Assistant. Typically 480
		if (! parameters.height) parameters.height = "520";
		//width
		//specifies the default width of the Virtual Assistant. Typically 270 or 540
		if (! parameters.width) parameters.width = "710";		
		//name
		//specifies the name of popup window. Typically 'va'.  Used to access the window via javascript
		if (! parameters.name) parameters.name = "va";					
		//center
		//set this true if you'd like the window centered by default	
		if (! parameters.center) parameters.center = false; 
			
		//if neither top or left was specified and center is set to true, calculate location based on screen size
		if ((! parameters.top) && (! parameters.left) && (screen.availWidth) && (parameters.center)){
			
			parameters.top = (screen.availHeight-parameters.height-80) / 2;
			parameters.left = (screen.availWidth-parameters.width-20) / 2;
		
		} else {
		
			//top
			//distance in pixels of the popup window from the top of the screen
			if (! parameters.top) parameters.top = "10";
			//left
			//distance in pixels of the popup window from the left of the screen
			if (! parameters.left) parameters.left = "10";		
		}	
	
		//check resolution, and reset location if necessary
		if (screen.availWidth) {			
			if ((parameters.width > screen.availWidth) || (parameters.height > screen.availHeight)){
				alert("You may have trouble using this Virtual Assistant with your current screen resolution.  Increase your resolution for better usability.");
				parameters.top = 0;
				parameters.left = 0;
			}
		}		
				
		//entry
		//Used to submit an initial question to be asked when the Virtual Assistant is first started.
		//ie: Can I protect my ncd?
		if (! parameters.entry) parameters.entry = ""; 		
		//startContext
		//Indicates which set of Context-driven FAQs should be displayed when the Virtual Assistant is first started.
		//ie: FAQ.Home Insurance
		if (! parameters.startContext) parameters.startContext = ""; 	
		//siteContext
		//Used in multi-site implementations to indicate from which site the user has come.
		//Can be used in single-site installations to indicate from which area of the web site the user has come. Enables reporting by web site area.		
		if (! parameters.siteContext) parameters.siteContext = ""; 
		//noFree
		//Used to suppress display of free text entry box in the Virtual Assistant window when calling from (for example) help buttons on forms. 
		//Allows the user to navigate existing FAQs but not to ask free-text questions/engage in smalltalk.
		//Any non-null value indicates that the free text entry box should be suppressed (this feature is not available by default)	
		if (! parameters.noFree) parameters.noFree = ""; 

		var openParameters = 'resizable=no, toolbar=no, location=no, status=no, scrollbars=no, menubar=no, titlebar=no, width=' + parameters.width + ',height=' + parameters.height + ', top=' + parameters.top + ', left=' + parameters.left;
		
		var getParameters = "";
		
		getParameters += "isJSEnabled=1";
		
		if (parameters.entry.length > 0) getParameters += "&entry=" + encodeURIComponent(parameters.entry);
		if (parameters.startContext.length > 0) getParameters += "&startcontext=" + encodeURIComponent(parameters.startContext);
		if (parameters.siteContext.length > 0) getParameters += "&sitecontext=" + encodeURIComponent(parameters.siteContext);
		if (parameters.noFree.length > 0) getParameters += "&nofree=" + encodeURIComponent(parameters.noFree);
		
		var fullUrl = parameters.url + "?" + getParameters;
				
		var windowExists = false;
		
		try{
			if(vaWindow && vaWindow.open && !vaWindow.closed)	windowExists = true;
  		} catch(err) {
			try{
				vaWindow.close();
  			} catch(subErr) {}	
  		}		
				
		if(windowExists){//if popup window already exists, update location and focus
			
			var windowLocation = vaWindow.location.href;
			var setLocation = fullUrl;
			
			//update location if parameters have updated
			if (windowLocation.lastIndexOf('../../index.php') !== -1)	
				windowLocation = windowLocation.substr(windowLocation.lastIndexOf('../../index.php') + 1, windowLocation.length - windowLocation.lastIndexOf('../../index.php') - 1);
			windowLocation = windowLocation.replace(/uid=[^\&]*/, "");
			
			if (setLocation.lastIndexOf('../../index.php') !== -1)	
				setLocation = setLocation.substr(setLocation.lastIndexOf('../../index.php') + 1, setLocation.length - setLocation.lastIndexOf('../../index.php') - 1);
			setLocation = setLocation.replace(/uid=[^\&]*/, "");									
				
			if (windowLocation != setLocation)	vaWindow.location.href = fullUrl;
			vaWindow.focus();
			
		} else {//create the VA pop-up
		
			vaWindow = window.open(fullUrl, parameters.name, openParameters);
		}
		
		return false;

}//end openVA

// Additional Virtual Assistant functions

// checkSubmit - submit form on enter key
function checkSubmit(e){ if (e && e.keyCode == 13){ openVA({entry:document.getElementById('entry').value}); return false;}}

// CheckFieldLength - return number of characters remaining
function CheckFieldLength(fn,rn,mc) {
  var len = fn.value.length;
  if (len > mc) {
    fn.value = fn.value.substring(0,mc);
    len = mc;
  }
  document.getElementById(rn).innerHTML = mc - len;
}