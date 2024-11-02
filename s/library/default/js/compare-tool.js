var CompareTool = function(container, options) {
	var cls, my;

	cls = {
		highlight: function() {
			return my.highlight.apply(this, arguments);
		},

		update_metrics: function() {
			return my.update_metrics.apply(this, arguments);
		}
	};

	my = {
		enable: function() {
			var columns, cell_width, display_type_stored;

			options = window.ob_set(options || {}, {
				'parse_count': 2,
				'cell_width': 0,
				'max_show': 3,
				'disable_swapping': false,
				'fix_headers': false,
				'strings': {
					'remove': 'Remove',
					'remove_short': 'Remove',
					'add': 'Compare'
				},
				'classes': {
					'base': 'compare-tool',
					'show': 'show',
					'overlay': 'overlay',
					'overlay_active': 'overlay-active',
					'prod_shown': 'shown',
					'prod_draggable': 'draggable',
					'prod_dragging': 'product-dragging',
					'disable_swapping': 'no-swapping',
					'fix_headers': 'fix-headers',
					'highlight': 'highlight'
				},
				'selectors': {
					'placeholder': 'th.placeholder'
				},
				'comp_styles': ['margin', 'border', 'padding'],
				'hash_prefixes': {
					'highlight': 'cth-'
				}
			});

			cls.outer = container.getParent();

			// set max show based on device
			if (window.site.tests.device.small) {
				options = window.ob_set({
					'strings': {
						'add': 'Show',
						'remove': 'Hide',
						'remove_short': 'Hide'
					},
					'parse_count': 1,
					'max_show': 1,
					'minified': true
				}, options);
			}

			// get options from class names
			(container.className || "").split(" ").each(function(classname) {
				if (classname === options.classes.disable_swapping &&
					!window.site.tests.device.small) {
					options.disable_swapping = true;
				}

				if (classname === options.classes.fix_headers &&
					!window.site.tests.device.small) {
					options.fix_headers = true;
				}
			})

			my.timers = {};
			my.metrics = {};

			my.ui = {
				'table': container.getElement("table"),
				'rows': [],
				'fixed_head': {}
			};

			my.hash = {
				'raw': null
			};

			if (my.ui.table) {
				// get column count (from thead)
				columns = my.ui.table.getElement("tr.head").getChildren();

				my.status = {
					'shown': 0
				};

				// if there are more than X data columns, create compare interface
				if (!options.disable_swapping && (columns.length - 1) > options.parse_count) {
					// prep container
					container.setStyle("position", "relative");

					// prep instance
					my.effects = {};

					if ((columns.length - 1) > options.max_show) {
						options.cell_width = Math.round(100 / (options.max_show + 1));
					} else {
						options.cell_width = Math.round(100 / (options.parse_count + 2));
					}

					// size columns based on number
					columns.each(function(cell, index) {
						if (!display_type_stored && cell.getStyle("display") !== "none") {
							// save cell display method for future use
							options.cell_display = cell.getStyle("display");
							display_type_stored = true;
						}

						cell.setStyles({
							'width': options.cell_width + '%'
						});
					});

					my.parse();
				} else if ((columns.length - 1) > 0) {
					options.cell_width = Math.round(100 / (columns.length - 1));

					columns.each(function(cell, index) {
						var header;

						// ignore the first column
						if (index > 0) {
							// size columns based on number
							cell.setStyles({
								'width': options.cell_width + '%'
							});
						}
					});

					my.parse(true);
				}
			}
		},

		parse: function(collect_only) {
			var tbody, rows, footer_cells, a, total_width;

			// get tbody, rows, footer and store into ui
			if ((tbody = my.ui.table.getElement("tbody")) &&
				(rows = tbody.getChildren())) {
				rows.each(function(row) {
					if (row.hasClass("head")) {
						my.ui.head = row;
					} else if (row.hasClass("foot")) {
						my.ui.foot = row;
					} else {
						my.ui.rows.push(row);
					}
				});
			}

			if (my.ui.head && my.ui.foot && my.ui.rows.length > 0) {
				// correctly constructed table exists - begin parsing
				footer_cells = my.ui.foot.getChildren();

				// create a placeholder (for showing when producs don't fill the table)
				my.ui.placeholder = new Element(options.selectors.placeholder, {
					'rowspan': rows.length
				}).setStyles({
					'width': options.cell_width + '%'
				}).set("html", "<span>Click a product above to compare it.</span>");

				if (!collect_only) {
					// not just collecting the cell data - creating a full selection interface
					my.data = [];

					my.ui.head.getChildren().each(function(cell, index) {
						// parse each column (based on the header column)
						var header, data_cells, footer_cell, hide_column, classes;

						if (index > 0) {
							// ignore the first column (of labels)
							header = (cell.getElement("h2") || cell.getElement("h3"));
							footer_cell = footer_cells[index];
							data_cells = [];
							hide_column = false;

							/* gather non-functional classes from header cell (for applying into
								selector cell) */
							classes = (cell.className || "").split(" ").erase(
								options.classes.show
							).join(" ").trim();

							if (options.minified ||
								!cell.hasClass(options.classes.show) ||
								my.status.shown === options.max_show) {
								// cell doesn't have 'show' class or maximum already shown
								hide_column = true;
							} else {
								// otherwise, keep the cell displayed
								my.status.shown += 1;
							}

							if (hide_column) {
								// hide column header/footer cells
								cell.setStyle("display", "none");
								footer_cell.setStyle("display", "none");
							}

							// gather data (not header or footer) cells
							my.ui.rows.each(function(row) {
								var a, cells;

								cells = row.getChildren();

								for (a = 0; a < cells.length; a += 1) {
									// if cell index is equal to current header index
									if (a === index) {
										// push cell into current data set
										data_cells.push(cells[a]);

										if (hide_column) {
											// column is to be hidden
											cells[a].setStyle("display", "none");
										}
									}
								}
							});

							my.data.push({
								'label': header.get("html"),
								'header': cell,
								'classes': classes,
								'shown': !hide_column,
								'footer': footer_cell,
								'index': index,
								'cells': data_cells
							});
						}
					});

					my.add_placeholders();

					// generate selection interface
					if (!options.minified) {
						my.ui.table.parentNode.insertBefore(
							my.ui.selector = new Element("div", {
								'class': 'product-selector col-group'
							}),
							my.ui.table
						);
					} else {
						my.ui.selector = [];
					}

					// get each datum's header and create a selector for it
					my.data.each(function(datum) {
						var cell, product_head, icon, toggle_button, view_url;

						view_url = '#';

						toggle_button = function(text) {
							return new Element("p.toggle").adopt(
								datum.toggle = new Element("a", {
									'href': '#'
								}).set(
									"text", text
								).addEvent("click", function(event) {
									event.stop();
									my.toggle(datum);
								})
							);
						};

						if ((product_head = datum.header.getElement("div.product-head"))) {
							// add toggle button to the product-head element
							product_head.adopt(
								toggle_button(options.strings.remove_short)
							);

							// get icon
							if ((icon = product_head.getElement("img.icon"))) {
								icon = icon.get("src");
							}
						}

						if (datum.header.getElements('p.cta').length > 0) {
							view_url = datum.header.getElements('p.cta a')[0].get('href');
						}

						// create selector cell (for choosing a product)
						datum.selector = new Element("div", {
							'class': 'product' +
								(datum.shown ?
									" " + options.classes.prod_shown :
									" " + options.classes.prod_draggable) +
								(datum.classes.length > 0 ? " " + datum.classes : "")
						}).adopt(
							datum.image = new Element("div.image").adopt(
								datum.icon = new Element("span.inner").setStyle(
									"background-image",
									(icon) ? "url(" + icon + ")" : ""
								)
							).adopt(
								new Element("p.label").set("text", "Drag me")
							).adopt(
								new Element("span.context")
							).setStyles({
								'left': '0px',
								'top': '0px'
							})
						).adopt(
							datum.title = new Element("div.title").adopt(
								new Element("h3").set("html", datum.label)
							).adopt(
								// add toggle button to the selector cell
								toggle_button(
									(datum.shown ?
										options.strings.remove : options.strings.add)
								)
							).adopt(
								new Element("p.cta").adopt(
									new Element("a", {
										'href': view_url
									}).set("html", "<strong>View</strong>")
								)
							)
						);

						// add dragging interface
						datum.drag = new window.Drag.Move(datum.image, {
							'droppables': my.ui.table,
							'onSnap': my.drag.snap,
							'onDrop': function() {
								my.drag.drop.apply(this, [{
									'element': arguments[0],
									'droppable': arguments[1],
									'event': arguments[2]
								}, datum]);
							},
							'onEnter': my.drag.enter,
							'onLeave': my.drag.leave
						});

						if (typeof datum.drag === "object") {
							datum.image.addClass("active-move-node");

							if (datum.shown) {
								datum.drag.detach();
							}
						}

						if (options.minified) {
							// insert selector into container
							my.ui.table.parentNode.insertBefore(
								datum.selector_container = new Element("div", {
									'class': 'product-selector'
								}).adopt(datum.selector),
								my.ui.table
							);

							my.ui.selector.push(datum.selector_container);
						} else {
							my.ui.selector.adopt(datum.selector);
						}
					});

					// hide table if minified
					if (options.minified) {
						my.ui.table.dispose();
					}

					// get metrics
					my.update_metrics();

					// add drop overlay
					container.adopt(
						my.ui.overlay = new Element("span", {
							'class': options.classes.overlay
						}).adopt(
							new Element("span.content")
						).setStyles({
							'display': 'block',
							'position': 'absolute',
							'left': my.metrics.table.pos.left + 'px',
							'top': my.metrics.table.pos.top + 'px',
							'width': my.metrics.table.size.width + 'px',
							'height': my.metrics.table.size.height + 'px'
						})
					);
				}

				// set hash scanning event
				if ("onhashchange" in window) {
					if ("addEventListener" in window) {
						window.addEventListener("hashchange", my.hash_control, false);
					} else {
						window.attachEvent("hashchange", my.hash_control);
					}
				} else {
					my.timers.hashchange = window.setInterval(function() {
						my.hash_control();
					}, 500);
				}

				my.hash_control();
			}

			if (options.fix_headers) {
				// create header fix container
				container.adopt(
					my.ui.fixed_head.shell = new Element("div.fix-head").setStyles({
						'position': 'fixed',
						'visibility': 'hidden'
					}).adopt(
						my.ui.fixed_head.table = new Element("table").adopt(
							new Element("tbody").adopt(
								my.ui.fixed_head.row = new Element("tr.head")
							)
						)
					)
				);

				// test fix container for fixed position
				if (my.ui.fixed_head.shell.getStyle("position") === "fixed") {
					columns = my.ui.table.getElement("tr.head").getChildren();
					total_width = 0;

					columns.each(function(cell, index) {
						var header, header_text, th, comp, width;

						// ignore the first column
						if (index > 0) {
							cell.measure(function() {
								comp = this.getComputedSize();

								if ((header = (cell.getElement("h3") || cell.getElement("h2")))) {
									my.ui.fixed_head.row.adopt(
										th = new Element("th")
									);

									//if (th.currentStyle) {
										// width minus padding + borders
										width = cell.offsetWidth;// - comp['padding-left'] - comp['padding-right'] - comp['border-left-width'];
									/*} else {
										width = cell.offsetWidth;// - comp['padding-left'] - comp['padding-right'] - comp['border-left-width'];
									}*/

									total_width += width;

									header_text = header.get("text");

									if (header_text !== undefined && width > 0) {
										// add fixed header clone
										th.adopt(
											new Element(header.tagName).set(
												"html", header.get("html")
											)
										).adopt(
											new Element("span.context")
										);

										th.setStyles({
											'width': width + 'px'
										});
									}
								}
							});
						}
					});

					//alert(container.id + ":" + total_width);

					my.ui.fixed_head.table.setStyles({
						'width': total_width + 'px'
					});

					// set scroll event for displaying the fixed head
					$(window).addEvent("scroll", my.fix_head);

					my.ui.fixed_head.active = true;
				} else {
					alert("fixed headers not supported in this browser");
					options.fix_headers = false;
				}
			}

			// get metrics (once all elements are inserted)
			my.update_metrics();
		},

		toggle: function(datum) {
			// show/hide column data by index
			if (datum.shown) {
				// attempt to hide datum
				datum.selector.removeClass(
					options.classes.prod_shown
				).addClass(
					options.classes.prod_draggable
				);

				datum.toggle.set("text", options.strings.add);
				datum.header.setStyle("display", "none");
				datum.footer.setStyle("display", "none");

				// remove cells
				datum.cells.each(function(cell) {
					cell.setStyle("display", "none");
				});

				// enable dragging
				datum.drag.attach();

				datum.shown = false;
				my.status.shown -= 1;

				if (my.status.shown === 0 && options.minified) {
					// hide table if minified
					my.ui.table.dispose();
				}
			} else {
				if (my.status.shown >= options.max_show) {
					// hide existing datum(s) if only 1 is to be shown at a time
					if (options.max_show === 1) {
						my.data.each(function(datum) {
							if (datum.shown) {
								my.toggle(datum);
							}
						});
					} else {
						my.toggle_end();
						return;
					}
				}

				// attempt to show datum
				datum.selector.addClass(
					options.classes.prod_shown
				).removeClass(options.classes.prod_draggable);

				// place table after selector (to simulate accordion-style behaivour)
				if (options.minified) {
					my.ui.table.inject(datum.selector_container, "after");
				}

				// remove existing effects
				if (my.effects.header) {
					my.effects.header.cancel();
				}

				datum.toggle.set("text", options.strings.remove);

				datum.header.setStyles({
					'display': options.cell_display,
					'opacity': 0
				});

				datum.footer.setStyle("display", options.cell_display);

				// fade in header element
				my.effects.header = new window.Fx.Morph(datum.header, {
					'duration': 500
				}).start({
					'opacity': [0, 1]
				}).addEvent("complete", function() {
					delete my.effects.header;
				});

				// show cells
				datum.cells.each(function(cell) {
					cell.setStyle("display", options.cell_display);
				});

				// disable dragging
				datum.drag.detach();

				datum.shown = true;
				my.status.shown += 1;
			}

			my.toggle_end();
		},

		toggle_end: function() {
			// hide dragging overlay
			my.ui.overlay.removeClass(options.classes.overlay_active);

			my.add_placeholders();
			my.update_metrics();
		},

		update_metrics: function() {
			// update metrics for ui elements
			my.metrics.table = {
				'size': {
					'width': my.ui.table.offsetWidth,
					'height': my.ui.table.offsetHeight
				},
				'pos': {
					'left': my.ui.table.offsetLeft,
					'top': my.ui.table.offsetTop
				},
				'abs_pos': my.ui.table.getPosition()
			};

			my.metrics.foot = {
				'size': {
					'height': my.ui.foot.offsetHeight
				}
			};

			if (my.ui.fixed_head && my.ui.fixed_head.shell) {
				my.metrics.fixed_head = {
					'size': {
						'height': my.ui.fixed_head.shell.offsetHeight
					}
				};
			}

			my.metrics.table.abs_pos.y2 =
				(my.metrics.table.abs_pos.y + my.metrics.table.size.height) -
				my.metrics.foot.size.height;


			// update elements relying on these metrics
			if (my.ui.overlay) {
				my.ui.overlay.setStyles({
					'left': my.metrics.table.pos.left + 'px',
					'top': my.metrics.table.pos.top + 'px',
					'width': my.metrics.table.size.width + 'px',
					'height': my.metrics.table.size.height + 'px'
				});
			}
		},

		fix_head: function() {
			var scroll, top, bottom;

			if (my.ui.fixed_head && my.ui.fixed_head.active && my.ui.table.offsetWidth > 0) {
				scroll = document.documentElement.scrollTop || window.scrollY;
				top = my.metrics.table.abs_pos.y;
				bottom = my.metrics.table.abs_pos.y2;

				if (my.metrics.fixed_head) {
					bottom -= my.metrics.fixed_head.size.height;
				}
				if (!my.status.fix_head &&
					(scroll > top && scroll < bottom)) {
					my.ui.fixed_head.shell.setStyle("visibility", "visible");
					my.status.fix_head = true;
				} else if (my.status.fix_head &&
					(scroll < top || scroll > bottom)) {
					my.ui.fixed_head.shell.setStyle("visibility", "hidden");
					my.status.fix_head = false;
				}
			}
		},

		hash_control: function() {
			// perform tasks based on found hash controllers
			var a, hash, match, cols, rows;

			hash = window.hashController.get(options.hash_prefixes.highlight + container.id + "-");

			if (hash.raw !== my.hash.raw) {
				//hash exists and is different from stored hash
				my.hash.raw = hash.raw;
				my.hash.highlight = hash.matched;

				if (hash.matched !== "") {
					match = hash.matched.match(/([\d\,]+)(;([\d\,]+))*/);
					rows = (match[1] || "").split(",");
					cols = (match[3] || "").split(",");

					my.highlight(rows, cols);
				}
			}
		},

		add_placeholders: function() {
			// place placeholder cells (if not all items are shown)
			var a;

			my.ui.head.getElements(options.selectors.placeholder).each(function(cell) {
				cell.destroy();
			});

			for (a = my.status.shown; a < options.max_show; a += 1) {
				my.ui.head.adopt(
					my.ui.placeholder.cloneNode(true)
				);
			}
		},

		highlight: function(rows, columns) {
			// highlight specified rows/columns
			var a, b, ci_row, ci_col, ci_filter, row, cells, cell,
				header_cells, footer_cells;

			ci_filter = function(i) {
				return i > 0;
			};

			// normalise arguments by filtering out invalid check indices and sorting
			rows = (rows || []).filter(ci_filter).sort();
			columns = (columns || []).filter(ci_filter).sort();

			header_cells = my.ui.head.getChildren();
			footer_cells = my.ui.foot.getChildren();

			ci_row = 0;

			// loop through rows
			for (a = 0; (row = my.ui.rows[a]); a += 1) {
				ci_col = 0;

				if (a === parseInt((rows[ci_row] - 1), 10)) {
					row.addClass("highlight");
					ci_row += 1;
				} else {
					row.removeClass("highlight");
				}

				// loop through column (cells)
				cells = row.getChildren();

				for (b = 0; (cell = cells[b]); b += 1) {
					if (b === parseInt((columns[ci_col]), 10)) {
						cell.addClass(options.classes.highlight);

						// highlight header, footer
						header_cells[b].addClass(options.classes.highlight);
						footer_cells[b].addClass(options.classes.highlight);

						ci_col += 1;

						if (a === 0 && my.data && my.data[b - 1]) {
							my.data[b - 1].selector_container.addClass(options.classes.highlight);
						}
					} else {
						cell.removeClass(options.classes.highlight);

						// unhighlight header, footer
						header_cells[b].removeClass(options.classes.highlight);
						footer_cells[b].removeClass(options.classes.highlight);

						if (a === 0 && my.data && my.data[b - 1]) {
							my.data[b - 1].selector_container.removeClass(options.classes.highlight);
						}
					}
				}
			}
		},

		drag: {
			snap: function(element) {
				element.getParent(".product").addClass(options.classes.prod_dragging);
				element.addClass('dragging');
			},

			drop: function(drop, datum) {
				var effect;

				drop.element.removeClass('dragging');
				drop.element.getParent(".product").removeClass(options.classes.prod_dragging);

				my.ui.overlay.removeClass(options.classes.overlay_active);

				if (drop.droppable === my.ui.table &&
					my.status.shown < options.max_show) {
					// drop target was valid - fade out element, then replace
					effect = new window.Fx.Morph(drop.element, {
						'duration': 400
					}).addEvent("complete", function() {
						drop.element.setStyles({
							'left': 0,
							'top': 0,
							'opacity': 1
						});
					}).start({
						'opacity': [1, 0],
						'top': drop.element.offsetTop - 10
					});

					// add datum
					my.toggle(datum);
				} else {
					// drop target was invalid - animate back to position
					effect = new window.Fx.Morph(drop.element, {
						'duration': 400,
						'transition': window.Fx.Transitions.Elastic.easeOut
					}).start({
						'left': 0,
						'top': 0
					});
				}
			},

			enter: function(element, droppable) {
				if ((element.getStyle("left") !== "0px" && element.getStyle("top") !== "0px")) {
					my.ui.overlay.addClass(options.classes.overlay_active);
				}
			},

			leave: function(element, droppable) {
				my.ui.overlay.removeClass(options.classes.overlay_active);
			}
		}
	};

	my.enable();

	return cls;
};