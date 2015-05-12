$(document).ready(function() {

    var cont = $('#ribbon_mask');
    var t_details = $('#t_details');
    var date = $('#date');
    var ribbon = $('#ribbon');
    var win = $(window);
    var gap = 10;

    win.load(function() {
        adjust();
    });
    win.resize(function() {
        adjust();
    });

    function adjust() {
        var width;
        if (win.width() <= 612) {
            width = "auto";
        } else {
            width = date.offset().left - gap;
            width += 'px';
        }

        cont.css('width', width);
    }

    adjust();

});