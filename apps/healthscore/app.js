var settings = Object.assign({
    countThreshold: 90, // Default minimum steps in a minute to be added to total counted steps
    activeThreshold: 100, // Default minimum active minutes in a day to be counted
    intenseThreshold: 130, // Default minimum intense minutes in a day to be counted
    saveStepCounts: true, // Whether to save all step counts above the count threshold
}, require('Storage').readJSON("healthscore.json", true) || {});
var Layout = require("Layout");

function hsGetData(hs_data, settings) {
  var total = { a: 0, i: 0 };
  for (var i = 0; i < 7; i++) {
    var date = new Date();
    date.setDate(date.getDate() - i);
    var dateString = date.toISOString().slice(0, 10);

    if (hs_data[dateString]) {
      for (var j = 0; j < hs_data[dateString].t.length; j++) {
        var steps = hs_data[dateString].t[j];
        if (steps >= settings.activeThreshold) {
          total.a += 1; // Count this minute as active
        }
        if (steps >= settings.intenseThreshold) {
          total.i += 1; // Count this minute as intense
        }
      }
      // Add the minutes from the active and intense counts
      total.a += hs_data[dateString].a;
      total.i += hs_data[dateString].i;
    }
  }
  return total;
}

// Read data from storage
var hs_data = require("Storage").readJSON("hs_data.json");
hs_data = hsGetData(hs_data, settings);

// Create the layout
var layout = new Layout({
    type: "v", c: [
        { type: "txt", font: "25%", label: (((hs_data.a + hs_data.i * 2)/150)*100).toFixed(0) + "%", fillx: 1 },
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
