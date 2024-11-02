window.addEvent('domready', function() {
	
	// Anpassung IE6
	if(window.ie6) { 
	var heightValue='100%';
	}
	else 
	{
	var heightValue='auto';	
	}
	
	
	// Selektoren der Container für Schalter und Inhalt
	var togglerName='dt.accordion_toggler_';
	var contentName='dd.accordion_content_';
	
	
	// Selektoren setzen
	var counter=1;	
	var toggler=$$(togglerName+counter);
	var content=$$(contentName+counter);
	var myAccordion = new Array();
	
	
	while(toggler.length>0)
	{
		 	


		// Accordion anwenden
		myAccordion[counter] = new Accordion(toggler, content, {
			opacity: false,
			display: -1,
			alwaysHide: true,
			onComplete: function() { 
				var element=$(this.elements[this.previous]);
				if(element && element.offsetHeight>0){
					 element.setStyle('height', heightValue);	
				}
			},
			onActive: function(toggler, content) {
				
				toggler.addClass('open');
			},
			onBackground: function(toggler, content) {
				toggler.removeClass('open');
			}
		});
		
		// Selektoren für nächstes Level setzen
		counter++;
		toggler=$$(togglerName+counter);
		content=$$(contentName+counter);
	}
	

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

	
	
$('bedroom').addEvent('click', function(){
	var elm = document.getElementById('bedroom-toggler');
	if(!hasClass(elm, 'open')) {
		myAccordion[1].display(0);
	} else {
		myAccordion[1].show(0);
	}
    	
});

$('bathroom').addEvent('click', function(){
    var elm = document.getElementById('bathroom-toggler');
	if(!hasClass(elm, 'open')) {
		myAccordion[1].display(1);
	} else {
		myAccordion[1].show(1);
	}
});
$('loft').addEvent('click', function(){
    var elm = document.getElementById('loft-toggler');
	if(!hasClass(elm, 'open')) {
		myAccordion[1].display(2);
	} else {
		myAccordion[1].show(2);
	}
});
$('living').addEvent('click', function(){
    var elm = document.getElementById('living-toggler');
	if(!hasClass(elm, 'open')) {
		myAccordion[1].display(3);
	} else {
		myAccordion[1].show(3);
	}
});
$('kitchen').addEvent('click', function(){
    var elm = document.getElementById('kitchen-toggler');
	if(!hasClass(elm, 'open')) {
		myAccordion[1].display(4);
	} else {
		myAccordion[1].show(4);
	}
});
$('driveway').addEvent('click', function(){
    var elm = document.getElementById('driveway-toggler');
	if(!hasClass(elm, 'open')) {
		myAccordion[1].display(5);
	} else {
		myAccordion[1].show(5);
	}
});
$('garden').addEvent('click', function(){	
    var elm = document.getElementById('garden-toggler');
	if(!hasClass(elm, 'open')) {
		myAccordion[1].display(6);
	} else {
		myAccordion[1].show(6);
	}
});

	
	
});