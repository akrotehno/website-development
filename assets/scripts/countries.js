(function() {
    var _klng = {
        en: true,
        gr: true
    };
    var _lng = GetURLParameter('lang');

    var lngExists = _klng[_lng];
    if (!lngExists) {
        _lng = 'gr';
    }
    window.lng = _lng;

    $(document).ready(function() {

        var dir = base_url + '/assets/images/flags/';
        var flags = '.lang_gr { background: url("' + dir + 'flag_gr.png") no-repeat scroll center top transparent; }' +
            '.lang_gr:hover { background: url("' + dir + 'flag_gr.png") no-repeat scroll center bottom transparent; }' +
            '.lang_en { background: url("' + dir + 'flag_en.png") no-repeat scroll center top transparent; }' +
            '.lang_en:hover { background: url("' + dir + 'flag_en.png") no-repeat scroll center bottom transparent; }';

        var inlineStyle = $('#inline_style');
        inlineStyle.append(flags);

        var flagCurrent = $('#flag_current');
        flagCurrent.removeClass();
        flagCurrent.addClass('lang_' + lng);

        window.changeLanguage = function(lng) {
            window.lng = lng;
            var url_array = location.href.split("?");
            var url = url_array[0] + "?lang=" + lng;
            location.assign(url);
        }
    });

})();