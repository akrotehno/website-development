function slideImages() {

    var win_jq = $(window);
    var pics_res = $("#det_pics");

    window.adjustHeight = function() {

        return;

        var maxWidth = $('#details').width() / 2;

        var height = win_jq.height() - $('#det_info').position().top - $('#announcements').height();
        var width = win_jq.width() - maxWidth - $('#list').width();

        pics_res.css('margin-left', '');
        pics_res.css('margin-top', '');

        if (width > height) {
            if (height < maxWidth) {
                pics_res.css('margin-left', (maxWidth - height) / 2 + 'px');
            }
            pics_res.css('width', height + 'px');
            pics_res.css('height', height + 'px');
        } else {
            if (height >= maxWidth) {
                pics_res.css('margin-top', (height - width) / 2 + 'px');
            }
            pics_res.css('width', width + 'px');
            pics_res.css('height', width + 'px');
        }
    }

    // calls adjustHeight on window load
    win_jq.load(function() {
        adjustHeight();
    });

    // calls adjustHeight anytime the browser window is resized
    win_jq.resize(function() {
        adjustHeight();
    });

    var pic1 = $("#det_pic1");
    var pic2 = $("#det_pic2");

    var picNow = pic1;
    var picLater = pic2;
    var index = 0;
    var begin = false;
    var data;


    function clear() {
        picNow.css('opacity', '0');
        picLater.css('opacity', '0');
    }

    window.stopSlides = function() {
        setTimeout(function() {
            clear();
        }, 800);
        begin = false;
    }

    clear();

    window.startSlides = function(_data) {
        index = 0;
        if (!_data.pics) {
            clear();
            begin = false;
            return;
        }
        data = _data;
        if (!begin) {
            begin = true;
            next();
        }

    }

    function next() {

        if (!begin) {
            index = 0;
            return;
        }

        if (index >= data.pics.length) {
            index = 0;
        }
        adjustHeight();

        picNow.css('background', 'url(' + base_url + '/assets/images/' + data.pic_folder + '/' + data.pics[index] + ') 50% 50% no-repeat');

        setTimeout(function() {
            picNow.css('opacity', '1');
            picLater.css('opacity', '0');
            index++;

            var tmp = picNow;
            picNow = picLater;
            picLater = tmp;

            if (data.pics.length == 1) {
                begin = false;
                return;
            }

            setTimeout(function() {
                next();
            }, 2500);
        }, 300);
    }

}