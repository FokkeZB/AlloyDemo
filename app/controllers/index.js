// Open root view, default named after view's name
$.index.open();

/********************** WIDGETS **********************/

// See: http://github.com/fokkezb/nl.fokkezb.tweetsWidget

$.tweetsWidget.init({
	q: 'appcelerator',
	opener: $.tweetsTab
});

function onTweetsWindowFocus() {
	$.tweetsWindow.off('focus', onTweetsWindowFocus);
	
	$.tweetsWidget.load();
}

$.tweetsWindow.on('focus', onTweetsWindowFocus);