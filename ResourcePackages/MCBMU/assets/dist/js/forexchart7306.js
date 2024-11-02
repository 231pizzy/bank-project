function DrawChart(datax, cur) {
    anychart.licenseKey("mcb.mu-88fa7481-d925d335");
    var dataSet = anychart.data.set(datax);
    var format = "";
    var orclDataTable = anychart.data.table();
    orclDataTable.addData(datax);
    //alert(datax);
    // create stock chart
    chart = anychart.stock();

    // create chart title

    // Set output timezone.
    anychart.format.outputTimezone(-240);


    // create first plot on the chart with column series
    var firstPlot = chart.plot(0);
    // create first plot title



    function getFormat(value) {
        // alert(new Date(1000*value));

        if ((new Date(1000 * value).toString().includes("04:00:00 GMT+0400")) || (new Date(1000 * value).toString().includes("00:00:00 GMT+0400"))) {
            format = 'dd MMM yyyy';

        }
        else {
            format = 'dd MMM yyyy HH:mm a';

        }

        return format;
    }


    firstPlot.legend().titleFormatter(function () {
        return '' +

            anychart.format.dateTime(this.value, getFormat(this.value));

    }).title().useHtml('true').align('left');



    firstPlot.splineArea(orclDataTable.mapAs({ 'value': 1 })).fill('#E5E5E5 0.6').stroke('1.5 #C21700').name(cur).tooltip(null);

    chart.scroller().area(orclDataTable.mapAs({ 'value': 1 })).stroke('#C21700 1.5').fill('#C21700 0.1');
    // set chart selected date/time range

    var grid = firstPlot.grid();
    grid.enabled(true);
    grid.stroke({ color: "#999", dash: "3 5" });
    grid.layout("vertical");
    var grid1 = firstPlot.grid(1);
    grid1.enabled(true);
    grid1.stroke({ color: "#999", dash: "3 5" });
    grid1.layout("horizontal");

    //var grouping = chart.grouping();
    //grouping.maxVisiblePoints(720);

    //var currentScrollerGrouping = chart.scrollerGrouping();

    //currentScrollerGrouping.forced(true);

    // set container id for the chart
    chart.container('chartContainer');
    var credits = chart.credits();
    credits.enabled(false);
    // initiate chart drawing
    chart.draw();

    // create range selector
    rangeSelector = anychart.ui.rangeSelector();

    rangeSelector.target(chart);
    rangeSelector.ranges([{
        type: "Unit",
        unit: "Day",
        count: 10,
        format: "10D",
        text: "10D"
    },
    {
        type: "Unit",
        unit: "Month",
        count: 1,
        format: "1M",
        text: "1M"
    },
    {
        type: "Unit",
        unit: "Month",
        count: 3,
        format: "3M",
        text: "3M"
    },
    {
        type: "YTD",
        format: "YTD",
        text: "YTD"
    },
    {
        type: "Unit",
        unit: "Year",
        count: 1,
        format: "1Y",
        text: "1Y"
    },
    {
        type: "Unit",
        unit: "Year",
        count: 2,
        format: "2Y",
        text: "2Y"
    },
    {
        type: "Max",
        format: "MAX",
        text: "MAX"
    }]);

    chart.selectRange("YTD");
    rangeSelector.render(chart);
    // init range selector


    $(".anychart-range-selector button").attr("type", "button");

    chart.scroller().listen("scrollerchangefinish", function () {
        UpdateDates();
    });

    UpdateDates();

    function UpdateDates() {
        var range = chart.getSelectedRange();
        var startValue = anychart.format.dateTime(range.firstVisible, "dd/MM/yyyy");
        var endValue = anychart.format.dateTime(range.lastVisible, "dd/MM/yyyy");
        $("#forexDateStart").val(startValue);
        $("#forexDateEnd").val(endValue);
    }
}


anychart.onDocumentReady(function () {




});

