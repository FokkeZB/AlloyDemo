function Controller() {
    function onTweetsWindowFocus() {
        $.tweetsWindow.off("focus", onTweetsWindowFocus);
        $.tweetsWidget.load();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createTabGroup({
        id: "index"
    }), "TabGroup", null);
    $.__views.__alloyId14 = Alloy.createController("hello", {
        location: "Amsterdam",
        id: "__alloyId14"
    });
    $.__views.__alloyId13 = A$(Ti.UI.createTab({
        window: $.__views.__alloyId14.getViewEx({
            recurse: !0
        }),
        title: "Hello",
        icon: "hello.png",
        id: "__alloyId13"
    }), "Tab", null);
    $.__views.index.addTab($.__views.__alloyId13);
    $.__views.tweetsWindow = A$(Ti.UI.createWindow({
        barColor: "red",
        backgroundColor: "white",
        id: "tweetsWindow",
        title: "Tweets"
    }), "Window", null);
    $.__views.tweetsWidget = Alloy.createWidget("nl.fokkezb.tweetsView", "widget", {
        id: "tweetsWidget"
    });
    $.__views.tweetsWidget.setParent($.__views.tweetsWindow);
    $.__views.tweetsTab = A$(Ti.UI.createTab({
        window: $.__views.tweetsWindow,
        id: "tweetsTab",
        title: "Tweets",
        icon: "/images/nl.fokkezb.tweetsView/light_bird.png"
    }), "Tab", null);
    $.__views.index.addTab($.__views.tweetsTab);
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    $.tweetsWidget.init({
        q: "appcelerator",
        opener: $.tweetsTab
    });
    $.tweetsWindow.on("focus", onTweetsWindowFocus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;