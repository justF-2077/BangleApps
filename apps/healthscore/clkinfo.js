(function () {
  var settings = Object.assign({
    countThreshold: 90, // Default minimum steps in a minute to be added to total counted steps
    activeThreshold: 100, // Default minimum active minutes in a day to be counted
    intenseThreshold: 130, // Default minimum intense minutes in a day to be counted
    saveStepCounts: true, // Whether to save all step counts above the count threshold
  }, require('Storage').readJSON("healthscore.json", true) || {});

  // Read health score data from storage
  var hs_data = require("Storage").readJSON("hs_data.json");
  hs_data = require("healthscore").getData(hs_data, settings);

  // Calculate the health score
  var hsScore = ((hs_data.a + hs_data.i * 2) / 150) * 100;

  return {
    name: "Bangle",
    items: [
      {
        name: "Health Score",
        hasRange : true,
        get: function () {
          return {
            text: (hs_data.a + hs_data.i * 2),
            v : Math.floor(hsScore),
            min : 0,
            max : 100,
            img: atob("GBiBAAAAAAAAAAEAQAOBwAfD4A/n8B//+D///H///v///3///z///B//+A//8Af/4AP/wAH/gAD/AAB+AAA8AAAYAAAAAAAAAAAAAA=="),
            color: "#f74743"
          }
        },
        show: function () { },
        hide: function () { },
        // run : function() {} optional (called when tapped)
      }
    ]
  };
})
