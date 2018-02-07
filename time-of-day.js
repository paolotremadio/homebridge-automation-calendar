const suncalc = require('suncalc');

// Thanks to https://github.com/kcharwood/homebridge-suncalc/blob/master/index.js
const timeOfDay = (latitude, longitude) => {
  const nowDate = new Date();
  const now = nowDate.getTime();

  const sunDates = suncalc.getTimes(
    nowDate,
    latitude,
    longitude,
  );

  const times = {
    dawn: sunDates.dawn.getTime(),
    sunrise: sunDates.sunrise.getTime(),
    sunriseEnd: sunDates.sunriseEnd.getTime() + (1000 * 60),
    sunsetStart: sunDates.sunsetStart.getTime() + (1000 * 60),
    sunset: sunDates.sunset.getTime(),
    dusk: sunDates.dusk.getTime(),
  };

  if (now < times.dawn) {
    // Nighttime
    return 6;
  } else if (now >= times.dawn && now < times.sunrise) {
    // Morning Twilight
    return 1;
  } else if (now >= times.sunrise && now < times.sunriseEnd) {
    // Sunrise
    return 2;
  } else if (now >= times.sunriseEnd && now < times.sunsetStart) {
    // Daytime
    return 3;
  } else if (now >= times.sunsetStart && now < times.sunset) {
    // Sunset
    return 4;
  } else if (now >= times.sunset && now < times.dusk) {
    // Evening Twilight
    return 5;
  }

  // Nighttime
  return 6;
};

module.exports = timeOfDay;
