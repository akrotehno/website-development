function loadPage() {

    var pathArray = location.href.split('/');
    var urlPath = pathArray.splice(3, pathArray.length);
    urlPath = urlPath.join('/');
    console.log(urlPath);
    if (urlPath.length > 0) {
        var include = includes[urlPath];
        if (include) {
            showPage(include);
            return;
        }
    }
    showPage('welcome');

}

loadPage();