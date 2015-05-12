(function() {
    var pathArray = location.href.split('/');
    var protocol = pathArray[0];
    var host = pathArray[2];

    window.base_url = protocol + '//' + host;
    window.includes = {};
    window.includeCurrent = '';

    window.setIncludeCallbacks = function(include, callback, onExit) {
        var includeData = includes[include] || {};
        includeData.callback = callback;
        includeData.onExit = onExit;
        includes[include] = includeData;
    }

    $(document).ready(function() {

        var loadedScripts = {};

        window.loadScripts = function(scripts, callback) {

            var toLoad = [];

            for (var i = 0; i < scripts.length; i++) {

                var scriptFull = base_url + scripts[i];
                var scriptLoaded = loadedScripts[scriptFull];
                if (scriptLoaded) {

                } else {
                    loadedScripts[scriptFull] = true;
                    toLoad.push($.getScript(scriptFull));
                }
            };

            toLoad.push($.Deferred(function(deferred) {}));

            $.when.apply(this, toLoad).done(function() {
                callback();
            });

        }

        // LOAD FONTS ------>

        var fonts = '@font-face {font-family:caudex_regular;src: url(' + base_url + '/assets/fonts/Caudex-Regular.ttf);}';
        fonts += '@font-face {font-family: ds_digib;src: url(' + base_url + '/assets/fonts/ds-digib.ttf);}';

        var inlineStyle = $('#inline_style');
        inlineStyle.append(fonts);


        // <-----

        window.randomFrom = function(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        window.trueOrFalse = function() {
            return Math.random() < 0.5;
        }

        var content = $('#details_content');
        var list = $('#list_content');
        var current;

        // Adding popstate event listener to handle browser back button  
        window.addEventListener("popstate", function(e) {

            showPage(e.state, true);
        });

        window.showPage = function(include, fromHistory) {

            if (!include) {
                include = includeCurrent;
            }
            includeCurrent = include;

            var url = include;
            if (url == 'welcome') {
                url = '';
            }

            if (url.length > 0) {
                url = base_url + '/' + url;
            } else {
                url = base_url;
            }

            url += "?lang=" + lng;

            if (!fromHistory) {
                history.pushState(include, null, url);
            }

            for (var key in includes) {
                var func = includes[key].onExit;
                if (func) {
                    func();
                }
            }

            content.html('');
            list.html('');

            $('#controller .button').removeClass('btn_selected');
            current = null;

            var includeData = includes[include] || {};
            var callback = includeData.callback;

            if (includeData.button) {
                includeData.button.addClass('btn_selected');
            }

            if (includeData.html) {
                var html = includeData.html[lng];
                if (html) {
                    content.html(html);
                    if (callback) {
                        callback();
                    }
                    return;
                }
            }

            $.get(base_url + "/includes/" + include + "_" + lng + ".html", function(data) {
                content.html(data);
                includeData.html = includeData.html || {};
                includeData.html[lng] = data;
                if (callback) {
                    callback();
                }
            });
        }

        function addMenuItem(data, callback, onExit) {
            var include = data.name;
            var button_id = data.btn;
            var button = $('#' + button_id);
            var includeData = includes[include];
            if (!includeData) {
                includeData = includes[include] = {
                    onExit: onExit,
                    callback: callback,
                    button: button
                };
            } else {
                throw "Cannot add the same button";
                return;
            }

            var onButtonClick = function(e) {
                if (current == button) {
                    return;
                }

                if (!include) {
                    throw "No include Attribute";
                }

                showPage(include, e.fromHistory);
                current = button;
            }

            button.click(onButtonClick);

        }

        function loadPage() {

            var pathArray = location.href.split('/');
            var urlPath = pathArray.splice(3, pathArray.length);
            urlPath = urlPath.join('/');
            urlPath = urlPath.split('?')[0];
            if (urlPath.length > 0) {
                var includeData = includes[urlPath];
                if (includeData) {
                    showPage(urlPath);
                    return;
                }
            }
            showPage('welcome');
        }

        // AJAX LINKS

        var ajax_links = $('.ajax_link');

        $.each(ajax_links, function(i, element) {
            var ajax_link = $(element);
            var include = ajax_link.attr('include');
            ajax_link.click(function() {
                showPage(include);
            });
        });


        // LOAD MENU ITEMS ------>
        $.getJSON(base_url + "/assets/json/structure.json", function(data) {
            var menu = data.menu;
            menu.forEach(function(entry) {

                addMenuItem(entry, getScript);

                function getScript() {

                    var url = base_url + "/assets/scripts/" + entry.js;
                    $.getScript(url, function() {
                        var includeData = includes[entry.name];
                        var callback = includeData.callback;
                        if (callback) {
                            if (callback != getScript) {
                                callback();
                            } else {
                                includeData.callback = null;
                            }
                        }
                    });
                }
            });


            loadPage();

        });

        // <-----

    });
})();