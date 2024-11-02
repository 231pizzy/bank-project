var DoubleNectarPointsCalculator = function(shell) {
	var my;

	my = {
		enable: function() {

			my.ui = {
				'sliders': {},
				// Areas
				'wrapper': $("calc-wrapper"),
				'form': shell.getElement("form"),
				'head': shell.getElement("#head"),
				'slider_area': shell.getElement(".amount"),
				'qualify_copy' : shell.getElement("#qualify_copy"),
				'options' : shell.getElement("#options"),
				'products' : shell.getElement("#included-products"),
				'total_points_div': shell.getElement("#total-points"),
				'quote_area' : shell.getElement("#quote"),
				'terms' : shell.getElement("#terms"),
				'footer' : shell.getElement("#double-nectar-calc-footer"),
				// Elements
				'total_points_value' : shell.getElement("#total-points-value"),
				'pound_value' : shell.getElement(".pound-value"),
				'result_items': shell.getElement("div.result-items"),
				'amount_error' : shell.getElement(".amount_error"),
				'products_error' : shell.getElement(".products_error"),
				'no_prod_label' : shell.getElement("#no_included_products_label"),
				'cc_label' : shell.getElement("#cc_label"),
				'worth_text': shell.getElement("#worth_text")
			};

			my.inputs = {
				'credit_card': (my.ui.form.use_cc),
				'home_insurance': (my.ui.form.home_insurance),
				'pet_insurance': (my.ui.form.pet_insurance),
				'car_insurance': (my.ui.form.car_insurance),
				'life_insurance': (my.ui.form.life_insurance),
				'shopper_reward': (my.ui.form.shopper_reward),
				'amount': shell.getElement("#double-nectar-calc-borrowing-label"),
				'mobile_amount': shell.getElement("#double-nectar-calc-amount"),
				'submit': shell.getElement("#quote-submit p")
			};

			my.messages = {
				'value_error': "Weekly spend must be between £1 and £500"
			};

			my.quote_redirect = siteDir+'insuring/popup/'+qouteRedir;

			$$("meta[name='double_nectar_calc_redirect']").each(function(el) {
				// if redirect file is defined in meta use that
				my.quote_redirect = el.get("content");
			});

			my.quote = {};

			// include the slider controller and initialize
			window.Include.load(siteDir+"library/default/js/slider-controller.js", function() {
				my.init();
			});

		},

		init: function() {

			var base_html = "<div id='calc-banner-wrapper'><div id='calc-rewards-wrapper'><div class='left'><img class='left' src='"+siteDir+"library/default/images/double-nectar-calc/nectar-logo-trans.png' alt='Nectar Logo' /><p class='left' id='calc-copy'>Find out how our Double Nectar Points offer could benefit you.</p></div><div class='right'><p id='calc-rewards'>Calculate the rewards</p></div></div><div id='get-quote-wrapper'><div class='left'><img src='"+siteDir+"library/default/images/double-nectar-calc/nectar-logo-trans.png' alt='Nectar Logo' /><p id='banner_title'>Based on:</p><ul id='banner_ul'><li id='banner_no_included_products_label'>1 qualifying product</li><li>Base points you normally collect on "+sNmSht+"'s shopping</li><li id='cc_label'>"+sNmSht+"'s Nectar Credit Card used to pay for these purchases</li></ul></div><div class='right'><p>As an illustration, you could collect Nectar points worth:</p><div id='quote-area'><p class='orange pound-value'></p><p class='get-quote'>Get a quote</p></div></div><div class='banner-terms'><p>Credit Card: Double Nectar Points earned only when you pay with your "+sNmSht+"&#39;s Nectar Credit Card &amp; hand over your Nectar card. Bonus Nectar points subject to a monthly maximum of 2,500 points per product type per month on other products. Offer points cease on closure, cancellation or non-renewal of account/policy.</p></div></div></div>";

			my.calc_banner = new Element("div", {
				'id': 'calc-banner',
				'html': base_html,
				styles: {
					visibility: 'hidden'
				}
			}).inject(document.getElementById("content"), "before");

			my.metrics = {
				'wrapper': {
					'bottom': ((my.ui.wrapper.getPosition()).y + (my.ui.wrapper.getSize()).y)
				}
			};

			my.status = {
				'wrapper_shown': false
			};

			// init elements
			my.ui.form.getElements("input").each(function(el) {
				var label;

				if (el.hasClass("slider")) {
					if (el.id === "double-nectar-calc-amount") {
						label = new Element("input.slider-label", {
							'type': 'text',
							'id': 'double-nectar-calc-borrowing-label',
							'name': 'amount_label'
						}).inject(el, "after");

						// amount slider
						my.ui.sliders[el.id] = new window.SliderController(el, {
							'range': [0, 500],
							'steps': (100),
							'onChange': function(step) {
								my.quote.ws = step;
								el.set("value", my.quote.ws);
								my.update(my.quote.ws);

							},
							'onError': function(type, val) {
								if (val < 0 || val > 500) {
									my.ui.amount_error.set("html", my.messages.value_error);
									my.ui.amount_error.setStyle("display", "block");
								}
							},
							'fill': true,
							'label': label,
							'output_prefix': '£',
							'hideonsmalldevice': true,
							'legend': true,
							'labels': {
								'min_prefix': '',
								'max_prefix': ''
							}
						});
					}
				}
				else if (el.get("type") === "checkbox") {
					el.addEvent("click", my.handle_event);
				}
			});

			//  This ends up calling preventDefault as we don't want the submit the form
			//	when an amount is entered in the weekly spend input
			my.ui.form.addEvent("submit", my.handle_event);

			// This is to simulate a form submit
			document.getElements(".get-quote").each(function(el) {
				el.addEvent("mousedown", my.handle_event);
			});

			// Mobile
			my.inputs.mobile_amount.addEvent("change", function(){
				my.quote.ws = this.value;
				my.update(my.quote.ws);
				// dirty hack to hide keyboard on iOS
				my.ui.form.getElements("input").each(function(el) {
					document.activeElement.blur();
					el.blur();
				});
			});

			my.inputs.mobile_amount.addEvent("keyup", function(){
				my.quote.ws = this.value;
				my.update(my.quote.ws);
			});

			document.getElement("#calc-rewards").addEvent("click", function(){
				var calc_wrapper = my.ui.wrapper.getPosition().y - 50;
				window.scrollTo(0, calc_wrapper);
			});

			window.onscroll = function(ev){
				if (window.innerWidth || document.documentElement.clientWidth > 640) {
					var scrolled = window.getScroll();

					if (!my.status.wrapper_shown && scrolled.y >= my.metrics.wrapper.bottom) {
						my.status.wrapper_shown = true;

						if (my.quote.ws === 0) {
							my.calc_banner.getElement("#get-quote-wrapper").setStyle("display", "none");
							my.calc_banner.setStyle("visibility", "visible");
							my.calc_banner.getElement("#calc-rewards-wrapper").setStyle("display", "block");
						} else {
							my.calc_banner.getElement("#calc-rewards-wrapper").setStyle("display", "none");
							my.calc_banner.setStyle("visibility", "visible");
							my.calc_banner.getElement("#get-quote-wrapper").setStyle("display", "block");
						}
					} else if (my.status.wrapper_shown && scrolled.y < my.metrics.wrapper.bottom) {
						my.status.wrapper_shown = false;
						my.calc_banner.setStyle("visibility", "hidden");
					}
				}
			};
		},

		handle_event: function(event) {
			if (event.type === "change" ||
				event.type === "click") {
				my.update(my.quote.ws);
			} else if (event.type === "submit") {
				event.preventDefault();
			} else if (event.type === "mousedown") {
				event.preventDefault();
				my.set_cookies();
				window.open(my.quote_redirect, "qredirect");
			}
		},

		set_cookies: function(){
			window.Cookie.write('points', my.quote.total_points, {duration: 1});
			window.Cookie.write('pounds', my.quote.total_pounds, {duration: 1});
			window.Cookie.write('no_prods', my.get_num_products(), {duration: 1});
			window.Cookie.write('week_spend', my.quote.ws, {duration: 1});

			if (my.inputs.credit_card.checked) {
				window.Cookie.write("use_cc", "true", {duration: 1});
			}
			else{
				window.Cookie.write("use_cc", "false", {duration: 1});
			}
		},

		get_num_products: function(){
			var total_selected = 0;

			my.ui.options.getElements("input").each(function(el) {
				if (el.checked) {
					total_selected = total_selected + 1;
				}
			});

			return total_selected;
		},

		clear_and_hide: function(){
			my.ui.products.setStyle("display", "none");
			my.ui.total_points_value.set("html", "");
			my.ui.total_points_div.setStyle("display", "none");
			my.ui.pound_value.set("html", "");
			my.ui.quote_area.setStyle("display", "none");
			my.metrics.wrapper.bottom = ((my.ui.wrapper.getPosition()).y + (my.ui.wrapper.getSize()).y);
		},

		update: function(value) {
			if (value > 0 && value < 501) {
				window.JSMedia.monitor(window.site.device_monitors.small, function(result) {
					if (!result[0]) {
						my.ui.amount_error.setStyle("display", "none");
					}
				});
				var credit_card = my.inputs.credit_card.checked,
					WS_LIMIT = 288, // Weekly shop limit
					BASE_POINTS = 1,
					BASE_CC = 1,
					num_products = my.get_num_products();

				if (num_products === 0) {
					my.ui.no_prod_label.setStyle("display", "none");
					my.ui.products.setStyle("display", "none");
					my.ui.total_points_div.setStyle("display", "none");
					my.ui.quote_area.setStyle("display", "none");
					my.ui.products_error.setStyle("display", "block");
				}
				else{
					var num_products_text;
					if (num_products < 2) {
						num_products_text = " qualifying product";
					}
					else {
						num_products_text = " qualifying products";
					}

					$('banner_no_included_products_label').set("html", num_products + num_products_text);
					my.ui.no_prod_label.set("html", num_products + num_products_text);
					my.ui.no_prod_label.setStyle("display", "");
					my.ui.products_error.setStyle("display", "none");
					my.ui.products.setStyle("display", "block");
					my.ui.quote_area.setStyle("display", "block");
					my.ui.total_points_div.setStyle("display", "block");

					if (credit_card === true) {
						var amountstring;

						my.ui.cc_label.setStyle("display", "");
						if (value <= WS_LIMIT) {
							my.quote.total_points = (num_products + BASE_CC + BASE_POINTS) * (value * 2 * 52);
							my.quote.total_pounds = Math.round(my.quote.total_points / 200);
							my.ui.total_points_value.set("html", my.quote.total_points.format({group: ","}));
							amountstring = "£" + my.quote.total_pounds.format({group: ","}) + "<span class='orange'></span>";
							my.ui.pound_value.set("html", amountstring);
							my.calc_banner.getElement(".pound-value").set("html", "£" + my.quote.total_pounds.format({group: ","}) + "<br /><p id='spend-text'>to spend instore</p>");
							my.metrics.wrapper.bottom = ((my.ui.wrapper.getPosition()).y + (my.ui.wrapper.getSize()).y);
						}
						else{
							my.quote.total_points = (num_products * 30000) + (BASE_CC + BASE_POINTS) * (value * 2 * 52);
							my.quote.total_pounds = Math.round(my.quote.total_points / 200);

							my.ui.total_points_value.set("html", my.quote.total_points.format({group: ","}));
							amountstring = "£" + my.quote.total_pounds.format({group: ","}) + "<span class='orange'></span>";
							my.ui.pound_value.set("html", amountstring);
							my.calc_banner.getElement(".pound-value").set("html", "£" + my.quote.total_pounds.format({group: ","}) + "<br /><p id='spend-text'>to spend instore</p>");
							my.metrics.wrapper.bottom = ((my.ui.wrapper.getPosition()).y + (my.ui.wrapper.getSize()).y);
						}
					}
					else{
						my.ui.cc_label.setStyle("display", "none");
						if (value <= WS_LIMIT) {
							my.quote.total_points = (num_products + BASE_POINTS) * (value * 2 * 52);
							my.quote.total_pounds = Math.round(my.quote.total_points / 200);

							my.ui.total_points_value.set("html", my.quote.total_points.format({group: ","}));
							amountstring = "£" + my.quote.total_pounds.format({group: ","}) + "<span class='orange'></span>";
							my.ui.pound_value.set("html", amountstring);
							my.calc_banner.getElement(".pound-value").set("html", "£" + my.quote.total_pounds.format({group: ","}) + "<br /><p id='spend-text'>to spend instore</p>");
							my.metrics.wrapper.bottom = ((my.ui.wrapper.getPosition()).y + (my.ui.wrapper.getSize()).y);
						}
						else{
							my.quote.total_points = (num_products * 30000) + (value * 2 * 52);
							my.quote.total_pounds = Math.round(my.quote.total_points / 200);

							my.ui.total_points_value.set("html", my.quote.total_points.format({group: ","}));
							amountstring = "£" + my.quote.total_pounds.format({group: ","}) + "<span class='orange'></span>";
							my.ui.pound_value.set("html", amountstring);
							my.calc_banner.getElement(".pound-value").set("html", "£" + my.quote.total_pounds.format({group: ","}) + "<br /><p id='spend-text'>to spend instore</p>");
							my.metrics.wrapper.bottom = ((my.ui.wrapper.getPosition()).y + (my.ui.wrapper.getSize()).y);
						}
					}
				}
			} else {
				window.JSMedia.monitor(window.site.device_monitors.small, function(result) {
					if (result[0]) {
						if (value == 0) {
							my.ui.amount_error.setStyle("color", "#333");
						} else {
							my.ui.amount_error.setStyle("color", "red");
						}

						my.ui.amount_error.set("html", my.messages.value_error);
						my.ui.amount_error.setStyle("display", "block");
					}
				});
				my.calc_banner.getElement(".pound-value").set("html", "£" + 0);
				my.clear_and_hide();
			}
		}

	};

	my.enable();
};
