$(function () {
    $('#download').hide();
    $("#buttonId").disable = true;
    $("#forexCurrency").change(function () {

        var theItem = $("#forexCurrency").val();

        if (theItem == "" || theItem == "ALL") {
            $("#chartRow").hide("slow");
            $('#download').show("slow");
            $('#buttonId').prop("disabled", false);
            document.getElementById('forexDateStart').valueAsDate = new Date();
            document.getElementById('forexDateEnd').valueAsDate = new Date();
            return;
        }
        $("#chartContainer").html("loading...");
        

        $("#chartRow").show("slow", function () {

            $.ajax({
                url: "/webapi/mcb/getforexdata",
                cache: false,
                type: "GET",
                data: {
                    "currencyCode": theItem,
                    "baseCurrency": baseCurrency,
                },
                success: function (data) {
                    $("#chartContainer").html("");
                    DrawChart(data, $("#forexCurrency").val());

                    $('#buttonId').prop("disabled", false);

                }
            });

        });
        $('#download').show("slow");
        document.getElementById('forexDateStart').valueAsDate = new Date();
        document.getElementById('forexDateEnd').valueAsDate = new Date();
    });

    $("#buttonId").on('click', function (e) {

        e.preventDefault();

        var settings = {
            "url": "/webapi/mcb/ForexDataExcel",
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "data": JSON.stringify({
                "StartDate": $('#forexDateStart').val(),
                "EndDate": $('#forexDateEnd').val(),
                "CurrencyCode": $(forexCurrency).val(),
                "BaseCurrency": baseCurrency,
            }),
            "xhrFields": {
                "responseType": "blob"
            }
        };
        $.ajax(settings).done(function (response) {

            var today = new Date().toISOString().slice(0, 10);
            var blob = new Blob([response], { type: 'data:application/vnd.ms-excel' });
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "Forex-" + today.replace('-', '').replace('-', '') + ".xlsx";
            document.body.appendChild(a);
            a.click();

        });
    });
});