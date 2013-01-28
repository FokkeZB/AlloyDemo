var Alloy = require("alloy");

exports.sayHello = function(location) {
    var message = String.format(Alloy.Globals.format, location);
    alert(message);
};