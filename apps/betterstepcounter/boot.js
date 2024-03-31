let lastStepTime = null;

Bangle.on('step', function(steps) {
  let currentTime = Date.now();

  if (lastStepTime) {
    let timeDiff = currentTime - lastStepTime;

    if (timeDiff >= 3000) {
      Bangle.setStepCount(steps - 1);
    }
  }

  lastStepTime = currentTime;
});
