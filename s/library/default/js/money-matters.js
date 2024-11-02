/*global DD_belatedPNG:false, Elements:false, ob_set:false, Animator:false */
(function($) {
	// carousel handler class
	window.MMCarousel = function(carousel, options) {
		var my, cls;

		cls = {
			adjust: function() {
				return my.adjust.apply(this, arguments);
			},

			slide: function() {
				return my.slide.apply(this, arguments);
			}
		};

		my = {
			enable: function() {
				var total_width, height;

				my.slides = [];
				my.index = 0;
				my.ui = {};

				options = ob_set(options || {
					'height': 520,
					'duration': {
						'interactive': 300,
						'automated': 800
					}
				});

				total_width = 0;
				height = 0;

				// insert slide container
				carousel.adopt(
					new Element("div", {
						'class': 'inner'
					}).adopt(
						my.ui.container = new Element("div", {
							'class': 'slides'
						})
					)
				);

				my.ui.container.animator = new Animator(my.ui.container);

				// get slides
				carousel.getElements("div.slide").each(function(div) {
					// get width
					total_width += div.offsetWidth;

					// set into carousel
					div.setStyles({
						'float': 'left',
						'width': div.offsetWidth + 'px'
					}).inject(my.ui.container);

					// add to data
					my.slides.push(div);
				});

				// add navigation
				if (my.slides.length > 1) {
					carousel.adopt(
						my.ui.nav_prev = new Element("a", {
							'href': '#',
							'class': 'navigation nav-prev'
						}).set("text", "Previous").adopt(
							new Element("span")
						).addEvent("click", function(event) {
							event.stop();
							my.adjust(-1, true);
						})
					).adopt(
							my.ui.nav_next = new Element("a", {
							'href': '#',
							'class': 'navigation nav-next'
						}).set("text", "Next").adopt(
							new Element("span")
						).addEvent("click", function(event) {
							event.stop();
							my.adjust(1, true);
						})
					);
				}

				// set container metrics
				my.ui.container.setStyles({
					'width': total_width + 'px',
					'height': options.height + 'px'
				});
			},

			adjust: function(adjustment, interactive) {
				var index;

				index = my.index + parseInt(adjustment, 10);

				if (index > (my.slides.length - 1)) {
					index = 0;
				} else if (index < 0) {
					index = (my.slides.length - 1);
				}

				my.slide(index, interactive);

				return index;
			},

			slide: function(index, interactive) {
				var slide, left;

				if (!(slide = my.slides[index]) || my.animating) {
					return false;
				}

				// get slide offset
				left = -(slide.offsetLeft);

				// animate
				my.animating = true;

				my.ui.container.animator.start({
					'property': 'left',
					'target': left,
					'duration': ((interactive === true) ? options.duration.interactive : options.duration.automated),
					'callback': function() {
						my.animating = false;
					}
				});

				my.index = index;

				return left;
			}
		};

		my.enable();

		return cls;
	};

	// image gallery handler class
	window.MMGallery = function(gallery) {
		var my;

		my = {
			enable: function() {
				var a;

				my.settings = {
					're': {
						'image': /\.(gif|jpg|png)$/i
					}
				};

				my.ui = {
					'list': gallery.getElement("ul.list"),
					'images': []
				};

				my.index = 0;
				my.primary = 0;

				// get gallery width for calculations
				my.settings.gallery_size = gallery.getSize();

				// create large display ui
				my.ui.display = new Element("div", {
					'class': 'display'
				}).adopt(
					my.ui.image_container = new Element("div", {
						'class': 'image-container'
					}).setStyles({
						'position': 'relative',
						'overflow': 'hidden'
					})
				).adopt(
					my.ui.description = new Element("div", {
						'class': 'description'
					})
				).setStyle("display", "none").inject(gallery, "top");

				// create display images
				for (a = 0; a < 2; a+=1) {
					my.ui.images.push(
						new Element("span").setStyles({
							'position': 'absolute',
							'left': 0,
							'top': 0,
							'width': my.settings.gallery_size.x + 'px'
						})
					);

					my.ui.image_container.adopt(my.ui.images[a]);
					my.ui.images[a].animator = new Animator(my.ui.images[a]);
				}

				my.ui.image_container.animator = new Animator(my.ui.image_container);

				// collect and parse image links
				if (my.ui.list) {
					// find first link and automatically show
					my.items = [];

					my.ui.list.getElements("li").each(function(li) {
						var a;

						if ((a = li.getElement("a")) &&
							(a.get("href") || "").match(my.settings.re.image)) {
							// attach individual click event to image link
							li.addEvent("click", (function(index) {
								return function(event) {
									event.stop();
									my.display(index, true);
								};
							}(my.items.length)).bind(my.ui.list));

							// add to dataset
							my.items.push(li);

							if (my.items.length === 1) {
								// display the first item automatically
								my.display(0);
							}
						}
					});
				}

				// add prev/next buttons
				if (my.items.length > 0) {
					my.ui.image_container.adopt(
						new Element("a", {
							'href': '#',
							'class': 'nav nav-prev'
						}).addEvent("click", function(event) {
							event.stop();
							my.adjust(-1, true);
						})
					).adopt(
						new Element("a", {
							'href': '#',
							'class': 'nav nav-next'
						}).addEvent("click", function(event) {
							event.stop();
							my.adjust(1, true);
						})
					);
				}
			},

			adjust: function(adjustment, interactive) {
				var index;

				index = my.index + parseInt(adjustment, 10);

				if (index > (my.items.length - 1)) {
					index = 0;
				} else if (index < 0) {
					index = (my.items.length - 1);
				}

				my.display(index, interactive);

				return index;
			},

			display: function(index, interactive) {
				// display a single item by index
				var item, a, primary, secondary, cache, finish;

				// get item from dataset
				if (!(item = my.items[index])) {
					return false;
				}

				// alternate between primary and secondary image for animating
				primary = (1 - my.primary);
				secondary = (1 - primary);

				// create cache image for preloading
				cache = new Image();

				if ((a = item.getElement("a"))) {
					if (interactive) {
						// clear cache source to be renewed
						cache.src = "";

						// set up images for animating
						my.ui.images[primary].setStyles({
							'left': my.settings.gallery_size.x + 'px',
							'zIndex': 2,
							'visibility': 'visible'
						});

						my.ui.images[secondary].setStyles({
							'zIndex': 1
						});

						// perform actions after new image has loaded
						cache.onload = function() {
							// set up images for animating
							my.ui.images[primary].setStyles({
								'backgroundImage': 'url(' + cache.src + ')',
								'height': cache.height + 'px'
							});

							// animate
							my.ui.images[primary].animator.start({
								'property': 'left',
								'target': 0,
								'duration': 300
							});

							my.ui.images[secondary].animator.start({
								'property': 'left',
								'target': -my.settings.gallery_size.x,
								'duration': 300
							});

							my.ui.image_container.animator.start({
								'property': 'height',
								'target': cache.height,
								'duration': 300
							});
						};

						// set cache source to trigger onload function
						cache.src = a.get("href");
					} else {
						// automated transition (instant) - perform actions after new image has loaded
						cache.onload = function() {
							// set images into correct state
							my.ui.images[primary].setStyles({
								'backgroundImage': 'url(' + cache.src + ')',
								'height': cache.height + 'px'
							});

							my.ui.image_container.setStyles({
								'height': cache.height + 'px'
							});

							my.ui.images[primary].setStyle("visibility", "visible");
							my.ui.images[secondary].setStyle("visibility", "hidden");
						};

						// set cache source to trigger onload function
						cache.src = a.get("href");
					}
				}

				// empty and re-fill description container with data found in li node
				my.ui.description.empty();

				item.getChildren().each(function(el) {
					if (el !== a) {
						my.ui.description.adopt(el.cloneNode(true));
					}
				});

				// set selected item
				if (!isNaN(my.index)) {
					my.items[my.index].removeClass("selected");
				}

				item.addClass("selected");

				my.primary = primary;
				my.index = index;

				my.ui.display.setStyle("display", "block");
			}
		};

		my.enable();
	};

	// money matters shell controller - instantiates previous classes when needed
	window.MMController = function(shell) {
		var my;

		my = {
			enable: function() {
				var carousel;

				my.settings = {
					'classes': {
						'nested': 'nested',
						'nested_open': 'nested-open',
						'fix': 'fix',
						'footer_panel_over': 'footer-panel-over'
					},
					'navigation': {
						'out_timeout': 0.5
					},
					'selectors': {
						'link_nodes': ([
							'div.slide div.article-panel',
							'div.author-list div.author',
							'div.article-preview',
							'div.panel'
						]).join(", ")
					}
				};

				my.ui = {};

				// initialize carousel
				if ((carousel = $("mm-carousel"))) {
					window.site.instances.carousel = new window.MMCarousel(carousel);
				}

				// initialize gallery
				if (window.site.instances.galleries === undefined) {
					window.site.instances.galleries = [];
				}

				shell.getElements("div.gallery").each(function(div) {
					window.site.instances.galleries.push(new window.MMGallery(div));
				});

				if ((my.ui.header = $("header"))) {
					// parse nested navigation items
					if ((my.ui.navigation = my.ui.header.getElement("#nav-primary"))) {
						my.ui.navigation.getElements("li." + my.settings.classes.nested).each(function(li) {
							var a, ul, over, out;

							out = function() {
								if (!over) {
									li.removeClass(my.settings.classes.nested_open);
								} else {
									window.setTimeout(out, (my.settings.navigation.out_timeout * 1000));
								}
							};

							if ((a = li.getElement("a")) && (ul = li.getElement("ul"))) {
								a.addEvent("click", function(event) {
									event.stop();
									li.addClass(my.settings.classes.nested_open);
									out();
								}.bind(a));

								a.addEvent("mouseleave", function() {
									over = false;
								}).addEvent("mouseenter", function() {
									over = true;
								});

								ul.addEvent("mouseleave", function() {
									over = false;
								}).addEvent("mouseenter", function() {
									over = true;
								});
							}
						});
					}
				}

				// parse fixed footer
				if ((my.ui.footer = $("mm-footer"))) {
					if (my.ui.footer.hasClass("fixed")) {
						my.fix_footer();
					}
				}

				// png fixing
				if (typeof DD_belatedPNG === "object") {
					DD_belatedPNG.fix(
						"#mm-shell p.cta-block a strong"
					);
				}
			},

			fixed_support: function() {
				// test for position: fixed support within the ua
				var test, small_device;

				test = new Element("div").setStyles({
					'position': 'fixed',
					'top': '10px'
				}).inject($(document.body));

				small_device = window.JSMedia.run(window.site.device_monitors.small);

				return (test.offsetTop === 10 && !small_device);
			},

			fix_footer: function() {
				// start footer fixing
				var fn, offset, vp_height, above;

				if (!my.ui.footer) {
					return false;
				}

				above = false;
				offset = my.ui.footer.getTop();

				fn = {
					fix: function(event) {
						// test scroll offset and fix, otherwise make static
						var pos;

						pos = window.getScrollTop() + vp_height;

						if (pos < offset) {
							if (!above) {
								my.ui.footer.addClass(my.settings.classes.fix);
								above = true;
							}
						} else if (above) {
							my.ui.footer.removeClass(my.settings.classes.fix);
							above = false;
						}
					},

					update: function() {
						vp_height = window.getHeight();
						fn.fix();
					},

					show: function(panel) {
						// popup a single footer panel
						if (my.ui.footer.hasClass(my.settings.classes.fix)) {
							panel.addClass(my.settings.classes.footer_panel_over);
						}
					},

					hide: function(panel) {
						// hide a single footer panel
						if (my.ui.footer.hasClass(my.settings.classes.fix)) {
							panel.removeClass(my.settings.classes.footer_panel_over);
						}
					}
				};

				if (my.fixed_support()) {
					// add events for making fixed
					window.addEvent("scroll", fn.fix);
					window.addEvent("resize", fn.update);

					my.ui.footer.getElements("div.footer-panel").each(function(panel) {
						panel.addEvent("click", function() {
							if (panel.hasClass(my.settings.classes.footer_panel_over)) {
								fn.hide(panel);
							} else {
								fn.show(panel);
							}
						});

						panel.addEvent("mouseleave", function() {
							fn.hide(panel);
						});
					});

					fn.update();
				}
			}
		};

		my.enable();
	};
}(document.id));