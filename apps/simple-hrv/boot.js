function calcHrv(bpmValues) {
    if (bpmValues.length < 2) return 0;
    
    var totalDeviation = 0;
    for (var i = 1; i < bpmValues.length; i++) {
      totalDeviation += Math.abs(bpmValues[i] - bpmValues[i - 1]);
    }
    
    return totalDeviation / (bpmValues.length - 1);
}

function calcHrv2(bpmValues) {
    if (bpmValues.length < 2) return 0;

    // Calculate the mean (average) BPM value
    var sum = 0;
    for (var i = 0; i < bpmValues.length; i++) {
        sum += bpmValues[i];
    }
    var mean = sum / bpmValues.length;

    // Calculate the variance
    var varianceSum = 0;
    for (var i = 0; i < bpmValues.length; i++) {
        varianceSum += Math.pow(bpmValues[i] - mean, 2);
    }
    var variance = varianceSum / bpmValues.length;

    // The standard deviation is the square root of the variance
    var standardDeviation = Math.sqrt(variance);

    return standardDeviation;
}

var firstReading = null;
var bpmValues = [];
var disableHRM = false;

Bangle.on('HRM', function(hrm) {
    if (hrm.confidence >= 80 && !disableHRM) {
        if (!firstReading) firstReading = new Date().getTime();
        if (new Date().getTime() - firstReading < 15000) return;

        bpmValues.push(hrm.bpm);
        if (bpmValues.length >= 30) {
            disableHRM = true;
            var today = new Date(Date.now()).toISOString().split('T')[0]
            var hrv_data = require("Storage").readJSON("hrv_" + today + ".json") || [];
            hrv_data.push({ time: new Date().toISOString(), hrv: calcHrv(bpmValues), hrv2: calcHrv2(bpmValues)});
            require("Storage").write("hrv_" + today + ".json", JSON.stringify(hrv_data));
        }
    }
});
