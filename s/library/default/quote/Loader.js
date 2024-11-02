
function ShowLoader(frmName , species){		
	var strSpecies = species.toUpperCase()
	if(strSpecies != ''){
		$('#loader').modal({
			containerId: 'loadingpanel',
			autoResize: true,
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('fast', function () {
					dialog.container.fadeIn('fast', function () {
						dialog.data.fadeIn('fast');
					});
				});
				if(strSpecies== 'DOG' || strSpecies =='CAT'){
					elVal = strSpecies.toLowerCase();
					$('#loader').find('.loadertitle .sicon').attr('class', 'sicon ' + elVal + 'loader');

				}
			},
			onShow: function(dialog){
				$('.progress_slider').stop(true,true).animate({width: '100%'}, 3000, function() {
					if(frmName!=''){
						abcd = false;
						TriggerClickOfThis(".modalCloseImg")
						document.getElementById(frmName).submit();
					}
				});
			},
			onClose:function(dialog){
				$('.progress_slider').stop(true,false)
				$.modal.close();
			},	 
			closeHTML: '<a class="modalCloseImg" title="Press Esc to close"></a>'
		});
	}
}

	function TriggerClickOfThis(eleClassId){
	  $(eleClassId).trigger('click');
	}