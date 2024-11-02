var DoubleNectarCalcSUmmary = function(shell) {
	var my;

	my = {
		enable: function() {
			// get ui elements
			my.ui = {
				// Areas
				'wrapper': document.getElement("#double_nectar_calc_summary"),
				'head': shell.getElement("#head"),
				'products' : shell.getElement("#included-products"),
				'terms' : shell.getElement("#terms"),
				// Elements
				'pound_value' : shell.getElement(".pound_value"),
				'based_on_list': shell.getElement("#based_on_list")
			};

			// get cookies
			my.quote = {
				'test': window.Cookie.read("test"),
				'pounds': window.Cookie.read("pounds"),
				'no_prods': window.Cookie.read("no_prods"),
				'week_spend': window.Cookie.read("week_spend"),
				'use_cc': window.Cookie.read("use_cc")
			};

			if (my.quote.pounds !== null &&
				my.quote.no_prods !== null &&
				my.quote.week_spend !== null &&
				my.quote.use_cc !== null) {
				my.init();
			}else {
				// hide wrapepr
				my.ui.wrapper.setStyle("display", "none");
			}

			if (typeof window.focus === "object") {
				window.focus();
			}

		},

		init: function() {
			var num_products_text;
			my.ui.pound_value.set("html", "&pound;" + my.quote.pounds);
			my.ui.based_on_list.innerHTML = my.ui.based_on_list.innerHTML + "<li>&pound;" + my.quote.week_spend + " weekly spend on "+sNmSht+"'s shopping</li>";
			if (my.quote.use_cc === "true") {
				my.ui.based_on_list.innerHTML = my.ui.based_on_list.innerHTML + "<li>"+sNmSht+"'s Nectar Credit Card used to pay for these purchases</li>";
			}

			if (my.quote.no_prods < 2) {
				num_products_text = " qualifying product";
			} else {
				num_products_text = " qualifying products";
			}

			my.ui.based_on_list.innerHTML = my.ui.based_on_list.innerHTML + "<li>Holding " + my.quote.no_prods + num_products_text + "</li>";
		}
	};

	my.enable();
};