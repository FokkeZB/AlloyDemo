function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "nl.fokkezb.tweetsView/" + s : s.substring(0, index) + "/nl.fokkezb.tweetsView/" + s.substring(index + 1);
    return path.indexOf("/") !== 0 ? "/" + path : path;
}

function Controller() {
    function prettyDate(time) {
        var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")), diff = ((new Date).getTime() - date.getTime()) / 1000, day_diff = Math.floor(diff / 86400);
        if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;
        return day_diff == 0 && (diff < 60 && Math.ceil(diff) + " secs" || diff == 60 && "1 sec" || diff < 3600 && Math.floor(diff / 60) + " mins" || diff < 7200 && "1 hour" || diff < 86400 && Math.floor(diff / 3600) + " hours") || day_diff == 1 && "1 day" || day_diff + " days";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = A$(Ti.UI.createTableViewRow({
        bottom: 10,
        backgroundColor: "#fff",
        id: "row"
    }), "TableViewRow", null);
    $.addTopLevelView($.__views.row);
    $.__views.image = A$(Ti.UI.createImageView({
        top: 10,
        left: 10,
        width: 48,
        height: 48,
        preventDefaultImage: !0,
        borderRadius: 3,
        backgrondColor: "#fff",
        id: "image"
    }), "ImageView", $.__views.row);
    $.__views.row.add($.__views.image);
    $.__views.name = A$(Ti.UI.createLabel({
        font: {
            fontSize: 13,
            fontWeight: "bold"
        },
        backgroundColor: "#fff",
        top: 10,
        right: 10,
        left: 68,
        height: 15,
        wordWrap: !1,
        ellipsize: !0,
        id: "name"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.name);
    $.__views.time = A$(Ti.UI.createLabel({
        font: {
            fontSize: 13
        },
        backgroundColor: "#fff",
        top: 10,
        right: 10,
        width: 60,
        height: 15,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        color: "#999",
        id: "time"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.time);
    $.__views.text = A$(Ti.UI.createLabel({
        font: {
            fontSize: 13
        },
        backgroundColor: "#fff",
        top: 25,
        right: 10,
        left: 68,
        color: "#000",
        id: "text"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.text);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.image.image = args.profile_image_url.replace("_normal", "_bigger");
    $.name.text = args.from_user_name;
    $.time.text = prettyDate(args.created_at);
    $.text.text = args.text;
    $.row.data = args;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;