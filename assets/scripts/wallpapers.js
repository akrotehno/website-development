(function() {

    var length = 20000;


    $(document).ready(function() {
        $.getJSON(base_url+"/assets/json/wallpapers.json", function(data) {
            start(data.files);
        });
    });

    function start(wallpapers) {


        var wp_1 = $("#wp_1");
        var wp_2 = $("#wp_2");

        var wp_top = wp_1;
        var wp_btm = wp_2;

        var index = 0;



        function nextWallpaper() {

            var img = wallpapers[index];

            wp_btm.attr("src", base_url+"/assets/images/wallpapers/" + img);
            wp_btm.removeClass("transparent");
            wp_top.addClass("transparent");

            var wp_tmp = wp_btm;
            wp_btm = wp_top;
            wp_top = wp_tmp;


            index++;
            if (index >= wallpapers.length) {
                index = 0;
            }

            setTimeout(nextWallpaper, length);
        }
        nextWallpaper();

    }

})();