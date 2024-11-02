function SendAjaxRequest(p_reqArr, p_reqid, p_resp_handler, p_err_handler, p_warn_handler, p_reset_frame, p_disable_form) {
    var l_str = "";
    for (var l_i = 0; l_i < p_reqArr.length; l_i++) {
        p_reqArr[l_i] = encodeURIComponent(p_reqArr[l_i]);
        l_str = l_str + p_reqArr[l_i].replace("%3D", "=") + "&";
    }
    if (typeof(parent.idsession) == "undefined") {
        l_str = l_str + "fldRequestId=" + p_reqid;
    } else {
        l_str = l_str + "fldRequestId=" + p_reqid + "&";
        l_str = l_str + "fldSessionId=" + encodeURIComponent(parent.idsession);
    }
    var l_req = getXMLHttpRequest();
    var l_url;
    var l_callback_handler = getReadyStateHandler(l_req, updateMsgOnBrowser, (p_resp_handler != null && p_resp_handler != undefined) ? p_resp_handler : null, (p_err_handler != null && p_err_handler != undefined) ? p_err_handler : null, (p_warn_handler != null && p_warn_handler != undefined) ? p_warn_handler : null, (p_reset_frame != null && p_reset_frame != undefined) ? p_reset_frame : true, disableDocument(p_disable_form));
    l_req.onreadystatechange = l_callback_handler;
    l_url = location.href;
    if (l_url.indexOf("#") > 0) {
        l_url = l_url.substring(0, l_url.length - 1);
    }
    l_req.open("POST", l_url, true);
    l_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    l_req.setRequestHeader('Cache-Control', 'no-cache,no-store,max-age=0,must-revalidate');
    l_req.setRequestHeader('Pragma', 'no-cache');
    l_req.setRequestHeader('Expires', '-1');
    l_req.send(l_str);

}

function SendAjaxRequestWithoutDisable(p_reqArr, p_reqid, p_resp_handler, p_err_handler, p_warn_handler, p_reset_frame, p_disable_form) {
    SendAjaxRequest(p_reqArr, p_reqid, p_resp_handler, p_err_handler, p_warn_handler, p_reset_frame, p_disable_form);
}

function updateMsgOnBrowser(p_xml, p_text, p_resp_handler, p_err_handler, p_warn_handler, p_reset_frame, p_disabled_arr, p_req) {
    if (p_req.getResponseHeader("return_code") == "2") {
        $("body").html(p_text);
        return;
    }
    var errors = p_xml.getElementsByTagName("error");
    var warns = p_xml.getElementsByTagName("warning");
    if (errors.length < 1) {
        if (p_resp_handler != null && p_resp_handler != undefined) {
            p_resp_handler(p_xml, p_text, p_req);
        } else {
            if (updateBrowser != undefined || updateBrowser != null) {
                updateBrowser(p_xml, p_text, p_req);
            } else {
                alert("Please specify a response handler function implementation.");
            }
        }
    }
    if (errors.length > 0) {
        if (p_err_handler != null && p_err_handler != undefined) {
            p_err_handler(p_xml, p_text);
        }
    }
    if (warns.length > 0) {
        if (p_warn_handler != null && p_warn_handler != undefined) {
            p_warn_handler(p_xml, p_text);
        }
    }
}

function getXMLHttpRequest() {
    var l_xmlreq = false;
    if (window.XMLHttpRequest) {
        l_xmlreq = new XMLHttpRequest();
    } else {
        if (window.ActiveXObject) {
            try {
                l_xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e1) {
                try {
                    l_xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e2) {
                    alert("Your browser does not support AJAX!");
                }
            }
        }
    }
    return l_xmlreq;
}

function getReadyStateHandler(p_req, p_resp_xml_Handler, p_resp_handler, p_err_handler, p_warn_handler, p_reset_frame, p_disabled_arr) {
    return function() {
        switch (p_req.readyState) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                if (p_req.status == 200) {
                    p_resp_xml_Handler(getXMLDocument(p_req.responseText), p_req.responseText, p_resp_handler, p_err_handler, p_warn_handler, p_reset_frame, p_disabled_arr, p_req);
                } else {}
                break;
            default:
                break;
        }
    };
}

function disableDocument(p_disable_form) {
    if (!p_disable_form) {
        return null;
    }
    var obj = null;
    var tmpObj = null;
    var regObj = null;
    var disableElem = new Array();
    for (l_j = 0; l_j < document.forms.length; l_j++) {
        for (i = 0; i < document.forms[l_j].elements.length; i++) {
            if (document.forms[l_j].elements[i].type == "select-one" || document.forms[l_j].elements[i].type == "button" || document.forms[l_j].elements[i].type == "checkbox") {
                if (!document.forms[l_j].elements[i].disabled) {
                    document.forms[l_j].elements[i].disabled = true;
                    disableElem.push(document.forms[l_j].elements[i]);
                }
            }
        }
    }
    return disableElem;
}

function enableDocument(p_disabled_arr) {
    for (l_j = 0; l_j < p_disabled_arr.length; l_j++) {
        try {
            p_disabled_arr[l_j].disabled = false;
        } catch (e) {}
    }
    p_disabled_arr.length = 0;
    return true;
}

function displayAjaxStatusMessage(p_xml, p_reset_frame) {
    var arrErrorCode = new Array();
    var arrErrorDesc = new Array();
    var arrWarningCode = new Array();
    var arrWarningDesc = new Array();
    var arrInfoCode = new Array();
    var arrInfoDesc = new Array();
    var arrSuccessCode = new Array();
    var arrSuccessDesc = new Array();
    var l_errors = p_xml.getElementsByTagName("error");
    for (var l_i = 0; l_i < l_errors.length; l_i++) {
        for (var l_j = 0; l_j < l_errors[l_i].childNodes.length; l_j++) {
            if (l_errors[l_i].childNodes[l_j].nodeName == "code") {
                if (!isIE()) {
                    arrErrorCode.push(l_errors[l_i].childNodes[l_j].textContent);
                } else {
                    arrErrorCode.push(l_errors[l_i].childNodes[l_j].text);
                }
            }
            if (l_errors[l_i].childNodes[l_j].nodeName == "description") {
                if (!isIE()) {
                    arrErrorDesc.push(l_errors[l_i].childNodes[l_j].textContent);
                } else {
                    arrErrorDesc.push(l_errors[l_i].childNodes[l_j].text);
                }
            }
        }
    }
    var l_warning = p_xml.getElementsByTagName("warning");
    for (var l_i = 0; l_i < l_warning.length; l_i++) {
        for (var l_j = 0; l_j < l_warning[l_i].childNodes.length; l_j++) {
            if (l_warning[l_i].childNodes[l_j].nodeName == "code") {
                if (!isIE()) {
                    arrWarningCode.push(l_warning[l_i].childNodes[l_j].textContent);
                } else {
                    arrWarningCode.push(l_warning[l_i].childNodes[l_j].text);
                }
            }
            if (l_warning[l_i].childNodes[l_j].nodeName == "description") {
                if (!isIE()) {
                    arrWarningDesc.push(l_warning[l_i].childNodes[l_j].textContent);
                } else {
                    arrWarningDesc.push(l_warning[l_i].childNodes[l_j].text);
                }
            }
        }
    }
    var l_resultmsgs = p_xml.getElementsByTagName("resultmsg");
    for (var l_i = 0; l_i < l_resultmsgs.length; l_i++) {
        for (var l_j = 0; l_j < l_resultmsgs[l_i].childNodes.length; l_j++) {
            if (l_resultmsgs[l_i].childNodes[l_j].nodeName == "code") {
                if (!isIE()) {
                    arrSuccessCode.push(l_resultmsgs[l_i].childNodes[l_j].textContent);
                } else {
                    arrSuccessCode.push(l_resultmsgs[l_i].childNodes[l_j].text);
                }
            }
            if (l_resultmsgs[l_i].childNodes[l_j].nodeName == "description") {
                if (!isIE()) {
                    arrSuccessDesc.push(l_resultmsgs[l_i].childNodes[l_j].textContent);
                } else {
                    arrSuccessDesc.push(l_resultmsgs[l_i].childNodes[l_j].text);
                }
            }
        }
    }
    var l_totalcnt = eval(arrErrorDesc.length + arrWarningDesc.length + arrInfoDesc.length + arrSuccessDesc.length);
    if (l_totalcnt > 0) {} else {
        if (p_reset_frame) {}
    }
}

function displayAjaxWarnMessage(p_errors, p_warns) {}

function getXMLDocument(p_text) {
    var xmlDoc = null;
    try {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(p_text);
    } catch (e) {
        try {
            var parser = new DOMParser();
            xmlDoc = parser.parseFromString(p_text, "text/xml");
        } catch (e) {}
    }
    return xmlDoc;
}

function isIE() {
    if (navigator.appName == "Microsoft Internet Explorer") {
        return true;
    } else {
        return false;
    }
}

function SendAjaxRequestLogin(p_reqArr, p_reqid, p_resp_handler, p_err_handler, p_warn_handler, p_reset_frame, p_disable_form) {
    var l_str = "";
    for (var l_i = 0; l_i < p_reqArr.length; l_i++) {
        p_reqArr[l_i] = encodeURIComponent(p_reqArr[l_i]);
        l_str = l_str + p_reqArr[l_i].replace("%3D", "=") + "&";
    }
    if (typeof(parent.idsession) == "undefined") {
        l_str = l_str + "fldRequestId=" + p_reqid;
    } else {
        l_str = l_str + "fldRequestId=" + p_reqid + "&";
        l_str = l_str + "fldSessionId=" + encodeURIComponent(parent.idsession);
    }
    var l_req = getXMLHttpRequest();
    var l_url;
    var l_callback_handler = getReadyStateHandler(l_req, updateMsgOnBrowser, (p_resp_handler != null && p_resp_handler != undefined) ? p_resp_handler : null, (p_err_handler != null && p_err_handler != undefined) ? p_err_handler : null, (p_warn_handler != null && p_warn_handler != undefined) ? p_warn_handler : null, (p_reset_frame != null && p_reset_frame != undefined) ? p_reset_frame : true, disableDocument(p_disable_form));
    l_req.onreadystatechange = l_callback_handler;
    l_url = location.href;
    if (l_url.indexOf("#") > 0) {
        l_url = l_url.substring(0, l_url.length - 1);
    }
                l_url= l_url.substring(0,l_url.lastIndexOf( "/" )+1)+"internet";
    l_req.open("POST", l_url, false);
    l_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	 l_req.setRequestHeader('Cache-Control', 'no-cache,no-store,max-age=0,must-revalidate');
    l_req.setRequestHeader('Pragma', 'no-cache');
    l_req.setRequestHeader('Expires', '-1');
    l_req.send(l_str);
}