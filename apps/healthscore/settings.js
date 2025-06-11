(function(back) {
  var FILE = "healthscore.json";
  // Load settings
  var settings = Object.assign({
    countThreshold: 90, // Default minimum steps in a minute to be added to total counted steps
    activeThreshold: 100, // Default minimum active minutes in a day to be counted
    intenseThreshold: 130, // Default minimum intense minutes in a day to be counted
  }, require('Storage').readJSON(FILE, true) || {});

  function writeSettings() {
    require('Storage').writeJSON(FILE, settings);
  }

  // Show the menu
  E.showMenu({
    "" : { "title" : "App Name" },
    "< Back" : () => back(),
    'Count Threshold': {
      value: 0|settings.countThreshold,
      min: 0, max: 300, step: 1,
      onchange: v => {
        settings.countingThreshold = v;
        writeSettings();
      }
    },
    'Active Threshold': {
      value: 0|settings.activeThreshold,
      min: 0, max: 300, step: 1,
      onchange: v => {
        settings.activeThreshold = v;
        writeSettings();
      }
    },
    'Intense Threshold': {
      value: 0|settings.intenseThreshold,
      min: 0, max: 300, step: 1,
      onchange: v => {
        settings.intenseThreshold = v;
        writeSettings();
      }
    },
  });
})