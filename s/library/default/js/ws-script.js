window.addEvent('domready', function() {
	if ($chk($('cookie-notice'))) {
		var cookieName = 'cookie_notice_read';
		var cookie = Cookie.get(cookieName);
		
		// if there's already a cookie then delete it
		if (cookie !== false) {
			Cookie.remove(cookieName);
		} else {	// if there's no cookie display the notice
			$('cookie-notice').setStyle('display', 'block');			
			$$('#cookie-notice a.cookie-continue').each(function(elm) {
				elm.addEvent('click', function(ev) {
					var event = new Event(ev);
					event.preventDefault();
					$('cookie-notice').setStyle('display', 'none');
				});
			});
		}
		// set a cookie to expire in 90 days no matter what
		Cookie.set(cookieName, '1', {
			'path': '/',
			'duration': 90
		});
	}
});