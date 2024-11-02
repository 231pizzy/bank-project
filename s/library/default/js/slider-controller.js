// !slider controller class (uses Mootools Slider)
window.SliderController = function(el, options) {
	//create sliders for loan apr calculator
	var my, cls;

	cls = {
		value: null,

		set_min: function() {
			return my.set_min.apply(this, arguments);
		},

		set_max: function() {
			return my.set_max.apply(this, arguments);
		},

		set: function() {
			return my.set.apply(this, arguments);
		}
	};

	my = {
		enable: function() {
			var prop, band_total, range_top, range_bottom;

			options = window.ob_set(options || {}, {
				'range': [0, 100],
				'steps': 100,
				'fill': false,
				'force_steps': false,
				'allow_floats': true,
				'hide': true,
				'hideonsmalldevice': false,
				'device_entry_method': {
					'small': 'input' // label or input
				},
				'output_prefix': '',
				'onError': null,
				'labels': {
					'min_prefix': 'Min ',
					'max_prefix': 'Max '
				}
			});

			my.state = {};
			my.timers = {};

			my.settings = {
				'classes': {
					'with_legend': 'slider-with-legend'
				},
				'defaults': {
					'onChange': function(step) {
						var width, percent;
						cls.value = step;

						if (options.fill) {
							percent = (step * 2) / 10;
							width = ((my.ui.track_inner.offsetWidth / 100) * percent);
							my.ui.fill.setStyle("width", width + 'px');
						}

						my.update_label(step);
					},

					'onComplete': function(step) {
						var width, percent;

						percent = (step * 2) / 10;
						if (options.min && step < options.min) {
							window.setTimeout(function() {
								my.slider.set(options.min);
							}, 500);
						}

						if (options.max && step > options.max) {
							window.setTimeout(function() {
								my.slider.set(options.max);
							}, 500);
						}

						if (options.fill) {
							width = ((my.ui.track_inner.offsetWidth / 100) * percent);
							my.ui.fill.setStyle("width", width + 'px');
						}

						my.update_label(step);

						my.state.manual = false;
					}
				}
			};

			['onChange', 'onComplete'].each(function(prop) {
				if (options[prop] !== undefined) {
					options[prop] = (function(fn, prop) {
						return function(step) {
							my.settings.defaults[prop](step);
							fn(step);
						};
					}(options[prop], prop));
				} else {
					options[prop] = my.settings.defaults[prop];
				}
			});

			cls.value = options.range[0];

			my.ui = {};

			my.ui.slider = new Element("div", {
				'class': 'slider'
			}).adopt(
				my.ui.track = new Element("div", {
					'class': 'track-outer'
				}).adopt(
					my.ui.track_inner = new Element("div", {
						'class': 'track-inner'
					}).adopt(
						my.ui.limit_min = new Element("span", {
							'class': 'limit limit-min'
						})
					).adopt(
						my.ui.limit_max = new Element("span", {
							'class': 'limit limit-max'
						})
					).adopt(
						my.ui.markers = new Element("span.markers")
					)
				).adopt(
					my.ui.knob = new Element("div", {
						'class': 'knob'
					})
				)
			);

			if (options.fill) {
				my.ui.track_inner.adopt(
					my.ui.fill = new Element("div", {
						'class': 'fill'
					})
				);
			}

			// insert banding, if required
			if (options.bands && options.bands.length) {
				my.ui.track_inner.adopt(
					my.ui.bands = new Element("span.bands")
				);

				options.bands.each(function(band, index) {
					my.ui.bands.adopt(
						new Element("span", {
							'class': 'band band-' + index
						}).setStyles({
							'width': band.len,
							'left': band.start
						})
					);
				});
			}

			// insert legend, if required
			if (options.legend) {
				// create legend for range
				my.ui.legend = {
					'items': []
				};

				my.ui.slider.adopt(
					my.ui.legend.shell = new Element("span.legend")
				).addClass(my.settings.classes.with_legend);

				options.range.each(function(i, index) {
					var item, class_name, label;

					if (!isNaN(i)) {
						label = parseFloat(i).format({
							'prefix': options.output_prefix || ""
						});
					} else {
						label = i;
					}

					if (index === 0) {
						label = options.labels.min_prefix + label;
						class_name = 'item item-' + index + ' min';
					} else if (index === (options.range.length - 1)) {
						label = options.labels.max_prefix + label;
						class_name = 'item item-' + index + ' max';
					} else {
						class_name = 'item item-' + index;
					}

					item = new Element("span", {
						'class': class_name
					}).set("text", label);

					my.ui.legend.shell.adopt(item);
					my.ui.legend.items.push(item);
				});
			}

			my.ui.slider.inject(el, 'before');

			//knob_half_width = (my.ui.knob.offsetWidth / 2);

			// handle mobile events
			my.ui.slider.addEvent('touchstart', my.handle_event);
			my.ui.slider.addEvent('touchmove', my.handle_event);
			my.ui.slider.addEvent('touchend', my.handle_event);

			my.slider = new window.Slider(my.ui.track, my.ui.knob, options);

			my.slider.set(0);

			if (options.hide) {
				el.setStyle("display", "none");
			}

			if (options.label) {
				if (options.label.tagName === "INPUT") {
					// el value can change the slider position
					options.label.addEvent("keyup", function() {
						var fn = (function(input) {
							return function() {
								var val;

								val = parseFloat(input.get("value").replace(/[^\d.]*/g, ""));

								if (!options.allow_floats &&
									input.get("value").toString().indexOf('.') !== -1) {
									options.onError.apply(this, ["decimal", val]);
									return null;
								} else {
									options.onError.apply(this, [null]);
								}

								if (val >= options.range[0] && val <= options.range[options.range.length - 1]) {
									my.state.manual = true;

									// check value is one of step values, if required
									if (options.force_steps && options.steps > 0) {
										// augment value to one of the defined increments
										val = my.force_step(val);

										// re-set value into label
										options.label.set("value", val);

										// unset manual operation
										my.state.manual = false;
									}

									my.slider.set(val);

									if (my.timers.fieldupdate) {
										window.clearTimeout(my.timers.fieldupdate);
									}
								} else {
									if (val < options.range[0] && typeof options.onError === "function") {
										options.onError.apply(this, ["boundary_lower", val]);
									}

									if (val > options.range[options.range.length - 1] && typeof options.onError === "function") {
										options.onError.apply(this, ["boundary_upper", val]);
									}
								}

								delete my.timers.keyup;
							};
						}(this));

						if (my.timers.keyup) {
							window.clearTimeout(my.timers.keyup);
						}

						my.timers.keyup = window.setTimeout(fn, 750);
					});
				}

				my.ui.label = options.label;
			}

			if (options.hideonsmalldevice === true) {
				// set up monitor for resizing sliders
				window.JSMedia.monitor(window.site.device_monitors.small, function(result) {
					if (result[0]) {
						// hide
						my.ui.slider.setStyle('display', 'none');
						if (options.device_entry_method.small === 'input') {
							my.ui.label.setStyle('display', 'none');
							el.setStyle('display', '');
						}
					} else {
						// show
						my.ui.slider.setStyle('display', '');
						my.ui.label.setStyle('display', '');
						el.setStyle('display', 'none');
					}
				});
			}
		},

		handle_event: function(event) {
			// enable slider on mobile
			var trigger, first_touch, translated_type;

			switch (event.type) {
				case "touchstart":
				case "touchmove":
				case "touchend":
					// touch translation to cursor events
					first_touch = event.changedTouches[0];

					switch(event.type) {
						case "touchstart":
							translated_type = "mousedown";
							break;
						case "touchmove":
							translated_type = "mousemove";
							break;
						case "touchend":
							translated_type = "mouseup";
							break;
					}

					if (translated_type !== null) {
						// trigger simulated event
						trigger = document.createEvent("MouseEvent");

						trigger.initMouseEvent(
							translated_type, true, true, window, 1,
							first_touch.screenX, first_touch.screenY,
							first_touch.clientX, first_touch.clientY, false,
							false, false, false, 0, null
						);

						if (!first_touch.target.dispatchEvent(trigger)) {
							// stop current event
							event.preventDefault();
						}
					}

				break;
			}
		},

		set_min: function(n) {
			// set the minimum amount allowed - must be within the range
			if (n !== undefined) {
				if (n >= options.range[0]) {
					options.min = n;
				}

				if (cls.value < options.min) {
					my.slider.set(options.min);
				}

				my.set_limit_display(true, n);
			} else {
				delete options.min;
				my.set_limit_display(true, 0);
			}
		},

		set_max: function(n) {
			// set the maximum amount allowed - must be within the range
			if (n !== undefined) {
				if (n <= options.range[options.range.length - 1]) {
					options.max = n;
				}

				if (cls.value > options.max) {
					my.slider.set(options.max);
				}

				my.set_limit_display(false, n);
			} else {
				delete options.max;
				my.set_limit_display(false, 0);
			}
		},

		set_limit_display: function(min, n) {
			var percent, width, total;

			if (min) {
				// calculate min's percent of total
				total = options.range[options.range.length - 1] - options.range[0];
				n = n - options.range[0];
				percent = (n / total * 100);
				width = my.ui.track_inner.offsetWidth * (percent / 100);

				// set display to min
				my.ui.limit_min.setStyle('width', parseInt(width, 10) + 'px');
			} else {
				// calculate min's percent of total
				total = options.range[options.range.length - 1] - options.range[0];
				n = (total - n) + options.range[0];

				percent = (n / total * 100);
				width = my.ui.track_inner.offsetWidth * (percent / 100);

				// set display to max
				my.ui.limit_max.setStyle('width', parseInt(width, 10) + 'px');
			}
		},

		force_step: function(val) {
			var increment;

			// force the value to be within n steps
			increment = (options.range[options.range.length - 1] - options.range[0]) / options.steps;
			val = Math.round(val / increment) * increment;

			return val;
		},

		set: function(val) {
			// set the slider value
			if (options.force_steps) {
				val = my.force_step(val);
			}

			my.slider.set(val);
		},

		update_label: function(step) {
			var value;

			if (options.label && !my.state.manual) {
				value = parseFloat(step);

				if (!isNaN(value)) {
					value = value.format({
						'prefix': options.output_prefix || ""
					});
				}

				if (options.label.tagName === "INPUT") {
					options.label.set("value", value);
				} else {
					options.label.set("text", value);
				}
			}
		}
	};

	my.enable();

	return cls;
};

