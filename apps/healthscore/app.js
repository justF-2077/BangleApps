var Layout = require("Layout");

// Read data from storage
var ihs_data = require("Storage").readJSON("ihs_data") || {};
var today = new Date().toISOString().slice(0, 10); // Current date in "YYYY-MM-DD" format

// Calculate the IHS score for the last 7 days
var totalActiveMinutes = 0;
var totalIntenseMinutes = 0;

for (var i = 0; i < 7; i++) {
    var date = new Date();
    date.setDate(date.getDate() - i);
    var dateString = date.toISOString().slice(0, 10);
    
    if (ihs_data[dateString]) {
        totalActiveMinutes += ihs_data[dateString].active;
        totalIntenseMinutes += ihs_data[dateString].intense;
    }
}

var totalMinutes = totalActiveMinutes + totalIntenseMinutes;
var ihsScore = ((totalActiveMinutes + totalIntenseMinutes * 2) / 150) * 100;

// Create the layout
var layout = new Layout({
    type: "v", c: [
        { type: "txt", font: "25%", label: ihsScore.toFixed(1) + "%", fillx: 1 },
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
