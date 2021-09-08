"use strict";

const stationAnalytics = {

  getTemp(station) {
    let latestTemp = null;
    if (station.readings.length > 0) {
      latestTemp = station.readings[0].temp;
      for (let i = 1; i < station.readings.length; i++) {
        latestTemp = station.readings[i].temp;
      }
    }
    return latestTemp;
  },

  getFarenheit(station) {
    let latestFarenheit = null;
    if (station.readings.length > 0) {
      latestFarenheit = station.readings[0].temp;
      for (let i = 1; i < station.readings.length; i++) {
        latestFarenheit = ((station.readings[i].temp *9/5) + 32);
      }
    }
    return latestFarenheit;
  },

  getWindSpeed(station) {
    let latestWindSpeed = null;
    if (station.readings.length > 0) {
      latestWindSpeed = station.readings[0].windspeed;
      for (let i = 1; i < station.readings.length; i++) {
        latestWindSpeed = station.readings[i].windspeed;
      }
    }
    return latestWindSpeed;
  },


  convertToLatestWeather(station) {
    let latestCode = null;
    if (station.readings.length > 0) {
      latestCode = station.readings[station.readings.length - 1].code;
    }
    let codeNum;
    codeNum = Number(latestCode);
    if (codeNum == 100) {
      return "Clear";
    } else if (codeNum == 200) {
      return "Partial Clouds";
    } else if (codeNum == 300) {
      return "Cloudy";
    } else if (codeNum == 400) {
      return "Light Showers";
    } else if (codeNum == 500) {
      return "Heavy Showers";
    } else if (codeNum == 600) {
      return "Rain";
    } else if (codeNum == 700) {
      return "Snow";
    } else if (codeNum == 800) {
      return "Thunder";
    } else
      return "Not Defined";
  },

  convertToLatestWindSpeed(station) {
    let latestWindSpeed = null;
    let windSpeed;
    if (station.readings.length > 0) {
      latestWindSpeed = station.readings[station.readings.length - 1].code;
    windSpeed = Number(latestWindSpeed);
  }
  if (windSpeed <= 1) {
    return 0;
  } else if (windSpeed > 1 || windSpeed <= 5) {
    return 1;
  } else if (windSpeed >= 6 || windSpeed <= 11) {
    return 2;
  } else if (windSpeed >= 12 || windSpeed <= 19) {
    return 3;
  } else if (windSpeed >= 20 || windSpeed <= 28) {
    return 4;
  } else if (windSpeed >= 29 || windSpeed <= 38) {
    return 5;
  } else if (windSpeed >= 39 || windSpeed <= 49) {
    return 6;
  } else if (windSpeed >= 50 || windSpeed <= 61) {
    return 7;
  } else if (windSpeed >= 62 || windSpeed <= 74) {
    return 8;
  } else if (windSpeed >= 75 || windSpeed <= 88) {
    return 9;
  } else if (windSpeed >= 89 || windSpeed <= 102) {
    return 10;
  } else
    return 11;
},

  showWindChill(temp, windspeed) {
    let  windChill = (((13.12 + (0.6215 * parseFloat(temp))) - (11.37 * (Math.pow(parseFloat(windspeed), 0.16)))) + ((0.3965 * parseFloat(temp)) * (Math.pow(parseFloat(windspeed), 0.16))));
    let d=windChill;
    let roundedDouble = Math.round(d * 100.0) / 100.0;
    return (roundedDouble);
  },

    showWindCompass(station) {
    let latestWindCompass = null;
    let windDirection;
    if (station.readings.length > 0) {
      latestWindCompass = station.readings[station.readings.length - 1].code;
      windDirection = Number(latestWindCompass);
    }
      if (windDirection >= 348.75 || windDirection <=11.25) {
        return "North";
      } else if (windDirection > 11.25 && windDirection < 33.75) {
        return "North North East";
      } else if (windDirection > 33.75 && windDirection < 56.25) {
        return "North East";
      } else if (windDirection > 56.25 && windDirection < 78.75) {
        return "East North East";
      } else if (windDirection > 78.75 && windDirection < 101.25) {
        return "East";
      } else if (windDirection > 101.25 && windDirection < 123.75) {
        return "East South East";
      } else if (windDirection > 123.75 && windDirection < 146.25) {
        return "South East";
      } else if (windDirection > 146.25 && windDirection < 168.75) {
        return "South South East";
      } else if (windDirection > 168.75 && windDirection < 191.25) {
        return "South";
      } else if (windDirection > 191.25 && windDirection < 213.75) {
        return "South South West";
      } else if (windDirection > 213.75 && windDirection < 236.25) {
        return "South West";
      } else if (windDirection > 236.25 && windDirection < 258.75) {
        return "West South West";
      } else if (windDirection > 258.75 && windDirection < 281.25) {
        return "West";
      } else if (windDirection > 281.25 && windDirection < 303.75) {
        return "West North West";
      } else if (windDirection > 303.75 && windDirection < 326.25) {
        return "North West";
      } else if (windDirection > 326.25 && windDirection < 348.75) {
        return "North North West";
      } else
        return "Nothing";
    },

  getPressure(station) {
    let latestPressure = null;
    if (station.readings.length > 0) {
      latestPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        latestPressure = station.readings[i].pressure;
      }
    }
    return latestPressure;
  }

}
module.exports = stationAnalytics;