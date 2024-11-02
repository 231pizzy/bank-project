var errorNoShow = 0;


/*$(document).ready(function(){
	$('.assumptions_confirm, .next_agg_step').addClass('disabled');
});	*/



function AutoLoad2()	
	{
$(function(){

	$('select, input[type="radio"], input[type="checkbox"]').not(".skip_these").uniform();

	$('.assumptions_confirm, .next_agg_step').addClass('disabled');

	 	// Listen to the radio button on each popup
	$("#read_and_agree_dog_assumptions").change(function(event){
		checkPetSelection($(this), $('.assumptions_confirm'));
	});

	$("#read_and_agree_cat_assumptions").change(function(event){
		checkPetSelection($(this), $('.assumptions_confirm'));
	});

	$("#read_and_agree_assumptions").change(function(event){
		checkPetSelection($(this), $('.next_agg_step'));
	});

	$('.assumptions_confirm, .next_agg_step').on('click', function(e){
		e.preventDefault();

		if($(this).hasClass('disabled')){
			$('.agreecheck').addClass('fielderror');
		} else {
			$('.agreecheck').removeClass('fielderror');
			$.modal.close();
		}
	});

	/*$('.retrieve_quote').on('click', function(event){
		event.preventDefault();
		if($('#quote_reference').val() == ""){
			$('#notrecognised').fadeIn();
		} else {
			$('#notrecognised').fadeOut();
		}
	});	 */

	

	
	$('.displaynext input[type="radio"]').change(function(event){
		if($(this).val() == 'Yes'){
			$(this).parents('ul').find('.showfromprevious').stop(true,true).fadeIn();
		} else {
			$(this).parents('ul').find('.showfromprevious').stop(true,true).fadeOut();
		}
	});

	/*$('.errortestbutton').on('click', function(e){

		errorNoShow = 0;

		if(!$(this).hasClass('active')){
			$('input[type="text"], .selector, textarea').addClass('fielderror');
			
			if($('#uniform-address').is(':visible')){

				$('.radio_options, .selector').qtip({
					content: { 
						text: function(api) {
							// Retrieve content from custom attribute of the $('.selector') elements.
							var element = $(this).next('.errormsg');
							return element.html();
						}
					},
					show : {
						event: false,
						ready : true, // show when created on orderError call
						when : false // never show unless explicitly called
					},
					hide: function(event, api) {
						event.preventDefault(); // Stop it!
					},
					position: {
						viewport: $(window),
						my: 'left middle',
						at: 'right middle'
					},
					style: {
						classes: 'qtip-orange qtip-shadow'
					}
				});
			} else {
				var selector = $('.radio_options').find('#uniform-only_person_to_authorise1');
				if(!selector.is(':visible') && selector.length > 0){
					errorNoShow = 1;
				} else {
					errorNoShow = 0;
				}

				if(errorNoShow == 0){
					$('.radio_options, .selector').not('#uniform-address').qtip({
						content: { 
							text: function(api) {
								// Retrieve content from custom attribute of the $('.selector') elements.
								var element = $(this).next('.errormsg');
								return element.html();
							}
						},
						show : {
							event: false,
							ready : true, // show when created on orderError call
							when : false // never show unless explicitly called
						},
						hide: function(event, api) {
							event.preventDefault(); // Stop it!
						},
						position: {
							viewport: $(window),
							my: 'left middle',
							at: 'right middle'
						},
						style: {
							classes: 'qtip-orange qtip-shadow'
						}
					});
				}
			}
			

			$(this).addClass('active');
		} else {
			$('input[type="text"], .selector, textarea').removeClass('fielderror');

			$('.radio_options, .selector').qtip('hide');

			$(this).removeClass('active');
		}
	});*/

	// Setup the tooltips
	$('.tooltip').qtip({
		content: { 
			text: function(api) {
				// Retrieve content from custom attribute of the $('.selector') elements.
				var element = $(this).parents('li,th').find('.tooltipcontent');

				return element.html();
			}
		},
		show: {
			event: 'mouseenter'
		},
		position: {
			viewport: $(window),
			my: 'bottom middle',
			at: 'top middle'
		},
		style: {
			classes: 'qtip-red qtip-shadow'
		}
	});

	$('.itooltip').qtip({
		show: {
			event: 'mouseenter'
		},
		position: {
			viewport: $(window),
			my: 'bottom middle',
			at: 'top middle'
		},
		style: {
			classes: 'qtip-red qtip-shadow'
		}
	});


	$('.address_lookup').on('click', function(event){
		event.preventDefault();
		/*$('.address_toggle').slideDown();
		$.uniform.update('#address');  */
	});

	// If they have a policy switch the panel on for the discount.
	$("input[name='strIsEx_customer']").change(function(event){
		radioValueChanged($(this), '.multiple_policy_discount');
	});

	var input = document.createElement("input");
    if(('placeholder' in input)==false) { 
		$('[placeholder]').focus(function() {
			var i = $(this);
			
			if(i.val() == i.attr('placeholder')) {
				i.val('').removeClass('placeholder');
				if(i.hasClass('password')) {
					i.removeClass('password');
					this.type='password';
				}			
			}
		}).blur(function() {
			
			var i = $(this);
			
			if(i.val() == '' || i.val() == i.attr('placeholder')) {
              
				if(this.type=='password') {
					i.addClass('password');
					this.type='text';
				}
				i.addClass('placeholder').val(i.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			
			$(this).find('[placeholder]').each(function() {
				var i = $(this);
				if(i.val() == i.attr('placeholder'))
					i.val('');
			})
		});
	}

//	// Cover selection
//	$('.select_cover').on('click', function(event){
//		event.preventDefault();
//
//		$(this).toggleClass('selected');
//		if($(this).hasClass('selected')){
//			$(this).next('input[type="hidden"]').val('yes');
//			$(this).parents('.box').addClass('activepanel');
//		} else {
//			$(this).next('input[type="hidden"]').val('');
//			$(this).parents('.box').removeClass('activepanel');
//		}
//	});


// Cover selection
	$('.select_cover').on('click', function(event){
		event.preventDefault();

		$(this).toggleClass('selected');
		if($(this).hasClass('selected')){
			$(this).next('input[type="hidden"]').val('true');
			$(this).parents('.box').addClass('activepanel');
			//console.log($(this).text().search('Select cover'));
			if($(this).text().search('Select cover') == -1){
				//$(this).html('<span class="uniform radio"><!----><\/span>Remove cover');
			}
			$(this).parents('.box').find('table').removeClass('additional_cover');
			
		} else {
			$(this).next('input[type="hidden"]').val('false');
			$(this).parents('.box').removeClass('activepanel');
			if($(this).text().search('Select cover') == -1){
				//$(this).html('<span class="uniform radio"><!----><\/span>Add cover');
			}
			$(this).parents('.box').find('table').addClass('additional_cover');
		}
		 UpdateSelectedTrPlan();
	});




	$('.showhide').on('click', function(event){
		event.preventDefault();
		var elementToFade = $(this).parents('.box').find('table'); // Select the correct table based on the parent.
		elementToFade.stop(true,true).fadeToggle(); // Fade in / out the table.
		elementToFade.toggleClass('active'); // Apply an active state for the hide / show text.

		$(this).toggleClass('active'); // add an active class to the anchor for the open state

		var replaceText = elementToFade.hasClass('active') ? 'Hide details' : 'Show details'; // Switch the text 
		$(this).text(replaceText);
		try{
		setCookies($(this).attr('id'));
		}catch(exception){}
	});

	$('.comparison_table .select_cover').on('click',function(e){
		e.preventDefault();

		$('.comparison_table .select_cover').removeClass('selected'); // Remove selected state from other elements
		$(this).addClass('selected'); // Add selected state to currently clicked

		$('#cover_selection').val($(this).attr('href')); // Set hidden element with the currently clicked element href

	});

	var rows = $('table').not('.quote_pop').not('.trackclaim_results').find('tr'); 
	rows.children().click(function() {
		if($(this).html() != "" && $(this).html() != "&nbsp;"){
			rows.children().removeClass('highlight');  
			var index = $(this).prevAll().length;  
			var clicked = index - 1;
			var selected = $('#cover_selection').val();
			rows.find(':nth-child(' + (index + 1) + ')').addClass('highlight');
			rows.find('a.select_cover').removeClass('selected');			
			var findButton = rows.find(':nth-child(' + (index + 1) + ') a.select_cover');
			findButton.addClass('selected');			
			if(clicked!=selected)
			{
			$('#cover_selection').val(findButton.attr('href'));
			
			try
			{
			UpdateSelectedTrPlan() // function avail in Quote_js/Quote.js 25-Jun-2013  , Tuesday  / Alexander.R  	
			}
			catch (err)
			{
			}

			}
		}
	});

	// Date picker
	$('.datepicker').on('click', function(){
		$("#DateError").qtip('destroy');
		$('.datepicker_field').datepicker('show');
	});

	var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    currentDate = curr_date + '/' + curr_month + '/' + curr_year;

    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // ' 11-Jul-2013  , Thursday  / Alexander.R  / T06393 ex   28 ins of 30
    var newDate = endDate.getDate();
    var newMonth = endDate.getMonth() + 1; //Months are zero based
    var newYear = endDate.getFullYear();

    newMonth = (newMonth.length > 1) ? newMonth : '0' + newMonth;
    finalEndDate = newDate + '/' + newMonth + '/' + newYear;

    var compareEndDate = newMonth + '/' + newDate + '/' + newYear;
    var compareStartDate = curr_month + '/' + curr_date + '/' + curr_year;

    //stop jquery breaking - check datepicker_field exists
    if($('.datepicker_field').length>0) {
	    $('.datepicker_field').datepicker({
		    inline: true,
		    altField : '#datepicker_field',
		    dateFormat: 'dd/mm/yy',
		    minDate: currentDate,
		    maxDate: finalEndDate
		});
	}

	$(".datepicker_field").change(function(event) {
		var thisVal = $(this).val();
		thisVal = thisVal.split("/");
		$("#startdate_day option").attr('selected', false);
		$("#startdate_month option").attr('selected', false);
		$("#startdate_year option").attr('selected', false);

		// 20-Jun-2013  , Thursday  / Alexander.R  ( T06393 ) Add parseFloat Conditions
		$("#startdate_day option").each(function(){
			if(parseFloat($(this).val()) == parseFloat(thisVal[0])){
				if(!$(this).is(':selected')){
					$(this).prop('selected', true);
				}
			}
		});
		$("#startdate_month option").each(function(){
			if(parseFloat($(this).val()) == parseFloat(thisVal[1])){
				if(!$(this).is(':selected')){
					$(this).prop('selected', true);
				}
			}
		});
		$("#startdate_year option").each(function(){
			if(parseFloat($(this).val()) == parseFloat(thisVal[2])){
				if(!$(this).is(':selected')){
					$(this).prop('selected', true);
				}
			}
		});
		$.uniform.update('#startdate_day');
		$.uniform.update('#startdate_month');
		$.uniform.update('#startdate_year');
		//' 2-Jul-2013  , Tuesday  / Alexander.R  / T06393
		//--------------------------------------
		selectedDate = $('#startdate_month').val() + '/' + $('#startdate_day').val() + '/' + $('#startdate_year').val();
			//alert(compareStartDate)
			//alert(selectedDate)
			if(compareDates(compareEndDate, selectedDate, 'lessthan') || compareDates(compareStartDate, selectedDate, 'greater')) {
/*				$('#date_range_error').modal({
					minWidth: 600,
					minHeight: 290,
					autoResize: true,
					onOpen: function (dialog) {
						dialog.overlay.fadeIn('fast', function () {
							dialog.container.fadeIn('fast', function () {
								dialog.data.fadeIn('fast');
							});
						});
					},
					closeHTML: ''
				});				*/
				ShowPlans();
				}

		//--------------------------------------
	});
	

	$('#startdate').text(currentDate);
	$('#enddate').text(finalEndDate);

	$('#startdate_day, #startdate_month, #startdate_year').change(function(){
		ShowPlans();//UpdateSelectedTrPlan();
		//finalEndDate
		//newDate
		//newMonth
		//newYear
//		if($('#startdate_day').val() != 0 && $('#startdate_month').val() != 0 && $('#startdate_year').val() != 0){
//
//			var isdate = new Date($('#startdate_year').val(),parseFloat($('#startdate_month').val())-1,$('#startdate_day').val()) // yyyy mm dd 
//			// Since Javascript Months Start From 0, We need to do -1 
//			//alert(isdate.getDate())			
//			if(parseFloat(isdate.getDate())!=parseFloat($('#startdate_day').val()))
//			{
//				$('#startdate_day').val('')
//			$('#invalid_date').modal({
//					minWidth: 150,
//					minHeight: 200,
//					autoResize: true,
//					onOpen: function (dialog) {
//						dialog.overlay.fadeIn('fast', function () {
//							dialog.container.fadeIn('fast', function () {
//								dialog.data.fadeIn('fast');
//							});
//						});
//					},
//					closeHTML: ''
//				});
//			}
//			selectedDate = $('#startdate_month').val() + '/' + $('#startdate_day').val() + '/' + $('#startdate_year').val();
//			//alert(compareStartDate)
//			//alert(selectedDate)
//			if(compareDates(compareEndDate, selectedDate, 'lessthan') || compareDates(compareStartDate, selectedDate, 'greater')) {
//				$('#date_range_error').modal({
//					minWidth: 600,
//					minHeight: 290,
//					autoResize: true,
//					onOpen: function (dialog) {
//						dialog.overlay.fadeIn('fast', function () {
//							dialog.container.fadeIn('fast', function () {
//								dialog.data.fadeIn('fast');
//							});
//						});
//					},
//					closeHTML: ''
//				});				
//				}				
//			}

	});

	$('.payment_selection input[type="radio"]').change(function(event){
		//console.log($(this).val());
		var thisVal = $(this).val();
		ResetForm();
		//SetPaymentDropDown(thisVal)	;
		//if(!$('.' + thisVal).is(':visible')){
			$('.payment_option').hide();
			$('.' + thisVal).fadeIn();
		//} //
	});		
	
	
	$('#dc_card_type').change(function(event){
		if($('input:radio[name=payment_selection]:checked').val()=="annualdc"){
			if($(this).val() == "Maestro"){
				$('.startissue').fadeIn('fast');
			} else {
				$('.startissue').fadeOut('fast');
			}
		}
	});

});

	}
	AutoLoad2()
function compareDates(date1, date2, op){
	//console.log(date1); Maximum allowed date
	//console.log(date2); selected Date 

	var date1 = new Date(date1);
	var date2 = new Date(date2);
	//console.log(date1);
	//console.log(date2);
var rtns = false
	switch(op){
		case 'greater':
			if(date2 > date1){
				rtns =  true;
			}
		break;

		case 'lessthan':
			if(date2 < date1){
				rtns = true;
			}
		break;
	}
	//alert(date2 +'\n '+ date1)
	return rtns;
}

function radioValueChanged(element, elementToShow)
{
    radioValue = element.val();
    
    if(!elementToShow){
    	var elementToShow = '';
    	alert('You need to add the class/id to the function call of which element you want to show.')
    }

    if(element.is(":checked") && radioValue == "Yes") {
        $(elementToShow).slideDown();
    } else {
    	$(elementToShow).slideUp();
    }
}

function checkPetSelection (elementVal, elementToShow){
	if(elementVal.is(':checked')){
		elementToShow.removeClass('disabled');
	} else {
		elementToShow.addClass('disabled');
	}
}

//To stop certain code executing while loading
//ie
$(document).ready(function(){
   ieDontCallBlur = 1
});