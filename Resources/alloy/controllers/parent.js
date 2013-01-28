function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var translations = [ {
        translation: "Hallo Wereld"
    }, {
        translation: "Hallo Welt"
    }, {
        translation: "Bonjour le Monde"
    }, {
        translation: "Olá mundo"
    }, {
        translation: "Zdravo svet"
    }, {
        translation: "привет мир"
    }, {
        translation: "kaixo mundua"
    }, {
        translation: "Hola món"
    }, {
        translation: "saluton mondo"
    } ];
    exports.getTranslations = function() {
        return translations;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;