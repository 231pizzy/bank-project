window.LoansCalculator = function(form) {
	var my, Cls;

	my = {
		fields: [],

		getxml: function() {
			var xhr, nodes, node_tables;

			my.xml = null;
			my.data = {};
			my.ranges = [];

			// load in xml data
			xhr = new window.Request({
				'url': siteDir+'library/default/xml/loanrates.xml',
				'method': 'get',
				'onSuccess': function(text, xml) {
					my.xml = xml.documentElement;
					nodes = xml.getElementsByTagName("range");
					node_tables = xml.getElementsByTagName("table");

					if (nodes.length > 0) {
						my.process(nodes, node_tables);
					}
				}
			});

			xhr.send();
		}
	};

	Cls = new Class({
		initialize: function() {
			//	setup user interface
			my.ui = {
				'a': $("months-left"),
				'b': $("monthly-repayments"),
				'c': $("apr"),
				'd': $("total-cost"),
				'ranges': [],
				'data_tables': [],
				'btn1': $('get-apr'),
				'btn2': $('calc-savings'),
				'goback': $('goback'),
				'phase1': $('loan-switcher-calc-phase-one'),
				'phase2': $('loan-switcher-calc-phase-two'),
				'note': $$('#loan-switcher-calc-phase-one .note'),
				'results': $('loan-switcher-calc-results'),
				'result_positive': $('positive-result'),
				'result_negative': $('negative-result'),
				'result_footer': $$('div.result-footer'),
				'old_repayable': $$('p.old-total-repayable'),
				'new_repayable': $$('p.total-repayable'),
				'new_repayments': $$('p.new-repayments'),
				'ft_actions': $('actions'),
				'find_out_more': $$('#actions .cta-more a'),
				'apply': $$('#actions .cta-submit a'),
				'save': $$('p.you-save'),
				'la': $('la'),
				'mr': $('mr'),
				'toa': $('toa'),
				'nor': $('nor'),
				'tar': $('tar'),
				'rapr': $('rapr'),
				'brf': $('brf')
			};
			//	Get all calculator inputs
			form.getElements("input").each(function(el) {
				my.fields.push(el);
			});
			//	Run calculator
			my.calculate();
			//	Go back to start
			my.goBack();
			//	Get loanrates.xml
			my.getxml();
		}
	});

	my.calculate = function() {
		var name, representativeapr, apply_url, find_out_url;
		//	calculate and display APR
		my.ui.btn1.addEvent('click', function(event){
			var d, a, i, range, apr, item;

			event.preventDefault();
			a = parseFloat(my.ui.a.get('value'));
			d = parseFloat(my.ui.d.get('value').replace(/[^\d.]*/g,''));
			//	check if value d falls into range group and return apr
			for (i = 0; (range = my.ui.ranges[i]); i += 1) {
				if (d >= range.min && d <= range.max &&
					a >= range.termmin && a <= range.termmax) {

					apr = range.apr;
					name = range.name;
					representativeapr = range.apr;
					apply_url = range.apply_url;
					find_out_url = range.find_out_url;
				}
			}

			if (apr !== undefined) {
				my.ui.c.set('value', apr);
				my.showPhaseTwo();
			} else {
				my.negativeResult();
			}
		});

		// calculate and display positive/ negative results
		my.ui.btn2.addEvent('click', function(event){
			var a, b, c, d, e, i, data, savings, new_total, old_total;

			event.preventDefault();
			//	get user input value
			a = parseFloat(my.ui.a.get('value'));
			b = parseFloat(my.ui.b.get('value').replace(/[^\d.]*/g,''));
			c = parseFloat(my.ui.c.get('value'));
			d = parseFloat(my.ui.d.get('value').replace(/[^\d.]*/g,''));
			//	calculate old total amount repayable
			old_total = a * b;
			//	get new monthly repayments
			e = parseFloat(my.pmt(c, a, d).toFixed(2));
			//	calculate total amount repayable
			new_total = e * a;
			//	calculate savings
			savings = (b * a) - (new_total);

			if (e >= b) {
				//	show negative result if new repayments are greater than old
				my.negativeResult();
			} else {
				my.positiveResult();
				//	display representative example table
				for (i = 0; (data = my.ui.data_tables[i]); i += 1) {
					if(name === data.name &&
						representativeapr === data.representativeapr) {

						my.ui.apply[0].set('href', apply_url);
						my.ui.find_out_more[0].set('href', find_out_url);

						my.ui.la.set('html', '<span>Loan amount:</span> &pound;' + data.loanamount);
						my.ui.mr.set('html', '<span>Monthly repayment</span> &pound;' + data.mrepayments);
						my.ui.toa.set('html', '<span>Term of agreement</span> ' + data.termofagreement + ' months');
						my.ui.nor.set('html', '<span>Number of repayments</span> ' + data.numberofrepayments);
						my.ui.tar.set('html', '<span>Total amount repayable</span> &pound;' + data.totalamountrepayable);
						my.ui.rapr.set('html', '<span>Representative APR</span> ' + data.representativeapr + '&#37; APR');
						my.ui.brf.set('html', '<span>Borrowing rate (fixed)</span> ' + data.borrowingrate + '&#37; p.a');
					}
				}
				//	show old total amount repayable
				my.ui.old_repayable.set('html', my.formatNumber(old_total));
				//	show new total amount repayable
				my.ui.new_repayable.set('html', my.formatNumber(new_total));
				//	show total savings
				my.ui.save.set('html', my.formatNumber(savings));
				//	show new repayments
				my.ui.new_repayments.set('html', my.formatNumber(e));
			}
		});
	};

	my.pmt = function(ir, np, pv) {
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
	};

	my.formatNumber = function(str) {
		/*
		 *	Format output number to two
		 *	decimal places, seperated by a comma
		*/
		str = str.format({
			decimal: '.',
			group: ',',
			decimals: 2,
			prefix: '&pound;'
		});

		return str;
	};

	my.process = function(nodes, node_tables) {
		var a, name, min, max, apr, ranges, range,
			table, tables, loanamount, mrepayments, termofagreement,
			numberofrepayments, totalamountrepayable, representativeapr, borrowingrate;

		for (a = 0; (range = nodes[a]); a += 1) {
			// get loan range and apr
			name = range.getAttribute("name");
			min = range.getAttribute("min");
			max = range.getAttribute("max");
			apr = range.getAttribute("apr");
			apply_url = range.getAttribute("apply_url");
			find_out_url = range.getAttribute("find_out_url");
			termmin = range.getAttribute("termmin");
			termmax = range.getAttribute("termmax");

			ranges = {
				'name': name,
				'min': min,
				'max': max,
				'apr': apr,
				'termmin': termmin,
				'termmax': termmax,
				'apply_url': apply_url,
				'find_out_url': find_out_url
			};

			my.ui.ranges.push(ranges);
		}

		for (a = 0; (table = node_tables[a]); a += 1) {
			name = table.getAttribute("name");
			loanamount = table.getAttribute("loanamount");
			mrepayments = table.getAttribute("monthlyrepayments");
			termofagreement = table.getAttribute("termofagreement");
			numberofrepayments = table.getAttribute("numberofrepayments");
			totalamountrepayable = table.getAttribute("totalamountrepayable");
			representativeapr = table.getAttribute("representativeapr");
			borrowingrate = table.getAttribute("borrowingrate");

			tables = {
				'name': name,
				'loanamount': loanamount,
				'mrepayments': mrepayments,
				'termofagreement': termofagreement,
				'numberofrepayments': numberofrepayments,
				'totalamountrepayable': totalamountrepayable,
				'representativeapr': representativeapr,
				'borrowingrate': borrowingrate
			};

			my.ui.data_tables.push(tables);
		}
	};

	// show positive results section
	my.positiveResult = function(){
		my.ui.phase1.setStyle('display','none');
		my.ui.phase2.setStyle('display','none');
		my.ui.ft_actions.setStyle('display','block');
		my.ui.results.setStyle('display','block');
		my.ui.result_negative.setStyle('display','none');
		my.ui.result_positive.setStyle('display','block');
		my.ui.result_footer.setStyle('display','block');
	};

	// show negative results section
	my.negativeResult = function(){
		my.ui.phase1.setStyle('display','none');
		my.ui.phase2.setStyle('display','none');
		my.ui.ft_actions.setStyle('display','none');
		my.ui.results.setStyle('display','block');
		my.ui.result_negative.setStyle('display','block');
		my.ui.result_positive.setStyle('display','none');
		my.ui.result_footer.setStyle('display','block');
		my.ui.result_footer.getElement('h3').setStyle('display','none');
		my.ui.result_footer.getElement('h4').setStyle('display','none');
		my.ui.result_footer.getElement('div.data-table').setStyle('display','none');
		my.ui.result_footer.getElement('p.note').setStyle('display','none');
		my.ui.result_footer.getElement('ul').setStyle('padding','0');
	};

	//	show apr results section
	my.showPhaseTwo = function() {
		my.ui.btn1.setStyle('display','none');
		my.ui.note.setStyle('display','none');
		my.ui.phase2.setStyle('display','block');
	};

	//	back to your details
	my.goBack = function() {
		my.ui.goback.addEvent('click', function(event){
			event.preventDefault();
			my.ui.btn1.setStyle('display','block');
			my.ui.note.setStyle('display','block');
			my.ui.phase1.setStyle('display','block');
			my.ui.phase2.setStyle('display','none');
			my.ui.results.setStyle('display','none');
			my.ui.result_negative.setStyle('display','none');
			my.ui.result_positive.setStyle('display','none');
			my.ui.result_footer.setStyle('display','none');
			my.ui.result_footer.getElement('h3').setStyle('display','block');
			my.ui.result_footer.getElement('h4').setStyle('display','block');
			my.ui.result_footer.getElement('div.data-table').setStyle('display','block');
			my.ui.result_footer.getElement('p.note').setStyle('display','block');
			my.ui.result_footer.getElement('ul').setStyle('padding','20px 0 0 0');
		});
	};

	return new Cls();
};
