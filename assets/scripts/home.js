(function() {

    var data;
    var list = $('#list_content');

    setIncludeCallbacks('activities',

        function() {
            slideImages();
            informationStart();
        },
        function() {
            if (window.stopInformation) {
                stopInformation();
            }
        });
})();