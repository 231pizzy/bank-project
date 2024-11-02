var matchHeight = function () {

    function init() {
        eventListeners();
        matchHeight();
    }

    function eventListeners() {
        $(window).on('resize', function () {
            matchHeight();
        });
    }

    function matchHeight() {

        var mark = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10'];

        var i = 0;

        $.each(mark, function () {

            var level = mark[i];
            console.log(level);
            var data = '[data-mh-' + level + ']';
            var level = $(data);
            var levelheight = level + 'h';
            var levelheight = [];

            level.css('min-height', 'auto');

            level.each(function () {
                levelheight.push($(this).outerHeight());
            });

            var maxHeight = Math.max.apply(null, levelheight);
            level.css('min-height', maxHeight);

            i++
        });

    }

    return {
        init: init
    };

}();

$(document).ready(function () {
    if($(window).width() >= 991){
        matchHeight.init();
    }
});