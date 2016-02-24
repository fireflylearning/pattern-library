'use strict';

// var _ = require('underscore');

var msInS = 1000,
    sInM = 60,
    mInH = 60,
    hInD = 24,
    dInW = 7,
    mInY = 12,
    msInM = sInM * msInS,
    msInH = msInM * mInH,
    msInD = msInH * hInD,
    weekNamesLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var maxDaysAgo = dInW - 1;

var momentsAgo = 'A few moments ago',
    minutesAgo = '{mins} minute{suffix} ago',
    hoursAgo = '{hours} hour{suffix} ago',
    yesterdayAt = 'Yesterday at {time}',
    simpleVal = '{value}',
    valueWithTime = '{value} at {time}',
    dayWithDate = '{day} {date}{suffix}',
    nextWeek = 'Next {day}',
    lastWeek = 'Last {day}',
    nextWeekWithDate = 'Next {day} {date}{suffix}',
    lastWeekWithDate = 'Last {day} {date}{suffix}';






function isMomentsAgo(date, now) {
    return (Math.abs(now - date) < msInM * 1);
}

function isMinutesAgo(date, now) {
    return (Math.abs(now - date) < msInH * 1);
}

function isHoursAgoAndToday(date, now) {
    return (Math.abs(now - date) < msInD * 1 && now.getDate() === date.getDate());
}

function isYesterday(date, now) {
    return (Math.abs(now - date) < msInD * 1 && now.getDate() !== date.getDate());
}

function isLessThanAWeekAgo(date, now) {
    return getDayDiff(date, now) < dInW;
}

function isExactlyOneWeekFromNow(date, now) {
    return getDayDiff(date, now) === -dInW;
}

function isExactlyOneWeekAgo(date, now) {
    return getDayDiff(date, now) === dInW;
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

function isWithinWeekPlusOrMinus(date, now) {
    var diff = getDayDiff(date, now);

    return (diff < dInW && diff > -dInW);
}



function convertToMomentsAgo(date, now) {
    return momentsAgo;
}

function convertToMinutesAgo(date, now) {
    var mins = parseInt(Math.abs(now - date) / msInM, 10);
    var suffix = mins === 1 ? '' : 's';
    return minutesAgo
        .replace('{mins}', mins)
        .replace('{suffix}', suffix);
}

function convertToHoursAgo(date, now) {
    var hours = parseInt(Math.abs(now - date) / msInH, 10);
    var suffix = hours === 1 ? '' : 's';
    return hoursAgo
        .replace('{hours}', hours)
        .replace('{suffix}', suffix);
}

function convertToYesterdayAt(date, now) {
    return yesterdayAt
        .replace('{time}', toShortTimeString(date));
}

function convertToDay(date, now) {
    return simpleVal
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
    return simpleVal
        .replace('{value}', toShortDateString(date));
}

function convertToDateWithTime(date) {
    return valueWithTime
        .replace('{value}', toShortDateString(date))
        .replace('{time}', toShortTimeString(date));
}

function convertToNextWeek(date) {
    return nextWeek
        .replace('{day}', toLongDayString(date));
}

function convertToLastWeek(date) {
    return lastWeek
        .replace('{day}', toLongDayString(date));
}

function convertToNextWeekWithDate(date) {
    return nextWeekWithDate
        .replace('{day}', toLongDayString(date))
        .replace('{date}', date.getDate())
        .replace('{suffix}', getDateSuffix(date));
}

function convertToLastWeekWithDate(date) {
    return lastWeekWithDate
        .replace('{day}', toLongDayString(date))
        .replace('{date}', date.getDate())
        .replace('{suffix}', getDateSuffix(date));
}

function convertToTomorrow(date) {
    return 'Tomorrow';
}

function convertToYesterday(date) {
    return 'Yesterday';
}

function convertToToday(date) {
    return 'Today';
}



function getNiceDateFormat(date, now) {
    var format = convertToDateWithTime;

    switch (true) {
        case isMomentsAgo(date, now):
            format = convertToMomentsAgo;
            break;
        case isMinutesAgo(date, now):
            format = convertToMinutesAgo;
            break;
        case isHoursAgoAndToday(date, now):
            format = convertToHoursAgo;
            break;
        case isYesterday(date, now):
            format = convertToYesterdayAt;
            break;
        case isLessThanAWeekAgo(date, now):
            format = convertToDayWithTime;
            break;
    }

    return format;
}

function getNiceDateFuzzyFormat(date, now, contextUnknown) {
    var format = convertToDate;
    switch (true) {
        case isExactlyOneWeekFromNow(date, now):
            format = contextUnknown ? convertToNextWeekWithDate : convertToNextWeek;
            break;
        case isExactlyOneWeekAgo(date, now):
            format = contextUnknown ? convertToLastWeekWithDate : convertToLastWeek;
            break;
        case isTomorrowFuzzy(date, now):
            format = convertToTomorrow;
            break;
        case isYesterdayFuzzy(date, now):
            format = convertToYesterday;
            break;
        case isToday(date, now):
            format = convertToToday;
            break;
        case isWithinWeekPlusOrMinus(date, now):
            format = contextUnknown ? convertToDayWithDate : convertToDay;
    }
    return format;
}

function niceDate(date) {
    date = toLocal(date);

    var now = new Date(),
        format = getNiceDateFormat(date, now);

    return format(date, now);
}


function niceDateFuzzy(date, contextUnknown) {
    date = toLocal(date);
    if (typeof contextUnknown === 'undefined' || contextUnknown === null) contextUnknown = false;

    var now = new Date(),
        format = getNiceDateFuzzyFormat(date, now, contextUnknown);

    return format(date, now, contextUnknown);
}


function niceWeek(date) {
    return '';
}


function getDateSuffix(date) {
    var day = date.getDate(),
    value = 'th';

    switch(day) {
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


function getDayDiff(date, now) {
    var diff = Math.floor(now * 0.001) - Math.floor(date * 0.001);
    var r = sInM * mInH * hInD;
    return Math.floor(diff / r);
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

exports.niceDate = niceDate;
exports.niceDateFuzzy = niceDateFuzzy;
exports.getDateSuffix = getDateSuffix;
exports.niceWeek = niceWeek;
exports.toLocal = toLocal;

exports.toShortTimeString = toShortTimeString;
exports.toShortDateString = toShortDateString;
exports.toLongDayString = toLongDayString;


// function timeSince(timeStamp) {
//     var now = new Date(),
//       secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
//     if(secondsPast < 60){
//       return parseInt(secondsPast) + 's';
//     }
//     if(secondsPast < 3600){
//       return parseInt(secondsPast/60) + 'm';
//     }
//     if(secondsPast <= 86400){
//       return parseInt(secondsPast/3600) + 'h';
//     }
//     if(secondsPast > 86400){
//         day = timeStamp.getDate();
//         month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
//         year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
//         return day + " " + month + year;
//     }
//   }
