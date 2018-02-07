const moment = require('moment');
const debug = require('debug')('homebridge-automation-calendar');
const seasonCalculator = require('date-season');
const CustomCharacteristics = require('./custom-characteristics');
const timeOfDayCalculator = require('./time-of-day');

let Service;

class AutomationCalendar {
  constructor(log, config) {
    this.log = log;
    this.name = config.name;

    this.latitude = config.latitude || 0.0;
    this.longitude = config.longitude || 0.0;

    this.hemisphere = config.latitude >= 0 ? 'north' : 'south';

    debug(`Using astronomic calendar to get current season - ${this.hemisphere} hemisphere`);

    this.motionService = new Service.MotionSensor(this.name);

    this.motionService
      .addCharacteristic(CustomCharacteristics.MonthOfYear)
      .on('get', callback => callback(null, this.constructor.getMonthOfYear()));

    this.motionService
      .addCharacteristic(CustomCharacteristics.WeekOfYear)
      .on('get', callback => callback(null, this.constructor.getWeekOfYear()));

    this.motionService
      .addCharacteristic(CustomCharacteristics.Season)
      .on('get', callback => callback(null, this.getSeason()));

    this.motionService
      .addCharacteristic(CustomCharacteristics.SeasonName)
      .on('get', callback => callback(null, this.getSeasonName()));

    this.motionService
      .addCharacteristic(CustomCharacteristics.TimeOfDay)
      .on('get', callback => callback(null, this.getTimeOfDay()));

    this.motionService
      .addCharacteristic(CustomCharacteristics.TimeOfDayName)
      .on('get', callback => callback(null, this.getTimeOfDayName()));

    this.refreshValues();
  }

  getServices() {
    return [this.motionService];
  }

  static getMonthOfYear() {
    return (new Date()).getMonth() + 1;
  }

  static getWeekOfYear() {
    return moment().week();
  }

  getSeason() {
    const seasons = {
      Spring: 1,
      Summer: 2,
      Autumn: 3,
      Winter: 4,
    };

    return seasons[this.getSeasonName()];
  }

  getSeasonName() {
    const seasonResolver = seasonCalculator({ north: this.hemisphere === 'north', autumn: true });

    return seasonResolver(new Date());
  }

  getTimeOfDay() {
    return timeOfDayCalculator(this.latitude, this.longitude);
  }

  getTimeOfDayName() {
    const names = {
      1: 'Morning Twilight',
      2: 'Sunrise',
      3: 'Daytime',
      4: 'Sunset',
      5: 'Evening Twilight',
      6: 'Night',
    };

    return names[this.getTimeOfDay()];
  }

  refreshValues() {
    this.motionService
      .getCharacteristic(CustomCharacteristics.MonthOfYear)
      .updateValue(this.constructor.getMonthOfYear());

    this.motionService
      .getCharacteristic(CustomCharacteristics.WeekOfYear)
      .updateValue(this.constructor.getWeekOfYear());

    this.motionService
      .getCharacteristic(CustomCharacteristics.Season)
      .updateValue(this.getSeason());

    this.motionService
      .getCharacteristic(CustomCharacteristics.SeasonName)
      .updateValue(this.getSeasonName());

    this.motionService
      .getCharacteristic(CustomCharacteristics.TimeOfDay)
      .updateValue(this.getTimeOfDay());

    this.motionService
      .getCharacteristic(CustomCharacteristics.TimeOfDayName)
      .updateValue(this.getTimeOfDayName());

    // Set timeout
    setTimeout(
      this.refreshValues.bind(this),
      60000,
    );
  }
}

module.exports = (homebridge) => {
  Service = homebridge.hap.Service; // eslint-disable-line

  homebridge.registerAccessory('homebridge-automation-calendar', 'AutomationCalendar', AutomationCalendar);
};
