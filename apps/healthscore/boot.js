// Load settings for healthscore, providing default values
var settings = Object.assign({
    // Not loading activeThreshold and intenseThreshold to save RAM usage
    countThreshold: 90, // Default minimum steps in a minute to be added to total counted steps
}, require('Storage').readJSON("healthscore.json", true) || {});
var stepsLastMin = Bangle.getStepCount();

function getStepsInCurrentMinute() {
    let currentSteps = Bangle.getStepCount();
    let stepsInCurrentMinute = currentSteps - stepsLastMin;
    stepsLastMin = currentSteps;

    return stepsInCurrentMinute;
}

function scheduleNextRun() {
    let now = new Date();
    let nextMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1);
    let msTillNextMinute = nextMinute - now;

    setTimeout(() => {
        let stepsInCurrentMinute = getStepsInCurrentMinute();
        if (stepsInCurrentMinute >= settings.countThreshold) {
            let hs_data = require("Storage").read("hs_data.json");
            if (!hs_data) {
                hs_data = {};
            } else {
                hs_data = JSON.parse(hs_data);
            }

            let today = now.toISOString().split('T')[0]; // get the date part of the ISO string
            if (!hs_data[today]) {
                hs_data[today] = [];
            }

            hs_data[today].push(stepsInCurrentMinute);

            // remove dates older than 7 days
            let sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            for (let date in hs_data) {
                if (date < sevenDaysAgo) {
                    delete hs_data[date];
                }
            }

            require("Storage").write("hs_data.json", JSON.stringify(hs_data));
        }

        scheduleNextRun();
    }, msTillNextMinute);
}

scheduleNextRun();
