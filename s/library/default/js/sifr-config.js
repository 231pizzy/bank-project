/*****************************************************************************
It is adviced to place the sIFR JavaScript calls in this file, keeping it
separate from the `sifr.js` file. That way, you can easily swap the `sifr.js`
file for a new version, while keeping the configuration.
*****************************************************************************/

// Make an object pointing to the location of the Flash movie(s) on your web server.
var interstate = { 
    src: '/library/default/flash/interstate-sifr382.swf'
    ,ratios: [6, 1.04, 7, 0.89, 9, 1.25, 11, 1.09, 12, 1.02, 14, 1.17, 16, 1.07, 17, 1.01, 19, 1.13, 20, 1.09, 22, 1.05, 23, 1.24, 25, 1.21, 27, 1.15, 28, 1.19, 30, 1.18, 32, 1.13, 33, 1.18, 36, 1.15, 37, 1.1, 39, 1.15, 40, 1.13, 42, 1.1, 44, 1.16, 45, 1.12, 46, 1.1, 47, 1.09, 48, 1.15, 50, 1.13, 51, 1.09, 52, 1.08, 53, 1.13, 54, 1.12, 56, 1.1, 57, 1.08, 58, 1.13, 59, 1.12, 60, 1.1, 61, 1.09, 62, 1.08, 63, 1.12, 64, 1.11, 65, 1.09, 67, 1.08, 69, 1.11, 70, 1.09, 72, 1.07, 73, 1.16, 75, 1.14, 76, 1.12, 77, 1.11, 78, 1.15, 79, 1.14, 80, 1.13, 81, 1.11, 82, 1.1, 83, 1.14, 84, 1.13, 85, 1.12, 86, 1.1, 87, 1.09, 88, 1.14, 89, 1.12, 90, 1.11, 91, 1.1, 92, 1.09, 93, 1.13, 94, 1.12, 95, 1.11, 96, 1.09, 97, 1.08, 98, 1.12, 99, 1.11, 101, 1.1, 102, 1.08, 103, 1.12, 104, 1.11, 105, 1.1, 106, 1.08, 107, 1.07, 108, 1.11, 109, 1.1, 110, 1.09, 111, 1.08, 112, 1.07, 113, 1.11, 114, 1.1, 115, 1.09, 116, 1.08, 117, 1.07, 118, 1.14, 120, 1.13, 121, 1.12, 122, 1.11, 123, 1.14, 124, 1.13, 1.12]
};

// BEGIN Whitespace Goldcard Resource
var interstatebold = {
	src: '/library/default/flash/interstatebold.swf'
};
// END Whitespace Goldcard Resource

var typewriter = {
    src: '/library/default/flash/typewriter-sifr382.swf'
    ,ratios: [7, 1.32, 11, 1.31, 19, 1.23, 27, 1.2, 28, 1.18, 29, 1.19, 36, 1.18, 55, 1.17, 56, 1.16, 57, 1.17, 87, 1.16, 91, 1.15, 93, 1.16, 98, 1.15, 99, 1.16, 105, 1.15, 106, 1.16, 1.15]
};

// BEGIN Whitespace Slab Replacement Resources
var sIFR_sainsburysSlab = {
	'src': '/library/default/flash/sainsburys-slab-sifr.swf',
	'ratios': [7,1.32,11,1.31,12,1.24,14,1.27,19,1.23,24,1.22,33,1.2,44,1.19,60,1.18,64,1.17,65,1.18,70,1.17,71,1.18,114,1.17,115,1.16,120,1.17,121,1.16,1.17]
};

var sIFR_sainsburysSlabBold = {
	'src': '/library/default/flash/sainsburys-slab-bold-sifr.swf',
	'ratios': [7,1.32,11,1.31,12,1.24,14,1.27,19,1.23,24,1.22,33,1.2,44,1.19,60,1.18,64,1.17,65,1.18,70,1.17,71,1.18,114,1.17,115,1.16,120,1.17,121,1.16,1.17]
}

var sIFR_sainsburysSlabBlack = {
	'src': '/library/default/flash/sainsburys-slab-black-sifr.swf',
	'ratios': [7,1.32,11,1.31,12,1.24,14,1.27,19,1.23,24,1.22,33,1.2,44,1.19,60,1.18,64,1.17,65,1.18,70,1.17,71,1.18,114,1.17,115,1.16,120,1.17,121,1.16,1.17]
};
// END Whitespace Slab Replacement Resources

// Now you can set some configuration settings.
// See also <https://wiki.novemberborn.net/sifr3/JavaScript+Configuration>.
// One setting you probably want to use is `sIFR.useStyleCheck`. Before you do that,
// read <https://wiki.novemberborn.net/sifr3/DetectingCSSLoad>.

// sIFR.useStyleCheck = true;

//sIFR.activate(interstate, typewriter, sIFR_sainsburysSlab, sIFR_sainsburysSlabBold, sIFR_sainsburysSlabBlack);
if (typeof jQuery_1_4_2 === "undefined" || jQuery_1_4_2.browser.msie) {
	sIFR.activate(interstate, typewriter, sIFR_sainsburysSlab, sIFR_sainsburysSlabBold, sIFR_sainsburysSlabBlack);
} else {
	sIFR.activate(interstate, typewriter);
}


// Now we can do the replacements. You can do as many as you like.
// The first argument you see here is `selector`, which is a normal CSS selector.
// That means you can also do things like '#content h1' or 'h1.title'.
//
// The second argument determines what the Flash text looks like. The main text
// is styled via the `.sIFR-root` class. 
// Read more about styling at <https://wiki.novemberborn.net/sifr3/Styling>.

// Global elements
sIFR.replace(interstate, {
  selector: 'p.moneyQuote span'
  ,css: '.sIFR-root { color: #930031; letter-spacing:-1; }'
  ,wmode: 'transparent'
	,onRelease: function(fi) {
		window.location = $(fi.getAncestor()).getParent().fireEvent('click'); 
	}
});



sIFR.replace(interstate, {
  selector: 'p.moneyQuoteNoLink span'
  ,css: '.sIFR-root { color: #930031; letter-spacing:-1; }'
  ,wmode: 'transparent'
});

// Template 2 - Landing pages
sIFR.replace(interstate, {
  selector: 'div.howCan h3, div.moneyUpdate h3'
  ,css: '.sIFR-root { color: #930031; letter-spacing:-1; }'
  ,wmode: 'transparent'
  ,offsetTop: -4
  ,tuneHeight: -5
});


// Template - Nectar Landing page
sIFR.replace(interstate, {
  selector: 'div.secondaryContent h2'
  ,css: '.sIFR-root { color: #930031; letter-spacing:-1; }'
  ,wmode: 'transparent'
  ,offsetTop: -4
  ,tuneHeight: -5
});

sIFR.replace(interstate, {
  selector: 'div.nectar-banner h3'
  ,css: '.sIFR-root { font-size: 22px; color: #930031; letter-spacing:-1; }'
  ,wmode: 'transparent'
  ,offsetTop: 0
  ,tuneHeight: -5
});


// Template 3 - Travel insurance comparison
sIFR.replace(interstate, {
  selector: 'h2.aboveTable'
  ,css: '.sIFR-root { color: #930031; letter-spacing:-1; }'
  ,wmode: 'transparent'
});

// Template 4 - Information pages
//sIFR.replace(interstate, {
//  selector: 'div.information h1'
//  ,css: '.sIFR-root { color: #c21b35; letter-spacing:-1; }'
//  ,wmode: 'transparent'
//});
sIFR.replace(sIFR_sainsburysSlabBlack, {
	'selector': 'div.information h1',
	'css': [
		'.sIFR-root { leading: -1; letter-spacing: -1; color: #F45815; }'
	],
	'wmode': 'transparent',
	'fitExactly': true,
	'tuneWidth': 1
});

// changed h4 to h3
sIFR.replace(interstate, {
  selector: 'div.information div.left div.gradContent h2, div.information div.right div.gradContent h3'
  ,css: '.sIFR-root { color: #f36533; letter-spacing:-1; }'
  ,wmode: 'transparent'
  ,offsetTop: -2
});

// Template 5 - Product pages and Template 6 - Supporting pages


sIFR.replace(interstate, {
  selector: 'div.right div.gradContent h3'
  ,css: '.sIFR-root { color: #f36533; letter-spacing:-1; }'
  ,wmode: 'transparent'
});

sIFR.replace(interstate, {
  selector: 'div.left ul.tabMenu li.selected a'
  ,css: '.sIFR-root { color: #FFFFFF; text-align:center; cursor:pointer; font-size:13px; }'
  ,wmode: 'transparent' 
  ,selectable: false
  ,onRelease: function(fi) {
        //$(fi.getAncestor()).getParent().fireEvent('click');
        window.location = fi.getAncestor();
  }
  ,offsetLeft: 3
});

sIFR.replace(interstate, {
  selector: 'div.left ul.tabMenu li a'
  ,css: '.sIFR-root { color: #000000; text-align:center; cursor:pointer; font-size:13px; }'
  ,wmode: 'transparent'
  ,selectable: false
  ,onRelease: function(fi) {
        //$(fi.getAncestor()).getParent().fireEvent('click');
        window.location = fi.getAncestor();
    }

  ,offsetLeft: 3
});

// Template 7 - forms
sIFR.replace(interstate, {
  selector: 'div.form h1'
  ,css: '.sIFR-root { color: #c21b35; letter-spacing:-1; }'
  ,wmode: 'transparent'
});

sIFR.replace(interstate, {
  selector: 'div.form div.left div.gradContent h2'
  ,css: '.sIFR-root { color: #f36533; letter-spacing:-1; }'
  ,wmode: 'transparent'
  ,offsetTop: -2
});

// Template 8 - popups
sIFR.replace(interstate, {
  selector: 'div.popup h1'
  ,css: '.sIFR-root { color: #c21b35; letter-spacing:-1; }'
  ,wmode: 'transparent'
});

sIFR.replace(interstate, {
  selector: 'div.leftPopup h2'
  ,css: '.sIFR-root { color: #c21b35; letter-spacing:-1; }'
  ,wmode: 'transparent'
});

sIFR.replace(interstate, {
  selector: 'div.popupMainHeader h2'
  ,css: '.sIFR-root { color: #c21b35; letter-spacing:-1; }'
  ,wmode: 'transparent'
});

sIFR.replace(interstate, {
  selector: 'div.rightPopup h2'
  ,css: '.sIFR-root { color: #c21b35; letter-spacing:-1; }'
  ,wmode: 'transparent'
});

sIFR.replace(interstate, {
  selector: 'div.popup dt'
  ,css: '.sIFR-root { color: #000000; letter-spacing:-1; }'
  ,wmode: 'transparent'
});

// MMS - navigation
sIFR.replace(interstate, {
  selector: 'div.moneyNav ul.moneyTopNav li.on a'
  ,css: '.sIFR-root { color: #FFFFFF; letter-spacing:-1; cursor:pointer; text-align:center; }'
  ,wmode: 'transparent'
  ,selectable: false
  ,onRelease: function(fi) {
	window.location = fi.getAncestor();
	}
  ,offsetLeft: 3
});

sIFR.replace(interstate, {
  selector: 'div.moneyNav ul.moneyTopNav li a'
  ,css: '.sIFR-root { color: #333333; letter-spacing:-1; cursor:pointer; text-align:center; }'
  ,wmode: 'transparent'
  ,selectable: false
  ,onRelease: function(fi) {
	window.location = fi.getAncestor();
	}
  ,offsetLeft: 3
});


// MMS - headings
sIFR.replace(typewriter, {
  selector: 'div.moneyMain div.latestNews h3'
  ,css: '.sIFR-root { color: #3b3832; letter-spacing:0; }'
  ,wmode: 'transparent'
  ,offsetTop: -3
  ,offsetLeft: 1
});

sIFR.replace(typewriter, {
  selector: 'div.moneySecondary div.newsTags h3'
  ,css: '.sIFR-root { color: #606060; letter-spacing:0; text-align:center, font-family: }'
  ,wmode: 'transparent'
  ,offsetTop: -3
});


/* Rewards landing pages */

sIFR.replace(sIFR_sainsburysSlab, {
  selector: '#secondaryContent h2, #ws-nectar h2 span'
  ,css: '.sIFR-root { font-size: 20px; color: #930230;}'
  ,wmode: 'transparent'
  ,offsetTop: -3
});

sIFR.replace(sIFR_sainsburysSlab, {
 selector: 'div#nectarDetails h2'
 ,css: '.sIFR-root { font-size: 20px; color: #930230; }'
 ,wmode: 'transparent'
 ,offsetTop: -3
});

sIFR.replace(interstate, {
  selector: '#h_notwithnectaryet'
  ,css: '.sIFR-root { font-size: 16px; color: #4d131d;}'
  ,wmode: 'transparent'
  ,offsetTop: -3
});


// BEGIN Whitespace Goldcard Resource
/* Gold card ads & landing pages */

sIFR.replace(interstatebold, {
  selector: '#gc-banner-small h2',
  css: '.sIFR-root { font-size: 25px; color: #ffed9d; letter-spacing: -2; font-weight: bold;}',
  wmode: 'transparent',
  offsetTop: -3,
  tuneHeight: -8
});

sIFR.replace(interstatebold, {
  selector: '#gc-banner-large h2',
  css: '.sIFR-root { font-size: 30px; color: #ffed9d; letter-spacing: -2; font-weight: bold;}',
  wmode: 'transparent',
  offsetTop: -3,
  tuneHeight: -8
});
// END Whitespace Goldcard Resource

// BEGIN Whitespace Slab font replacement
sIFR.replace(sIFR_sainsburysSlabBlack, {
	'selector': 'div.home-carousel li.inverted h2',
	'css': [
		'.sIFR-root { leading: -7; letter-spacing: -1; color: #FFFFFF; }', 
		'.sIFR-root a { line-height: 100%; color: #FFFFFF; text-decoration: none; }',
		'.sIFR-root a:hover { color: #FFFFFF; }'
	],
	'wmode': 'transparent',
	'fitExactly': true,
	'forceSingleLine': true,
	'tuneWidth': 1
});

sIFR.replace(sIFR_sainsburysSlabBlack, {
	'selector': 'div.home-carousel li h2',
	'css': [
		'.sIFR-root { leading: -14; letter-spacing: -1; color: #F45815; }',
		'.sIFR-root a { line-height: 90%; color: #F45815; text-decoration: none; }',
		'.sIFR-root a:hover { color: #F45815; }'
	],
	'wmode': 'transparent',
	'fitExactly': true,
	'forceSingleLine': true,
	'tuneWidth': 1
});

sIFR.replace(sIFR_sainsburysSlabBlack, {
	'selector': 'ul.cta-list li.inverted a',
	'css': [
		'.sIFR-root { leading: -3; color: #FFFFFF; }',
		'.sIFR-root a { line-height: 90%; color: #FFFFFF; text-decoration: none; }',
		'.sIFR-root a:hover { color: #FFFFFF; }'
	],
	'wmode': 'transparent',
	'fitExactly': true
});

sIFR.replace(sIFR_sainsburysSlabBlack, {
	'selector': 'ul.cta-list a',
	'css': [
		'.sIFR-root { leading: -3; color: #F45815; }',
		'.sIFR-root a { line-height: 90%; color: #F45815; text-decoration: none; }',
		'.sIFR-root a:hover { color: #F45815; }'
	],
	'wmode': 'transparent',
	'fitExactly': true,
	'tuneWidth': 1
});

sIFR.replace(sIFR_sainsburysSlabBlack, {
	'selector': 'div.offer-content-inverted h1.smaller',
	'css': [
		'.sIFR-root { leading: -7; letter-spacing: -1; color: #FFFFFF; }'
	],
	'wmode': 'transparent',
	'fitExactly': true,
	'tuneWidth': 1
});

sIFR.replace(sIFR_sainsburysSlabBlack, {
	'selector': 'div.offer-content-inverted h1',
	'css': [
		'.sIFR-root { leading: -13; letter-spacing: -1; color: #FFFFFF; }'
	],
	'wmode': 'transparent',
	'fitExactly': true
});

sIFR.replace(sIFR_sainsburysSlabBlack, {
	'selector': 'div.offer-content h1.smaller',
	'css': [
		'.sIFR-root { leading: -7; letter-spacing: -1; color: #F45815; }'
	],
	'wmode': 'transparent',
	'fitExactly': true
});

sIFR.replace(sIFR_sainsburysSlabBlack, {
	'selector': 'div.offer-content h1',
	'css': [
		'.sIFR-root { leading: -13; letter-spacing: -1; color: #F45815; }'
	],
	'wmode': 'transparent',
	'fitExactly': true,
	'tuneWidth': 1
});

sIFR.replace(sIFR_sainsburysSlabBold, {
	'selector': 'div.promo-pod h3',
	'css': [
		'.sIFR-root { leading: -4; color: #930D31; }'
	],
	'wmode': 'transparent',
	'fitExactly': true,
	'tuneHeight': -5,
	'tuneWidth': 1
});
// END Whitespace font replacement