'use strict';

var _ = require('lodash');

var msInS = 1000,
    sInM = 60,
    mInH = 60,
    hInD = 24,
    dInW = 7,
    msInM = msInS * sInM,
    msInH = msInM * mInH,
    msInD = msInH * hInD,
    weekNamesLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var momentsAgo = 'A few moments ago',
    minutesAgo = '{mins} minute{suffix} ago',
    hoursAgo = '{hours} hour{suffix} ago',
    yesterdayAt = 'Yesterday at {time}',
    simpleValue = '{value}',
    valueWithTime = '{value} at {time}',
    dayWithDate = '{day} {date}{suffix}',
    tomorrow = 'Tomorrow',
    yesterday = 'Yesterday',
    today = 'Today',
    thisWeek = 'This Week',
    nextWeek = 'Next Week',
    lastWeek = 'Last Week',
    nextWeekDay = 'Next {day}',
    lastWeekDay = 'Last {day}',
    nextWeekDayWithDate = 'Next {day} {date}{suffix}',
    lastWeekDayWithDate = 'Last {day} {date}{suffix}',
    nWeeksAgo = '{numweeks} Week{suffix} Ago',
    nWeeksTime = '{numweeks} Weeks\' Time';


var niceDateOperations = [
    [isMomentsAgo, convertToMomentsAgo],
    [isLessThanAnHourAgo, convertToMinutesAgo],
    [isHoursAgoAndToday, convertToHoursAgo],
    [isYesterday, convertToYesterdayAt],
    [isLessThanAWeekAgo, convertToDayWithTime],
    [isDefault, convertToDateWithTime]
];

function getNiceDateFuzzyOperations(contextUnknown) {
    return [
        [isExactlyOneWeekFromNow, contextUnknown ? convertToNextWeekDayWithDate : convertToNextWeekDay],
        [isExactlyOneWeekAgo, contextUnknown ? convertToLastWeekDayWithDate : convertToLastWeekDay],
        [isTomorrowFuzzy, convertToTomorrow],
        [isYesterdayFuzzy, convertToYesterday],
        [isToday, convertToToday],
        [isWithinWeekPlusOrMinus, contextUnknown ? convertToDayWithDate : convertToDay],
        [isDefault, convertToDate]
    ];
}


var niceWeekOperations = [
    [isMoreThanAWeekFromNow, convertToNWeeksTime],
    [isNextWeek, convertToNextWeek],
    [isThisWeek, convertToThisWeek],
    [isMoreThanAWeekAgo, convertToNWeeksAgo],
    [isLastWeek, convertToLastWeek],
    [isDefault, convertToDate]
];



/**
 * Comparions methods
 */

function isMomentsAgo(date, now) {
    return getSecDiff(date, now) < sInM;
}

function isLessThanAnHourAgo(date, now) {
    return getMinDiff(date, now) < mInH;
}

function isHoursAgoAndToday(date, now) {
    return (getHourDiff(date, now) < hInD) && (now.getDate() === date.getDate());
}

function isYesterday(date, now) {
    return (getDayDiff(date, now) < 1) && (now.getDate() !== date.getDate());
}




function isMoreThanAWeekFromNow(date, now) {
    return getDayDiff(date, now) <= -2 * dInW;
}

function isNextWeek(date, now) {
    return getDayDiff(date, now) <= -dInW;
}

function isThisWeek(date, now) {
    return getDayDiff(date, now) <= 0;
}

function isMoreThanAWeekAgo(date, now) {
    return getDayDiff(date, now) > dInW;
}

function isLastWeek(date, now) {
    return getDayDiff(date, now) <= dInW;
}



function isLessThanAWeekAgo(date, now) {
    return getDayDiff(date, now) < dInW;
}

function isExactlyOneWeekAgo(date, now) {
    return getDayDiff(date, now) === dInW;
}

function isExactlyOneWeekFromNow(date, now) {
    return getDayDiff(date, now) === -dInW;
}

function isWithinWeekPlusOrMinus(date, now) {
    var diff = getDayDiff(date, now);
    return (diff < dInW && diff > -dInW);
}


function isTomorrowFuzzy(date, now) {
    return getDayDiff(date, now) === -1;
}

function isYesterdayFuzzy(date, now) {
    return getDayDiff(date, now) === 1;
}

function isToday(date, now) {
    return getDayDiff(date, now) === 0;
}

function isDefault(date, now) {
    return true;
}



function convertToMomentsAgo(date, now) {
    return momentsAgo;
}


function convertToMinutesAgo(date, now) {
    var mins = getMinDiff(date, now),
        suffix = getNumSuffix(mins);
    return minutesAgo
        .replace('{mins}', mins)
        .replace('{suffix}', suffix);
}

function convertToHoursAgo(date, now) {
    var hours = getHourDiff(date, now),
        suffix = getNumSuffix(hours);
    return hoursAgo
        .replace('{hours}', hours)
        .replace('{suffix}', suffix);
}

function convertToYesterdayAt(date, now) {
    return yesterdayAt
        .replace('{time}', toShortTimeString(date));
}

function convertToDay(date, now) {
    return simpleValue
        .replace('{value}', toLongDayString(date));
}

function convertToDayWithTime(date, now) {
    return valueWithTime
        .replace('{value}', toLongDayString(date))
        .replace('{time}', toShortTimeString(date));
}

function convertToDayWithDate(date, now) {
    return dayWithDate
        .replace('{day}', toLongDayString(date))
        .replace('{date}', date.getDate())
        .replace('{suffix}', getDateSuffix(date));
}

function convertToDate(date) {
    return simpleValue
        .replace('{value}', toShortDateString(date));
}

function convertToDateWithTime(date) {
    return valueWithTime
        .replace('{value}', toShortDateString(date))
        .replace('{time}', toShortTimeString(date));
}

function convertToThisWeek(date) {
    return thisWeek;
}

function convertToNextWeek(date) {
    return nextWeek;
}

function convertToNextWeekDay(date) {
    return nextWeekDay
        .replace('{day}', toLongDayString(date));
}

function convertToLastWeek(date) {
    return lastWeek;
}

function convertToLastWeekDay(date) {
    return lastWeekDay
        .replace('{day}', toLongDayString(date));
}

function convertToNextWeekDayWithDate(date) {
    return nextWeekDayWithDate
        .replace('{day}', toLongDayString(date))
        .replace('{date}', date.getDate())
        .replace('{suffix}', getDateSuffix(date));
}

function convertToLastWeekDayWithDate(date) {
    return lastWeekDayWithDate
        .replace('{day}', toLongDayString(date))
        .replace('{date}', date.getDate())
        .replace('{suffix}', getDateSuffix(date));
}

function convertToTomorrow(date) {
    return tomorrow;
}

function convertToYesterday(date) {
    return yesterday;
}

function convertToToday(date) {
    return today;
}

function convertToNWeeksAgo(date, now) {
    var weeksDiff = getWeekDiffCeil(date, now),
        suffix = getNumSuffix(weeksDiff);

    return nWeeksAgo
        .replace('{numweeks}', weeksDiff)
        .replace('{suffix}', suffix);
}

function convertToNWeeksTime(date, now) {
    var weeksDiff = Math.abs(getWeekDiffCeil(date, now));

    return nWeeksTime
        .replace('{numweeks}', weeksDiff);
}







/**
 * Primary methods
 */

function niceDate(date) {
    date = toLocal(date);

    var now = new Date(),
        format = getFormat(niceDateOperations, date, now);

    return format(date, now);
}


function niceDateFuzzy(date, contextUnknown) {
    date = toLocal(date);
    if (typeof contextUnknown === 'undefined' || contextUnknown === null) contextUnknown = false;

    var now = new Date(),
        format = getFormat(getNiceDateFuzzyOperations(contextUnknown), date, now);

    return format(date, now, contextUnknown);
}

function getNiceWeek(config) {

    var weekStartDay = config.weekStartDay || 0;

    return function niceWeek(date) {

        var now = new Date(),
            weekStart = getStartOfWeekForDate(now, weekStartDay),
            format = getFormat(niceWeekOperations, date, weekStart);

        return format(date, weekStart);
    };
}




/**
 * Utils
 */

function getFormat(oerations, date, now) {
    return _.find(oerations, function(testAndMethod) {
        return testAndMethod[0](date, now);
    })[1];
}


function getNumSuffix(value) {
    return value === 1 ? '' : 's';
}

function getDateSuffix(date) {
    var day = date.getDate(),
        value = 'th';

    switch (day) {
        case 1:
        case 21:
        case 31:
            value = 'st';
            break;
        case 2:
        case 22:
            value = 'nd';
            break;
        case 3:
        case 23:
            value = 'rd';
            break;
    }
    return value;
}

function toLocal(date) {
    return date;
}


function getDiff(date, now, divisor) {
    return Math.floor(parseInt((now.getTime() - date.getTime())/(divisor), 10) * 0.001);
}

function getSecDiff(date, now) {
    return getDiff(date, now, 1);
}

function getMinDiff(date, now) {
    return getDiff(date, now, (sInM));
}

function getHourDiff(date, now) {
    return getDiff(date, now, (sInM * mInH));
}

function getDayDiff(date, now) {
    return getDiff(date, now, (sInM * mInH * hInD));
}

function getWeekDiff(date, now) {
    return getDiff(date, now, (sInM * mInH * hInD * dInW));
}

function getWeekDiffCeil(date, now) {
    var l = parseInt((now.getTime() - date.getTime())/(sInM * mInH * hInD * dInW), 10) * 0.001;
    if (l >= 0) {
        return Math.ceil(l);
    } else {
        return Math.floor(l);
    }
}


function toShortTimeString(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function toShortDateString(date) {
    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        format = '{date}/{month}/{year}';

    return format
        .replace('{date}', day)
        .replace('{month}', month)
        .replace('{year}', year);
}

function toLongDayString(date) {
    return weekNamesLong[date.getDay()];
}

function getStartOfWeekForDate(date, weekStartDay) {
    var todayTime = date.getTime(),
        dayToday = date.getDay(),
        diffDays;

    if (weekStartDay < dayToday) {
        diffDays = dayToday - weekStartDay;
    } else if (weekStartDay > dayToday) {
        diffDays = dayToday + (dInW - weekStartDay);
    } else {
        diffDays = 0;
    }
    return new Date(todayTime - (diffDays * msInD));
}

module.exports = function(config) {

    var niceWeek = getNiceWeek(config);

    return {
        niceDate: niceDate,
        niceDateFuzzy: niceDateFuzzy,
        getDateSuffix: getDateSuffix,
        niceWeek: niceWeek,
        toLocal: toLocal,

        toShortTimeString: toShortTimeString,
        toShortDateString: toShortDateString,
        toLongDayString: toLongDayString,
    };

};
