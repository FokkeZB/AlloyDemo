function Controller() {
    function setLocation(e) {
        $.myLocation.text = location;
        Alloy.Globals.format = "Hello %s";
        require("alerter").sayHello(location);
    }
    function addExclamation(model) {
        var transform = model.toJSON();
        transform.translation = transform.translation + "!";
        return transform;
    }
    function skipDutch(collection) {
        return collection.filter(function(model) {
            return model.get("translation") !== "Hallo Wereld";
        });
    }
    require("alloy/controllers/parent").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Collections.instance("hello");
    $.__views.myWindow = A$(Ti.UI.createWindow({
        barColor: "red",
        backgroundColor: "white",
        layout: "vertical",
        title: L("Hello"),
        ns: Ti.UI,
        id: "myWindow"
    }), "Window", null);
    $.addTopLevelView($.__views.myWindow);
    $.__views.__alloyId3 = A$(Ti.UI.createButton({
        title: "Right!",
        id: "__alloyId3"
    }), "Button", null);
    setLocation ? $.__views.__alloyId3.on("click", setLocation) : __defers["$.__views.__alloyId3!click!setLocation"] = !0;
    $.__views.myWindow.rightNavButton = $.__views.__alloyId3;
    $.__views.myLocation = A$(Ti.UI.createLabel({
        top: 20,
        height: 20,
        color: Alloy.Globals.randomColor,
        font: {
            fontWeight: Alloy.CFG.fontWeight
        },
        text: "World",
        id: "myLocation"
    }), "Label", $.__views.myWindow);
    $.__views.myWindow.add($.__views.myLocation);
    $.__views.__alloyId4 = A$(Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: 20,
            height: 20,
            left: 0,
            right: 0,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        Alloy.isHandheld && _.extend(o, {
            color: "white"
        });
        _.extend(o, {
            backgroundColor: "blue",
            text: "iOS",
            id: "__alloyId4"
        });
        return o;
    }()), "Label", $.__views.myWindow);
    $.__views.myWindow.add($.__views.__alloyId4);
    if (Alloy.isTablet) {
        $.__views.__alloyId6 = A$(Ti.UI.createLabel(function() {
            var o = {};
            _.extend(o, {
                top: 20,
                height: 20,
                left: 0,
                right: 0,
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
            });
            Alloy.isHandheld && _.extend(o, {
                color: "white"
            });
            _.extend(o, {
                backgroundColor: "blue",
                text: "iPad",
                id: "__alloyId6"
            });
            return o;
        }()), "Label", $.__views.myWindow);
        $.__views.myWindow.add($.__views.__alloyId6);
    }
    $.__views.__alloyId7 = A$(Ti.UI.createTableView({
        top: 20,
        id: "__alloyId7"
    }), "TableView", $.__views.myWindow);
    $.__views.myWindow.add($.__views.__alloyId7);
    var __alloyId11 = function(e) {
        var models = skipDutch(Alloy.Collections.hello), len = models.length, rows = [];
        for (var i = 0; i < len; i++) {
            var __alloyId9 = models[i];
            __alloyId9.__transform = addExclamation(__alloyId9);
            var __alloyId10 = A$(Ti.UI.createTableViewRow({
                title: typeof __alloyId9.__transform.translation != "undefined" ? __alloyId9.__transform.translation : __alloyId9.get("translation"),
                id: "__alloyId8"
            }), "TableViewRow", null);
            rows.push(__alloyId10);
        }
        $.__views.__alloyId7.setData(rows);
    };
    Alloy.Collections.hello.on("fetch destroy change add remove reset", __alloyId11);
    exports.destroy = function() {
        Alloy.Collections.hello.off("fetch destroy change add remove reset", __alloyId11);
    };
    _.extend($, $.__views);
    exports.baseController = "parent";
    var args = arguments[0] || {}, location = args.location || "Heerenveen";
    Alloy.Collections.hello.add($.getTranslations());
    $.myWindow.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.__alloyId3!click!setLocation"] && $.__views.__alloyId3.on("click", setLocation);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;