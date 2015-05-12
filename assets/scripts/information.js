function informationStart() {


    $('#list_content').append($('<div id="daily"></div>').append(
        $('<ul></ul>').append(
            ' <li id="list_everyday" class="list_header">Ιστορικό</li>'
        ).append(
            '<li id="list_upcoming" class="list_header">Επερχόμενες Δραστηριότητες</li>'
        )
    ));

    var timeLength = 8000;

    var list_cont = $("#list");
    var title = $("#det_title");
    var when = $("#det_when");
    var description = $("#det_description");
    var list_everyday = $("#list_everyday");
    var list_upcoming = $("#list_upcoming");
    var loader = $("#loader");
    var start_stop = $("#start_stop");
    var entries = [];
    var entryActive;
    var inQueue = false;
    var animElms = [];

    var text_options = {
        selector: '.texts',
        loop: false,
        minDisplayTime: 2000,
        initialDelay: 0,
        autoStart: false,
        inEffects: [],
        outEffects: ['hinge'],
        in : {
            delayScale: 1.5,
            delay: 50,
            sync: false,
            shuffle: false,
            reverse: false
        },
        out: {
            delayScale: 1.5,
            delay: 50,
            sync: false,
            shuffle: false,
            reverse: false
        },
        callback: function() {},
        type: 'word'
    };

    title.textillate(text_options);
    description.textillate(text_options);
    when.textillate(text_options);

    $.getJSON(base_url+"/assets/json/information.json", function(data) {

        insertEntries(data.everyday.entries, list_everyday);
        insertEntries(data.upcoming.entries, list_upcoming);

        function insertEntries(dataEntries, listHeader) {

            var prv = listHeader;

            $.each(dataEntries, function(i, entry) {

                var list_ent = $('<li class="list_entry"></li>');
                list_ent.html(entry.title);
                list_ent.insertAfter(prv);

                var entr_obj = {
                    elm: list_ent,
                    data: entry
                }
                entries.push(entr_obj);

                list_ent.click(function() {
                    entryActive.elm.removeClass("highlight");
                    list_ent.addClass("highlight");
                    entryActive = entr_obj;

                    text_options.in.effect = "fadeInDown";
                    animElms = [];

                    prepare(title, entry.title);
                    prepare(when, entry.when);
                    prepare(description, entry.description);

                    startSlides(entry);

                    pause();

                });

                prv = list_ent;

            });

            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                entry.next = (i == (entries.length - 1)) ? entries[0] : entries[i + 1];
            };

            entryActive = {
                next: entries[0]
            };

        }

        onAnimOut();
    });

    start_stop.click(function() {
        if (paused) {
            play();
        } else {
            pause();
        }
    });


    function setDetail() {
        if (!inQueue) {
            return;
        }
        if (paused) {
            return;
        }

        if (entryActive.data) {

            for (var i = 0; i < animElms.length; i++) {
                var elm = animElms[i];
                elm.textillate('out');
            }

            setTimeout(function() {
                inQueue = false;
                onAnimOut();
            }, 1000);

            stopSlides();

        } else {
            onAnimOut(true);
        }
    }

    var outCount = 0;
    var paused = false;

    function pause() {
        loader.stop();
        loader.css('width', '0%');
        loader.css('opacity', '1');
        paused = true;
        start_stop.html('play');
    }

     window.stopInformation = pause;

    function play() {
        paused = false;
        start_stop.html('pause');

        animElms = [];

        prepare(title);
        prepare(when);
        prepare(description);

        function prepare(elm) {
            if (elm.is(":visible")) {
                animElms.push(elm);
            }
        }

        onAnimOut();
    }

    function prepare(elm, text) {

        animElms.push(elm);

        if (text) {
            elm.show();
        } else {
            elm.hide();
            return;
        }

        elm.find('.texts li:first').text(text);
        elm.textillate(text_options);
        elm.textillate('start');

    }


    function onAnimOut(force) {
        if (paused || inQueue) {
            return;
        }

        if (entryActive.elm) {
            entryActive.elm.removeClass("highlight");
        }
        entryActive = entryActive.next;
        entryActive.elm.addClass("highlight");
        animElms = [];

        animate(title, entryActive.data.title);
        animate(when, entryActive.data.when);
        animate(description, entryActive.data.description);

        startSlides(entryActive.data);

        function animate(elm, text) {

            text_options.in.effect = randomFrom(animIn);
            text_options.in.shuffle = trueOrFalse();
            text_options.in.reverse = trueOrFalse();

            text_options.out.effect = randomFrom(animOut);
            text_options.out.shuffle = trueOrFalse();
            text_options.out.reverse = trueOrFalse();

            prepare(elm, text);
        }

        loader.animate({
            width: '100%',
        }, timeLength, function() {
            loader.animate({
                opacity: 0,
            }, 500, function() {
                loader.css('width', '0%');
                loader.css('opacity', '1');
            });
        });
        inQueue = true;
        setTimeout(
            function() {
                if (paused) {
                    inQueue = false;
                }
                setDetail();
            }, timeLength);
    }


}