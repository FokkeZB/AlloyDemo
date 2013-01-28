// Inherit parent.js controller
exports.baseController = "parent";

// Pass arguments from requiring view or calling controller
var args = arguments[0] || {};
var location = args.location || 'Heerenveen';

// Defined as onClick event callback in hello.xml
function setLocation(e) {  
	
	// Access view elements by $.ID
    $.myLocation.text = location;
    
    // Set global variable
    // Use platform constants for automatic cleanup
    Alloy.Globals.format = OS_IOS ? 'Hello %s' : 'Bye %s';
    
    // Require CommonJS module alerter.js in lib-folder
	require('alerter').sayHello(location);
}

/********************** MODELS **********************/

// Call exposed method from parent controller
// Add modules to collection instance created in hello.xml
Alloy.Collections.hello.add($.getTranslations());

// Defined as model-view transformation callback in hello.xml
function addExclamation(model) {
    var transform = model.toJSON();
    transform.translation = transform.translation + '!';
    return transform;
}

// Defined as model-view filter callback in hello.xml
function skipDutch(collection) {
    return collection.filter(function (model) {
    	return model.get('translation') !== 'Hallo Wereld';
    });
}

// Always call Alloy $.destroy method on close to clean up models
$.myWindow.addEventListener("close", function () {
    $.destroy();
});