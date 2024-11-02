/*
 * SimpleModal Basic Modal Dialog
 * https://simplemodal.com
 *
 * Copyright (c) 2013 Eric Martin - https://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   https://www.opensource.org/licenses/mit-license.php
 */
var t;
var linkHref = 'fewe-details.html';
function AutoLoad1()
{
$(document).ready(function(){
	if($('#animal_selection_dog').is(':checked'))
		loadBreed('DOG')
	else if($('#animal_selection_cat').is(':checked'))
		loadBreed('CAT')
	// Dog assumptions
	$('.animals_50percent li.dog').on('click', function (e) {
		$('.assumptions_confirm').addClass('disabled');
		loadBreed('DOG');
		$('#dog_assumptions').modal({

			minWidth: 800,
			minHeight: 670,
			autoResize: true,
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('fast', function () {
					dialog.container.fadeIn('fast', function () {
						dialog.data.fadeIn('fast');
					});
				});
				$.uniform.update('#read_and_agree_dog_assumptions');
			},
			closeHTML: ''
		});
	});

	// Cat assumptions
	$('.animals_50percent li.cat').on('click', function (e) {
		loadBreed('CAT');
		$('.assumptions_confirm').addClass('disabled');
		$('#cat_assumptions').modal({

			minWidth: 800,
			minHeight: 550,
			autoResize: true,
			onOpen: function (dialog) {
				$.uniform.update('#read_and_agree_cat_assumptions');
				dialog.overlay.fadeIn('fast', function () {
					dialog.container.fadeIn('fast', function () {
						dialog.data.fadeIn('fast');
					});
				});
			},
			closeHTML: ''
		});
	});

	/*$('.pet_details .qab_next_step').on('click', function (e) {
		e.preventDefault();

		var linkHref = $(this).attr('href');

		$('#loader').modal({
			containerId: 'loadingpanel',
			autoResize: true,
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('fast', function () {
					dialog.container.fadeIn('fast', function () {
						dialog.data.fadeIn('fast');
					});
				});

				if($('.animals_50percent input:checked').length > 0){
					var elVal = $('.animals_50percent input:checked').val();
					elVal = elVal.toLowerCase();

					$('#loader').find('.loadertitle .sicon').attr('class', 'sicon ' + elVal + 'loader');
				}
			},
			onShow: function(dialog){
				$('.progress_slider').stop(true,true).animate({width: '100%'}, 3000, function() {
					window.location.href = linkHref;
				});
			},
			closeHTML: ''
		});
	});*/

	// Save Quote Popup
	$('.qab_savequote').on('click', function (e) {
		e.preventDefault();
		if(document.forms[0].CoverstartdateStatus!=null)
		{
			if(document.forms[0].CoverstartdateStatus.value=="FALSE")
			{	
				CSDValidation()// ' 6-Aug-2013  , Tuesday  / Alexander.R  / T06393 ShowPlans();
				return false;
			}
		}
		$('#save_quote_pop').modal({
			minWidth: 600,
			minHeight: 300,
			autoResize: true,
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('fast', function () {
					dialog.container.fadeIn('fast', function () {
						dialog.data.fadeIn('fast');
					});
				});
			},
			closeHTML: ''
		});
	});

	// Confirm Purchase
	$('.confirm_purchase').on('click', function (e) {
		e.preventDefault();
		if(document.forms[0].CoverstartdateStatus!=null)
		{
			var chk = 	document.forms[0].CoverstartdateStatus.value		
			if (chk=='FALSE')
			{
				CSDValidation()// ' 6-Aug-2013  , Tuesday  / Alexander.R  / T06393 ShowPlans();
				return false;
			}
		}
		$('#confirm_purchase_pop').modal({
			minWidth: 800,
			minHeight: 600,
			autoResize: false,
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('fast', function () {
					dialog.container.fadeIn('fast', function () {
						dialog.data.fadeIn('fast');
					});
				});
			},
			closeHTML: ''
		});
	});

});
}
AutoLoad1()
///************************************************////
///************Breed load**////////////////////////////
/***************************************************************************/
/*******************************Allianz code********************************/
/***************************************************************************/

var xmlHttp;
//Ajax object creation
function createXMLHttpObject(){
	//Creating Object
	try{
		// Firefox, Opera 8.0+, Safari
		xmlHttp=new XMLHttpRequest();							
	}
	catch (e){
		// IE
		try{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e){
			try{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e){
				alert("Your browser does not support AJAX!");
				return;
			}
		}
	} 
	
	return;

}

function loadBreed(strSpecies){
	var animal = $.trim(strSpecies);
		
	if(animal == "" && animal.toUpperCase() != "DOG" && animal.toUpperCase() != "CAT"){
		return false;
	}

	document.getElementById("breed").length = 0; 
	createXMLHttpObject();
	xmlHttp.onreadystatechange= xmlHTTPPopulateBreed;
	var url = "PopulateBreed.asp?species=" + animal
	//alert(url);
	xmlHttp.open("GET",url,true);
	xmlHttp.send();
}

function xmlHTTPPopulateBreed(){

   if (xmlHttp.readyState==4 && xmlHttp.status==200) {
	   var breedSelect = document.getElementById("breed");
	   var HiddenBreed = $.trim(document.getElementById("HiddenLoadBreed").value);
	   //alert(HiddenBreed);
		var response = xmlHttp.responseText;
		//alert(response);
		var splitResponse = response.split("//");
		var strVal , strArrDes , strDes;
		breedSelect.options[0] = new Option("Please select","");
		//breedSelect.options[0].selected = 'selected';
		breedSelect.selectedIndex = 0
		for (var i= 1; i <= splitResponse.length ;i++ ){
			strVal = $.trim(splitResponse[i-1]);
			if (strVal != ""){
				strArrDes = strVal.split("**");
				strDes = $.trim(strArrDes[1]);
				strId = $.trim(strArrDes[0]);
				breedSelect.options[i] = new Option(strDes,strId);
				if($.trim(HiddenBreed) == $.trim(strId)){
					breedSelect.options[i].selected = 'selected';
					//breedSelect.selectedIndex = i;
					$('.selector1').qtip('destroy');
				}

			}

		}
		$('#breed').trigger('click');
   }

   return;
}
//**********