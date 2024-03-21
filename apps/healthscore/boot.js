var stepsLastMin = Bangle.getStepCount();

function getActivity(stepsInCurrentMinute) {
    const activeSPM = 100;
    const intenseSPM = 130;
    let activity = { active: 0, intense: 0 };

    if (stepsInCurrentMinute >= intenseSPM) {
        activity.intense += 1;
    } else if (stepsInCurrentMinute >= activeSPM) {
        activity.active += 1;
    }

    return activity;
}

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
        let activity = getActivity(stepsInCurrentMinute);

        let hs_data = require("Storage").read("hs_data");
        if (!hs_data) {
            hs_data = {};
        } else {
            hs_data = JSON.parse(hs_data);
        }

        let today = now.toISOString().split('T')[0]; // get the date part of the ISO string
        if (!hs_data[today]) {
            hs_data[today] = { active: 0, intense: 0 };
        }

        hs_data[today].active += activity.active;
        hs_data[today].intense += activity.intense;

        // remove dates older than 7 days
        let sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        for (let date in hs_data) {
            if (date < sevenDaysAgo) {
                delete hs_data[date];
            }
        }

        require("Storage").write("hs_data", JSON.stringify(hs_data));
        scheduleNextRun();
    }, msTillNextMinute);
}

scheduleNextRun();
