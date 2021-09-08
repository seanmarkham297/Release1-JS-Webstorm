'use strict';

const logger = require('../utils/logger');
const stationCollection = require('../models/station-store.js');
const stationStore = require('../models/station-store');
const stationAnalytics = require("../models/analytics.js");

const station = {
  index(request, response) {

    const station = stationCollection.getStation(request.params.id);
    if (station.readings.length > 0) {
      station.latestTemp = stationAnalytics.getTemp(station)
      station.latestPressure = stationAnalytics.getPressure(station)
      station.latestFarenheit = stationAnalytics.getFarenheit(station)
      station.latestWindSpeed = stationAnalytics.convertToLatestWindSpeed(station)
      station.codeNum = stationAnalytics.convertToLatestWeather(station)
      station.latestWindCompass = stationAnalytics.showWindCompass(station)
      station.windChill = stationAnalytics.showWindChill(station.latestTemp, station.latestWindSpeed);
    }
    const stationId = request.params.id;
    logger.debug('Station id = ' + stationId);
    const viewData = {
      title: 'Station',
      station: station,
    };
    response.render('station', viewData);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      code: request.body.code,
      temp: request.body.temp,
      windspeed: request.body.windspeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;
