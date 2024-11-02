/* ------------------------------------------------------------------
    Filename:        common.js
    Author:          AKQA
    Description:     Global JavaScript functions using mootools.js
  -------------------------------------------------------------------
 */

// runs when the page has completed loading
window.addEvent('domready', function() {
	if ($chk($('accordion'))) {
	    sf.setupAccordion();
	}
	
	if (typeof DD_belatedPNG !== "undefined") {
		DD_belatedPNG.fix("div.offer-content div.actions a.cta, div.home-carousel a.carousel-nav, div.home-carousel ul.pagination li a");
	}

	// Show any element with noScriptHide class
	$$('.noScriptHide').removeClass('noScriptHide');
	$$('.noScript').setStyle('display', 'none');
	
	// id of element to check for and insert control
//    TextResizeDetector.TARGET_ELEMENT_ID = 'mainMenu';
//    // function to call once TextResizeDetector has init'd
//    TextResizeDetector.USER_INIT_FUNC = sf.initTextResize;
    
	sf.positionGlobalSubMenus(); // set the global nav sub menus to position correctly
	sf.setUpButtons(); // show rounded form buttons and hide default plain ones
	sf.toggleDefaultFieldValues(); // toggles any default text values for text inputs
	
});

window.addEvent('load', function() {

    setTimeout(function() { // Needed to prevent a sporadic JS error in IE6
        if ($chk($('accordion'))) {
            //open an accordion tab. open tab indicated by named anchor. if there isn't a named anchor open the first tab
            //done in load event because some browsers don't scroll to the correct place if in domready

            var anchorTag = sf.getQueryString("#");

            if ($chk(anchorTag)) {
                var open = anchorTag;
            }
            else {
                var open = 'a0';
            }

            var section = $(open);
            var header = section.getElement('div.panelHeader');
            var content = section.getElement('div.panelContent');

            var newSlider = eval('slider' + open);

            //if there's an anchor tag then scroll to it then open it
            if ($chk(anchorTag)) {
                var scroll = new Fx.Scroll(window);
                var scrollTarget = $(open).getPosition();

                //done in this order because some browsers don't scroll to the correct place
                //newSlider.slideIn().chain(function() {
                //	scroll.scrollTo(window.x, scrollTarget.y)
                //});
                // Set the current scroll location to the hash value

                // Show anchor tag item expanded by default
                newSlider.show();
                window.location.hash = open;

                // Scroll to top of open accordion (webkit browsers aren't positioning correctly).
                scroll.scrollTo(window.x, scrollTarget.y);
            }
            //if there isn't an anchor tag don't scroll, just open the default tab
            else {
                newSlider.show();
                //newSlider.slideIn();
            }

            sf.currentAccordionTab = open;
            header.addClass('panelHeaderActive');
            content.addClass('panelContentActive');
        }
    }, 100);

});


// common namespace for site's Finance global functions
var sf = {
    setUpButtons: function() {
	    $$('.btnPlain').setStyle('display', 'none');
	    $$('.btnPlainCancel').setStyle('display', 'none');
        $$('.btnCancel').setStyle('display', 'block');
	    $$('.btnTriggerFormSubmit').each( function(el) {
		    el.setStyle('display', 'block');		
		    el.addEvent('click', function(e) {
			    e = new Event(e).stop();
			    //commented below to enable google search to function
			    //$$('.mainContent').getElement('form')[0].submit();
		    });
	    });
    },
    initTextResize: function() {
      var iBase = TextResizeDetector.addEventListener(sf.onFontResize,null);
      //sf.applyMenuSizing(iBase);
    },
    firstLoaded: false
}

sf.clickAccordion = function(){
    $$('.mainContent').getElement('form')[0].submit();
}

sf.setupAccordion = function(){

    $$('div.panelHeader').each( function(el) {
    
        var section = el.getParent('div.panel');
        var header = section.getElement('div.panelHeader');
        var content = section.getElement('div.panelContent');
        
        $(el).addEvent('click', sf.animateAccordionTabs.bind(this, section));
        eval('slider' + section.id + ' = new Fx.Slide($(content))');
        
        if(section.id != open){
            eval('slider' + section.id + '.hide()');
        }
    });

}

sf.currentAccordionTab = '';

sf.animateAccordionTabs = function(section) {

    var newSection = section;
    var newSectionheader = newSection.getElement('div.panelHeader');
    var newSectioncontent = newSection.getElement('div.panelContent');

    var newSlider = eval('slider' + section.id);

    if (sf.currentAccordionTab != '' && section.id != sf.currentAccordionTab) {

        var oldSection = $(sf.currentAccordionTab);
        var oldSectionheader = oldSection.getElement('div.panelHeader');
        var oldSectioncontent = oldSection.getElement('div.panelContent');

        var oldSlider = eval('slider' + sf.currentAccordionTab);

        sf.currentAccordionTab = '';

        var scroll = new Fx.Scroll(window, { duration: 200 });

        oldSectionheader.removeClass('panelHeaderActive');
        oldSectioncontent.removeClass('panelContentActive');
        newSectionheader.addClass('panelHeaderActive');
        newSectioncontent.addClass('panelContentActive');

        var scrollTarget = $('a0').getPosition();
        scroll.scrollTo(window.x, scrollTarget.y).chain(function() {
            oldSlider.slideOut().chain(function() {
                newSlider.slideIn().chain(function() {
                    sf.currentAccordionTab = section.id;
                });
            });
        });
    }

}
	
// functions used by the TextResizeDetector
sf.onFontResize = function(e,args) {
	$$('.mainMenu li').each( function(listEl) {
		if (listEl.hasChild('a.mainItem')) {
			listEl.setStyle('height','auto');
		}
	});
	$$('.mainMenu li a.mainItem').each( function(anchorEl) {
		anchorEl.setStyle('height','auto');
	});
	
	sf.applyMenuSizing(args[0].iSize);
	
    if(args[0].iSize >= 15) { // override fixed height of active accordion
        $$('.panelContentActive').setStyle('height','auto');
    }
}

sf.applyMenuSizing = function(menuFontSize) {
	if (menuFontSize < 15) {
		$$('.mainMenu').removeClass('largeFont');
	} else {
		$$('.mainMenu').addClass('largeFont');
	}
}

sf.positionGlobalSubMenus = function() {
    $$('.mainMenu li a.mainItem').each( function(el) {
		el.addEvent('mouseover', function(e) {
			$$('.subMenu').each( function(subEl) {
				//subEl.setStyle('top',($('mainMenu').getCoordinates().height-5));
			});
		});
	});
}

sf.toggleDefaultFieldValues = function() {
    // Manipulate text inside inputs
	$$('.default').each( function(el) {
		var sOriginalValue = '';
		// if this is the original value, then save the text
		if(sOriginalValue.length == 0)	sOriginalValue = el.value;
			
		//Clear default value of search box on focus
		el.addEvent('focus', function(e) {
			e = new Event(e).stop();
			
			if(!el.hasClass('notOriginalValue')) {
				el.value = "";
				el.removeClass('default');
			}
		});
		
		//Place default text back in search box if left empty
		el.addEvent('blur', function(e) {
			e = new Event(e).stop();
			if((el.value == '') || (el.value == sOriginalValue)) {
				el.value = sOriginalValue; 
				el.removeClass('notOriginalValue');
				el.addClass('default');
			} else {
				el.addClass('notOriginalValue');
			}
		});
		
		//switch class to highlight active input field
		el.addEvent('keyup', function(e) {
			e = new Event(e).stop();
			el.removeClass('default');
		});
	});
}

/*
This function provides access to the "get" variable scope + the element anchor
Arguments:
    key - string; optional; the parameter key or "#" element anchor to search for in the url.
    url - url; optional; the url to check for "key" in, location.href is default
Returns:
    Returns the value of the variable form the provided key, or an object with the current GET variables plus the element anchor (if any)
    Returns "" if the variable is not present in the given query string
Documentation:
    https://webfreak.no/wp/2007/09/05/get-for-mootools-a-way-to-read-get-variables-with-javascript-in-mootools/
*/
sf.getQueryString = function(key,url) {
	if(arguments.length < 2) url =location.href;
	if(arguments.length > 0 && key != ""){
		if(key == "#"){
			var regex = new RegExp("[#]([^$]*)");
		} else if(key == "?"){
			var regex = new RegExp("[?]([^#$]*)");
		} else {
			var regex = new RegExp("[?&]"+key+"=([^&#]*)");
		}
		var results = regex.exec(url);
		return (results == null )? "" : results[1];
	} else {
		url = url.split("?");
		var results = {};
			if(url.length > 1){
				url = url[1].split("#");
				if(url.length > 1) results["hash"] = url[1];
				url[0].split("&").each(function(item,index){
					item = item.split("=");
					results[item[0]] = item[1];
				});
			}
		return results;
	}
}
//var lastOpen = 0;
//sf.disableCursor = function(id) {

// not sure what purpose this had, but throws errors in Firefox.
// disabling seems to make no disernable change
/*
	var replacements = sIFR.replacements["div.left div.gradContent div.panelHeader h2, div.left div.gradContent div.panelHeader h4"];
	if (replacements != undefined) {
	    //alert(replacements[lastOpen])
		$$(replacements[lastOpen].getAncestor()).getParent().getElement('.disable').setStyle('display', 'none');
		$$(replacements[id].getAncestor()).getParent().getElement('.disable').setStyle('display', 'block');		
	}
	lastOpen = id;
*/
//}


// create a div in each accordion header panel to float over the sIFR flash element in order to disable the hand cursor. Must be removed and recreated each time due to IE bug
function addSIFROverlays() {
    $$('.panelHeader').each(function(el) {
        var newDiv = new Element('div', { 'class': 'sifrOverlay' });
        newDiv.inject(el, 'top');
    });
	
	// fix the position of the overlay elements
	$$('.sifrOverlay').each(function(el) {
		el.setStyle('left', 10);
	});
}

// remove all overlay elements (to fix cursor when hovering over sIFR elements)
function removeSIFROverlays() {
    $$('.sifrOverlay').each(function(el) {
        var removedElement = el.remove();
    })
}

// Yard MM Editorial pods
	var $j = jQuery;
		$j(document).ready(function(){
		$j(".linklist1").click(function(){
			$j(".hiddenlinklist1").slideToggle("slow");
		  });
		$j(".linklist2").click(function(){
			$j(".hiddenlinklist2").slideToggle("slow");
		  });
		$j(".linklist3").click(function(){
			$j(".hiddenlinklist3").slideToggle("slow");
		  });
		$j(".linklist4").click(function(){
			$j(".hiddenlinklist4").slideToggle("slow");
		  });
		$j(".linklist5").click(function(){
			$j(".hiddenlinklist5").slideToggle("slow");
		  });
		$j(".linklist6").click(function(){
			$j(".hiddenlinklist6").slideToggle("slow");
		  });
		$j(".linklist7").click(function(){
			$j(".hiddenlinklist7").slideToggle("slow");
		  });
		$j(".linklist8").click(function(){
			$j(".hiddenlinklist8").slideToggle("slow");
		  });
		$j(".linklist9").click(function(){
			$j(".hiddenlinklist9").slideToggle("slow");
		  });
		$j(".linklist10").click(function(){
			$j(".hiddenlinklist10").slideToggle("slow");
		  });
		});
