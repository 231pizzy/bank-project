$(function () {

    $("#btnIBAN").click(function () {
        var acctNo = $("#txtAcctNo").val();
        $.ajax({
            url: "/webapi/mcb/getIBAN",
            cache: false,
            type: "GET",
            data: {
                "acctNo": acctNo,
            },
            success: function (data) {
                if (data.IBAN) {
                    result = 'IBAN number :' + data.IBAN;
                    $("#iban_result").html(result);
                }
                else {
                    $("#iban_result").html(data.message);
                }

            }
        });

    });


});