(function() {

        var data;
        var list = $('#list_content');
        setIncludeCallbacks('contact',function() {

            if (!data) {

                $.getJSON(base_url + "/assets/json/contact.json", function(_data) {
                    data = _data;
                });

            } else {
                displayData();
            }

        });

        function displayData() {
            list.append($('<ul></ul>').append());
        }
    }

})();