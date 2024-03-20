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

        let ihs_data = require("Storage").read("ihs_data");
        if (!ihs_data) {
            ihs_data = {};
        } else {
            ihs_data = JSON.parse(ihs_data);
        }

        let today = now.toISOString().split('T')[0]; // get the date part of the ISO string
        if (!ihs_data[today]) {
            ihs_data[today] = { active: 0, intense: 0 };
        }

        ihs_data[today].active += activity.active;
        ihs_data[today].intense += activity.intense;

        // remove dates older than 7 days
        let sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        for (let date in ihs_data) {
            if (date < sevenDaysAgo) {
                delete ihs_data[date];
            }
        }

        require("Storage").write("ihs_data", JSON.stringify(ihs_data));
        scheduleNextRun();
    }, msTillNextMinute);
}

scheduleNextRun();
