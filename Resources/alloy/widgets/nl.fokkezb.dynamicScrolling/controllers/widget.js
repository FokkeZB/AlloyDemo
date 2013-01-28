function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "nl.fokkezb.dynamicScrolling/" + s : s.substring(0, index) + "/nl.fokkezb.dynamicScrolling/" + s.substring(index + 1);
    return path.indexOf("/") !== 0 ? "/" + path : path;
}

function Controller() {
    function doShow() {
        if (shown) return !1;
        options.table.footerView.height = height;
        $.activityIndicator.show();
        shown = !0;
        return !0;
    }
    function doHide() {
        if (shown === !1) return !1;
        $.footerView.height = 0;
        $.activityIndicator.hide();
        shown = !1;
        return !0;
    }
    function doTrigger() {
        if (loading) return !1;
        loading = !0;
        doShow();
        options.loader(finishLoading);
    }
    function finishLoading() {
        doHide();
        loading = !1;
    }
    function doInit(args) {
        options = args;
        args.msg && ($.activityIndicator.message = args.msg);
        height = $.footerView.height;
        options.table.footerView = $.footerView;
        options.table.footerView.height = 0;
        options.table.on("scroll", doScroll);
    }
    function doRemove() {
        options.table.footerView = null;
        options.table.off("scroll", doScroll);
        options = null;
        height = null;
        shown = !1;
        loading = !1;
        item = null;
        offset = null;
    }
    function doScroll(e) {
        var triggerLoad;
        triggerLoad = item && e.firstVisibleItem > item && e.totalItemCount < e.firstVisibleItem + e.visibleItemCount;
        item = e.firstVisibleItem;
        triggerLoad && doTrigger();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.footerView = A$(Ti.UI.createView({
        top: 0,
        right: 0,
        left: 0,
        height: 60,
        backgroundColor: "#e2e7ed",
        id: "footerView"
    }), "View", null);
    $.addTopLevelView($.__views.footerView);
    $.__views.activityIndicator = A$(Ti.UI.createActivityIndicator({
        message: L("loading", "Loading..."),
        color: "#576c89",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        },
        id: "activityIndicator"
    }), "ActivityIndicator", $.__views.footerView);
    $.__views.footerView.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, options, height, shown = !1, loading = !1, item, offset;
    args.table && args.loader && doInit(args);
    exports.init = doInit;
    exports.show = doShow;
    exports.hide = doHide;
    exports.trigger = doTrigger;
    exports.remove = doRemove;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;