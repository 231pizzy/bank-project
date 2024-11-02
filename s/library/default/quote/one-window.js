// Set the window id for one window restriction
if ( getCookie("windowid") ) {
	var newWindowId = parseInt(getCookie("windowid")) + 1;
} else {
	var newWindowId = 1;
}
setCookie("windowid", newWindowId);

// Now check we are using the current window
var tmrOneWindow = setInterval ( function() {
	if ( parseInt(getCookie("windowid")) != newWindowId ) {
		window.location = "Multiple-Windows.php";
		clearInterval(tmrOneWindow);
	}
}, 500);

function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}
function getCookie(c_name) {
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name) {
			return unescape(y);
		}
	}
}