$(function () {

        $.ajax({
            url: "/webapi/mcb/getforexRate",
            cache: false,
            type: "GET",
            data: {
                "c": currency,
            },
            success: function (data) {
                if (data.Html) {
                    $("#indicativeRates").html(data.Html);
                }
                else {
                    $("#indicativeRates").html(data.message);
                }
            }
        });
    });

