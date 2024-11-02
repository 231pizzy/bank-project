$(function () {
    if (!$('.foreignexchangecalculator .foreignexchangecalculator__inner').length) {
        return;
    }

    var currencyInfo = currencyData;

    $('.foreignexchangecalculator').each(function forExEachAF(index, el) {

        var $el = $(el),
            currency1El = $el.find('.currency1'),
            currency2El = $el.find('.currency2'),
            currency1OptionEls = currency1El.find('option'),
            currency2OptionEls = currency2El.find('option'),
            currency1Val = currency1El.find('option:selected').val(),
            currency2Val = currency2El.find('option:selected').val(),
            monetaryValue1El = $el.find('.moneyAmount1'),
            monetaryValue2El = $el.find('.moneyAmount2'),
            resultsEl = $el.find('.foreignexchangecalculator__results'),
            resultsFromEl = $el.find('.foreignexchangecalculator__results-base-amount'),
            resultsToEl = $el.find('.foreignexchangecalculator__results-result-amount');
        resultsEl.hide();

        currency1El.on('change', function () {
            swapTextboxValues();
        });

        currency2El.on('change', function () {
            swapTextboxValues();
        });

        function swapTextboxValues() {
            disableRedundantOptions();
            calculatecurrencyValue(currency1El[0].value, currency2El[0].value, monetaryValue1El[0].value);
        }


        $el.find('.jquery-selectmenu--forex').each(function selectMenuCreatorEach() {

            var $selectMenuWidget,
                $this = $(this);

            $selectMenuWidget = $this.selectmenu({
                'change': function (event, ui) {
                    swapTextboxValues();
                    $selectMenuWidget.html('<span style="' + $(ui.item.element).data('style') + '" class="ui-selectmenu-flag"></span><span class="ui-selectmenu-icon ui-icon icon--arrow-down"></span><span class="ui-selectmenu-text">' + ui.item.label + '</span>');
                },
                'icons': {
                    'button': 'icon--arrow-down'
                }
            })
                .selectmenu('widget');

            $selectMenuWidget.html('<span style="' + $this.find('option:selected').data('style') + '" class="ui-selectmenu-flag"></span><span class="ui-selectmenu-icon ui-icon icon--arrow-down"></span><span class="ui-selectmenu-text">' + $this.find('option:selected').text() + '</span>');
            //$selectMenuWidget.html('<span class="ui-selectmenu-icon ui-icon icon--arrow-down"></span><span class="ui-selectmenu-text">' + $this.find('option:selected').text() + '</span>');

        });


        $el.find('.foreignexchangecalculator__swap-currencies').on('click', function forExCalcCurrencySwapClickAF() {

            currency1Val = currency1El[0].value;
            currency2Val = currency2El[0].value;
            var temp = currency1Val;
            currency1El.val(currency2Val).change();
            currency2El.val(temp).change();

            disableRedundantOptions();
            calculatecurrencyValue(currency1El[0].value, currency2El[0].value, monetaryValue1El[0].value);

            if (currency1El.selectmenu('instance')) {
                updateSelectMenuButton(currency1El.selectmenu('widget'), currency1El.selectmenu('instance'));
                currency1El.selectmenu("refresh");
            }
            if (currency2El.selectmenu('instance')) {
                updateSelectMenuButton(currency2El.selectmenu('widget'), currency2El.selectmenu('instance'));
                currency2El.selectmenu("refresh");
            }

        });

        monetaryValue1El.on('keyup', function forExTextBoxKeyUpAF() {
            if (monetaryValue1El.val() < 0) {
                monetaryValue1El.val(1);
            }

            calculatecurrencyValue(currency1El[0].value, currency2El[0].value, monetaryValue1El[0].value);
        });

        disableRedundantOptions();
        calculatecurrencyValue(currency1El[0].value, currency2El[0].value, monetaryValue1El[0].value);

        function updateSelectMenuButton(el, data) {
            el.html('<span style="' + $(data.element).find('option:selected').data('style') + '" class="ui-selectmenu-flag"></span><span class="ui-selectmenu-icon ui-icon icon--arrow-down"></span><span class="ui-selectmenu-text">' + $(data.element).find('option:selected').html() + '</span>');
        }

        function disableRedundantOptions() {
            currency1Val = currency1El.find('option:selected').val();
            currency2Val = currency2El.find('option:selected').val();
            currency1OptionEls.prop('disabled', false);
            currency2OptionEls.prop('disabled', false);
            currency1OptionEls.filter('option[value="' + currency2Val + '"]').prop('disabled', true);
            currency2OptionEls.filter('option[value="' + currency1Val + '"]').prop('disabled', true);

            if (currency1El.selectmenu('instance')) {
                currency1El.selectmenu("refresh");
            }
            if (currency2El.selectmenu('instance')) {
                currency2El.selectmenu("refresh");
            }
        }

        //inverted currento and currencyfrom to correct calculation.
        function calculatecurrencyValue(currencyTo, currencyFrom, monetaryValue) {
            var amountInBaseCurrency = monetaryValue / currencyInfo[currencyFrom].rate,
                convertedMonetaryValue = amountInBaseCurrency * currencyInfo[currencyTo].rate;

            convertedMonetaryValue = convertedMonetaryValue.toFixed(4);
            monetaryValue2El.val(convertedMonetaryValue);

            outputCurrencyResults(currencyTo, currencyFrom, monetaryValue, convertedMonetaryValue)

        }

        function outputCurrencyResults(currencyFrom, currencyTo, monetaryValueFrom, monetaryValueTo) {
            if (!monetaryValueFrom || parseFloat(monetaryValueFrom) == 0 || monetaryValueFrom == 0) {
                resultsEl.fadeOut(200);
            } else {
                resultsEl.fadeIn(200);
            }
            var fromHtmlString = currencyInfo[currencyFrom].symbol + parseFloat(monetaryValueFrom).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + ' ' + currencyInfo[currencyFrom].label,
                toHtmlString = currencyInfo[currencyTo].symbol + parseFloat(monetaryValueTo).toFixed(4).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + ' ' + currencyInfo[currencyTo].label;

            resultsFromEl.html(fromHtmlString);
            resultsToEl.html(toHtmlString);


        }

    });
});
