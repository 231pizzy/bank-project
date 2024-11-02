(function($) {
	window.ob_set = function(ob, defaults) {
		// set default object properties
		var key;

		for (key in defaults) {
			if (defaults.hasOwnProperty(key)) {
				if (defaults[key] !== null && defaults[key].constructor === Object &&
					(ob[key] === undefined || ob[key].constructor === Object)) {
					// traverse nested objects
					ob[key] = window.ob_set(ob[key] || {}, defaults[key]);
				} else if (ob[key] === undefined) {
					// replace missing objects
					ob[key] = defaults[key];
				}
			}
		}

		return ob;
	};

	// !hash collection/setting class
	window.hashController = (function() {
		return {
			get_raw: function() {
				var hash;

				hash = location.hash.trim();

				if (hash.charAt(0) === "#") {
					hash = hash.substr(1);
				}

				return hash;
			},

			get: function(prefix) {
				// retrieve array of hash components
				var raw, items, a, result;

				raw = this.get_raw();

				if (prefix === undefined) {
					// return the hash as an array of items
					if (raw !== "") {
						return raw.split("index.html");
					} else {
						return [];
					}
				} else {
					// return a specific hash component (starting with the specified prefix)
					if (typeof prefix !== "string" || prefix.length < 1) {
						throw new Error("Prefix cannot be non-string or less than 1 character in length");
					}

					items = this.get();

					result = {
						'raw': '#' + raw,
						'matched': ''
					};

					for (a = (items.length - 1); (a >= 0); a -= 1) {
						if (items[a].substr(0, prefix.length) === prefix) {
							result.matched = items[a];
							break;
						}
					}

					return result;
				}
			},

			set: function(prefix, suffix) {
				// sets the hash, using the prefix to find an existing value
				var items, value, a;

				items = this.get();

				value = prefix + suffix;

				if (items.length > 1) {
					for (a = (items.length - 1); (a >= 0); a -= 1) {
						if (items[a].substr(0, prefix.length) === prefix) {
							if (suffix !== null) {
								items[a] = value;
							} else {
								items.splice(a, 1);
							}

							break;
						}
					}

					location.hash = items.join("index.html");
				} else {
					location.hash = value;
				}

				return location.hash;
			}
		}
	}());

	// !include class
	window.Include = (function() {
		var loaded = [];

		return {
			load: function(js_file, callback, type) {
				var script;

				if (loaded.indexOf(js_file) === -1) {
					type = (type || "text/javascript");
					script = document.createElement("script");

					if (script.setAttribute) {
						script.setAttribute("type", type);
					}

					loaded.push(js_file);

					if (typeof callback === "function") {
						if ("onreadystatechange" in script) {
							script.onreadystatechange = function() {
								if (this.readyState === "loaded" || this.readyState === "complete") {
									this.onreadystatechange = null;
									callback();
								}
							};
						} else {
							script.onload = callback;
						}
					}

					script.src = js_file;

					document.getElementsByTagName("head")[0].appendChild(script);
				} else {
					callback();
				}
			}
		};
	}());

	// !js media query class
	window.JSMedia = (function() {
		var my, cls;

		cls = {
			/**
			* JSMedia.last_query -> Object
			* Contains details about the last media query performed. If none has been performed yet,
			* `JSMedia.last_query.query` is set to `null`.
			**/
			last_query: {
				'query': null,
				'string': ''
			},

			/**
			* JSMedia.run(query) -> Boolean
			* - query (Array): The CSS media query to test. Define multiple Arrays for each optional
			* query. Multiple items in each Array must all be matched for the query to match.
			*
			* This method works in a similar way to the media queries within CSS. The User Agent is
			* tested for compatibility with the query, and returns a result.
			*
			* Either a `screen` device with a width of `1000px` or a `projection` device will be matched with
			* The above query.
			**/
			run: function(query) {
				var media_query, clauses, a, b, result;

				if (my.mqtest === undefined) {
					// insert an element for css application
					$(document.body).adopt(
						my.mqtest = new Element("div", {
							'id': 'js-media-test'
						}).setStyle("display", "none")
					);
				}

				this.last_query.query = query;

				if (typeof query === "string") {
					// one query
					media_query = query;
				} else if (query.length > 0) {
					// multiple queries (OR)
					media_query = [];

					for (a = 0; a < query.length; a += 1) {
						// each clause joined with AND
						clauses = [];

						if (typeof query[a] === "string") {
							clauses.push(query[a]);
						} else {
							for (b = 0; b < query[a].length; b += 1) {
								clauses.push(query[a][b]);
							}
						}

						media_query.push(clauses.join(" and "));
					}

					media_query = "only " + media_query.join(", ");
					this.last_query.string = media_query;
				}

				// inject css for test
				$$("head")[0].adopt(
					my.mqcss = new Element("style", {
						'type': 'text/css',
						'media': media_query
					})
				);

				// browser specific injection
				if (my.mqcss.styleSheet) {
					my.mqcss.styleSheet.cssText = "div#js-media-test { visibility: hidden; }";
				} else if (my.mqcss.sheet) {
					my.mqcss.sheet.insertRule("div#js-media-test { visibility: hidden; }", 0);
				}

				// test rule application
				if (my.mqtest.getStyle("visibility") === "hidden") {
					// query applies
					result = true;
				} else {
					// query does not apply
					result = false;
				}

				my.mqcss.destroy();

				return result;
			},

			/**
			* JSMedia.monitor(query, callback) -> Number
			* JSMedia.monitor(query[, query...], callback) -> Number
			* - query (Array): The CSS media query to test. See [[JSMedia.run]] for details
			* - callback (Function): The function to run once a media result is obtained
			*
			* Monitors the user agent constantly for media aware changes.
			*
			* ### Passed arguments to `callback`
			* 1. `result` (`Array`): An array containing the results for each passed query.
			*    if only one query was passed, an array containing one element is returned.
			*
			* Returns the index for the added monitor rule. Used by [[JSMedia.end_monitor]].
			**/
			monitor: function() {
				var a, queries, callback, result;

				if (arguments.length < 2) {
					throw new Error("Arguments must include at least one query and a callback");
				}

				queries = [];

				for (a = 0; a !== arguments.length; a += 1) {
					// get query(ies) from argument
					if (typeof arguments[a] === "function") {
						callback = arguments[a];
					} else {
						queries.push(arguments[a]);
					}
				}

				my.monitors.push({
					'queries': queries,
					'callback': callback
				});

				my.exec_monitor(my.monitors.length - 1);

				if (my.monitors.length === 1) {
					window.addEvent("resize", my.resize);
				}

				return (my.monitors.length - 1);
			},

			/**
			* JSMedia.end_monitor(index) -> Boolean
			* - index (Number): The monitor rule index (as returned by [[JSMedia.monitor]])
			*
			* Ends a monitoring rule and removes it from memory.
			*
			* Returns `true` on success, `false` otherwise.
			**/
			end_monitor: function(index) {
				var result;

				if (my.monitors.length > index) {
					result = !!(my.monitors.splice(index, 1));

					if (my.monitors.length === 0) {
						window.removeEvent("resize", my.resize);
					}

					return result;
				} else {
					return false;
				}
			}
		};

		my = {
			timers: {},
			monitors: [],

			resize: function() {
				if (my.timers.resize) {
					window.clearTimeout(my.timers.resize);
				}

				my.timers.resize = window.setTimeout(function() {
					my.exec_monitor();
					delete my.timers.resize;
				}.bind(this), 100);
			}.bind(cls),

			exec_monitor: function() {
				var a, b, result;

				if (my.monitors.length > 0) {
					for (a = 0; a !== my.monitors.length; a += 1) {
						result = [];

						for (b = 0; b !== my.monitors[a].queries.length; b += 1) {
							result.push(this.run(my.monitors[a].queries[b]));
						}

						my.monitors[a].callback.apply(
							this,
							[result]
						);
					}
				}
			}.bind(cls)
		};

		return cls;
	}());

	// !generic animator class
	window.Animator = new Class({
		// animator class for handling tweening between properties
		initialize: function(element) {
			this.element = element;

			this.animation_delta = 20;
			this.x = 0;

			this.params = {};
		},

		start: function(options) {
			this.params.property = options.property;

			if (this.element.getStyle(options.property) === "auto") {
				this.params.start = 0;
			} else {
				this.params.start = parseFloat(this.element.getStyle(options.property));
			}

			this.params.end = options.target;
			this.params.step = options.step || null;
			this.params.duration = options.duration || 1000;

			this.x = 0;

			this.thread = setInterval(
				function() {
					this.animate(options);
				}.bind(this),
				this.animation_delta
			);
		},

		animate: function(options) {
			var val;

			val = this.params.start + (this.params.end - this.params.start) * this.sigmoid(this.x / this.params.duration);
			this.element.setStyle(this.params.property, val + 'px');

			if(this.x >= this.params.duration) {
				clearInterval(this.thread);

				this.element.setStyle(this.params.property, this.params.end + 'px');

				if (typeof options.callback === "function") {
					options.callback();
				}
			}

			this.x += this.animation_delta;
		},

		sigmoid: function(x) {
			var scaled_x = -6 + (x * 12);
			return 1 / (1 + Math.exp(-scaled_x));
		}
	});

	// !primary navigation class
	window.PrimaryNav = function(container, spotlights) {
		var my;

		my = {
			enable: function() {
				my.settings = {
					'spotlight_uri': '/includes/nav-spotlights.shtml'
				};

				my.over = false;
				my.timers = {};
				my.sections = [];
				my.post_load_id = null;

				if (spotlights) {
					my.parse_spotlights();

					container.getElements("a").each(function(a) {
						a.addEvent("mouseover", function() {
							var rel;

							rel = (a.get("rel") || "").match(/spt-([^\s]+)/);

							if (rel !== null && rel[1]) {
								my.over = true;

								my.spotlight(rel[0]);

								if (my.timers.leave) {
									window.clearInterval(my.timers.leave);
								}

								my.timers.leave = window.setInterval(my.leave, 500);
							} else {
								my.over = false;
								my.spotlight(null);
							}
						})
					})

					container.addEvents({
						'mouseenter': function(event) {
							my.over = true;
						},
						'mouseleave': function() {
							my.over = false;
						}
					});

					spotlights.addEvents({
						'mouseenter': function() {
							my.over = true;
						},
						'mouseleave': function() {
							my.over = false;
						}
					}).addClass("active");
				}
			},

			parse_spotlights: function() {
				// parse the loaded in sections to an internal array for use
				var sections;

				if (spotlights) {
					sections = spotlights.getElements("div.section");

					if (sections.length) {
						sections.each(function(div) {
							my.sections.push({
								'id': div.id,
								'el': div,
								'nav': container.getElement("a[rel='" + div.id + "']")
							});

							div.setStyles({
								'display': 'none'
							});
						});
					}
				}

				return true;
			},

			spotlight: function(id) {
				// load the spotlight by ID (or nothing at all, if id is null)
				my.post_load_id = id;

				if (id && spotlights && my.sections.length === 0 && !my.loading) {
					// load in spotlight markup
					my.loading = true;

					spotlights.setStyles({
						'display': 'block'
					}).addClass("loading");

					my.request = new Request({
						'url': my.settings.spotlight_uri,
						'timeout': 5000,
						'onSuccess': function(text) {
							spotlights.removeClass("loading");
							spotlights.innerHTML = text;

							window.site.parse(spotlights);

							if (my.parse_spotlights()) {
								my.loading = false;
								my.spotlight(my.post_load_id);
							}
						}
					});

					my.request.send();
				} else {
					if (my.sections.length > 0) {
						// sections exist - work to display the correct section
						for (a = 0; a < my.sections.length; a++) {
							if (my.sections[a].id == id) {
								// show section
								spotlights.setStyles({
									'display': 'block'
								});

								my.sections[a].el.setStyles({
									'display': 'block'
								});

								if (my.sections[a].nav) {
									my.sections[a].nav.addClass("active");
								}
							} else {
								// hide section
								my.sections[a].el.setStyles({
									'display': 'none'
								});

								if (my.sections[a].nav) {
									my.sections[a].nav.removeClass("active");
								}
							}
						}
					} else {
						// no sections - hide/show spotlight container only
						if (spotlights) {
							if (my.loading && my.over) {
								// loading currently (and mouse over) - show container
								spotlights.setStyles({
									'display': 'block'
								});
							} else {
								// mouse not over - hide container
								spotlights.setStyles({
									'display': 'none'
								});
							}
						}
					}
				}
			},

			leave: function() {
				// cursor has left the building - hide everything
				if (!my.over) {
					window.clearInterval(my.timers.leave);
					delete my.timers.leave;

					my.spotlight(null);
				}
			}
		};

		my.enable();
	};

	// !tab controller class
	window.TabController = function(container, options) {
		var my, cls;

		cls = {
			// public interface
			tab: function() {
				return my.tab.apply(this, arguments);
			}
		};

		my = {
			enable: function() {
				// find and store parts
				var tabs, controller, preset, header_tag;

				options = window.ob_set(options || {}, {
					'tabs': {
						'position': 'top'
					},
					'callbacks': {
						'change': null
					}
				});

				my.settings = {
					'classes': {
						'container': 'tabbed-content',
						'controller': 'controller',
						'solo_controller': 'tabbed-controller',
						'default_tab': 'default-tab',
						'link_override': 'tab-link-override',
						'set_keep_headers': 'retain-headers',
						'tab_hide': 'tab-hidden'
					},
					'tab_prefix': 'tab-',
					'valid_tab_headers': ['H2', 'H3', 'H4'],
					'keep_headers': false
				};

				// set class based settings
				my.settings.keep_headers = container.hasClass(my.settings.classes.set_keep_headers);

				my.tabs = [];
				my.timers = {};
				my.start_index = 0;
				my.index = null;
				my.scroll = new window.Fx.Scroll(window);

				my.get_hash();

				tabs = container.getChildren(".tab");

				if (tabs.length > 1) {
					// more than one tab exists - collect and manage
					my.ui = {
						'controller': new Element("ul", {
							'class': my.settings.classes.controller
						}).inject(
							container, options.tabs.position
						).addEvent("click:relay(li)", my.handle_event)
					};

					tabs.each(function(tab, index) {
						var header, classes, id, link;

						if (header_tag === undefined) {
							// find valid headers
							tab.getChildren().each(function(el) {
								if (my.settings.valid_tab_headers.indexOf(el.tagName) !== -1 &&
									header_tag === undefined) {
									header_tag = el.tagName;
								}
							});
						}

						if ((header = tab.getElement(header_tag))) {
							// get id from header text
							id = tab.id || header.get("text");
							id = id.toLowerCase();
							id = id.replace(/[^-a-z0-9 ]*/g, "").replace(/\s+/g, "-");

							if (tab.hasClass(my.settings.classes.default_tab) &&
								preset === undefined) {
								// default tab (overridden by hash)
								my.start_index = index;
							} else if (my.hash.raw !== "" &&
								my.hash.id === my.settings.tab_prefix + id) {
								preset = index;
							}

							tab = {
								'id': id,
								'el': tab,
								'header': header
							};

							// get classes of the tab for inheriting into the controller
							classes = (tab.el.className || "").split(" ").erase("tab");

							// add controller element
							my.ui.controller.adopt(
								tab.nav = new Element("li").adopt(
									tab.anchor = my.controller_element(
										classes.join(" "),
										header.get("html")
									)
								)
							);

							if (tab.el.hasClass(my.settings.classes.tab_hide)) {
								tab.nav.setStyle("display", "none");
							}

							if ((link = tab.el.getElement("." + my.settings.classes.link_override)) &&
								(link = link.getElement("a[href]"))) {
								// override link contained within the tab - go to the link href
								tab.link = link;
								tab.anchor.setProperty("href", link.getProperty("href"));
							}

							if (!my.settings.keep_headers) {
								// remove header from DOM
								header.dispose();
							}

							// hide tab (for now)
							tab.el.setStyle("display", "none");

							my.tabs.push(tab);
						}
					});

					// set active item
					if (preset !== undefined) {
						my.tab(preset);
					} else {
						// default index
						my.tab(my.start_index, false);
					}

					// set last, first nav items
					if (my.tabs[0].nav) {
						my.tabs[0].nav.addClass("first");
					}

					if (my.tabs[(my.tabs.length - 1)].nav) {
						my.tabs[(my.tabs.length - 1)].nav.addClass("last");
					}

					// set hash scanning event
					if ("onhashchange" in window) {
						if ("addEventListener" in window) {
							window.addEventListener("hashchange", function() {
								my.find_tab(true);
							}, false);
						} else {
							window.attachEvent("onhashchange", function() {
								my.find_tab(true);
							});
						}
					} else {
						my.timers.hashchange = window.setInterval(function() {
							my.find_tab(true);
						}, 500);
					}
				} else if (container.hasClass(my.settings.classes.solo_controller) &&
					(controller = container.getElement("ul")) &&
					(tabs = controller.getElements("li"))) {
					// tabbed container is static controller only
					controller.addClass(my.settings.classes.controller);
					container.removeClass(
						my.settings.classes.solo_controller
					).addClass(
						my.settings.classes.container
					);

					tabs.each(function(li) {
						var html;

						html = (li.getElement("a") || li).get("html");

						li.empty().adopt(
							my.controller_element("", html)
						);
					});
				}
			},

			controller_element: function(classname, contents) {
				return new Element("a", {
					'href': '#',
					'class': classname
				}).adopt(
					new Element("strong").adopt(
						new Element("span", {
							'class': 'outer'
						}).adopt(
							new Element("span", {
								'class': 'align'
							}).set("html", contents)
						).adopt(
							new Element("span", {
								'class': 'anchor'
							})
						)
					)
				);
			},

			handle_event: function(event, target) {
				var index;

				event.preventDefault();
				index = target.getAllPrevious().length;

				if (index > -1 && index < my.tabs.length) {
					my.tab(index);
				}
			},

			find_tab: function(instant) {
				// find the managed tab based on the current hash
				var a;

				if (location.hash !== my.hash.raw) {
					//hash exists and is different from stored hash
					my.get_hash();

					for (a = 0; a < my.tabs.length; a += 1) {
						if (my.hash.id === my.settings.tab_prefix + my.tabs[a].id) {
							my.tab(a, false);
							return;
						}
					}
				}
			},

			tab: function(index, set_hash) {
				var tab;

				if (set_hash === undefined) {
					set_hash = true;
				}

				if ((tab = my.tabs[index]) && index !== my.index) {
					if (tab.link) {
						// override link contained within the tab - go to the link href
						window.location.href = tab.link.getProperty("href");
					} else {
						// normal tab operation
						if (my.index !== null) {
							my.tabs[my.index].el.setStyle("display", "none");

							if (my.tabs[my.index].nav) {
								my.tabs[my.index].nav.removeClass("active");
							}
						}

						tab.el.setStyle("display", "block");

						if (tab.nav) {
							tab.nav.addClass("active");
						}

						if (set_hash) {
							window.hashController.set(my.settings.tab_prefix, tab.id);
						}

						if (window.site.tests.device.small && set_hash) {
							my.scroll.toElement(container);
						}

						if (typeof options.callbacks.change === "function") {
							options.callbacks.change.apply(this, [index, tab, set_hash]);
						}

						my.index = index;
					}
				}
			},

			get_hash: function() {
				var hash;

				hash = window.hashController.get(my.settings.tab_prefix);

				my.hash = {
					'raw': hash.raw,
					'id': hash.matched
				};
			}
		};

		my.enable();

		return cls;
	};

	// !carousel class
	window.Carousel = function(container, options) {
		var my, cls;

		cls = {
			// public interface,
			adjust: function() {
				return my.adjust.apply(this, arguments);
			},

			slide: function() {
				return my.slide.apply(this, arguments);
			}
		};

		my = {
			enable: function() {
				var slides;

				// set options
				options = window.ob_set(options || {}, {
					'text': {
						'animation': 'fade'
					},
					'slides': {
						'width': '',
						'height': ''
					},
					'large_carousel': false,
					'container': '',
					'compute_options': {
						'styles': ['margin', 'padding']
					},
					'animation': {
						'automated': false,
						'delay': 5000,
						'duration': 400,
						'controller': false
					},
					'controls': {
						'shown': 5
					},
					'index': 0
				});

				// get and prepare ui
				if (options.large_carousel) {
					// large (homepage) carousel
					container = container.getParent(options.container) || container;

					container.addClass("carousel-container");

					my.ui = {
						'inner': container.getElement("div.inner"),
						'carousel': container.getElement(".carousel"),
						'controls': new Element("ul", {
							'class': 'controls'
						}),
						'navigation': {}
					};
				} else {
					// standard carousel
					my.ui = {
						'carousel': container,
						'navigation': {}
					};

					container = new Element("div.carousel-container").inject(
						container,
						"before"
					);

					container.adopt(
						my.ui.inner = new Element("div.inner").adopt(
							my.ui.carousel
						)
					);
				}

				my.status = {
					'enabled': false,
					'index': options.index,
					'animating': false
				};

				my.cache = {};
				my.timers = {};
				my.metrics = {};

				if (my.ui.inner && my.ui.carousel) {
					slides = my.ui.carousel.getElements(".slide");

					if (slides.length >= 3) {
						// gather up and store slides
						my.slides = [];

						if (options.large_carousel) {
							my.ui.inner.adopt(
								new Element("div", {
									'class': 'control-container'
								}).adopt(my.ui.controls)
							).adopt(
								new Element("span", {
									'class': 'overlay overlay-prefix'
								})
							).adopt(
								new Element("span", {
									'class': 'overlay overlay-suffix'
								})
							);
						}

						// attach animator instances to animating items
						if (options.large_carousel) {
							my.ui.controls.animator = new window.Animator(my.ui.controls);
						}

						my.ui.carousel.animator = new window.Animator(my.ui.carousel);

						slides.each(function(slide, index) {
							var nav, link, text, header, subheader, thumb, classes, nav_bg;

							text = slide.getElement("div.text");
							classes = (slide.className || "").split(" ").erase("slide");

							if (index === 0) {
								classes.push("first");
							}

							if (index === (slides.length - 1)) {
								classes.push("last");
							}

							if (index === 0) {
								// get sizes from first item
								my.metrics.slide = slide.measure(function() {
									return slide.getComputedSize(options.compute_options);
								});

								if (options.slides.width !== '') {
									my.metrics.slide.width = options.slides.width;
								}

								if (options.slides.height !== '') {
									my.metrics.slide.height = options.slides.height;
								}

								// fix metrics of carousel
								my.ui.carousel.setStyles({
									'height': my.metrics.slide.totalHeight + 'px'
								});
							}

							// set 'base' metrics for recall
							my.cache.base_metrics = my.metrics.slide;

							// fix metrics of slide
							slide.setStyles({
								'width': my.metrics.slide.width + 'px',
								'height': my.metrics.slide.height + 'px'
							});

							if (options.large_carousel) {
								if (text) {
									header = text.getElement("h2");
									subheader = text.getElement("h3");
								}

								if ((thumb = slide.getElement("img"))) {
									thumb = thumb.get("src");
								}

								link = new Element("span.link");

								if (thumb) {
									link.adopt(
										new Element("span.image").setStyles({
											'background-image': 'url(' + thumb + ')'
										}).adopt(
											new Element("span.context")
										)
									);
								}

								if (header) {
									link.adopt(
										new Element("span.header").adopt(
											new Element("strong").set("html", header.get("html"))
										).adopt(
											new Element("i")
										)
									);
								}

								if (subheader) {
									link.adopt(
										new Element("span.subheader").set("html", subheader.get("html"))
									);
								}

								// add controls
								my.ui.controls.adopt(
									nav = new Element("li", {
										'class': classes.join(" ")
									}).adopt(
										new Element("a", {
											'href': '#'
										}).adopt(link).addEvent("click", (function(index) {
											return function(event) {
												event.stop();
												my.slide(index, true);
											};
										}(my.slides.length)))
									)
								);

								if (index === 0) {
									// get nav metrics
									my.metrics.nav = nav.getComputedSize(options.compute_options);

									// fill cache with nav background
									nav_bg = (nav.getStyle("backgroundImage") || "").replace(
										/url\(("|')?([^\)"']*)("|')?\)/i,
										"$2"
									);

									if (nav_bg !== null && nav_bg !== "" && nav_bg !== "none") {
										my.cache.nav = new Image();
										my.cache.nav.src = nav_bg;
									}
								}

								if (index === my.status.index) {
									// index is current slide
									nav.addClass("active");
								}
							}

							if (text && index !== my.status.index) {
								// index is slide other than current
								if (options.text.animation === "move") {
									text.setStyle("left", -500 + 'px');
								} else {
									text.setStyle("opacity", 0);
								}
							}

							my.slides.push({
								'text': text,
								'slide': slide,
								'size': [my.metrics.slide.width, my.metrics.slide.height],
								'nav': nav
							});
						});

						my.ui.carousel.setStyle(
							"width", (my.metrics.slide.totalWidth * my.slides.length) + 'px'
						);

						if (options.large_carousel) {
							my.ui.controls.setStyle(
								"width", (my.metrics.nav.totalWidth * my.slides.length) + 'px'
							);
						}

						if (my.slides.length > 1) {
							// add navigation (and events)
							my.ui.inner.adopt(
								my.ui.navigation.next = new Element("a", {
									'class': 'nav ir nav-prev'
								}).set("text", "Prev").adopt(
									new Element("span")
								).addEvent("click", function(event) {
									event.stop();
									my.adjust(-1, true);
								})
							).adopt(
								my.ui.navigation.next = new Element("a", {
									'class': 'nav ir nav-next'
								}).set("text", "Next").adopt(
									new Element("span")
								).addEvent("click", function(event) {
									event.stop();
									my.adjust(1, true);
								})
							);

							if (options.animation.controller) {
								my.ui.inner.adopt(
									my.ui.controller = new Element("a.controller", {
										'href': '#'
									}).addEvent("click", function(event) {
										event.stop();
										my.timer_toggle()
									}).set(
										"text", "Pause/Play"
									)
								);
							}

							// activate
							my.activate();
						}
					} else {
						return false;
					}
				} else {
					return false;
				}

				my.timer();
			},

			timer: function() {
				if (options.animation.automated && options.animation.delay > 0) {
					my.timers.transition = window.setTimeout(function() {
						if (my.timers.transition) {
							window.clearTimeout(my.timers.transition);
							delete my.timers.transition;
						}

						if (!my.status.animating && !my.status.interactive) {
							my.adjust(1, true);
						} else {
							my.timers.transition = window.setTimeout(function() {
								my.timer();
							}, options.animation.delay);
						}
					}, options.animation.delay);
				}
			},

			timer_toggle: function(automate) {
				if (automate === undefined) {
					automate = !options.animation.automated;
				}

				options.animation.automated = automate;

				if (automate === true) {
					// automation is on
					my.ui.controller.removeClass("paused");

					my.timer();
				} else {
					my.ui.controller.addClass("paused");

					if (my.timers.transition) {
						window.clearTimeout(my.timers.transition);
						delete my.timers.transition;
					}
				}
			},

			activate: function() {
				// attach events
				container.addEvent("mouseenter", function() {
					my.status.interactive = true;
				}).addEvent("mouseleave", function() {
					my.status.interactive = false;
				});

				// set up monitor for resizing carousel
				window.JSMedia.monitor(window.site.device_monitors.small, function(result) {
					my.resize(!result[0]);
				});

				// activate carousel
				my.status.enabled = true;

				// resize immediately (if required)
				if (window.site.tests.device.small) {
					my.resize(false);
				}
			},

			resize: function(base) {
				// set the carousel slide sizes based on the inner size
				var metrics;

				if (!base) {
					metrics = my.ui.inner.getSize();
				}

				my.slides.each(function(slide, index) {
					if (base) {
						// resize to base properties
						slide.slide.setStyles({
							'width': my.cache.base_metrics.width + 'px',
							'height': my.cache.base_metrics.height + 'px'
						});
					} else {
						// resize based on inner width
						slide.slide.setStyles({
							'width': metrics.x -
								(my.metrics.slide['margin-left'] + my.metrics.slide['margin-right']) + 'px',
							'height': metrics.y + 'px'
						});
					}

					if (index === 0) {
						my.metrics.slide = slide.slide.getComputedSize(options.compute_options);
					}
				});

				// fix metrics of carousel
				my.ui.carousel.setStyles({
					'height': my.metrics.slide.totalHeight + 'px'
				});

				my.slide(my.status.index, false);
			},

			adjust: function(adjustment, interactive) {
				var index;

				if (!my.status.enabled) {
					return false;
				}

				index = my.status.index + adjustment;

				if (index < 0) {
					index = (my.slides.length - 1);
				} else if (index > (my.slides.length - 1)) {
					index = 0;
				}

				my.slide(index, interactive);
			},

			slide: function(index, interactive) {
				var slide, pos, adjust, effect;

				if (!my.status.enabled || my.status.animating) {
					return false;
				}

				if (((interactive && index !== my.status.index) || !interactive) &&
					(slide = my.slides[index])) {
					pos = {
						'carousel': my.ui.carousel.getPosition(my.ui.inner),
						'slide': slide.slide.offsetLeft
					};

					adjust = {
						'carousel': -(pos.slide - (my.metrics.slide['margin-left']))
					};

					if (slide.nav && options.controls.shown < my.slides.length) {
						pos.nav = slide.nav.getPosition(my.ui.controls);

						if (index === 0) {
							adjust.nav = 0;
						} else if (index === (my.slides.length - 1)) {
							adjust.nav = -((pos.nav.x) - (my.metrics.nav.totalWidth *
								Math.floor(options.controls.shown - 1)));
						} else {
							adjust.nav = -((pos.nav.x) - (my.metrics.nav.totalWidth *
								Math.floor(options.controls.shown / 2)));
						}
					}

					if (!interactive) {
						// adjust carousel position
						my.ui.carousel.setStyles({
							'left': adjust.carousel + 'px'
						});

						if (options.large_carousel) {
							// set active nav
							my.slides[my.status.index].nav.removeClass("active");
							slide.nav.addClass("active");

							if (adjust.nav !== undefined) {
								// adjust nav position
								my.ui.controls.setStyles({
									'left': adjust.nav + 'px'
								});
							}
						}
					} else {
						my.status.animating = true;

						if (my.slides[my.status.index].text) {
							effect = new window.Fx.Morph(my.slides[my.status.index].text, {
								'duration': 200,
								'transition': window.Fx.Transitions.Quad.easeInOut
							}).addEvent("complete", function() {
								// animate carousel
								effect = new window.Fx.Morph(my.ui.carousel, {
									'duration': options.animation.duration,
									'transition': window.Fx.Transitions.Expo.easeInOut
								}).addEvent("complete", function() {
									// carousel has shifted - tween text back in
									effect = new window.Fx.Morph(slide.text, {
										'duration': 300,
										'transition': window.Fx.Transitions.Quad.easeInOut
									}).addEvent("complete", function() {
										my.finish(index);
									});

									if (options.text.animation === "move") {
										effect.start({
											'left': [-350, 0]
										});
									} else {
										effect.start({
											'opacity': [0, 1]
										});
									}
								}).start({
									'left': [pos.carousel.x, adjust.carousel]
								});

								if (my.ui.controls) {
									// animate controls (in seperate thread)
									if (adjust.nav !== undefined) {
										my.ui.controls.animator.start({
											'property': 'left',
											'target': adjust.nav,
											'duration': 200
										});
									}

									// unset old nav
									my.slides[my.status.index].nav.setStyle(
										"backgroundPosition", "0px 100%"
									).removeClass("active");

									// set active nav
									slide.nav.setStyle(
										"backgroundPosition", "0px 100%"
									).addClass("active");

									if (my.cache.nav && my.cache.nav.width > (my.metrics.nav.width)) {
										// animate background of current nav item
										if (my.timers.nav) {
											window.clearInterval(my.timers.nav);
										}

										(function() {
											var offset, delay, divisor;

											delay = 30;
											offset = 0;
											divisor = Math.round(my.cache.nav.width / my.metrics.nav.width);

											my.timers.nav = window.setInterval(function() {
												slide.nav.setStyle("backgroundPosition", -offset + "px 0");

												offset += (my.cache.nav.width / divisor);

												if (offset >= my.cache.nav.width) {
													window.clearInterval(my.timers.nav);
													delete my.timers.nav;
												}
											}, delay);
										}());
									}
								}
							});

							// start first effect (tweening out text)
							if (options.text.animation === "move") {
								effect.start({
									'left': [0, -350]
								});
							} else {
								effect.start({
									'opacity': [1, 0]
								});
							}
						} else {
							// just animate carousel
							effect = new window.Fx.Morph(my.ui.carousel, {
								'duration': options.animation.duration,
								'transition': window.Fx.Transitions.Expo.easeInOut
							}).addEvent("complete", function() {
								my.finish(index);
							}).start({
								'left': [pos.carousel.x, adjust.carousel]
							});
						}
					}
				}
			},

			finish: function(index) {
				// finished transition
				my.status.animating = false;
				my.status.index = index;

				my.timer();
			}
		};

		if (my.enable()) {
			return cls;
		}
	};

	// !styled select class
	window.StyledSelect = function(select, options) {
		var my;

		my = {
			enable: function() {
				var metrics;

				options = window.ob_set(options || {}, {
					'hide_select': true,
					'alter_select': true
				});

				// get select options
				my.data = [];
				my.status = {
					'open': false
				};

				metrics = {};

				select.getElements("option").each(function(option, index) {
					var text;

					text = option.get("text");

					my.data.push({
						'value': option.get("value"),
						'label': text,
						'index': index,
						'title': option.hasClass("title")
					});
				});

				if (my.data.length > 0) {
					my.ui = {};

					// create selector
					my.ui.container = new Element("div", {
						'class': 'selector'
					}).setStyles({
						'position': 'relative'
					}).adopt(
						my.ui.title = new Element("a.title", {
							'href': '#'
						}).setStyles({
							'display': 'block'
						}).addEvent("click", my.open).adopt(
							my.ui.label = new Element("span").set("text", my.data[0].label)
						)
					).adopt(
						my.ui.select = new Element("ul").setStyles({
							'position': 'absolute',
							'left': 0,
							'top': 0,
							'width': '100%',
							'display': 'none'
						}).addEvent("click:relay(li)", function(event, target) {
							var index;

							event.stop();
							index = target.getAllPrevious().length;
							my.select(index);
						})
					);

					select.parentNode.insertBefore(my.ui.container, select);

					metrics.title = my.ui.title.getSize();

					my.ui.select.setStyles({
						'top': metrics.title.y + 'px'
					});

					my.data.each(function(datum, index) {
						if (!datum.title) {
							my.ui.select.adopt(
								new Element("li").setStyles({
									'display': 'block'
								}).adopt(
									new Element("a", {
										'href': '#'
									}).setStyles({
										'display': 'block'
									}).adopt(
										new Element("span").set("text", datum.label)
									)
								)
							);
						}
					});

					if (options.hide_select) {
						select.setStyles({
							'position': 'absolute',
							'left': 0,
							'top': 0,
							'visibility': 'hidden'
						});
					}
				}
			},

			open: function(event) {
				if (event && event.stop) {
					event.stop();
				}

				if (!my.status.open) {
					my.ui.select.setStyles({
						'display': 'block',
						'zIndex': '5000'
					});

					my.status.open = true;
				} else {
					my.close();
				}
			},

			close: function() {
				my.ui.select.setStyle("display", "none");
				my.status.open = false;
			},

			select: function(index) {
				var datum;

				if ((datum = my.data[index])) {
					if (options.alter_select) {
						select.selectedIndex = index;

						// trigger change event on select
						select.fireEvent("change");
					}

					my.ui.label.set("text", datum.label);
				}

				my.close();
			}
		};

		my.enable();
	};

	// !placeholder field class
	window.PlaceholderField = function(field) {
		var my;

		my = {
			enable: function() {
				my.title = field.get("title");
				my.entered = false;

				field.addEvent(
					"focus", my.focus
				).addEvent(
					"blur", my.focus
				).addEvent(
					"keydown", function() {
						my.entered = true;
					}
				);

				if (field.get("value") === "") {
					field.set("value", my.title);
				}
			},

			focus: function(event) {
				var value;

				value = field.get("value");

				if (event.type === "focus") {
					if (my.entered === false) {
						field.set("value", "");
					}
				} else {
					if (field.value === "") {
						field.set("value", my.title);
						my.entered = false;
					}
				}
			}
		};

		my.enable();
	};

	// !accordion class
	window.Accordion = (function() {
		var counter = 0;

		return function(container) {
			var my, inst_count;

			my = {
				enable: function() {
					// find items
					var preset;

					my.index = null;
					my.animating = false;
					my.items = [];
					my.timers = {};
					my.scroll = new window.Fx.Scroll(window);

					// set closure item count for this class instance
					inst_count = ++counter;

					my.settings = {
						'item_prefix': 'accordion-item-'
					};

					my.get_hash();

					// get each item in the accordion, process
					container.getElements("div.item").each(function(item, index) {
						var metrics, handle, id;

						if ((handle = item.getElement(".handle"))) {
							// handle element found
							item.measure(function() {
								// after measuring item, perform tasks based on the measurements retrieved
								metrics = {
									'item': item.getSize(),
									'handle': handle.getSize()
								};

								// get id from index
								id = my.settings.item_prefix + inst_count + "-" + (index + 1);

								if (my.hash.raw !== "" && my.hash.id === id) {
									preset = index;
								}

								// animator class for opening/closing
								item.animator = new window.Animator(item);

								// store metrics for later use
								item.store("height", metrics.item.y);
								item.store("handle_height", metrics.handle.y);

								item.setStyles({
									'overflow': 'hidden',
									'height': metrics.handle.y + "px"
								});

								// insert icon element, add event for opening
								handle.adopt(
									new Element("i.icon")
								).addEvent("click", function(event) {
									event.stop();
									my.open(index, false, true);
								});

								// add accordion item to internal array
								my.items.push({
									'el': item,
									'handle': handle,
									'id': id
								});
							});
						}
					});

					// pre-open a single item...
					if (preset !== undefined) {
						// ... defined in the url or hash
						my.open(preset, true, false, true);
					} else {
						// ... defined by being the first item
						if (my.items.length > 1) {
							my.open(0, true, false, false);
						}
					}

					// set hash scanning event for maintaining open status
					if ("onhashchange" in window) {
						if ("addEventListener" in window) {
							window.addEventListener("hashchange", function() {
								my.find_item(true);
							}, false);
						} else {
							window.attachEvent("hashchange", function() {
								my.find_item(true);
							});
						}
					} else {
						my.timers.hashchange = window.setInterval(function() {
							my.find_item(true);
						}, 500);
					}
				},

				open: function(index, instant, set_hash, scroll) {
					// open a single accordion item
					var item, old, animate_new;

					if (my.animating || (index === my.index && !instant)) {
						return false;
					}

					if (window.site.tests.device.small) {
						instant = true;
					}

					if (scroll === undefined) {
						scroll = !instant;
					}

					if ((item = my.items[index])) {
						// item is found in internal array
						if (instant) {
							// instantly open the item (also can be non-interactive)
							if ((old = my.items[my.index])) {
								old.el.removeClass("open").setStyles({
									'height': old.el.retrieve("handle_height") + 'px'
								});
							}

							item.el.addClass("open").setStyles({
								'height': 'auto'
							});

							if (scroll) {
								// scroll the browser to the item
								my.focusin(item.el);
							}
						} else {
							// animate the item open
							my.animating = true;

							animate_new = function() {
								// animate new item
								item.el.animator.start({
									'property': 'height',
									'target': item.el.retrieve("height"),
									'duration': 200,
									'callback': function() {
										my.animating = false;

										item.el.setStyles({
											'height': 'auto'
										});

										// scroll the browser to the item
										my.focusin(item.el);
									}
								});
							}

							if ((old = my.items[my.index])) {
								// set height to animate from
								old.el.removeClass("open").setStyles({
									'height': old.el.retrieve("height") + 'px'
								});

								// animate
								old.el.animator.start({
									'property': 'height',
									'target': old.el.retrieve("handle_height"),
									'duration': 200,
									'callback': function() {
										item.el.addClass("open");

										animate_new();
									}
								});
							} else {
								animate_new();
							}
						}

						// set hash in URL for recall
						if (set_hash) {
							hashController.set(my.settings.item_prefix, inst_count + '-' + (index + 1));
						}

						my.index = index;
					}
				},

				find_item: function(instant) {
					// find the managed tab based on the current hash
					var a;

					if (location.hash !== my.hash.raw) {
						//hash exists and is different from stored hash
						my.get_hash();

						for (a = 0; a < my.items.length; a += 1) {
							if (my.hash.id === my.items[a].id) {
								my.open(a, false, false);
								return;
							}
						}
					}
				},

				get_hash: function() {
					// get the hash from the URL
					var hash, match;

					hash = hashController.get(my.settings.item_prefix);
					match = hash.matched.match(/((\d+)-)*(\d+)/);

					my.hash = {
						'raw': hash.raw,
						'id': hash.matched,
						'inst_count': (match ? match[2] : undefined),
						'count': (match ? match[3] : undefined)
					};

					// check hash contains instance count
					if (my.hash.id !== "" &&
						(my.hash.count !== undefined && my.hash.inst_count === undefined)) {
						my.hash.inst_count = 1;
						my.hash.id = my.settings.item_prefix + inst_count + '-' + my.hash.count;
						my.hash.raw = "#" + my.hash.id;

						// re-set hash
						hashController.set(my.settings.item_prefix, inst_count + '-' + my.hash.count);
					}
				},

				focusin: function(element) {
					// scroll to the element, if it is outside of the viewport
					var vp_scroll, pos, size;

					vp_scroll = $(window).getScroll();
					size = $(window).getSize();
					vp_scroll.y2 = vp_scroll.y + size.y;

					pos = element.getPosition();

					if (!(vp_scroll.y < pos.y && vp_scroll.y2 > pos.y)) {
						my.scroll.toElement(element);
					}
				}
			};

			my.enable();
		};
	}());

	window.SiteController = function() {
		var my, cls;

		cls = {
			device_monitors: {
				'small': [
					"screen and (max-width: 640px)"
				],
				'med': [
					"screen and (max-width: 960px)"
				]
			},

			tests: {
				'device': {
					'small': false
				}
			},

			instances: {
				'tabs': [],
				'comparetools': [],
				'carousels': []
			},

			parse: function() {
				return my.parse.apply(this, arguments);
			},

			get_query_item: function(key) {
				var query, vars, a, pair;

				query = window.location.search.substring(1);
				vars = query.split("&");

				for (a = 0; a < vars.length; a += 1) {
					pair = vars[a].split("=");

					if (window.decodeURIComponent(pair[0]) == key) {
						return window.decodeURIComponent(pair[1]);
					}
				}

				return null;
			}
		};

		my = {
			enable: function() {
				my.settings = {
					'classes': {
						'active': 'active-link-node'
					},
					'selectors': {
						'basic_para': 'p',
						'link_nodes': ([
							'div.article-panel',
							'div.author-list div.author',
							'div.article-preview',
							'div.panel',
							'div.gateway-blocks div.block',
							'ul.carousel li.slide'
						]).join(", ")
					}
				};

				cls.tests.device.small = window.JSMedia.run(cls.device_monitors.small);
			},

			parse: function(root) {
				var el, parent, messageshown, verticalslide,
					nectar_calc, nectar_points_calc, savings_calc, loan_switcher_calc, life_calc, loan_apr_calc_std, loan_apr_calc_small;

				root = root || $(document.body);

				// show or hide the notificationbar
				messageshown = window.Cookie.read('messageshown');

				if (messageshown !== '1') {
					$('notificationbar').setStyle('display', 'block');
					root.addClass("showing-notification");

					window.Cookie.write('messageshown', '1', {'duration': '365'});

					$$('#notificationbar p.cta a').each(function(el) {
						el.addEvent("click", function(event) {
							var href;

							event.stop();

							href = el.getProperty('href');

							if (href === '#') {
								verticalslide = new window.Fx.Slide('notificationbar', {'duration': 'short'});
								verticalslide.slideOut();
								root.removeClass("showing-notification");
							} else {
								document.location = href;
							}
						});

					});
				}

				// parse tabs
				root.getElements("div.tabbed-content").each(function(div) {
					var options;

					options = {
						'callbacks': {
							'change': function(index, tab) {
								var a;

								if (cls.instances.comparetools && cls.instances.comparetools.length) {
									// look through CompareTool instances for those set within the active tab
									for (a = 0; a < cls.instances.comparetools.length; a += 1) {
										if (cls.instances.comparetools[a].outer === tab.el) {
											// class instance "outer" property matches this tab
											cls.instances.comparetools[a].update_metrics();
										}
									}
								}
							}
						}
					};

					if (div.hasClass("capsule-tabs")) {
						options = ob_set({
							'tabs': {
								'position': 'bottom'
							}
						}, options);
					}

					cls.instances.tabs.push(
						new window.TabController(div, options)
					);
				});

				// parse static tab controllers
				root.getElements("div.tabbed-controller").each(function(div) {
					cls.instances.tabs.push(
						new window.TabController(div)
					);
				});

				// parse carousel
				if ((el = root.getElement("ul.carousel"))) {
					if ((parent = el.getParent("#content-carousel"))) {
						cls.instances.carousels.push(
							new window.Carousel(el, {
								'large_carousel': true,
								'container': '#content-carousel',
								'index': 1,
								'slides': {
									'height': 350
								},
								'text': {
									'animation': 'move'
								},
								'animation': {
									'automated': true,
									'controller': true
								}
							})
						);
					} else {
						cls.instances.carousels = new window.Carousel(el);
					}
				}

				// parse primary navigation
				if ((el = root.getElement("ul#nav-primary"))) {
					if (!cls.tests.device.small) {
						cls.instances.navigation = new PrimaryNav(
							el,
							root.getElement("div#content-spotlights")
						);
					} else {
						cls.instances.navigation = new PrimaryNav(el);
					}
				}

				// parse forms
				root.getElements("form").each(function(form) {
					var field;

					// parse styled selects
					form.getElements("select.styled-select").each(function(select) {
						new window.StyledSelect(select);
					});

					form.getElements('input.placeholder').each(function(el){
						new window.PlaceholderField(el);
					});

					if (form.id === "frm-quicklinks" &&
						(field = form.getElement("#quicklinks-link"))) {
						field.addEvent("change", function(event) {
							var val;

							if (event && event.stop) {
								event.stop();
							}

							val = field.options[field.selectedIndex].value.trim();

							if (val !== "") {
								location.href = val;
							}
						});
					}
				});

				// parse compare tools
				el = root.getElements("div.compare-tool");

				if (el.length > 0) {
					(function(el) {
						window.Include.load("library/default/js/compare-tool.js", function() {
							el.each(function(div) {
								cls.instances.comparetools.push(
									new window.CompareTool(div)
								);
							});
						});
					}(el));
				}

				// parse accordions
				root.getElements("div.accordion").each(function(div) {
					new window.Accordion(div);
				});

				// add hover event for panels with paras
				root.getElements("div.article-panel").each(function(div) {
					var paras, text, metrics;

					text = div.getElement("div.text");

					if (text) {
						metrics = {
							'text': text.getCoordinates(),
							'open': div.getCoordinates()
						};

						if (div.hasClass("article-panel-has-image") &&
							(metrics.text.height < metrics.open.height)) {
							paras = div.getElements(my.settings.selectors.basic_para);

							if (paras.length > 0 && paras[(paras.length - 1)].getStyle("display") !== "none") {
								// activate if there are paras and the last one (standard text) isn't hidden
								my.activate_article_panel(div, text, paras);
							}
						}
					}
				});

				// parse linked dom nodes
				root.getElements(my.settings.selectors.link_nodes).each(function(el) {
					var link, mouse;

					if ((link = el.getElement("h2 a")) ||
						(link = el.getElement("h3 a")) ||
						(link = el.getElement("p.cta a"))) {
						mouse = function(event) {
							if (event.type === "mouseover") {
								link.addClass("hover");
							} else {
								link.removeClass("hover");
							}
						};

						el.addEvent("click", function(event) {
							if (event.target.tagName !== "A") {
								location.href = link.get("href");
							}
						}).addEvent(
							"mouseenter", mouse
						).addEvent(
							"mouseleave", mouse
						).addClass(my.settings.classes.active);
					}
				});

				// parse expanders
				root.getElements(".expander").each(function(el) {
					var anchors, items;

					if (el.tagName !== "A" &&
						(anchors = el.getElements("a[href^='#']")) &&
						anchors.length > 0) {
						// element contains expander anchors
						items = [];

						anchors.each(function(anchor) {
							items.push(anchor);
						});
					} else {
						anchors = [el];
					}

					anchors.each(function(anchor) {
						anchor.addEvent("click", function(event) {
							var element, ref, a;

							ref = anchor.get("href").replace(/^#/, "");

							if ((element = $(ref))) {
								event.stop();

								if (element.getStyle("display") === "none") {
									element.setStyle("display", "block");
									anchor.addClass("expanded");
								} else {
									element.setStyle("display", "none");
									anchor.removeClass("expanded");
								}

								if (items !== undefined) {
									// if this expander is part of a group, hide the others
									for (a = 0; a < items.length; a += 1) {
										if (items[a] !== anchor) {
											ref = items[a].get("href").replace(/^#/, "");

											if ((element = $(ref))) {
												element.setStyle("display", "none");
												items[a].removeClass("expanded");
											}
										}
									}
								}
							}
						});
					});
				});

				// start savings calculator
				if ((savings_calc = root.getElement("#savings-calculator"))) {
					window.Include.load(siteDir+"not-found.php", function() {
						window.site.instances.savings_calc = new window.SavingsCalculator(savings_calc);
					});
				}

				// start loan switcher calculator
				if ((loan_switcher_calc = root.getElement("#loan-switcher-calc"))) {
					window.Include.load(siteDir+"library/default/js/loan-switcher-calc.js", function() {
						window.site.instances.loan_switcher_calc = new window.LoansCalculator(loan_switcher_calc);
					});
				}

				// start life calculator
				if ((life_calc =root.getElement("#life-calculator"))) {
					window.Include.load(siteDir+"library/default/js/life-insurance-calculator.js", function() {
						window.site.instances.life_calc = new window.LifeInsuranceCalculator(life_calc);
					});
				}

				// start nectar calculator
				if ((nectar_calc = root.getElement("#nectar-calculator"))) {
					window.Include.load(siteDir+"library/default/js/nectar-calculator.js", function() {
						window.site.instances.nectarcalc = new window.NectarCalculator(nectar_calc);
					});
				}

				// start nectar points calculator
				if ((nectar_points_calc = root.getElement("#nectar-points-calculator"))) {
					window.Include.load(siteDir+"not-found.php", function() {
						window.site.instances.nectarpointscalc = new window.NectarPointsCalculator(nectar_points_calc);
					});
				}

				// parse double nectar points calculator
				if ((double_nectar_points_calc = root.getElement("#double-nectar-calc"))) {
					window.Include.load(siteDir+"library/default/js/double-nectar-calc.js", function() {
						window.site.instances.doublenectarpointscalc = new window.DoubleNectarPointsCalculator(double_nectar_points_calc);
					});
				}

				// parse double nectar points calculator
				if ((nectar_points_calc_summary = root.getElement("#double_nectar_calc_summary"))) {
					window.Include.load(siteDir+"library/default/js/double-nectar-calc-summary.js", function() {
						window.site.instances.doublenectarpointscalcsummary = new window.DoubleNectarCalcSUmmary(nectar_points_calc_summary);
					});
				}

				// start loan apr calculators
				if ((loan_apr_calc_std = root.getElement("#loan-aprcalc-std")) ||
					(loan_apr_calc_small = root.getElement("#loan-aprcalc-small"))) {
					window.Include.load(siteDir+"library/default/js/loan-apr-calc.js", function() {
						if (loan_apr_calc_std) {
							window.site.instances.loan_apr_calc = new window.FullLoanAPRCalculator(loan_apr_calc_std);
						}

						if (loan_apr_calc_small) {
							window.site.instances.loan_apr_calc_small = new window.SmallLoanAPRCalculator(loan_apr_calc_small);
						}
					});
				}

				// enable DD for ie6
				if (typeof window.DD_belatedPNG !== "undefined") {
					window.DD_belatedPNG.fix([
						'span.context',
						'img.roundel',
						'li.slide',
						'li.slide img.additional',
						'div.text',
						'div.title',
						'div.compare-tool img.icon'
					].join(", "));
				}
			},

			activate_article_panel: function(div, text, paras) {
				var items, metrics;

				items = [];
				metrics = {};

				paras.each(function(p) {
					if (!p.hasClass("cite")) {
						items.push(p);
					}
				});

				if (items.length > 0 && text) {
					// transfer items into Elements array
					items = new window.Elements(items);

					// get metrics for container
					metrics.container = div.getDimensions();

					// set items to invisible
					items.setStyle("display", "none");

					// apply animation class to content
					text.animator = new window.Animator(text);

					div.addEvent("mouseenter", function(event) {
						if (typeof metrics.closed === "undefined") {
							// get metrics for closed text
							metrics.closed = text.getComputedSize();

							// keep text closed
							text.setStyle("height", metrics.closed.height + "px");

							// re-display items
							items.setStyle("display", "block");
						}

						text.animator.start({
							'property': 'height',
							'target': metrics.container.height -
								(metrics.closed['padding-top'] + metrics.closed['padding-bottom']),
							'duration': 300
						});
					});

					div.addEvent("mouseleave", function() {
						text.animator.start({
							'property': 'height',
							'target': metrics.closed.height,
							'duration': 300
						});
					});
				}
			}
		};

		my.enable();

		return cls;
	};

	window.addEvent('domready', function() {
	//(function() {
		var mm_shell;

		window.site = new window.SiteController();

		window.site.parse();

		// start money matters controller
		if ((mm_shell = $("mm-shell"))) {
			window.Include.load(siteDir+"library/default/js/money-matters.js", function() {
				window.site.instances.mm = new window.MMController(mm_shell);
			});
		}
	//}());
	});
}(document.id));