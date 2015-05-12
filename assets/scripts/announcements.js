$(document).ready(function() {

    var field = $('#announcements');

    var text_options = {
        selector: '.texts',
        loop: false,
        minDisplayTime: 2000,
        initialDelay: 0,
        autoStart: false,
        in : {
            delayScale: 0.6,
            delay: 50,
            sync: false,
            shuffle: true,
            reverse: false,
            effect:"bounceIn"
        },
        out: {
            delayScale: 1.5,
            delay: 50,
            sync: false,
            shuffle: true,
            reverse: false,
            effect:"bounceOut"
        },
        callback: function() {},
        type: 'char'
    };

    $.getJSON(base_url+"/assets/json/announcements.json", function(data) {

        text_options.in.callback = onAnimIn;
        text_options.out.callback = onAnimOut;

        field.textillate(text_options);

        var entries = data.entries;

        var index = 0;

        function next() {
            if (index >= entries.length) {
                index = 0;
            }

            var entry = entries[index];

            field.find('.texts li:first').text(entry.message);
            field.textillate('start');

            index++;
        }

        function onAnimIn() {
            setTimeout(function() {
                field.textillate('out');
            }, 8000);
        }

        function onAnimOut() {
        	next();
        }

        next();
    });
});