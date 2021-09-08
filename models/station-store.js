'use strict';

const stationCollection = require('./station-store.json').stationCollection;
const JsonStore = require("./json-store");
const uuid = require("uuid");

const stationStore = {
  store: new JsonStore("./models/station-store.json", {
    stationCollection: []
  }),
  collection: "stationCollection",
  getAllStations() {
    return this.store.findAll(this.collection);
  },
  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  addStation(id, station) {
    station.id = id;
    this.store.add(this.collection, station);
    this.store.save();
  },
  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },
  removeAllStations() {
    this.store.removeAll(this.collection);
    this.store.save();
  },
  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
  },
  removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
  }
};
module.exports = stationStore;