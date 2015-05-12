(function() {


    $(document).ready(function() {
        var show = true;
        var btn_market = $('#btn_market');
        var market_dd = $('#market_dd');
        btn_market.click(function() {

            if (show) {
                market_dd.css('display', 'inherit');
            } else {
                market_dd.hide();
            }

            show = !show;
        });

    });

})();