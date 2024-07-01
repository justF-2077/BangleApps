{
  let waiting = false;
  let settings = Object.assign(
    require('Storage').readJSON("owmweather.default.json", true) || {},
    require('Storage').readJSON("owmweather.json", true) || {}
  );
  
  let completion = function(){
    waiting = false;
    settings.updated = Date.now();
    require('Storage').writeJSON("owmweather.json", settings);
  }

  let pullWeather = function() {
    if (!waiting && NRF.getSecurityStatus().connected){
      waiting = true;
      require("owmweather").pull(completion);
    }
  }

  if (settings.enabled) {    
    if (!settings.updated || settings.updated + settings.refresh * 1000 * 60 < Date.now()){
      setTimeout(pullWeather, 5000);
    }
    setInterval(pullWeather, settings.refresh * 1000 * 60);
  }

  NRF.on('connect', pullWeather);
}
