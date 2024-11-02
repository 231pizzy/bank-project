var NectarCalculator = function(container) {
	var my;

	my = {
		enable: function() {
			my.ui = {
				'total': container.getElement("div.nectar-total p"),
				'form': container.getElement("form.calculator"),
				'multipliers': container.getElement(".multipliers")
			};
			
			my.settings = {
				'total_length': 6,
				'format': {
					'number': {
						'decimals': 0
					},
					'currency': {
						'decimals': 2
					}
				}
			};

			if (my.ui.form && my.ui.multipliers && my.ui.total) {
				my.ui.form.addEvent("submit", my.submit);
			}
		},

		submit: function(event) {
			// handle form submission - calculate points and feed back
			var a, m, spend, list, values, string, parts;

			event.preventDefault();

			spend = $(my.ui.form.elements.spend).get("value").toString();
			spend = Math.round(spend.trim().replace(/[^0-9\.]*/g, ""));

			if (isNaN(spend)) {
				spend = 0;
			}

			$(my.ui.form.elements.spend).set("value", spend);

			if (!isNaN(spend)) {
				values = my.calculate(spend);
				list = my.ui.multipliers.getElement("ul");

				// set values into form
				string = values.doublePoints.toString();
				string = string.pad(my.settings.total_length, "0", "left");

				parts = string.split("");

				my.ui.total.empty();
				list.empty();

				// add total points
				for (a = 0; a < my.settings.total_length; a += 1) {
					my.ui.total.adopt(
						new Element("strong").set("text", parts[a])
					);
				}

				// add value amount for total
				if (!my.ui.worth) {
					my.ui.worth = new Element("p.notes");
					my.ui.multipliers.parentNode.insertBefore(my.ui.worth, my.ui.multipliers);
				}

				my.ui.worth.set(
					"html",
					"(Worth <b>&pound;" +
						values.doublePointsValue.format(my.settings.format.currency) +
						"</b>)</p>"
				);

				// add multipliers
				for (a = 0; (m = values.multipliers[a]); a += 1) {
					list.adopt(
						new Element("li").set(
							"html",
							m.products + " new products = x " + m.multiplier+ " points " +
							"<b>" + m.points.format(my.settings.format.number) +
							"</b> (worth: <b>&pound;" +
							m.value.format(my.settings.format.currency) + "</b>)"
						)
					);
				}
			}
		},

		calculate: function(spend) {
			// calculate points based on spend amount
			var pointsPerPound, accumulationDuration, maxBonusPointsPerProduct,
				basePoints, bonusPointsPerProduct;

			pointsPerPound = 2;
			accumulationDuration = 104;
			maxBonusPointsPerProduct = 60000;

			basePoints = spend * pointsPerPound * accumulationDuration;
			bonusPointsPerProduct = (basePoints > maxBonusPointsPerProduct) ?
				maxBonusPointsPerProduct : basePoints;

			return {
				doublePoints : (basePoints + bonusPointsPerProduct),
				doublePointsValue : ((basePoints + bonusPointsPerProduct)/200),
				'multipliers': [{
					'multiplier': 3,
					'products': 2,
					'points' : (basePoints + 2 * bonusPointsPerProduct),
					'value' : ((basePoints + 2 * bonusPointsPerProduct)/200)
				}, {
					'multiplier': 4,
					'products': 3,
					'points' : (basePoints + 3 * bonusPointsPerProduct),
					'value' : ((basePoints + 3 * bonusPointsPerProduct)/200)
				}, {
					'multiplier': 5,
					'products': 4,
					'points' : (basePoints + 4 * bonusPointsPerProduct),
					'value' : ((basePoints + 4 * bonusPointsPerProduct)/200)
				}, {
					'multiplier': 6,
					'products': 5,
					'points' : (basePoints + 5 * bonusPointsPerProduct),
					'value' : ((basePoints + 5 * bonusPointsPerProduct)/200)
				}]
			};
		}
	};

	my.enable();
};