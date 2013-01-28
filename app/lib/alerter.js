// Non-Alloy modules can require Alloy
var Alloy = require('alloy');

// Exposed method called in hello controller
exports.sayHello = function (location) {
	
	// Read global variable set in hello controller
	var message = String.format(Alloy.Globals.format, location);
	
	alert(message);
}