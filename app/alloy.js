/* Do any pre-UI logic and override Alloy functions here */

// Set random color for usage in hello.tss
Alloy.Globals.randomColor = Alloy._.random(0,1) ? 'red' : 'purple';