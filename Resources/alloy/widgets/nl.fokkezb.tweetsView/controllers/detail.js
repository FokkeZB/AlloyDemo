function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "nl.fokkezb.tweetsView/" + s : s.substring(0, index) + "/nl.fokkezb.tweetsView/" + s.substring(index + 1);
    return path.indexOf("/") !== 0 ? "/" + path : path;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.window = A$(Ti.UI.createWindow({
        barColor: "red",
        backgroundColor: "#e2e3e4",
        title: "Tweet",
        id: "window"
    }), "Window", null);
    $.addTopLevelView($.__views.window);
    $.__views.wrapper = A$(Ti.UI.createView({
        top: 10,
        right: 10,
        left: 10,
        height: Ti.UI.SIZE,
        layout: "vertical",
        borderRadius: 5,
        borderSize: 1,
        borderColor: "#ddd",
        backgroundColor: "#ffffff",
        id: "wrapper"
    }), "View", $.__views.window);
    $.__views.window.add($.__views.wrapper);
    $.__views.meta = A$(Ti.UI.createView({
        top: 0,
        right: 0,
        left: 0,
        height: 68,
        backgroundColor: "#ffffff",
        id: "meta"
    }), "View", $.__views.wrapper);
    $.__views.wrapper.add($.__views.meta);
    $.__views.image = A$(Ti.UI.createImageView({
        top: 10,
        left: 10,
        width: 48,
        height: 48,
        preventDefaultImage: !0,
        borderRadius: 5,
        backgroundColor: "#ffffff",
        id: "image"
    }), "ImageView", $.__views.meta);
    $.__views.meta.add($.__views.image);
    $.__views.name = A$(Ti.UI.createLabel({
        top: 10,
        right: 10,
        left: 68,
        height: 24,
        font: {
            fontWeight: "bold",
            fontSize: 15
        },
        backgroundColor: "#ffffff",
        id: "name"
    }), "Label", $.__views.meta);
    $.__views.meta.add($.__views.name);
    $.__views.user = A$(Ti.UI.createLabel({
        top: 34,
        right: 10,
        left: 68,
        height: 24,
        color: "#999",
        font: {
            fontSize: 13
        },
        backgroundColor: "#ffffff",
        id: "user"
    }), "Label", $.__views.meta);
    $.__views.meta.add($.__views.user);
    $.__views.text = A$(Ti.UI.createWebView({
        top: 0,
        right: 10,
        left: 10,
        height: Ti.UI.SIZE,
        disableBounce: !0,
        enableZoomControls: !1,
        hideLoadIndicator: !0,
        backgroundColor: "#ffffff",
        id: "text"
    }), "WebView", $.__views.wrapper);
    $.__views.wrapper.add($.__views.text);
    $.__views.time = A$(Ti.UI.createLabel({
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
        height: 20,
        color: "#999",
        font: {
            fontSize: 13
        },
        backgroundColor: "#ffffff",
        id: "time"
    }), "Label", $.__views.wrapper);
    $.__views.wrapper.add($.__views.time);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, tweet = args.text.replace(/(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a onclick=\"Ti.App.fireEvent('tweetsView:click',{link:'$1'})\">$1</a>").replace(/(^|\s)@(\w+)/g, "$1<a onclick=\"Ti.App.fireEvent('tweetsView:click',{user:'$2'})\">@$2</a>").replace(/(^|\s)#(\w+)/g, "$1<a onclick=\"Ti.App.fireEvent('tweetsView:click',{tag:'$2'})\">#$2</a>"), html = "<html><head><title>Tweet</title><style> body { margin: 0; font-family: Palatino; font-size: 16px; } a { color: #208ccf; } }</style></head><body>" + tweet + "</body></html>", date = new Date(args.created_at);
    $.image.image = args.profile_image_url.replace("_normal", "_bigger");
    $.name.text = args.from_user_name;
    $.user.text = "@" + args.from_user;
    $.text.html = html;
    $.time.text = String.formatDate(date) + " " + String.formatTime(date);
    $.image.on("click", function(e) {
        Ti.App.fireEvent("tweetsView:click", {
            user: args.from_user
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;