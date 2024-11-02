var LifeInsuranceCalculator = function(container) {
	var my;

	my = {
		enable: function() {
			// define user interface
			my.ui = {
				'form': container.getElement("form"),
				'step1': container.getElement("#step1"),
				'step2': container.getElement("#step2"),
				'step3': container.getElement("#step3"),
				'step4': container.getElement("#step4"),
				'result': container.getElement("#result"),
				'input1a': container.getElement("#family-living"),
				'input2a': container.getElement("#family-years"),
				'input3b': container.getElement("#mortgage"),
				'input4b': container.getElement("#funeral-expenses"),
				'input5b': container.getElement("#debt"),
				'input6c': container.getElement("#life-cover"),
				'input7c': container.getElement("#savings"),
				'input8c': container.getElement("#death-in-service"),
				'input9c': container.getElement("#other"),
				'input10d': container.getElement("#family-future"),
				'subtotal1': container.getElement("#subtotal1"),
				'subtotal2': container.getElement("#subtotal2"),
				'subtotal3': container.getElement("#subtotal3"),
				'subtotal4': container.getElement("#subtotal4"),
				'total': container.getElement("#total span"),
				'calculatorheader': container.getElement("#calculator-header"),
				'stepnav': container.getElements(".calculator-steps li"),
				'stepback': container.getElements(".btn-back a"),
				'steptitle': container.getElement("#calculator-header h2"),
				'stepnext': container.getElements(".tab-footer p.btn-next a"),
				'tooltips': container.getElements(".tooltip")
			};
			// define section titles
			my.steptitles = [
				'Step 1: Current living expenses',
				'Step 2: Assets/cover already in place',
				'Step 3: Significant outgoings',
				'Step 4: Cover for your family&rsquo;s future plans'
			];
			// store subtotal values
			my.subtotals = {
				'sub1': 0,
				'sub2': 0,
				'sub3': 0,
				'sub4': 0
			};

			// years placeholder
			my.placeholder(my.ui.input2a);

			my.ui.stepnext.each(function(next, index) {
				// disable next buttons
				next.addEvent('click', function(event) {
					var parent;

					event.stop();

					parent = next.getParents();
					parent[2].getElements('input').each(function(input, index){
						if (isNaN(parseInt(input.value, 10)) || parseInt(input, 10).value < 0) {
							return input.highlight('#f45815');
						} else {
							my.ui.form.getElements('input').each(function(input, index) {
								my.calculate(input.getParents());
							});
						}
					});
				});
			});

			my.ui.form.getElements('input').each(function(input, index) {
				// init calculations
				input.addEvent('keyup', function(event) {
					my.calculate(input.getParents());
				});
			});

			my.ui.stepback.each(function(back, index) {
				back.addEvent('click', function(event) {
					// breadcrumb back button
					event.stop();
					my.stepback(event);
				});
			});

			if (window.site.tests.device.small) {
				// display mobile tooltips
				my.ui.tooltips.each(function(image, index) {
					var tiptext, tip, location;

					location = image.getParent();
					tiptext = image.get('title');
					// create tip container
					tip = new Element('div.tip-wrap-mobile');
					tip.set('text', tiptext);
					location.grab(tip.adopt(image, 'up'));

				});
			} else {
				// enable desktop tooltips
				my.tooltips = new Tips(my.ui.tooltips, {
					'fixed': true,
					'onShow': function(tip, el) {
						tip.setStyles({
							'z-index': '999',
							'display': 'block',
							'visibility': 'hidden'
						}).fade('in');
						// set tooltip position
						my.tooltips.options.offset.y = -Math.abs((tip.getHeight() / 2) -13);
						my.tooltips.options.offset.x = -Math.abs(tip.getWidth() + 13);
					}
				});
			}
		},

		calculate: function(fields) {
			if (fields[2] === my.ui.step1) {
				// calculate step 1
				my.subtotals.sub1 = parseInt(my.ui.input1a.value.replace(/\,/g,''), 10) *
									parseInt(my.ui.input2a.value.replace(/\,/g,''), 10) * 12;
				// check if output is NaN
				if (isNaN(my.subtotals.sub1) === false) {
					my.ui.subtotal1.innerHTML = my.formatoutput(my.subtotals.sub1);
				} else {
					my.ui.subtotal1.innerHTML = 'O';
				}

				my.ui.step1.getElement('.btn-next a').addEvent('click', function(event) {
					// proceed to next step
					if(parseInt(my.ui.subtotal1.innerHTML, 10) >= 0) {
						my.handletabs(my.ui.step1);
					} else {
						// show error
						my.checkerrors(my.ui.step1);
					}
				});

			} else if (fields[2] === my.ui.step2) {
				// calculate step 2
				my.subtotals.sub2 = parseInt(my.ui.input6c.value.replace(/\,/g,''), 10) +
									parseInt(my.ui.input7c.value.replace(/\,/g,''), 10) +
									parseInt(my.ui.input8c.value.replace(/\,/g,''), 10) +
									parseInt(my.ui.input9c.value.replace(/\,/g,''), 10);
				// check if output is NaN
				if (isNaN(my.subtotals.sub2) === false) {
					my.ui.subtotal2.innerHTML = my.formatoutput(my.subtotals.sub2);
				} else {
					my.ui.subtotal2.innerHTML = 'O';
				}

				my.ui.step2.getElement('.btn-next a').addEvent('click', function(event) {
					// proceed to next step
					if(parseInt(my.ui.subtotal2.innerHTML, 10) >= 0) {
						my.handletabs(my.ui.step2);
					} else {
						// show error
						my.checkerrors(my.ui.step2);
					}
				});

			} else if (fields[2] === my.ui.step3) {
				// calculate step 3
				my.subtotals.sub3 = parseInt(my.ui.input3b.value.replace(/\,/g,''), 10) +
									parseInt(my.ui.input4b.value.replace(/\,/g,''), 10) +
									parseInt(my.ui.input5b.value.replace(/\,/g,''), 10);
				// check if output is NaN
				if (isNaN(my.subtotals.sub3) === false) {
					my.ui.subtotal3.innerHTML = my.formatoutput(my.subtotals.sub3);
				} else {
					my.ui.subtotal3.innerHTML = 'O';
				}

				my.ui.step3.getElement('.btn-next a').addEvent('click', function(event) {
					// proceed to next step
					if(parseInt(my.ui.subtotal3.innerHTML, 10) >= 0) {
						my.handletabs(my.ui.step3);
					} else {
						// show error
						my.checkerrors(my.ui.step3);
					}
				});

			} else if (fields[2] === my.ui.step4) {
				// calculate step 4
				my.subtotals.sub4 = parseInt(my.ui.input10d.value.replace(/\,/g,''), 10);
				// check if output is NaN
				if (isNaN(my.subtotals.sub4) === false) {
					my.ui.subtotal4.innerHTML = my.formatoutput(my.subtotals.sub4);
				} else {
					my.ui.subtotal4.innerHTML = 'O';
				}

				my.ui.step4.getElement('.btn-next a').addEvent('click', function(event) {
					// proceed to next step
					if(parseInt(my.ui.subtotal4.innerHTML, 10) >= 0) {
						// handle last section
						my.handletabs(my.ui.result);
					} else {
						// show error
						my.checkerrors(my.ui.step4);
					}
				});
			}
		},

		handletabs: function(next) {
			var fields, newactive, result;
			// define sections
			fields = my.ui.form.getElements('fieldset');

			if (next !== my.ui.result) {
				// display next section
				next.className = 'tab';
				fields.each(function(active, index) {
					if(active === next) {
						index = index + 1;
						if (next !== my.ui.result) {
							// change title
							my.ui.steptitle.getElement('span').innerHTML = my.steptitles[index];
							// add step breadcrumbs
							my.ui.stepnav[index + 1].className = 'active';
							// set new active section
							newactive = fields[index];
						} else {
							newactive = next;
						}
					}
				});
				// advance to next section
				newactive.className = 'tab active';
			} else {
				// display result section
				next.className = 'tab active';
				// calculate total
				result = my.subtotals.sub1 +
						 my.subtotals.sub4 +
						 my.subtotals.sub3 -
						 my.subtotals.sub2;
				my.ui.total.innerHTML = my.formatoutput(result);
				// hide all other tabs and header
				fields.each(function(section, index) {
					section.className = 'tab';
				});
				my.ui.calculatorheader.className = 'tab';
			}
		},

		placeholder: function(input) {
			var message;

			message = input.get('placeholder');

			input.addEvents({
				focus: function() {
					if(input.value === message) {
						input.value = '';
					}
				},

				blur: function() {
					if(input.value === '') {
						input.value = message;
						input.setStyle('color', '#a9a9a9');
					}
				}
			});
		},

		formatoutput: function(number) {
			// format output number
			number = number.format({
				group: ','
			});

			return number;
		},

		hasclass: function(element, cls) {
			// check if element has a classname
			return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
		},

		stepback: function(event) {
			var fields;
			// define sections
			fields = my.ui.form.getElements('fieldset');
			if (my.hasclass(my.ui.result, 'active')) {
				// result back button to step 1
				my.ui.result.className = 'tab';
				my.ui.step1.className = 'tab active';
				my.ui.calculatorheader.className = '';
				my.ui.steptitle.getElement('span').innerHTML = my.steptitles[0];

				my.ui.stepnav.each(function(step, index){
					if (my.hasclass(step, 'active') &&
						!my.hasclass(step, 'first')) {
						// remove active class
						step.className = '';
					}
				});
			} else {
				fields.each(function(field, index) {
					// check if field has active class and it's not step1
					if(my.hasclass(field, 'active') && field.id !== 'step1') {

						index = index - 1;
						// hide current step
						field.className = 'tab';
						// show previous step
						fields[index].className = 'tab active';
						// change title
						my.ui.steptitle.getElement('span').innerHTML = my.steptitles[index];
						// add step breadcrumbs
						my.ui.stepnav[index + 2].className = '';
					}
				});
			}
		},

		checkerrors: function(field) {
			// highlight inputs
			field.getElements('input').each(function(input, index){
				if (isNaN(parseInt(input.value, 10)) || parseInt(input, 10).value < 0) {
					return input.highlight('#f45815');
				} else {
					return 'true';
				}
			});
		}
	};
	my.enable();
};