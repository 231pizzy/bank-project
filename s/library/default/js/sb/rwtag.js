// rwtag.js
// Version 0.9.6 2006-03-01

var rwSetup = new rwSetup();
var rwImage = new Image;

// Routine to pick up exisiting PPC parameters. 
// Regular expression matches ?source=NETSPARECARIEM010045
// Codes containing OVERT, GOOGL, SPARE, xxxIN, ESPOT, EMARK are counted as PPC


var rwTagPrefix;
rwGrep = new RegExp("source=([A-Z0-9]+)");
if (rwGrep.test(location.href)) {
                rwMatches = location.href.match(rwGrep);
                rwTagPrefix="rw.cm=Source"+",PPC,"+rwMatches[1];
                
}
else {
	rwGrep = new RegExp("adsrc=([A-Z0-9]+)");
	sc=document.cookie;
	if (rwGrep.test(sc)) {
                rwMatches = sc.match(rwGrep);
                rwTagPrefix="rw.cm=Source"+",PPC,"+rwMatches[1];            
	}
}


function rwSetup() {
	this.rwVersion = "0.9.7";
	this.rwProfile = sNmSht;
	this.rwTagServerGIF = "www.sptag.com/rwtag.html";
	this.rwCheckMetaTags = true;
	this.rwSendTitle = true;
	this.rwSendURL = true;
	this.rwSequence = false;
	this.rwCookieName = "";	
	this.rwCookieCreate = false;
	this.rwCookieDays = 0;
	this.rwCookieDomain = null;
	this.rwCookieEnabledCheck = true;
	this.rwDebug = false;
}

function rwAddTag( rwPage, rwPrefix, rwPageTitle ) {
	if (typeof rwPage =="string" && rwPage.length>0){
		var rwString = "http"+(window.location.protocol.indexOf('cca-summary-box-nectar-oct2013fba2.html')==0?'s':'') + "://" + rwSetup.rwTagServerGIF;
		rwString = rwString + "?" + (typeof rwPrefix =="string" && rwPrefix.length>0 ? rwPrefix + "&" : "")  + rwParameters();
		rwString = rwString + "&rw.ul=" + escape(location.href.substring(0, location.href.lastIndexOf("../../index.html")+1) + rwPage) + "&rw.rf=" + escape(location.href);
		if (typeof rwPageTitle =="string" && rwPageTitle.length>0 && rwSetup.rwSendTitle){
			rwString = rwString + "&rw.ti=" + escape(rwPageTitle);
		}
		return rwTagServer(rwString);
	}
	return null;
}

function rwCookieTag(){
	var rwCookieName = rwSetup.rwCookieName;
	var rwCookiePath = "../../index.html";
	var rwCookieDomain = rwSetup.rwCookieDomain;
	var rwCookieDays = rwSetup.rwCookieDays;
	var rwCookieString = "";
	if (rwCookieName.length == 0){
		return "";
	}
	rwCookieString = rwGetCookieLastValue( rwCookieName );
	if (typeof rwCookieString =="string" && rwCookieString.length>0){
		return "rw.ck=" + rwCookieString; 
	}
	if (rwSetup.rwCookieCreate == false){
		return "rw.ck=";
	} else {
		var rwNowString = new Date().getTime();
		var rwCookieString = "rwtag." + location.href.length + "." + navigator.userAgent.length + "." + rwNowString;
		var rwCookieExpiry = null;
		if (rwCookieDays>0) {
			rwCookieExpiry = new Date();
			rwCookieExpiry.setDate(rwCookieExpiry.getDate() + parseInt(rwCookieDays));
			rwCookieExpiry = rwCookieExpiry.toGMTString();
		}
		rwSetCookie( rwCookieName, rwCookieString, rwCookieExpiry, rwCookiePath, rwCookieDomain, null);
		rwCookieString = "";
		rwCookieString = rwGetCookieLastValue(rwCookieName);
		if (typeof rwCookieString =="string"){
			return "rw.ck=" + rwCookieString + "&rw.ckcreated=" +  rwNowString;
		} else {
			return "rw.ck=";
		}
	}
	return "";
}
	
function rwMetaTags(){		
	var rwMT = "";
	var rwMTags;
	if (document.all){
		rwMTags = document.all.tags("meta");
	} else if (document.documentElement){
		rwMTags = document.getElementsByTagName("meta");
	}
	if (typeof rwMTags !="undefined"){
		for (var i=1;i<=rwMTags.length;i++){
			var rwMTag=rwMTags.item(i-1);
			if (rwMTag.name){
				if (rwMTag.name.indexOf('rw.')==0){
					rwMT=rwMT+"&"+rwMTag.name+"="+escape(rwMTag.content);
				}
			}
		}
	}
	return rwMT;
}
	
function rwParameters(){
	var rwNow = new Date();
	var rwString = "rw.pf=" + rwSetup.rwProfile + "&rw.nw="+ rwNow.getTime();	
	if (rwSetup.rwCookieName.length>0){
		rwString = rwString + "&" + rwCookieTag();
	}			
	if (rwSetup.rwCookieEnabledCheck == true && rwIsCookieEnabled()==false) {
		rwString = rwString + "&rw.ckstatus=disabled";
	}	
	if (rwSetup.rwSequence == true ){
		var rwSequence = rwGetCookieLastValue("rwsequence");
		if (typeof rwSequence=="string" && rwSequence.length>0){
			rwSequence = "" + (parseInt(rwSequence)+1);
			rwTagHTML = rwString + "&rw.sq=" + rwSequence;
			rwSetCookie("rwsequence",rwSequence,null,"../../index.html",rwSetup.rwCookieDomain,null);		
		} else {
			rwSequence = "1";
			rwSetCookie("rwsequence",rwSequence,null,"../../index.html",rwSetup.rwCookieDomain,null);		
			rwTagHTML = rwString + "&rw.sq=" + rwSequence;
		}
	}
	return rwString;	
}

function rwTag( rwPrefix ){			
	return rwTagServer( rwURL( rwPrefix ));
}
	
function rwTagServer( rwURLString ){	
	var rwTagHTML = rwURLString;
	
	if (rwTagHTML.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		rwTagHTML=rwTagHTML.substring(0,2040)+"&rw.End=1";
	}
	if (document.images){
		rwImage.src = rwTagHTML;
	} else {
		rwTagHTML = '<I' + 'MG BORDER=\"0\" NAME=\"rwtag\" WIDTH=\"1\" HEIGHT=\"1\" SRC=\"' + rwTagHTML + ' \" >' ;
		document.write( rwTagHTML );
	}
	if (rwSetup.rwDebug == true) {
		document.write("<br/><b>"+rwTagHTML+"</b>");
	}
	return rwTagHTML;
}	

function rwURL( rwPrefix ){
	var rwURLString = "";
	if (typeof rwTagPrefix== "string" && rwTagPrefix.length>0) {
		rwURLString = rwTagPrefix;
	}
	if (typeof rwPrefix == "string" && rwPrefix.length>0){
		rwURLString = (rwURLString.length>0 ? rwURLString + "&" : "") + rwPrefix;
	} 
	rwURLString = "?" + (rwURLString.length>0 ? rwURLString + "&" : "") + rwParameters();
	rwURLString = "http"+(window.location.protocol.indexOf('cca-summary-box-nectar-oct2013fba2.html')==0?'s':'')+"://" + rwSetup.rwTagServerGIF + rwURLString;		
	if (rwSetup.rwSendURL == true){
		rwURLString = rwURLString + "&rw.ul=" + escape(location.href);	
	}
	rwURLString = rwURLString + "&rw.rf=" + escape(window.document.referrer);
	if (rwSetup.rwCheckMetaTags == true){
		rwURLString = rwURLString + rwMetaTags();
	}	
	if (rwSetup.rwSendTitle == true) {
		rwURLString = rwURLString + "&rw.ti=" + escape(document.title);
	}
	return rwURLString;
}
	
function rwIsCookieEnabled() {
	var rwEnabled = (typeof document.cookie == "string" && document.cookie.length>0 ? true : false);
	if ( rwEnabled == false && typeof document.cookie == "string"){
		document.cookie = "rwCheckCookie=testing";
		if (document.cookie == "rwCheckCookie=testing"){
			rwEnabled = true;
		}
	}
	return rwEnabled;	
}
	
function rwGetCookieLastValue( rwCookieName ) {
	if (typeof rwCookieName=="string" && rwCookieName.length>0){
		var rwString = "; " + rwCookieName + "=";
		var rwCookie = "; " + document.cookie;
		var rwStartPos = rwCookie.lastIndexOf( rwString );
		if (rwStartPos>-1){
			rwStartPos = rwStartPos + rwString.length;
			var rwEndPos = rwCookie.indexOf( ";", rwStartPos );
			rwString = rwCookie.substring( rwStartPos, (rwEndPos<0 ? rwCookie.length : rwEndPos ));
			return unescape(rwString);
		}
	}
	return "";
}

function rwSetCookie(name, value, expires, path, domain, secure) {
		document.cookie = name + "=" + escape (value) +
		((expires) ? "; expires=" + expires : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
}



