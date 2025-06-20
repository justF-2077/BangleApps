var settings = Object.assign({
    countThreshold: 90, // Default minimum steps in a minute to be added to total counted steps
    activeThreshold: 100, // Default minimum active minutes in a day to be counted
    intenseThreshold: 130, // Default minimum intense minutes in a day to be counted
}, require('Storage').readJSON("healthscore.json", true) || {});
var Layout = require("Layout");

// Read data from storage
var hs_data = require("Storage").readJSON("hs_data.json");
hs_data = require("healthscore").getData(hs_data, settings);
var healthScore = ((hs_data.a + hs_data.i * 2) / 150) * 100;

// Create the layout
var layout = new Layout({
    type: "v", c: [
        { type: "txt", font: "25%", label: healthScore.toFixed(0) + "%", fillx: 1 },
        { type: "txt", font: "15%", label: "= " + (hs_data.a + hs_data.i * 2) + "/150", fillx: 1 },
        { type: "txt", font: "10%", label: "\nActive: " + hs_data.a + " min\nIntense: " + hs_data.i + " min", fillx: 1 },
    ],
    lazy: true,
    back: Bangle.showClock,
});

// Render the layout
g.clear();
layout.render();

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
