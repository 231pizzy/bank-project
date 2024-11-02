/* ------------------------------------------------------------------
  Filename:        common.js
  Author:          AKQA
  Functions:       setUpButtons, init, onFontResize, applyMenuSizing
  Description:     Basic JavaScript functions
  								 Using mootools.js
  
  Also
  Author:          Accenture, Sebastian Bond
  Functions:       alignMenu, ShowMenu, HideMenu, setupGlobalNav, 
  Description:     Global Nav Tabbing
        	        
  -------------------------------------------------------------------
 */
 
 
	
// this JavaScript will be run when the page has completed loading
window.addEvent('domready', function() {

	// add a class to the global search button so we know JS is enabled and we can display this button
	$$('a.searchButton').each( function(el) { el.addClass('searchButtonLive'); });

	//Show any element with noScriptHide class
	$$('.noScriptHide').each( function(el) { el.removeClass('noScriptHide'); });
	$$('.noScript').each( function(el) { el.setStyle('display', 'none'); } );
	
	setUpButtons();
});

function setUpButtons() {
	// show rounded buttons - hide plain buttons
	$$('.btnPlain').each( function(el) { 
	    el.setStyle('display', 'none');
	    var originalButtonText = el.value;
	    //Check to see if rounded button has already been included
	    if(!el.getNext('div.btnRounded')) {

	        // create styled link button to replace submit button
	        var btnRounded = new Element('div', {'class':'btnAction btnTriggerFormSubmit'});
	        var btnLink = new Element('a', {'href':'#'});
		    btnLink.innerHTML = '<span><span><span><span>' + originalButtonText + '</span></span></span></span>';
		    
		    if(el.getAttribute("submitform") != null)
		    {
                btnLink.addEvent('click', function(e) {
		            el.click();
		        });
		    }
		    else
		    {
		        btnLink.addEvent('click', function(e) {
			        e = new Event(e).stop();
			        //change value of hidden field so redirect knows which dropdown made the request
			        if($('dd_id_selected')) {
			            $('dd_id_selected').value = el.id.charAt(el.id.length -1);
			        } else if ($('ddUrl')) {
			            $('ddUrl').value = el.id.charAt(el.id.length -1);
			        }
			        $(el.getParent('form').id).submit();
		        });
		    }
    		
		    $(btnRounded).inject(el, 'after');
		    $(btnLink).injectInside(btnRounded);
		}
		
	} );


    $$('.btnRounded').each( function(el) { el.setStyle('display', 'block'); } );
	/*$$('.btnTriggerFormSubmit').each( function(el) {
				
		el.getChildren().each( function(e) {
			if(e.nodeName == "A") {
				e.addEvent('click', function(e) {
					e = new Event(e).stop();
					$$('.toolTip').each( function(el) { el.setStyle('display', 'none'); } );
					$(el.getParent().id).submit();
				});
			}
		})	
				
	});*/

}

function init()  {
  //var iBase = TextResizeDetector.addEventListener(onFontResize,null);
  //applyMenuSizing(iBase);
}
function onFontResize(e,args) {
	$$('.mainMenu li').each( function(listEl) {
		if (listEl.hasChild('a.mainItem')) {
			listEl.setStyle('height','auto');
		}
	});
	$$('.mainMenu li a.mainItem').each( function(anchorEl) {
		anchorEl.setStyle('height','auto');
	});
	
	applyMenuSizing(args[0].iSize);
}

function applyMenuSizing(menuFontSize) {
	if (menuFontSize < 15) {
		$$('.mainMenu').removeClass('largeFont');
	} else {
		$$('.mainMenu').addClass('largeFont');
	}
}

//id of element to check for and insert control
//TextResizeDetector.TARGET_ELEMENT_ID = 'mainMenu';
//function to call once TextResizeDetector has init'd
//TextResizeDetector.USER_INIT_FUNC = init;


/* ------------------------------------------------------------------
  Filename:        common.js
  Author:          Accenture, Sebastian Bond
  Functions:       alignMenu, ShowMenu, HideMenu, setupGlobalNav, 
  Description:     Global Nav Tabbing   	        
  -------------------------------------------------------------------
 */

function alignMenu(menuItem) {

    tt = document.getElementById('menu' + menuItem);
    sm = document.getElementById('subMenu' + menuItem);

    if (sm != null) {
        sm.style.display = 'block';
        var subMenuWidth = sm.offsetWidth;
        if ((tt.parentNode.offsetLeft + subMenuWidth) > 1000) {

            sm.style.left = tt.offsetWidth - subMenuWidth + "px";

            if (sm.id == 'subMenu8') {
                sm.style.left = "-394" + "px";
            }


        }
        else {
            sm.style.left = 0 + "px";
        }
    }
}


function ShowMenu(menu) {
    hideSelects();
    HideAllSubMenus();
    alignMenu(menu);

    var thisMenu = document.getElementById("subMenu" + menu);
    if (thisMenu != null) {
            thisMenu.style.display = 'block';
            clearSelects("hide");
    }
}

function HideMenu(menu) {
    showSelects();
    
    var thisMenu = document.getElementById(menu);
    if (thisMenu != null) {
                thisMenu.style.display = 'none';
                clearSelects("show");
    }
}

function HideAllSubMenus()
{
    for(var iLoopA = 0; iLoopA < $$('.mainItem').length; iLoopA++)
    {
        var subMenu = 'subMenu' + iLoopA;
        
        if($chk(subMenu))
        {
            HideMenu(subMenu);
        }
    }
}


window.addEvent('domready', setupGlobalNav);
	
function setupGlobalNav()
{

var myElement = $('menu1').set({
            
    'events': {
        'focus': function(){ HideMenu('subMenu2');clearSelects("hide"); }
    }
});

var myElement = $('tab2').set({
    
    'events': {
        'mouseover': function(){ ShowMenu('2'); },
        'mouseout': function(){ HideMenu('subMenu2'); }
    }
});

var myElement = $('menu2').set({

    'events': {
        'focus': function(){ ShowMenu('2'); HideMenu('subMenu3');clearSelects("hide"); }
    }
});

var myElement = $('tab3').set({

    'events': {
        'mouseover': function(){ ShowMenu('3'); },
        'mouseout': function(){ HideMenu('subMenu3'); }
    }
});

var myElement = $('menu3').set({

    'events': {
        'focus': function(){ ShowMenu('3'); HideMenu('subMenu2'); HideMenu('subMenu4');clearSelects("hide");  }
    }
});

var myElement = $('tab4').set({

    'events': {
        'mouseover': function(){ ShowMenu('4'); },
        'mouseout': function(){ HideMenu('subMenu4'); }
    }
});

var myElement = $('menu4').set({

    'events': {
        'focus': function(){ ShowMenu('4'); HideMenu('subMenu5'); HideMenu('subMenu3'); clearSelects("hide");  }
    }
});


var myElement = $('tab5').set({

    'events': {
        'mouseover': function(){ ShowMenu('5'); },
        'mouseout': function(){ HideMenu('subMenu5'); }
    }
});

var myElement = $('menu5').set({

    'events': {
        'focus': function(){ ShowMenu('5'); HideMenu('subMenu4'); HideMenu('subMenu6'); clearSelects("hide"); }
    }
});

var myElement = $('tab6').set({

    'events': {
        'mouseover': function(){ ShowMenu('6'); },
        'mouseout': function(){ HideMenu('subMenu6'); }
    }
});

var myElement = $('menu6').set({

    'events': {
        'focus': function(){ ShowMenu('6'); HideMenu('subMenu5'); HideMenu('subMenu7'); clearSelects("hide"); }
    }
});

var myElement = $('tab7').set({

    'events': {
        'mouseover': function(){ ShowMenu('7'); },
        'mouseout': function(){ HideMenu('subMenu7'); }
    }
});

var myElement = $('menu7').set({

    'events': {
        'focus': function(){ ShowMenu('7'); HideMenu('subMenu6'); HideMenu('subMenu8'); clearSelects("hide"); }
    }
});

var myElement = $('tab8').set({

    'events': {
        'mouseover': function(){ ShowMenu('8'); },
        'mouseout': function(){ HideMenu('subMenu8'); }
    }
});

var myElement = $('menu8').set({

    'events': {
        'focus': function(){ ShowMenu('8'); HideMenu('subMenu7'); HideMenu('subMenu9'); clearSelects("hide"); }
    }
});

var myElement = $('tab9').set({

    'events': {
        'mouseover': function(){ ShowMenu('9'); },
        'mouseout': function(){ HideMenu('subMenu9'); }
    }
});

var myElement = $('menu9').set({

    'events': {
        'focus': function(){ ShowMenu('9'); HideMenu('subMenu10'); HideMenu('subMenu8'); clearSelects("hide"); }
    }
});


var myElement = $('tab10').set({

    'events': {
        'mouseover': function(){ ShowMenu('10'); },
        'mouseout': function(){ HideMenu('subMenu10'); }
    }
});

var myElement = $('menu10').set({

    'events': {

		'focus': function() { ShowMenu('10'); HideMenu('subMenu11'); HideMenu('subMenu9'); clearSelects("hide"); }
    }
});


var myElement = $('tab11').set({

'events': {
	'mouseover': function() { ShowMenu('11'); },
	'mouseout': function() { HideMenu('subMenu11'); }
}
});

var myElement = $('menu11').set({

'events': {

	'focus': function() { ShowMenu('11'); 
//HideMenu('subMenu12'); 
HideMenu('subMenu10'); clearSelects("hide"); }
}
});

/*
var myElement = $('tab12').set({

	'events': {
		'mouseover': function() { ShowMenu('12'); },
		'mouseout': function() { HideMenu('subMenu12'); }
	}
});

var myElement = $('menu12').set({

	'events': {

		'focus': function() { ShowMenu('12'); HideMenu('subMenu11'); clearSelects("hide"); }
	}
});
*/

/* Hides Tabing when you come to end of the navigation for*/
if ($('content')) {
    var myElement = $('content').getElements('a').set({
        'events': {
            'focus': function(){ HideMenu('subMenu11'); }
        }
    });
} 
else {
	if($('maincontent') != null) {
		var myElement = $('maincontent').getElements('a').set({
			'events': {
				'focus': function(){ HideMenu('subMenu11'); }
			}
		});
	} else if ($('trynationStage') != null) {
	    var myElement = $('trynationStage').getElements('a').set({
			'events': {
				'focus': function(){ HideMenu('subMenu11'); }
			}
		});
	}
}

/* Added to hide tabbing for Active Kids site */
if ($('ctl00_loginNavigation')) {

    var myElement = $('ctl00_loginNavigation').getElements('a').set({

        'events': {
            'focus': function(){ HideMenu('subMenu12s'); }
        }
    });
} 
}



/*if ($('lnkLogin')) {

    var myElement = $('lnkLogin').set({

        'events': {
            'focus': function(){ HideMenu('subMenu10'); }
        }
    });
} 
}*/

/* ---------------------- */
/* This  has been put in place to disable 'selects' after after the main navigation, so that the selects 
   dont appear above the drop down navigation */
  
  function hideSelects()
  {
    if (window.ie6){
        
        var iLoopA = 0;
		$$('select').each(function(obj){
		    if(iLoopA != 0)
			    obj.setStyle('visibility', 'hidden');
			
			iLoopA++;
		});
	}
  }
  
  function showSelects()
  {
    if (window.ie6){
        
        var iLoopA = 0;
		$$('select').each(function(obj){
		    if(iLoopA != 0)
			    obj.setStyle('visibility', 'visible');
			
			iLoopA++;
		});
	}
  }
  
  
function clearSelects(which){

        

	for(a=1;a<document.forms.length;a++){ // a starts from 1 to skip the global search in header
		for(i=0;i<document.forms[a].length;i++){
			if (document.forms[a].elements) {
				var tempobj = document.forms[a].elements[i];
				if (tempobj != null) {
					if(tempobj.type != null) {
						if (tempobj.type.substring(0,6) == "select"){
							if(which == "hide")
								tempobj.style.visibility = "hidden";
							else
								tempobj.style.visibility = "visible"; 
						}
					}
				}
			}
		}
	}
}

ieHover = function() {

	var ieULs = document.getElementById('tab2').getElementsByTagName('div');

	for (j=0; j<ieULs.length; j++) {
		ieULs[j].innerHTML = ('<iframe src="about:blank" scrolling="no" frameborder="0"></iframe>' + ieULs[j].innerHTML);
		var ieMat = ieULs[j].firstChild;
		ieMat.style.width=ieULs[j].offsetWidth+"px";
		ieMat.style.height=ieULs[j].offsetHeight+"px";	
		ieULs[j].style.zIndex="99";
	}
	
	/** IE script to change class on mouseover **/
	/*var ieLIs = document.getElementById('nav').getElementsByTagName('li');
	for (var i=0; i<ieLIs.length; i++) {
		if (ieLIs[i]) {
			ieLIs[i].onmouseover=function() {this.className+=" iehover";};
			ieLIs[i].onmouseout=function() {this.className=this.className.replace(' iehover', '');};
		}
	}*/
};

if (window.attachEvent) {

	//window.attachEvent("onload", ieHover);
}


