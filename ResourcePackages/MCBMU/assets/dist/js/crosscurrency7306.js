$(function () {

    $("#btnConvert").click(function () {
        var rateDate = $("#rateDate").val();
        var fromCurrency = $("#FromCurrency").val();
        var toCurrency = $('#ToCurrency').val();
        var fromCurrencyName = $("#FromCurrency option:selected").text();
        var toCurrencyName = $("#ToCurrency option:selected").text();
        var amount = $('#convertamount').val();
        $.ajax({
            url: "/webapi/mcb/crosscurrency",
            cache: false,
            type: "POST",
            data: {
                "rateDate": rateDate,
                "fromCurrency": fromCurrency,
                "fromCurrencyName": fromCurrencyName,
                "toCurrency": toCurrency,
                "toCurrencyName": toCurrencyName,
                "amount": amount,
            },
            success: function (data) {
                
                if (data.Html) {
                    $(calculator).hide();
                    $("#result").html(data.Html);
                }
                else {
                    $("#result").html(data.Message);
                }
            }
        });

    });


});