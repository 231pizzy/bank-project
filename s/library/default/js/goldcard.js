window.addEvent('domready', function() {
	if ($("gc-banner-large")) {
		new gcBanner($("gc-banner-large"));
	}
});

function gcPresenterCheck() {
	if ($$("div#gc-landing").length > 0) {
		new gcPresenter($("gc-landing"));
	}
}

var gcPresenter = new Class({
	paths: {
		'bg_default': '/library/default/images/goldcard/landing/bg.jpg',
		'bg_home': '/library/default/images/goldcard/landing/bg-home.jpg',
		'bg_abroad': '/library/default/images/goldcard/landing/bg-abroad.jpg'
	},
	
	initialize: function(container) {
		this.container = container;
		this.content = this.container.getElement("div#gc-content");
		this.gc_home = this.container.getElement("div#gc-home");
		this.gc_abroad = this.container.getElement("div#gc-abroad");
		this.active_tip = null;
		this.polygons = Array();
		
		//initialize
		this.container.removeClass("fallback");
		
		//cache images
		bg1 = new Image().src = this.paths.bg_default;
		bg2 = new Image().src = this.paths.bg_home;
		bg3 = new Image().src = this.paths.bg_abroad;
		
		this.gc_home_bg = new Element("div", {
			'class': 'gc-bg'
		}).setStyles({
			'backgroundImage': 'url(' + this.paths.bg_home + ')',
			'visibility': 'hidden'
		}).inject(this.content);
		
		this.gc_abroad_bg = new Element("div", {
			'class': 'gc-bg'
		}).setStyles({
			'backgroundImage': 'url(' + this.paths.bg_abroad + ')',
			'visibility': 'hidden'
		}).inject(this.content);
		
		//get coords
		this.pos = this.content.getPosition();
		
		window.addEvent("resize", function() {
			this.pos = this.content.getPosition();
		}.bind(this));
		
		this.polygons['gc-home'] = this.fetch_points("home");
		this.polygons['gc-abroad'] = this.fetch_points("abroad");
		
		//apply events to list items
		$each(this.content.getElements("h2"), function(item) {
			var li, span, p;
			
			li = item.getParent("li");
			p = li.getElement("p");
			
			if (p) {
				item.addEvent("mouseover", function(event) {
					li.addClass("active");
				}.bind(this));
				
				item.addEvent("mouseout", function(event) {
					li.removeClass("active");
					
					if (this.active_tip) {
						this.active_tip.removeClass("active");
					}
				}.bind(this));
				
				//set up tip
				p.getElement("span").addClass("inner");
				
				//add footer
				span = new Element("span", {
					'class': 'footer'
				});
				
				span.inject(li.getElement("p"));
				
				p.setStyles({
					'top': -(p.offsetHeight + 3) + 'px'
				});
			}
		}, this);
				
		this.observe_polyons();
		
		return;
	},
	
	fetch_points: function(name) {
		switch (name) {
			case 'home':
				return [[0,0],[648,0],[272,374],[0,374]];
				break;
			case 'abroad':
				return [[649,0],[975,0],[975,374],[273,374]];
				break;
			default:
				return false;
		}
	},
	
	observe_polyons: function() {
		this.content.addEvent("mousemove", function(event) {
			var mouse_point, i;
			
			mouse_point = {
				x: event.clientX - this.pos.x,
				y: event.clientY - this.pos.y
			};
			
			if (this.isPointInPoly(this.polygons['gc-home'], mouse_point)) {
				this.gc_home_bg.setStyle("visibility", "visible");
				this.gc_abroad_bg.setStyle("visibility", "hidden");
				
				this.gc_home.removeClass("inactive");
				this.gc_abroad.addClass("inactive");
			} else if (this.isPointInPoly(this.polygons['gc-abroad'], mouse_point)) {
				this.gc_abroad_bg.setStyle("visibility", "visible");
				this.gc_home_bg.setStyle("visibility", "hidden");
				
				this.gc_abroad.removeClass("inactive");
				this.gc_home.addClass("inactive");
			}
		}.bind(this));
		
		this.content.addEvent("mouseout", function() {
			this.gc_home_bg.setStyle("visibility", "hidden");
			this.gc_abroad_bg.setStyle("visibility", "hidden");
				
			this.gc_home.removeClass("inactive");
			this.gc_abroad.removeClass("inactive");
		}.bind(this));
	},
	
	isPointInPoly: function(poly, pt) {
		var c, i, j;
		
		for (c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
			((poly[i][1] <= pt.y && pt.y < poly[j][1]) || (poly[j][1] <= pt.y && pt.y < poly[i][1]))
			&& (pt.x < (poly[j][0] - poly[i][0]) * (pt.y - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
			&& (c = !c);
		}
		
		return c;
	}
})

var gcBanner = new Class({
	initialize: function(container) {
		this.container = container;
		this.roundel = container.getElement("ul#gc-roundel-spinner");
		this.items = [];
		this.index = 0;
		this.timer = null;
		this.animating = false;
		
		this.container.removeClass("fallback");
		
		//init roundel spinner
		if (this.roundel) {
			$each(this.roundel.getElements("li"), function(li, index) {
				if (index > 0) {
					li.setStyle("visibility", "hidden");
				}		
				this.items.push(li);
			}, this);
		}
		
		this.anim = new Element("li", {
			'class': 'anim'
		}).setStyle("visibility", "hidden").inject(this.roundel);
		
		this.nav_prev = new Element("a", {
			'class': 'nav-btn nav-prev',
			'href': '#',
			'title': 'Prev'
		}).appendText("Prev").inject(this.container).addEvent(
			"click", function(event) {
				event = new Event(event);
				event.stop();
				this.go(-1, true);
			}.bind(this)
		);
		
		this.nav_next = new Element("a", {
			'class': 'nav-btn nav-next',
			'href': '#',
			'title': 'Next'
		}).appendText("Next").inject(this.container).addEvent(
			"click", function(event) {
				event = new Event(event);
				event.stop();
				this.go(1, true);
			}.bind(this)
		);
		
		new Element("span").inject(this.nav_prev);
		new Element("span").inject(this.nav_next);
		
		this.auto_go();
	},
	
	auto_go: function() {
		if (!this.timer) {
			//set up timer
			this.timer = window.setTimeout(this.auto_go.bind(this), 5000);
		} else {
			this.go(1, false);
			this.timer = window.setTimeout(this.auto_go.bind(this), 5000);
		}
	},
	
	go: function(adjustment, interactive) {
		var index;
		
		if (this.animating) return false;
		
		index = this.index + adjustment;
		
		if (index > (this.items.length - 1)) {
			index = 0;
		} else if (index < 0) {
			index = (this.items.length - 1);
		}
		
		this.select(index, interactive);
	},
	
	select: function(index, interactive) {
		var item;
		
		if (this.animating) return false;
		
		window.clearTimeout(this.timer);
		this.timer = null;
		this.animating = true;
		
		if (this.items[index]) {
			item = this.items[index];
			
			this.items[this.index].setStyle("visibility", "hidden");
			this.anim.setStyle("visibility", "visible");
			
			window.setTimeout(function() {
				this.anim.setStyle("visibility", "hidden");
				item.setStyle("visibility", "visible");
				
				this.index = index;
				this.animating = false;
				
				if (interactive) {
					this.auto_go();
				}
			}.bind(this), 560)
		}
	}
});