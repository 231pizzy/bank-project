$(function () {

    $("#btnSubmit").click(function () {
        var contractName = $("#txtRNumber").val();
        var amount = $("#txtAmount").val();
        var currency = $('#txtCurrency').val();
        var valueDate = $('#txtvalueDate').val();
        var endDate = $('#txtendDate').val();
        $.ajax({
            url: "/webapi/mcb/bankguarantee",
            cache: false,
            type: "POST",
            data: {
                "contractName": contractName,
                "amount": amount,
                "currency": currency,
                "valueDate": valueDate,
                "endDate": endDate,
            },
            success: function (data) {
                
                if (data.Html) {
                    $("#bankResult").html(data.Html);
                }
                else {
                    $("#bankResult").html(data.Message);
                }
            }
        });

    });


});