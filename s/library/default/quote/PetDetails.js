var objCat , objDog , objPetName , objGenderM , objGenderF ,objNeuteredY , objNeuteredN , objBreed , objDay , obyMonth , objYear;
var returns;
var xmlHttp;
var isJSCoverStartDateError;
//in ie blur event is called when loading because of some function in common.js
//to stop used this variable
var ieDontCallBlur = 0;
//-------------


function clearAssumption(){
	document.getElementById("Assumption_Species").value = "";
}

function setAssumption(strSpecies,isAssump){
	if(isAssump)
		document.getElementById("Assumption_Species").value = strSpecies;
}


//Ends
//*****************************************************
//Loader
//*****************************************************

/* function ShowLoader(){
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
					document.getElementById("frmPetDetails").submit();
				});
			},
			closeHTML: ''
		});
 }	 */











//ends 

//******************************************************
//Call this on click of next
//*****************************************************
function validatePet(){
				/*$('.qtip').each(function(){
  $(this).data('qtip').destroy();
}) 	  */


	ieDontCallBlur = 1
	returns = true;
	checkSpecies(0);
	checkPetName(0);
	checkGender(0);
	checkNeutered(0);
	checkBreed(0);	 
	checkDOB(0);	


	var strSelPet = $.trim($('input[name=animal_selection]:checked').val());
	if(strSelPet != "" && typeof(strSelPet) !='undefined')
		strSelPet = strSelPet.toUpperCase();
	var hidVal = $.trim($("#Assumption_Species").val());
	if(hidVal != "")
		hidVal = hidVal.toUpperCase();
	if(returns){
		 if(hidVal == strSelPet){
			var ldSpecies = $(".animals_50percent input:checked").val();
			CallLoader('frmPetDetails',ldSpecies);
		 }
		 else{
			$('input[name=animal_selection]:checked').trigger('click');
		 }
	}else{
		//$("html, body").animate({ scrollTop: 0 }, "slow");
	}



}
	

//***************************************************************
//Validation functions
//***************************************************************
//species check
function checkSpecies(elseNo){
   if(elseNo == 0){
		objCat = document.getElementById("animal_selection_cat"); 
		objDog = document.getElementById("animal_selection_dog");

		if ((objCat.checked == false) && (objDog.checked == false)){
				$('.animals_50percent').addClass('fielderror');
				 $('.animal_buttons ').addClass('fielderror');
			if( 'object' != typeof($('.animals_50percent').data('qtip')) )  {
				RoundErrorBox(".animals_50percent", "top middle","bottom middle","")
			}
			returns =  false;
			return;
		}
		else {
			$('.animals_50percent').qtip('destroy',true);
			$('.animals_50percent').removeClass('fielderror');
			$('.animal_buttons ').removeClass('fielderror');
			return;
		}
   }else{
			$('.animals_50percent').qtip('destroy',true);
			$('.animals_50percent').removeClass('fielderror');
			$('.animal_buttons ').removeClass('fielderror');

   }
}
 
//petname check
function checkPetName(eleNo){
	if(ieDontCallBlur == 1){
		if(eleNo ==0){
			objPetName = document.getElementById("pet_name") ;
			if((isBlank(objPetName)) || (isIllegal(objPetName))){
				$('#pet_name').addClass('fielderror');
				if(isBlank(objPetName) || (objPetName.value.indexOf(' ')!=-1)){
					if( 'object' != typeof($('#pet_name').data('qtip')) )  
						RoundErrorBox("#pet_name", "right middle","left middle","Please enter your pet's name");

				}
				else{
					if( 'object' != typeof($('#pet_name').data('qtip')) ) 
						RoundErrorBox("#pet_name", "right middle","left middle","Please enter valid pet name");

				}
				returns = false;
				return;
			}
			else {
								
				$('#pet_name').qtip('destroy',true);
				$('#pet_name').removeClass('fielderror');
				return;
			}
		}else{
			$('#pet_name').qtip('destroy',true);
			$('#pet_name').removeClass('fielderror');	
		}
	}	
}

//Gender
function checkGender(eleNo){
	if(eleNo == 0){
		objGenderM = document.getElementById("gender1"); 
		objGenderF = document.getElementById("gender2");
		if ((objGenderM.checked == false) && (objGenderF.checked == false)){
			if( 'object' != typeof($('.radio_options_gender').data('qtip')) )  
				RoundErrorBox(".radio_options_gender", "right middle","left middle","");
			returns = false;
			return;
		}
		else {
			$('.radio_options_gender').qtip('destroy',true);
			return;
		}
	}else{
		$('.radio_options_gender').qtip('destroy',true);
	}
}


//neutered
function checkNeutered(eleNo){
	if(eleNo == 0){
		objNeuteredY = document.getElementById("spayedneutered1") ;
		objNeuteredN = document.getElementById("spayedneutered2") ;
		if ((objNeuteredY.checked == false) && (objNeuteredN.checked == false)){
			if( 'object' != typeof($('.radio_options_neutered').data('qtip')) ) 
				RoundErrorBox(".radio_options_neutered", "right middle","left middle","") ;

			returns = false;
			return;
		}
		else {
			$('.radio_options_neutered').qtip('destroy',true);
			return;
		}
	}else{
		$('.radio_options_neutered').qtip('destroy',true);
	}
}

//breed

function checkBreed(eleNo){
	//Breed validation
	if(eleNo ==0){
		objBreed = document.getElementById("breed");
		if (objBreed.selectedIndex== 0 ){
			$('.selector').addClass('fielderror');
			$('.selector1').qtip('destroy',true);
			if( 'object' != typeof($('.selector1').data('qtip')) ) 
				RoundErrorBox(".selector1", "right middle","left middle","Please select your pet's breed");
			returns = false;
			return;
		}

		else{
			$('.selector').removeClass('fielderror');
			$('.selector1').qtip('destroy',true);
			return;
		}
	}else{
			$('.selector').removeClass('fielderror');
			$('.selector1').qtip('destroy',true);
	}
}


function checkDOB(eleNo){
	if(ieDontCallBlur ==1){
		if(eleNo ==0){
			objDay = document.getElementById("day");
			objMonth = document.getElementById("month"); 
			objYear = document.getElementById("year"); 
			
			var myDate = objDay.value;
			var myMonth = objMonth.value;
			var myYear = objYear.value;
					
			var eMsg;
			var isError = 0
			var myDob = new Date();	
			//---------------
			var val1 , var2 , var3;
			var1 = objDay.value;
			var2 = objMonth.value;
			var3 = objYear.value;
			if(var1 == "DD") {var1 = "";}
			if(var2 == "MM") {var2 = "";}
			if(var3 == "YYYY") {var3 = "";}
			//-----------------

			//DateValidation
			var isDate = 0;
			for(var i =1 ;i<=31;i++){
				if(objDay.value == i){
					isDate = 1 ;
					break;
				}
			}
			//Month validation
			var isMonth = 0;
			for(var i =1 ;i<=12;i++){
				if(objMonth.value == i){
					isMonth = 1 ;
					break;
				}
			}

			myDob.setFullYear(myYear,myMonth-1,myDate);
			var isMyDobError =myDob.toString().toLowerCase(); 
			var currentDate = new Date();


			if(isMyDobError == 'invalid date'){
				eMsg = "Please enter a valid date of birth";
				isError = 1;
			}else if(var1 == "" || var2 == "" || var3 ==""){
				eMsg = "Please enter your pet's date of birth";
				isError = 1;	
			}else if(isMonth==0 || isDate ==0 || objYear.value.length != 4){
				eMsg = "Please enter a valid date of birth.";
				isError = 1;	
			}else if(myDob>currentDate){
				eMsg = "Date entered is a future date";
				isError = 1;
			}else if(objDay.value > getNumberOfDays(objYear.value,myMonth - 1)){
				eMsg = "Please enter a valid date of birth.";
				isError = 1;
			}else if ((Math.ceil((currentDate.getTime()-myDob.getTime()))/(1000*60*60*24))<28){
				eMsg = "As your pet is under 4 weeks old, we are unable to provide a quotation.However, we would be pleased to discuss your future pet insurance needs with you. Please call us on "+ CustCareNo +".";
				isError = 1;
			}else if ((Math.ceil((currentDate.getTime()-myDob.getTime()))/(1000*60*60*24))>3286){
				eMsg = "We regret that we are unable to provide a quote for pets over 9 years of age.";
				isError = 1
			}

			if(isError == 1){
				$('input[id="day"]').addClass('fielderror');
				$('input[id="month"]').addClass('fielderror');
				$('input[id="year"]').addClass('fielderror');
				returns=false;
				$('.DOB').qtip('destroy',true);
				if( 'object' != typeof($('.DOB').data('qtip')) ) 
					RoundErrorBox(".DOB", "right middle","left middle",eMsg);
				else
					$('.DOB').qtip('option', 'content.text', eMsg); 
				return returns;
			}else {		
				$('input[id="day"]').removeClass('fielderror');
				$('input[id="month"]').removeClass('fielderror');
				$('input[id="year"]').removeClass('fielderror');
				$('.DOB').qtip('destroy',true);
				return true;

			}
		}else{
				 $('input[id="day"]').removeClass('fielderror');
				$('input[id="month"]').removeClass('fielderror');
				$('input[id="year"]').removeClass('fielderror');
				$('.DOB').qtip('destroy',true);
				return true;
		}

	}

}

function CheckCoverStartDate(){
	eMsg = "Due to the ages of your pets, it is not possible to provide a policy start date where all pets are eligible for cover via your online application. Please call us on "+ CustCareNo +" to arrange cover. Alternatively, you may prefer to proceed online with two separate applications.";
	$('input[id="day"]').addClass('fielderror');
	$('input[id="month"]').addClass('fielderror');
	$('input[id="year"]').addClass('fielderror');
	$('.DOB').qtip('destroy',true)
	RoundErrorBox(".DOB", "right middle","left middle",eMsg);
}

//***************************************************************
//Ends
//***************************************************************
function RoundErrorBox(param1,param2,param3,errMsg){
	$(param1).qtip({
		content: { 
			text: function(api) {
				// Retrieve content from custom attribute of the $('.selector') elements.
				if(errMsg == "" ){
					var element = $(this).next('.errormsg');
					return element.html(); 
				}
				else{
					return errMsg;
				}
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
			at: param2,
			my: param3
		},
		style: {
			classes: 'qtip-orange qtip-shadow'
		}

	});

	return

}



//****		
/*
function addPlaceHolder(input) {

    if (!Modernizr.input.placeholder) {
        input.focus(function () {
            if ($(this).val() == $(this).attr('placeholder')) {
                $(this).val('');
                $(this).removeClass('placeholder');
            }
        }).blur(function () {
            if ($(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
                $(this).addClass('placeholder');
                $(this).val($(this).attr('placeholder'));
            }
        }).blur();
        $(input).parents('form').submit(function () {
            $(this).find(input).each(function () {
                if ($(this).val() == $(this).attr('placeholder')) {
                    $(this).val('');
                }
            })
        });
     }
 }

    addPlaceHolder($(':text'));
    addPlaceHolder($('textarea'));	   */
