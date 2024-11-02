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
	if (! parameters.height) parameters.height = "605";
	//width
	//specifies the default width of the Virtual Assistant. Typically 270 or 540
	if (! parameters.width) parameters.width = "670";		
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

	//uid	
	//Required unique identifier
	parameters.uid = new Date().getTime() + Math.floor(Math.random()*100);  

	var openParameters = 'resizable=no, toolbar=no, location=no, status=no, scrollbars=no, menubar=no, titlebar=no, width=' + parameters.width + ',height=' + parameters.height + ', top=' + parameters.top + ', left=' + parameters.left;
	
	var getParameters = "";
	
	//Tell Java that javascript is enabled
	getParameters += "isJSEnabled=1";
	
	getParameters += "&uid=" + parameters.uid;
	if (parameters.entry == "Search"  ) parameters.entry = "";
	if (parameters.entry.length > 0) getParameters += "&entry=" + encodeURIComponent(parameters.entry);
	if (parameters.startContext.length > 0) getParameters += "&startcontext=" + encodeURIComponent(parameters.startContext);
	if (parameters.siteContext.length > 0) getParameters += "&sitecontext=" + encodeURIComponent(parameters.siteContext);
	if (parameters.noFree.length > 0) getParameters += "&nofree=" + encodeURIComponent(parameters.noFree);
	getParameters += "&referrer=" + encodeURIComponent(document.URL);
	
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
		if (windowLocation.lastIndexOf('index.php') !== -1)	
			windowLocation = windowLocation.substr(windowLocation.lastIndexOf('index.php') + 1, windowLocation.length - windowLocation.lastIndexOf('index.php') - 1);
		windowLocation = windowLocation.replace(/uid=[^\&]*/, "");
		
		if (setLocation.lastIndexOf('index.php') !== -1)	
			setLocation = setLocation.substr(setLocation.lastIndexOf('index.php') + 1, setLocation.length - setLocation.lastIndexOf('index.php') - 1);
		setLocation = setLocation.replace(/uid=[^\&]*/, "");									
			
		if (windowLocation != setLocation)	vaWindow.location.href = fullUrl;
		vaWindow.focus();
		
	} else {//create the VA pop-up
	
		vaWindow = window.open(fullUrl, parameters.name, openParameters);
	}
	
	return false;

}//end openVA