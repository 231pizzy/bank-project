var LoanAPRCalculator = function() {
	var cls;

	cls = {
		'strings': {
			'boundary_loan': 'Please enter a value between &pound;1,000 and &pound;25,000',
			'boundary_term': 'Please enter a value between 12 and 84',
			'boundary_term_small': 'Please enter a value between 12 and 60',
			'boundary_term_large': 'Please enter a value between 24 and 84',
			'nan_loan': 'Loan amount must be numeric',
			'nan_term': 'Loan term must be numeric',
			'eligibility': 'Please read and check the eligibility requirements',
			'integer_val': 'Please enter your amount as a whole number'
		},

		timers: {},

		re: {
			'numeric': /[^\d.]*/g
		},

		scroll: new window.Fx.Scroll(window),

		error: function(msg, error_elements, item) {
			var id;

			for (id in error_elements) {
				if (!msg && msg !== null || id !== item) {
					error_elements[id].setStyle("display", "none");
				} else if (msg !== undefined && id === item) {
					error_elements[id].setStyle("display", "block").set("html", msg);
				}
			}

			if (msg !== undefined) {
				if (cls.timers.error) {
					window.clearTimeout(cls.timers.error);
				}
			}
		}
	};

	return cls;
};

var SmallLoanAPRCalculator = function(shell) {
	var $super, my;

	my = {
		enable: function() {
			// enable class
			$super = new LoanAPRCalculator();

			my.ui = {
				'form': shell.getElement("form")
			};

			// add error items
			my.ui.errors = {
				'borrowing': my.ui.form.getElement("fieldset.borrowing p.error").setStyle("display", "none"),
				'term': my.ui.form.getElement("fieldset.term p.error").setStyle("display", "none")
			};

			my.ui.form.addEvent("submit", function(event) {
				event.stop();
				my.collect_inputs();

				if (isNaN(my.inputs.loan)) {
					$super.error($super.strings.nan_loan, my.ui.errors, "borrowing");
					return false;
				}

				if (isNaN(my.inputs.term)) {
					$super.error($super.strings.nan_term, my.ui.errors, "term");
					return false;
				}

				if (my.inputs.loan > 25000 || my.inputs.loan < 1000) {
					$super.error($super.strings.boundary_loan, my.ui.errors, "borrowing");
					return false;
				} else {
					if (my.inputs.loan < 7500) {
						if (my.inputs.term > 60 || my.inputs.term < 12) {
							$super.error($super.strings.boundary_term_small, my.ui.errors, "term");
							return false;
						}
					} else if (my.inputs.loan > 15000) {
						if (my.inputs.term > 84 || my.inputs.term < 24) {
							$super.error($super.strings.boundary_term_large, my.ui.errors, "term");
							return false;
						}
					} else {
						if (my.inputs.term > 84 || my.inputs.term < 12) {
							$super.error($super.strings.boundary_term, my.ui.errors, "term");
							return false;
						}
					}
				}

				my.ui.form.submit();
			});
		},

		collect_inputs: function() {
			my.inputs = {
				'loan': parseFloat($(my.ui.form.borrowing).get('value').replace($super.re.numeric, "")),
				'term': parseInt($(my.ui.form.term).get('value').replace($super.re.numeric, ""), 10)
			};
		}
	};

	my.enable();
};

var FullLoanAPRCalculator = function(shell) {
	var $super, my;

	my = {
		enable: function() {
			// enable class
			var precalc;

			$super = new LoanAPRCalculator();

			my.ui = {
				'form': shell.getElement("form"),
				'sliders': {},
				'results': shell.getElement("div.results"),
				'result_items': shell.getElement("div.result-items"),
				'smalldevicesubmit': shell.getElement("#mobile-submit input")
			};

			my.timers = {};

			// hide form until data is retrieved
			my.ui.form.setStyle("visibility", "hidden");

			// include the slider controller and initialize
			window.Include.load(siteDir+"library/default/js/slider-controller.js", function() {
				my.init();
			});

			// get query data (if any)
			if ((precalc = window.site.get_query_item("loan-aprcalc-small")) &&
				precalc === "precalc") {
				my.inputs = {
					'loan': window.site.get_query_item("borrowing").replace($super.re.numeric, ""),
					'term': window.site.get_query_item("term").replace($super.re.numeric, ""),
					'nectar': false,
					'defer': false
				};

				$super.scroll.toElement(shell);

			} else {
				my.inputs = {};
			}
		},

		init: function() {
			// get data
			my.getxml(function() {
				// init elements
				my.ui.form.getElements("input").each(function(el) {
					var label;

					if (el.hasClass("slider")) {
						if (el.id === "loans-calc-borrowing") {
							// amount
							label = new Element("input.slider-label", {
								'type': 'text',
								'id': 'loans-calc-borrowing-label',
								'name': 'borrowing_label'
							}).inject(el, "after");

							// amount slider
							my.ui.sliders[el.id] = new window.SliderController(el, {
								'range': [my.data.opt.amt_min, my.data.opt.amt_max],
								'steps': ((my.data.opt.amt_max - my.data.opt.amt_min) / my.data.opt.amt_step),
								'onChange': function(step) {
									el.set("value", step);
								},
								'onComplete': function(step) {
									if (my.timers.update) {
										window.clearTimeout(my.timers.update);
									}

									my.timers.update = window.setTimeout(function() {
										my.update();
										my.update_term();
									}, 100);
								},
								'onError': function(type, val) {
									if (type !== null) {
										if (type === "boundary_upper" || type === "boundary_lower") {
											$super.error($super.strings.boundary_loan, my.ui.errors, "borrowing");
										}

										if (type === "decimal" || val.toString().indexOf('.') !== -1) {
											$super.error($super.strings.integer_val, my.ui.errors, "borrowing");
										}

										my.ui.smalldevicesubmit.disabled = true;
									} else {
										$super.error(null, my.ui.errors, "borrowing");
										my.ui.smalldevicesubmit.disabled = false;
									}
								},
								'label': label,
								'output_prefix': '£',
								'bands': my.data.bands,
								'device_entry_method': {
									'small': 'label' // label or input
								},
								'allow_floats': false,
								'hideonsmalldevice': true,
								'legend': true
							});

							if (my.inputs.loan && !isNaN(my.inputs.loan)) {
								my.ui.sliders[el.id].set(my.inputs.loan);
							}
						} else if (el.id === "loans-calc-term") {
							// term
							new Element("p.slider-label").adopt(
								label = new Element("input", {
									'type': 'text',
									'id': 'loans-calc-term-label',
									'name': 'term_label'
								})
							).adopt(
								new Element("span.text").set("text", "months")
							).inject(el, "after");

							// term slider
							my.ui.sliders[el.id] = new window.SliderController(el, {
								'range': [12, 84],
								'steps': ((84 - 12) / 6),
								'force_steps': true,
								'onChange': function(step) {
									el.set("value", step);
								},
								'onComplete': function(step) {
									if (my.timers.update) {
										window.clearTimeout(my.timers.update);
									}

									my.timers.update = window.setTimeout(function() {
										my.update();
										my.update_term();
									}, 100);
								},
								'onError': function(type, val) {
									if (type === "boundary_upper" || type === "boundary_lower") {
										$super.error($super.strings.boundary_term, my.ui.errors, "term");
									}
								},
								'label': label,
								'hideonsmalldevice': true,
								'legend': true
							});

							if (my.inputs.term && !isNaN(my.inputs.term)) {
								my.ui.sliders[el.id].set(my.inputs.term);
							}
						}
					} else if (el.get("type") === "checkbox") {
						el.addEvent("click", my.handle_event);
					} else {
						el.addEvent("change", my.handle_event);
					}
				});

				// add error items
				my.ui.errors = {
					'borrowing': my.ui.form.getElement("fieldset.borrowing p.error").setStyle("display", "none"),
					'term': my.ui.form.getElement("fieldset.term p.error").setStyle("display", "none")
				};

				// show form
				my.ui.form.setStyle("visibility", "visible").addEvent('submit', function(event) {
					event.stop();
					my.update();
				});

				// set up submit handlers on forms
				if (my.ui.result_items) {
					my.ui.result_items.getElements(".product form").each(function(form) {
						form.addEvent("submit", my.handle_event);

						my.ui.errors['apply-now-' + form.id] = form.getElement("fieldset.apply-now p.error").setStyle("display", "none");
					});
				}
			});
		},

		getxml: function(callback) {
			// retrieve XML data for processing
			var xhr;

			my.xml = null;
			my.ranges = [];

			// load in xml data
			xhr = new window.Request({
				'url': siteDir+'library/default/xml/apr-rate-tables.xml',
				'method': 'get',
				'onSuccess': function(text, xml) {
					if ((my.xml = xml.documentElement)) {
						my.process(callback);
					}
				}
			});

			xhr.send();
		},

		process: function(callback) {
			// process received data
			var a, b, nodes, product, product_id,
				rates, rate,
				term, url,
				opt, value,
				example,
				example_min, example_max,
				example_minloan, example_maxloan,
				text, texts_std, texts_rew, texts_nonectar,
				example_apr, example_text;

			my.data = {
				'products': {},
				'opt': {},
				'terms': [],
				'bands': [],
				'examples': {}
			};

			// fill in rates
			nodes = my.xml.getElementsByTagName("product");

			for (a = 0; (product = nodes[a]); a += 1) {
				product_id = product.getAttribute("id");
				rates = product.getElementsByTagName("rate");

				my.data.products[product_id] = {
					'title': product.getAttribute("title"),
					'rates': []
				};

				for (b = 0; (rate = rates[b]); b += 1) {
					// add rate datum to product
					my.data.products[product_id].rates.push({
						'apr': rate.getAttribute("apr"),
						'reward_apr': rate.getAttribute("reward_apr") || null,
						'min': parseFloat(rate.getAttribute("min")),
						'max': parseFloat(rate.getAttribute("max")),
						'term': {
							'min': parseInt(rate.getAttribute("minterm"), 10),
							'max': parseInt(rate.getAttribute("maxterm"), 10)
						}
					});
				}
			}

			// fill in terms
			nodes = my.xml.getElementsByTagName("terms")[0].getElementsByTagName("term");

			for (a = 0; (term = nodes[a]); a += 1) {
				my.data.terms.push({
					'min': parseFloat(term.getAttribute("min")),
					'max': parseFloat(term.getAttribute("max")),
					'loan': {
						'min': parseFloat(term.getAttribute("minloan")),
						'max': parseFloat(term.getAttribute("maxloan"))
					}
				});
			}

			// fill in urls
			(function() {
				var a, b, c, types, type, type_id, urls;

				nodes = my.xml.getElementsByTagName("link_data")[0].getElementsByTagName("product");
				my.data.urls = {};

				for (a = 0; (product = nodes[a]); a += 1) {
					product_id = product.getAttribute("id");
					types = product.getElementsByTagName("type");

					my.data.urls[product_id] = {};

					for (b = 0; (type = types[b]); b += 1) {
						// add type
						type_id = type.getAttribute("id");
						urls = type.getElementsByTagName("link");

						my.data.urls[product_id][type_id] = [];

						for (c = 0; (url = urls[c]); c += 1) {
							my.data.urls[product_id][type_id].push({
								'min': parseFloat(url.getAttribute("min")),
								'max': parseFloat(url.getAttribute("max")),
								'url': url.getAttribute("url"),
								'nectar_url': url.getAttribute("nectar_url")
							});
						}
					}
				}
			}());

			// fill in bands
			nodes = my.xml.getElementsByTagName("bands")[0].getElementsByTagName("band");

			for (a = 0; a < nodes.length; a += 1) {
				my.data.bands.push({
					'start': nodes[a].getAttribute("start"),
					'len': nodes[a].getAttribute("len")
				});
			}

			// fill in options
			nodes = my.xml.getElementsByTagName("opt")[0].childNodes;

			for (a = 0; (opt = nodes[a]); a += 1) {
				if (opt.tagName) {
					value = (opt.nodeValue || opt.textContent || opt.text);

					if (!isNaN(parseFloat(value))) {
						value = parseFloat(value);
					}

					my.data.opt[opt.tagName] = value;
				}
			}

			// fill in representative examples
			nodes = my.xml.getElementsByTagName("example");

			for (a = 0; (example = nodes[a]); a += 1) {
				my.data.examples[a] = {
					min: example.getAttribute("min"),
					max: example.getAttribute("max"),
					minloan: example.getAttribute("minloan"),
					maxloan: example.getAttribute("maxloan"),
					msg_std: {},
					msg_rew: {},
					msg_nonectar: {}
				};

				// standard examples
				texts_std = example.getElementsByTagName("text");

				for (b = 0; (text = texts_std[b]); b += 1) {
					example_apr = text.getAttribute("apr");
					example_text = (text.nodeValue || text.textContent || text.text);
					my.data.examples[a].msg_std[example_apr] = example_text;
				}

				// reward examples
				texts_rew = example.getElementsByTagName("text_reward");

				for (b = 0; (text = texts_rew[b]); b += 1) {
					example_apr = text.getAttribute("apr");
					example_text = (text.nodeValue || text.textContent || text.text);
					my.data.examples[a].msg_rew[example_apr] = example_text;
				}

				// non nectar examples
				texts_nonectar = example.getElementsByTagName("text_standard");

				for (b = 0; (text = texts_nonectar[b]); b += 1) {
					example_apr = text.getAttribute("apr");
					example_text = (text.nodeValue || text.textContent || text.text);
					my.data.examples[a].msg_nonectar[example_apr] = example_text;
				}
			}

			if (typeof callback === "function") {
				callback();
			}
		},

		handle_event: function(event) {
			// enable slider on mobile
			if (event.type === "change" ||
				event.type === "click") {
				// form element is changing
				my.update();
			} else if (event.type === "submit") {
				event.preventDefault();

				if (event.target.id === 'std-loan') {
					if (!event.target.elements.confirm.checked) {
						$super.error($super.strings.eligibility, my.ui.errors, "apply-now-" + event.target.id);
						return false;
					} else {
						my.apply(event.target, "std");
					}
				}

				if (event.target.id === 'rew-loan') {
					if (!event.target.elements.confirm.checked) {
						$super.error($super.strings.eligibility, my.ui.errors, "apply-now-" + event.target.id);
						return false;
					} else {
						my.apply(event.target, "reward");
					}
				}
			}
		},

		collect_inputs: function() {
			my.inputs = {
				'loan': parseFloat(my.ui.form.borrowing.get('value').replace($super.re.numeric, "")),
				'term': parseInt(my.ui.form.term.get('value').replace($super.re.numeric, ""), 10),
				'defer': (my.ui.form.defer.checked),
				'nectar': (my.ui.form.nectar.checked)
			};
		},

		update_term: function() {
			var a, term;

			my.collect_inputs();

			// loop through rates to find match based on loan amount
			for (a = 0; (term = my.data.terms[a]); a += 1) {
				if ((my.inputs.loan >= term.loan.min && my.inputs.loan <= term.loan.max)) {
					// found a valid term time - update term slider
					my.ui.sliders['loans-calc-term'].set_min(term.min);
					my.ui.sliders['loans-calc-term'].set_max(term.max);

					return;
				}
			}

			my.ui.sliders['loans-calc-term'].set_min();
			my.ui.sliders['loans-calc-term'].set_max();
		},

		update: function() {
			// update calculations, sliders
			var rate_db;

			my.collect_inputs();

			if (!isNaN(my.inputs.loan) && !isNaN(my.inputs.term)) {
				if (my.inputs.loan > my.data.opt.amt_max || my.inputs.loan < my.data.opt.amt_min) {
					$super.error($super.strings.boundary_loan, my.ui.errors, "borrowing");
					return false;
				}

				if (my.inputs.term > my.data.opt.term_max || my.inputs.loan < my.data.opt.term_min) {
					$super.error($super.strings.boundary_term, my.ui.errors, "term");
					return false;
				}

				if (my.inputs.loan.toString().indexOf('.') !== -1) {
					$super.error($super.strings.integer_val, my.ui.errors, "borrowing");
					return false;
				}


				$super.error(null, my.ui.errors);

				// find appropriate product from each type
				if (my.inputs.nectar) {
					rate_db = "nectar";
				} else {
					rate_db = "std";
				}

				scrollto_std = function() {
					// scroll to the standard result on small screens
					if (!!(window.site && window.site.tests && window.site.tests.device.small)) {
						$super.scroll.toElement(my.ui.result_items.getElement(".default-product"));
					}
				}

				my.ui.result_items.getElements(".product").each(function(product) {
					// standard product data
					if (product.id === "product-result-std") {
						my.write_rate(my.find_rate(rate_db), product);
						product.removeClass("disabled");
						product.getElement("div.foot").removeClass("hidden");
					}

					// nectar product data
					if (product.id === "product-result-reward") {
						if (my.inputs.loan >= my.data.opt.reward_min_amt &&
							my.inputs.term <= my.data.opt.reward_max_term) {
							if (rate_db === "nectar") {
								my.write_rate(my.find_rate(rate_db), product, true);
								product.removeClass("disabled");
								product.getElement("div.foot").removeClass("hidden");
							} else {
								product.addClass("disabled");
								product.getElement("div.foot").addClass("hidden");
								scrollto_std();
							}
						} else {
							// inputted values do not qualify for reward loan
							product.addClass("disabled");
							product.getElement("div.foot").addClass("hidden");
							scrollto_std();
						}
					}
				});
			} else {
				if (isNaN(my.inputs.loan)) {
					$super.error($super.strings.nan_loan, my.ui.errors, "borrowing");
				}

				if (isNaN(my.inputs.term)) {
					$super.error($super.strings.nan_term, my.ui.errors, "term");
				}
			}
		},

		find_rate: function(set) {
			var a, rate;

			for (a = 0; (rate = my.data.products[set].rates[a]); a += 1) {
				if ((my.inputs.loan >= rate.min && my.inputs.loan <= rate.max) &&
					(my.inputs.term >= rate.term.min && my.inputs.term <= rate.term.max)) {
					// calculate total repayable, monthly repayments
					return rate;
				}
			}

			return null;
		},

		write_rate: function(rate, product, reward) {
			var pmt, total, list, part, rep_table, mpr, totaldef, firstmonth, secondmonth;

			if (rate === null) {
				return false;
			}

			if (reward && rate.reward_apr) {
				pmt = my.pmt(parseFloat(rate.reward_apr), my.inputs.term, my.inputs.loan);
			} else {
				pmt = my.pmt(parseFloat(rate.apr), my.inputs.term, my.inputs.loan);
			}

			// apply deferral option
			if (my.inputs.defer) {
				/*
				*	1) Calculate MPR (standard and reward)
				*	2) Multiply total loan amount by MPR
				*	3) Add first month interest to total
				*	4) Repeat step 2 and 3 for X amount of months
				*	5) Calculate pmt using new total loan amount
				*/
				totaldef = my.inputs.loan;

				mpr = Math.pow((1 + ((reward && rate.reward_apr ? rate.reward_apr : rate.apr) / 100)), (1 / 12)) - 1;

				// first month
				firstmonth = totaldef * mpr;
				totaldef += firstmonth;
				// second month
				secondmonth = totaldef * mpr;
				totaldef += secondmonth;

				pmt = my.pmt((reward && rate.reward_apr ? rate.reward_apr : rate.apr), my.inputs.term, totaldef);
			}

			// round pmt
			pmt = parseFloat(pmt.toFixed(2));
			total = pmt * my.inputs.term;

			list = new Element("dl").adopt(
				new Element("dt").set("text", "Monthly repayment")
			).adopt(
				new Element("dd").set("text", pmt.format({
					'prefix': "£",
					'decimals': 2
				}))
			).adopt(
				new Element("dt").set("text", "Total repayable")
			).adopt(
				new Element("dd").set("text", total.format({
					'prefix': "£",
					'decimals': 2
				}))
			).adopt(
				new Element("dt").set("text", "Representative APR")
			).adopt(
				new Element("dd").set("text", (reward && rate.reward_apr ? rate.reward_apr : rate.apr) + "%")
			);

			// representative data table
			rep_table = new Element("div").adopt(
				new Element("h3").set("text", "Representative Example").setStyles({
					"color": "#f45815",
					"margin-bottom": "5px"
				})
			).adopt(
				new Element("p").set("html", my.inputs.nectar ? (reward && rate.reward_apr ? my.rep_data_reward(rate) : my.rep_data_standard(rate)) : my.rep_data_nonectar(rate)).setStyles({
					"color": "#5b5b5b",
					"font-size": "1.2em"
				})).setStyles({
					"position": "relative",
					"border-top": "5px solid #f45815",
					"padding": "10px 0"
				}
			);

			if ((part = product.getElement("div.rates-part"))) {
				part.set("html", "").adopt(list);
				product.getElement("div.foot").set("html", "").adopt(rep_table);
			}
		},

		rep_data_reward: function(rate) {
			var closest = null, msg;

			Object.each(my.data.examples, function(value, key){
				if ((my.inputs.loan >= value.minloan && my.inputs.loan <= value.maxloan) &&
					(my.inputs.term >= value.min && my.inputs.term <= value.max)) {

					Object.each(value.msg_rew, function(text, key) {
						// find closest match
						if (closest === null ||
							Math.abs(key - rate.reward_apr) < Math.abs(closest - rate.reward_apr)) {
							closest = key;
							// save message
							msg = text;
						}
					});
				}
			});

			return msg;
		},

		rep_data_standard: function(rate) {
			var closest = null, msg;

			Object.each(my.data.examples, function(value, key){
				if ((my.inputs.loan >= value.minloan && my.inputs.loan <= value.maxloan) &&
					(my.inputs.term >= value.min && my.inputs.term <= value.max)) {

					Object.each(value.msg_std, function(text, key){
						// find closest match
						if (closest === null ||
							Math.abs(key - rate.apr) < Math.abs(closest - rate.apr)) {
							closest = key;
							// save message
							msg = text;
						}
					});
				}
			});

			return msg;
		},

		rep_data_nonectar: function(rate) {
			var closest = null, msg;

			Object.each(my.data.examples, function(value, key){
				if ((my.inputs.loan >= value.minloan && my.inputs.loan <= value.maxloan) &&
					(my.inputs.term >= value.min && my.inputs.term <= value.max)) {

					Object.each(value.msg_nonectar, function(text, key){
						// find closest match
						if (closest === null ||
							Math.abs(key - rate.apr) < Math.abs(closest - rate.apr)) {
							closest = key;
							// save message
							msg = text;
						}
					});
				}
			});

			return msg;
		},

		apply: function(form, product_id) {
			var a, urls, url;

			if (my.inputs.defer) {
				// deferred
				urls = my.data.urls[product_id].deferred;
				//here is where the appending of data is for the stringquery for loan app
			} else {
				urls = my.data.urls[product_id].nondeferred;
				//here is where the appending of data is for the stringquery for loan app				
			}

			for (a = 0; (url = urls[a]); a += 1) {
				if (my.inputs.loan >= url.min && my.inputs.loan <= url.max) {
					if (my.inputs.nectar) {				
						window.location.href = url.nectar_url+"&term="+my.inputs.term+"&amount="+my.inputs.loan;
					} else {
						window.location.href = url.url+"&term="+my.inputs.term+"&amount="+my.inputs.loan;
					}
				}
			}
		},

		pmt: function(ir, np, pv) {
			var mpr, pmt;
			/*
			*	Calculate MPR (1+APR)^(1/12)-1
			*	ir = 'APR'
			*	var ir is a percentage, thus divided by 100
			*	var mpr returns decimal value for use in var pmt
			*/
			mpr = Math.pow((1 + (ir / 100)), (1 / 12)) - 1;

			/*
			*	Calculate PMT (MPR*AMOUNT)/(1-(1+MPR)^-TERM)
			*	np = 'TERM' number of repayments left
			*	pv = 'AMOUNT' total cost to pay off current loan
			*/
			pmt = (mpr * pv) / (1 - Math.pow((1 + mpr), -Math.abs(np)));
			//	pmt returns new monthly repayments
			return pmt;
		}
	};

	my.enable();
};
