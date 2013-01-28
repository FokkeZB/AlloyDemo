var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.randomColor = Alloy._.random(0, 1) ? "red" : "purple";

Alloy.createController("index");