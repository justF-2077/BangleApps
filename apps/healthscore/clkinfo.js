(function () {
  // Function to calculate total active and intense minutes for the last 7 days
  function calculateTotalMinutes(hsData) {
      var totalActiveMinutes = 0;
      var totalIntenseMinutes = 0;

      for (var i = 0; i < 7; i++) {
          var date = new Date();
          date.setDate(date.getDate() - i);
          var dateString = date.toISOString().slice(0, 10);

          if (hsData[dateString]) {
              totalActiveMinutes += hsData[dateString].active;
              totalIntenseMinutes += hsData[dateString].intense;
          }
      }

      return { active: totalActiveMinutes, intense: totalIntenseMinutes };
  }

  // Read health score data from storage
  var hsData = require("Storage").readJSON("hs_data") || {};

  // Calculate total active and intense minutes for the last 7 days
  var totalMinutes = calculateTotalMinutes(hsData);
  var totalActiveMinutes = totalMinutes.active;
  var totalIntenseMinutes = totalMinutes.intense;

  // Calculate the health score
  var hsScore = ((totalActiveMinutes + totalIntenseMinutes * 2) / 150) * 100;

  return {
    name: "Bangle",
    items: [
      {
        name: "Health Score",
        hasRange : true,
        get: function () {
          return {
            text: (totalActiveMinutes + totalIntenseMinutes * 2),
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
