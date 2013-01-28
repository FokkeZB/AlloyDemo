function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "nl.fokkezb.browserView/" + s : s.substring(0, index) + "/nl.fokkezb.browserView/" + s.substring(index + 1);
    return path;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.window = A$(Ti.UI.createWindow({
        barColor: "red",
        backgroundColor: "white",
        id: "window"
    }), "Window", null);
    $.addTopLevelView($.__views.window);
    $.__views.webView = A$(Ti.UI.createWebView({
        id: "webView"
    }), "WebView", $.__views.window);
    $.__views.window.add($.__views.webView);
    $.__views.action = A$(Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.ACTION,
        id: "action"
    }), "Button", null);
    $.addTopLevelView($.__views.action);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.window.rightNavButton = $.action;
    $.action.on("click", function() {
        Ti.Platform.openURL($.webView.url);
    });
    $.webView.on("load", function(e) {
        var title = $.webView.evalJS("document.title");
        typeof title == "string" && title.length > 0 ? $.window.title = title : e.url ? $.window.title = e.url : $.window.title = args.url;
    });
    $.webView.url = args.url;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;