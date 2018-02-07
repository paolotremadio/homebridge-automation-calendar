const { Characteristic } = require('hap-nodejs');

const MonthOfYearUUID = '3470e956-0bfd-11e8-ba89-0ed5f89f718b';
const MonthOfYear = function () {
  const char = new Characteristic('Month of the year', MonthOfYearUUID);

  char.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 12,
    minValue: 1,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
  });
  char.value = char.getDefaultValue();

  return char;
};
MonthOfYear.UUID = MonthOfYearUUID;

const WeekOfYearUUID = '3af64fbe-0bfd-11e8-ba89-0ed5f89f718b';
const WeekOfYear = function () {
  const char = new Characteristic('Week of the year', WeekOfYearUUID);

  char.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 52,
    minValue: 1,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
  });
  char.value = char.getDefaultValue();

  return char;
};
WeekOfYear.UUID = WeekOfYearUUID;

const SeasonUUID = '9469f834-0c07-11e8-ba89-0ed5f89f718b';
const Season = function () {
  const char = new Characteristic('Season', SeasonUUID);

  char.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 4,
    minValue: 1,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
  });
  char.value = char.getDefaultValue();

  return char;
};
Season.UUID = SeasonUUID;

const SeasonNameUUID = '8fb61458-0c07-11e8-ba89-0ed5f89f718b';
const SeasonName = function () {
  const char = new Characteristic('Season name', SeasonNameUUID);

  char.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
  });
  char.value = char.getDefaultValue();

  return char;
};
SeasonName.UUID = SeasonNameUUID;

const TimeOfDayUUID = 'b6be5238-0c0a-11e8-ba89-0ed5f89f718b';
const TimeOfDay = function () {
  const char = new Characteristic('Time of the day', TimeOfDayUUID);

  char.setProps({
    format: Characteristic.Formats.UINT8,
    maxValue: 6,
    minValue: 1,
    minStep: 1,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
  });
  char.value = char.getDefaultValue();

  return char;
};
TimeOfDay.UUID = TimeOfDayUUID;

const TimeOfDayNameUUID = 'a9d6a962-0c0a-11e8-ba89-0ed5f89f718b';
const TimeOfDayName = function () {
  const char = new Characteristic('Time of the day label', TimeOfDayNameUUID);

  char.setProps({
    format: Characteristic.Formats.STRING,
    perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY],
  });
  char.value = char.getDefaultValue();

  return char;
};
TimeOfDayName.UUID = TimeOfDayNameUUID;

module.exports = {
  MonthOfYear,
  WeekOfYear,
  Season,
  SeasonName,
  TimeOfDay,
  TimeOfDayName,
};
