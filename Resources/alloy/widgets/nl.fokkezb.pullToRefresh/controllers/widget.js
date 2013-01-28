function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "nl.fokkezb.pullToRefresh/" + s : s.substring(0, index) + "/nl.fokkezb.pullToRefresh/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function doShow(msg) {
        if (pulled) return !1;
        pulled = !0;
        $.status.text = msg || options.msgUpdating;
        $.arrow.hide();
        $.activityIndicator.show();
        options.table.setContentInsets({
            top: 80
        }, {
            animated: !0
        });
        return !0;
    }
    function doHide() {
        if (!pulled) return !1;
        options.table.setContentInsets({
            top: 0
        }, {
            animated: !0
        });
        $.activityIndicator.hide();
        $.arrow.transform = Ti.UI.create2DMatrix();
        $.arrow.show();
        $.status.text = options.msgPull;
        pulled = !1;
    }
    function setDate(date) {
        if (date === !1) $.updated.hide(); else {
            $.updated.show();
            date !== !0 && ($.updated.text = String.format(options.msgUpdated, String.formatDate(date, "short"), String.formatTime(date, "short")));
        }
    }
    function doTrigger() {
        if (loading) return !1;
        loading = !0;
        doShow();
        options.loader(finishLoading);
    }
    function finishLoading(success) {
        success && setDate(new Date);
        doHide();
        loading = !1;
    }
    function scrollListener(e) {
        offset = e.contentOffset.y;
        if (pulled) return;
        if (pulling && !loading && offset > -80 && offset < 0) {
            pulling = !1;
            var unrotate = Ti.UI.create2DMatrix();
            $.arrow.animate({
                transform: unrotate,
                duration: 180
            });
            $.status.text = options.msgPull;
        } else if (!pulling && !loading && offset < -80) {
            pulling = !0;
            var rotate = Ti.UI.create2DMatrix().rotate(180);
            $.arrow.animate({
                transform: rotate,
                duration: 180
            });
            $.status.text = options.msgRelease;
        }
    }
    function dragEndListener(e) {
        if (!pulled && pulling && !loading && offset < -80) {
            pulling = !1;
            doTrigger();
        }
    }
    function doInit(args) {
        if (initted) return !1;
        options = _.defaults(args, {
            msgPull: "Pull down to refresh...",
            msgRelease: "Release to refresh...",
            msgUpdating: "Updating...",
            msgUpdated: "Last Updated: %s %s"
        });
        options.table.setHeaderPullView($.headerPullView);
        options.table.addEventListener("scroll", scrollListener);
        options.table.addEventListener("dragEnd", dragEndListener);
    }
    function doRemove() {
        if (!initted) return !1;
        options.table.setHeaderPullView(null);
        options.table.removeEventListener("scroll", scrollListener);
        options.table.removeEventListener("dragEnd", dragEndListener);
        options = null;
        initted = !1;
        pulling = !1;
        loading = !1;
        shown = !1;
        offset = 0;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.headerPullView = A$(Ti.UI.createView({
        backgroundColor: "#e2e7ed",
        top: 0,
        right: 0,
        left: 0,
        height: 60,
        id: "headerPullView"
    }), "View", null);
    $.addTopLevelView($.__views.headerPullView);
    $.__views.arrow = A$(Ti.UI.createImageView({
        left: 20,
        bottom: 10,
        width: 23,
        height: 60,
        image: WPATH("images/whiteArrow.png"),
        id: "arrow"
    }), "ImageView", $.__views.headerPullView);
    $.__views.headerPullView.add($.__views.arrow);
    $.__views.activityIndicator = A$(Ti.UI.createActivityIndicator({
        left: 20,
        bottom: 13,
        width: 30,
        height: 30,
        id: "activityIndicator"
    }), "ActivityIndicator", $.__views.headerPullView);
    $.__views.headerPullView.add($.__views.activityIndicator);
    $.__views.status = A$(Ti.UI.createLabel({
        color: "#576c89",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        },
        text: "Pull down to refresh",
        textAlign: "center",
        left: 55,
        bottom: 30,
        width: 200,
        id: "status"
    }), "Label", $.__views.headerPullView);
    $.__views.headerPullView.add($.__views.status);
    $.__views.updated = A$(Ti.UI.createLabel({
        color: "#576c89",
        font: {
            fontSize: 12
        },
        textAlign: "center",
        left: 55,
        bottom: 15,
        width: 200,
        id: "updated"
    }), "Label", $.__views.headerPullView);
    $.__views.headerPullView.add($.__views.updated);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, options = null, initted = !1, pulling = !1, pulled = !1, loading = !1, offset = 0;
    args.table && args.loader && doInit(args);
    exports.init = doInit;
    exports.show = doShow;
    exports.hide = doHide;
    exports.date = setDate;
    exports.trigger = doTrigger;
    exports.remove = doRemove;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;