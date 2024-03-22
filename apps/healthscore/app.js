var Layout = require("Layout");

// Read data from storage
var hs_data = require("Storage").readJSON("hs_data") || {};

// Calculate the health score for the last 7 days
var totalActiveMinutes = 0;
var totalIntenseMinutes = 0;

for (var i = 0; i < 7; i++) {
    var date = new Date();
    date.setDate(date.getDate() - i);
    var dateString = date.toISOString().slice(0, 10);
    
    if (hs_data[dateString]) {
        totalActiveMinutes += hs_data[dateString].active;
        totalIntenseMinutes += hs_data[dateString].intense;
    }
}

var healthScore = ((totalActiveMinutes + totalIntenseMinutes * 2) / 150) * 100;

// Create the layout
var layout = new Layout({
    type: "v", c: [
        { type: "txt", font: "25%", label: healthScore.toFixed(1) + "%", fillx: 1 },
        { type: "txt", font: "15%", label: "= " + (totalActiveMinutes + totalIntenseMinutes * 2) + "/150", fillx: 1 },
        { type: "txt", font: "10%", label: "\nActive: " + totalActiveMinutes + " min\nIntense: " + totalIntenseMinutes + " min", fillx: 1 },
    ], lazy: true
});

// Render the layout
g.clear();
layout.render();

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
