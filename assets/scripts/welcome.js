(function() {

    var data;
    var list = $('#list_content');
    setIncludeCallbacks('welcome', function() {

        var btn = $('#wc_lng');
        btn.click(function() {
            changeLanguage(btn.attr('lng'));
            console.log('aaa');
        });
    });

})();