function WPATH(s) {
    var index = s.lastIndexOf("/"), path = index === -1 ? "nl.fokkezb.tweetsView/" + s : s.substring(0, index) + "/nl.fokkezb.tweetsView/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function doInit(opts) {
        _.extend(options, opts);
        pullController = Alloy.createWidget("nl.fokkezb.pullToRefresh");
        pullController.init({
            table: $.tableView,
            loader: doRefresh
        });
        options.opener !== !1 ? $.tableView.on("click", onTableViewClick) : $.tableView.allowsSelection = !1;
    }
    function openWindow(win) {
        typeof options.opener == "function" ? options.opener(win) : typeof options.opener == "object" && typeof options.opener.open == "function" ? options.opener.open(win) : win.open();
    }
    function onTweetClick(e) {
        var scheme, url;
        if (e.tag) url = "https://twitter.com/search?q=%23" + e.tag; else if (e.user) {
            scheme = "twitter:@" + e.user;
            url = "https://mobile.twitter.com/" + e.user;
        } else url = e.link;
        if (scheme && Ti.Platform.canOpenURL(scheme)) Ti.Plaform.openURL(scheme); else if (url) {
            var win = Alloy.createWidget("nl.fokkezb.browserView", null, {
                url: url
            }).getView();
            openWindow(win);
        }
    }
    function onTableViewClick(e) {
        if (e.source.image) onTweetClick({
            user: e.row.data.from_user
        }); else {
            var win = Alloy.createWidget("nl.fokkezb.tweetsView", "detail", e.row.data).getView();
            Ti.App.addEventListener("tweetsView:click", onTweetClick);
            win.addEventListener("close", function() {
                Ti.App.removeEventListener("tweetsView:click", onTweetClick);
            });
            openWindow(win);
        }
    }
    function doManualRefresh() {
        if (loading) return !1;
        pullController.trigger();
        return !0;
    }
    function doRefresh(callback) {
        refresh_url ? doLoad(refresh_url, callback) : doLoad("?q=" + options.q, callback);
    }
    function doNext(callback) {
        doLoad(next_page, callback);
    }
    function doLoad(query, callback) {
        if (loading) {
            callback && callback(!1);
            return !1;
        }
        loading = !0;
        var url = "http://search.twitter.com/search.json" + query, json, xhr = Ti.Network.createHTTPClient({
            onload: function() {
                json = JSON.parse(this.responseText);
                if (json.since_id) for (var i = json.results.length - 1; i >= 0; i--) data.unshift(Alloy.createWidget("nl.fokkezb.tweetsView", "row", json.results[i]).getView()); else for (var i = 0; i < json.results.length; i++) data.push(Alloy.createWidget("nl.fokkezb.tweetsView", "row", json.results[i]).getView());
                $.tableView.setData(data);
                if (!json.since_id) if (json.next_page) {
                    next_page = json.next_page;
                    if (!scrollController) {
                        scrollController = Alloy.createWidget("nl.fokkezb.dynamicScrolling");
                        scrollController.init({
                            table: $.tableView,
                            loader: doNext
                        });
                    }
                } else {
                    next_page = null;
                    if (scrollController) {
                        scrollController.remove();
                        scrollController = null;
                    }
                }
                refresh_url = json.refresh_url;
                callback && callback(!0);
                loading = !1;
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                callback && callback(!1);
                loading = !1;
            }
        });
        xhr.open("GET", url);
        xhr.send();
        return !0;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.tableView = A$(Ti.UI.createTableView({
        backgroundColor: "#ffffff",
        id: "tableView"
    }), "TableView", null);
    $.addTopLevelView($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, options = {
        q: "apps"
    }, loading = !1, data = [], refresh_url, next_page, scrollController, pullController;
    args.q && doInit(args);
    exports.init = doInit;
    exports.load = doManualRefresh;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;