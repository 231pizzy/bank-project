/* JQUERY IS NOT ALLOWED, USE MOOTOOLS 1.4.5 FOR COMPATABILITY */
window.addEvent('domready', function() {
	
    $('dropdownmenu').addEvent('change', function() {
        var targ = $(this.get('value'));
        $$('.decateholder').setStyle('display', 'none');
        targ.setStyle('display', 'block');
        targ.addEvent('change', function(evt) {
            var targID1 = $(evt.target).get('value');
			new Fx.Reveal($('decateholder'), {duration: 500, mode: 'horizontal'});
            $(targID1).setStyle('display', 'block');
          });

    });
});