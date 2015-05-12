$(document).ready(function() {

    var locales = {
        gr:'el',
        en:'en'
    } 
    moment.locale(locales[lng]);

    var clock = $('#clock');
    var date = $('#date');
    var on = false;
    var s;
    var characters = [];

    for (var i = 0; i < 8; i++) {
        var character = $('<span class="clock_char '+((i==2||i==5)?'clock_del':'')+'"></span>');
        characters.push(character);
        clock.append(character);
    };

    function startTime() {
        var today = new Date();
        var ns = today.getSeconds();
        if (s != ns) {
            on = !on;
        }

        var h = today.getHours();
        var m = today.getMinutes();
        s = ns;
        m = checkTime(m);
        s = checkTime(s);
        h = checkTime(h);
        var d = on ? ":" : " ";
        setText(h + d + m + d + s);

        // Moment

        date.html(moment().format("dddd, D MMMM"));


        var t = setTimeout(function() {
            startTime()
        }, 500);
    }

    function setText(time) {
        for (var i = 0; i < characters.length; i++) {
            var character = characters[i];
            character.html(time[i]);
        }
    }

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }; // add zero in front of numbers < 10
        return i;
    }

    startTime();

});