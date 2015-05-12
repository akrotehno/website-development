$(document).ready(function() {
    var win = $(window);
   
    var list_content = $('#list_content');
    var details_content = $('#details_content');
    var announcements = $('#announcements');
   
    var details = $('#td_info');
    var list = $('#td_list');
   
    var options = {
        position: 'right',
        height: '150px',
        railVisible: true,
        alwaysVisible: true
    };

    win.load(function() {
        adjust();
    });
    win.resize(function() {
        adjust();
    });

    function adjust() {
    	options.height = win.height() - list.offset().top;
    	list.css('height',options.height);
    	list_content.css('height',options.height);
    	$('#list .slimScrollDiv').css('height',options.height);
        list_content.slimScroll(options);
   

    	options.height = win.height() - details.position().top - announcements.height();
    	details_content.css('height',options.height);
    	details.css('height',options.height);
        details_content.slimScroll(options);
    }
});