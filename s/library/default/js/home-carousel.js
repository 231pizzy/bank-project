window.addEvent('domready', function() {
	$$("div.home-carousel").each(function(element) {
		new homeCarousel(element);
	});
});

var homeCarouselTimings = [
	[4, 1, 2, 3, 5],
	[4, 1, 3, 2, 5],
	[4, 1, 5, 3, 2],
	[4, 1, 2, 5, 3]
];

var animator = new Class({		
	initialize: function(element) {
		this.element = element;
		
		this.animation_delta = 20;
		this.x = 0;
		
		this.params = new Object();
	},
	
	start : function(options) {
		this.params.property = options.property;
		
		if(this.element.getStyle(options.property) == 'auto') {
			this.params.start = 0;
		} else {
			this.params.start = parseFloat(this.element.getStyle(options.property));
		}
		
		this.params.end = options.target;
		this.params.duration = options.duration;
		
		this.x = 0;
		
		this.thread = setInterval(
			function() {
				this.animate(options);
			}.bind(this),
			this.animation_delta
		);
	},
	
	animate : function(options) {
		val = this.params.start + (this.params.end - this.params.start) * this.sigmoid(this.x / this.params.duration);
		
		this.element.setStyle(this.params.property, val + 'px');
			
		if(this.x >= this.params.duration) {
			clearTimeout(this.thread);
			
			this.element.setStyle(this.params.property, this.params.end + 'px');
			
			if (typeof options.callback === "function") {
				options.callback();
			}
		}
		
		this.x += this.animation_delta;
	},
	
	sigmoid : function(x) {
		scaled_x = -6 + (x * 12);
		
		return 1 / (1 + Math.exp(-scaled_x));
	}
});	

var homeCarousel = new Class({
	initialize: function(carousel) {
		this.carousel = carousel;
		this.total_width = 0;
		this.items = [];
		this.index = 0;
		this.timers = {};
		this.interactive = false;
		this.animating = false;
		
		this.options = {
			'item_margin': 9,
			'transition': 10, //delay, in seconds
			'default_duration': 300
		};
		
		if (this.carousel.getElement("ul")) {
			this.ul = this.carousel.getElement("ul");
		} else {
			return false;
		}
		
		//add pagination container
		this.pagination = new Element("ul", {
			'class': 'pagination'
		}).setStyles({
			'position': 'absolute'
		}).inject(
			this.carousel
		);
		
		this.items = this.ul.getChildren("li");
		
		//order items based on selected timings
		if (typeof homeCarouselTimings !== "undefined" && homeCarouselTimings.length > 0) {
			this.timings = homeCarouselTimings[Math.floor(Math.random() * homeCarouselTimings.length)];
			(function() {
				var a, newitems, item;
				newitems = [];
				
				for (a = 0; a < this.items.length; a++) {
					if (this.timings[a]) {
						item = this.items[(this.timings[a] - 1)];
						newitems.push(item);
					}
				}
				
				this.items = newitems;
				
				this.items.each(function(item) {
					this.ul.adopt(item);
				}, this);
			}.bind(this)());
		}

		//parse items
		this.items.each(function(item, index) {
			var link;
			
			if (index > 0) {
				item.setStyle("opacity", 0);
			}
			
			if ((link = item.getElements("a[href]")[0])) {
				item.url = link.getProperty("href");
			}
			
			//add some custom attributes
			item.animator = new animator(item);
			
			//add pagination index
			new Element("a", {
				'href': '#'
			}).appendText(index + 1).addEvent(
				"click", function(event) {
					event = new Event(event || window.event);
					event.stop();
					
					this.select_item(index, true);
				}.bind(this)
			).inject(
				new Element("li").inject(
					this.pagination
				).addClass((index === 0) ? "active" : "")
			)
		}, this);
		
		//size & position pagination based on computed width
		this.pagination.setStyles({
			'width': this.pagination.offsetWidth + 'px',
			'left': ((this.carousel.offsetWidth / 2) - (this.pagination.offsetWidth / 2)) + 'px'
		});
		
		//add navigation
		this.nav_prev = new Element("a", {
			'href': '#',
			'class': 'carousel-nav prev',
			'title': 'Prev'
		}).addEvent("click", function(event) {
			event = new Event(event || window.event);
			event.stop();
				
			this.select_index(-1, true);
		}.bind(this)).inject(
			this.carousel
		);
		
		this.nav_next = new Element("a", {
			'href': '#',
			'class': 'carousel-nav next',
			'title': 'Next'
		}).addEvent("click", function(event) {
			event = new Event(event || window.event);
			event.stop();
			
			this.select_index(1, true);
		}.bind(this)).inject(
			this.carousel
		);

		new Element("strong").inject(		
			new Element("span").inject(
				new Element("span").inject(
					this.cta = new Element("a", {
						'href': '#',
						'class': 'carousel-cta'
					}).addEvent("click", function(event) {
						var item;
						
						event = new Event(event || window.event);
						event.stop();
						
						if ((item = this.items[this.index]) && item.url) {
							location.href = item.url;
						}
					}.bind(this)).inject(
						this.carousel
					)
				)
			)
		).appendText("Find out more");
		
		this.carousel.addEvent("mouseenter", function() {
			this.interactive = true;
		}.bind(this));
		
		this.carousel.addEvent("mouseleave", function() {
			this.interactive = false;
		}.bind(this));
		
		this.timer();
	},
	
	timer: function() {
		if (this.timers.transition !== undefined) {
			clearTimeout(this.timers.transition);
		}
		
		this.timers.transition = setTimeout(function() {
			if (!this.interactive) {
				this.select_index(1, 800);
			} else {
				this.timer();
			}
		}.bind(this), (this.options.transition * 1000));
	},
	
	select_index: function(adjustment, interactive) {
		var index;
		
		index = this.index + adjustment;
		
		if (index > (this.items.length - 1)) {
			index = 0;
		} else if (index < 0) {
			index = (this.items.length - 1);
		}
		
		this.select_item(index, interactive);
	},
	
	select_item: function(index, interactive) {
		if (!this.items[index] || (this.index === index) || this.animating) {
			return false;
		}
		
		if (interactive === undefined) {
			interactive = false;
		}
		
		if (interactive !== false) {
			this.animating = true;
			
			setTimeout(function() {
				this.nav_adjust(this.index, false);
				this.nav_adjust(index, true);
			}.bind(this), (this.options.default_duration / 2));
			
			this.items[index].animator.start({
				'property': 'opacity',
				'target': 1,
				'duration': ((interactive === true) ? this.options.default_duration : interactive)
			});
			
			this.items[this.index].animator.start({
				'property': 'opacity',
				'target': 0,
				'duration': ((interactive === true) ? this.options.default_duration : interactive),
				'callback': function() {
					this.index = index;
					this.animating = false;
				}.bind(this)
			});
			
			this.timer();
		} else {
			this.nav_adjust(this.index, false);
			this.nav_adjust(index, true);
			
			this.items[index].setStyle("opacity", 1);
			this.items[this.index].setStyle("opacity", 0);
			this.index = index;
		}
	},
	
	nav_adjust: function(index, active) {
		var li;
		
		if ((li = this.pagination.getChildren("li")[index])) {
			if (active) {
				li.addClass("active");
			} else {
				li.removeClass("active");
			}   
		}
	}
});