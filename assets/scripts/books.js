(function() {

    $(document).ready(function() {

        var scripts = [
        	"assets/scripts/jquery.masonry.min.js",
            "assets/scripts/jquery.history.js",
            "assets/scripts/js-url.min.js",
            "assets/scripts/jquerypp.custom.js",
            "assets/scripts/gamma.js"
        ];

        loadScripts(scripts,function(){
        	console.log('Loaded Library');
        });

        $(function() {

            var GammaSettings = {
                // order is important!
                viewport: [{
                    width: 1200,
                    columns: 5
                }, {
                    width: 900,
                    columns: 4
                }, {
                    width: 500,
                    columns: 3
                }, {
                    width: 320,
                    columns: 2
                }, {
                    width: 0,
                    columns: 2
                }]
            };

            Gamma.init(GammaSettings);

        });

    });
})();