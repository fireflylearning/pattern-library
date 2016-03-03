'use strict';

var _ = require('lodash');
var dateFormattingFactory = require('../blocks/core/_lib/_ui/dateFormatting');
var dateFormatting = dateFormattingFactory({});
var expect = require('chai').expect;

var methods = ['niceDate', 'niceDateFuzzy', 'getDateSuffix', 'niceWeek', 'toLocal', 'toLongDayString', 'toShortTimeString', 'toShortDateString'];

var momentsAgoText = 'A few moments ago';

var msInS = 1000,
    sInM = 60,
    mInH = 60,
    hInD = 24,
    dInW = 7,
    msInM = msInS * sInM,
    msInH = msInM * mInH,
    msInD = msInH * hInD;

var datesNonLocal = [new Date('Mon, 25 Dec 1995 13:30:00 +0430'), new Date('9 Sep 2018 06:30:00 -0700'), new Date(Date.UTC(2015, 11, 1, 0, 0, 0)), new Date(Date.UTC('2016', '01', '13', '08'))],
    datesLocal = [new Date('Mon, 25 Dec 1995 09:00:00'), new Date('Sun Sep 09 2018 14:30:00'), new Date(2015, 11, 1, 0, 0, 0), new Date('2016', '01', '13', '08')],
    shortDates = ['25/12/1995', '9/9/2018', '1/12/2015', '13/2/2016'],
    shortTimes = ['9:00 AM', '2:30 PM', '12:00 AM', '8:00 AM'],
    expectedLongDaysOfWeek = ['Monday', 'Sunday', 'Tuesday', 'Saturday'];

var testDates = [1, 2, 3, 21, 22, 23, 31, 4, 7, 20],
    suffixTestDates = testDates.map(function(day) {
        return new Date(2016, 0, day);
    }),
    expectedSuffixes = ['st', 'nd', 'rd', 'st', 'nd', 'rd', 'st', 'th', 'th', 'th'];




var niceDateTests = {
    seconds: ['should format dates less than a minute ago as "' + momentsAgoText + '"', function(now) {
        return {
            test: [58, 50, 10, 1, 0.1],
            expected: [momentsAgoText, momentsAgoText, momentsAgoText, momentsAgoText, momentsAgoText]
        };
    }, msInS],
    minutes: ['should format dates less than an hour ago as "[minutes] minute(s) ago"', function(now) {
        return {
            test: [59, 50, 10, 1, 0.1],
            expected: ['59 minutes ago', '50 minutes ago', '10 minutes ago', '1 minute ago', momentsAgoText]
        };
    }, msInM],
    hours: ['should format dates less than a day ago and still today\'s date as "[hours] hours(s) ago"', function(now) {

        var currentHour = now.getHours(),
            testVals = [],
            expectedVals = [];

        while (currentHour--) {
            testVals.push(currentHour);
            if (currentHour === 0) {
                expectedVals.push(momentsAgoText);
            } else {
                expectedVals.push(currentHour + ' hour' + (currentHour === 1 ? '' : 's') + ' ago');
            }
        }

        testVals.push(0.1);
        expectedVals.push('6 minutes ago');

        return {
            test: testVals,
            expected: expectedVals
        };
    }, msInH],
    yesterday: ['should format dates less than a day ago but not today\'s date as "Yesterday at [shorttime]"', function(now) {
        var currentHour = now.getHours(),
            yestHr = new Date(now.getTime()),
            testVals = [],
            expectedVals = [];

        for (var i = currentHour + 1; i < hInD; i++) {
            testVals.push(i);
            yestHr.setHours(currentHour - i);
            expectedVals.push('Yesterday at ' + dateFormatting.toShortTimeString(yestHr));
        }

        return {
            test: testVals,
            expected: expectedVals
        };
    }, msInH],
    days: ['should format dates under a week ago as "[dayofweek] at [shorttime]"', function(now) {
        var boundary = 6,
            tempDate = new Date(now.getTime()),
            testVals = [],
            expectedVals = [];

        for (var i = boundary; i >= 0; i--) {
            testVals.push(i);
            tempDate = new Date(now.getTime() - (i*msInD));

            if (i === 0) {
                expectedVals.push(momentsAgoText);
            } else {
                expectedVals.push(dateFormatting.toLongDayString(tempDate) + ' at ' + dateFormatting.toShortTimeString(tempDate));
            }
        }

        return {
            test: testVals,
            expected: expectedVals
        };
    }, msInD],
    dates: ['should format dates otherwise as "[shortdate] at [shorttime]"', function(now) {
        var start = 5,
            boundary = 6,
            end = 12,
            tempDate = new Date(now.getTime()),
            testVals = [],
            expectedVals = [];

        for (var i = start; i <= end; i++) {
            testVals.push(i);
            tempDate = new Date(now.getTime() - (i*msInD));

            if (i <= boundary) {
                expectedVals.push(dateFormatting.toLongDayString(tempDate) + ' at ' + dateFormatting.toShortTimeString(tempDate));
            } else if (i === 0) {
                expectedVals.push(momentsAgoText);
            } else {
                expectedVals.push(dateFormatting.toShortDateString(tempDate) + ' at ' + dateFormatting.toShortTimeString(tempDate));
            }
        }

        return {
            test: testVals,
            expected: expectedVals
        };
    }, msInD]
};

var niceDateFuzzyTests = {
    nextWeek: ['should format date exactly one week in the future as "Next [dayofweek]"', function(now) {
        var day = dateFormatting.toLongDayString(now);
        return {
            test: [-7],
            expected: ['Next ' + day]
        };
    }],
    nextWeekContextUnknown: ['should format date exactly one week in the future with unknown context as "Next [dayofweek] [date][suffix]"', function(now) {
        var offset = -dInW,
            tempDate = new Date(now.getTime()),
            currentDate = now.getDate();

        tempDate.setDate(currentDate - (offset));

        var day = dateFormatting.toLongDayString(tempDate),
            date = tempDate.getDate(),
            suffix = dateFormatting.getDateSuffix(tempDate);

        return {
            test: [offset],
            expected: ['Next ' + day + ' ' + date + suffix]
        };
    }, true],
    lastWeek: ['should format date exactly one week in the past as "Last [dayofweek]"', function(now) {
        var day = dateFormatting.toLongDayString(now);
        return {
            test: [7],
            expected: ['Last ' + day]
        };
    }],
    lastWeekContextUnknown: ['should format date exactly one week in the future with unknown context as "Next [dayofweek] [date][suffix]"', function(now) {
        var offset = dInW,
            tempDate = new Date(now.getTime()),
            currentDate = now.getDate();

        tempDate.setDate(currentDate - offset);

        var day = dateFormatting.toLongDayString(tempDate),
            date = tempDate.getDate(),
            suffix = dateFormatting.getDateSuffix(tempDate);

        return {
            test: [offset],
            expected: ['Last ' + day + ' ' + date + suffix]
        };
    }, true],
    tomorrow: ['should format date one day in the future as "Tomorrow"', function(now) {
        return {
            test: [-1],
            expected: ['Tomorrow']
        };
    }],
    yesterday: ['should format dates less than a day ago but not today\'s date as "Yesterday at [shorttime]"', function(now) {
        return {
            test: [1],
            expected: ['Yesterday']
        };
    }],
    today: ['should format today\'s date as "Today"', function(now) {
        return {
            test: [0],
            expected: ['Today']
        };
    }],
    withinWeek: ['should format date within one week plus or minus as "[dayofweek]"', function(now) {
        var offsets = [-8, -7, -6, -4, 4, 6, 7, 8],
            expectedVals = offsets.map(getFuzzyDateMethod(now));

        return {
            test: offsets,
            expected: expectedVals
        };
    }],
    withinWeekContextUnknown: ['should format date within one week plus or minus with unknown context as "[dayofweek] [date][suffix]"', function(now) {
        var offsets = [-8, -7, -6, -4, 4, 6, 7, 8],
            expectedVals = offsets.map(getFuzzyDateMethod(now, true));

        return {
            test: offsets,
            expected: expectedVals
        };
    }, true],
    otherwise: ['should format date otherwise as "[shortdate]"', function(now) {
        var offsets = [-10, -8, -7, -6, 6, 7, 8, 11],
            expectedVals = offsets.map(getFuzzyDateMethod(now));

        return {
            test: offsets,
            expected: expectedVals
        };
    }]
};


function getOffsetsFromWeekStart(now, offsets, weekStartDay) {
    var dayOfWeek = now.getDay(),
        diff;

    if (weekStartDay < dayOfWeek) {
        diff = dayOfWeek - weekStartDay;
    } else if (weekStartDay > dayOfWeek) {
        diff = dayOfWeek + (dInW - weekStartDay);
    } else {
        diff = 0;
    }

    return offsets.map(function(offset) {
        return offset + diff;
    });
}

function getNWeeksAgo(weekStartDay) {
    return function(now) {

        var offsets = [28, 22, 21, 14, 13, 7];

        return {
            test: getOffsetsFromWeekStart(now, offsets, weekStartDay),
            expected: ['4 Weeks Ago', '4 Weeks Ago', '3 Weeks Ago', '2 Weeks Ago', '2 Weeks Ago', 'Last Week']
        };
    };
}


function getLastWeek(weekStartDay) {
    return function(now) {

        var offsets = [7, 5, 3, 1];

        return {
            test: getOffsetsFromWeekStart(now, offsets, weekStartDay),
            expected: ['Last Week', 'Last Week', 'Last Week', 'Last Week'] //['3 Weeks Ago', '2 Weeks Ago', 'Last Week', 'Last Week', 'Last Week']
        };
    };
}

function getThisWeek(weekStartDay) {
    return function(now) {

        var offsets = [0, -1, -3, -5, -6];

        return {
            test: getOffsetsFromWeekStart(now, offsets, weekStartDay),
            expected: ['This Week', 'This Week', 'This Week', 'This Week', 'This Week']
        };
    };
}

function getNWeeksTime(weekStartDay) {
    return function(now) {

        var offsets = [-21, -14, -10];

        return {
            test: getOffsetsFromWeekStart(now, offsets, weekStartDay),
            expected: ['3 Weeks\' Time', '2 Weeks\' Time', 'Next Week']
        };
    };
}

function getNextWeek(weekStartDay) {
    return function(now) {

        var offsets = [-6, -8, -11, -13, -14];

        return {
            test: getOffsetsFromWeekStart(now, offsets, weekStartDay),
            expected: ['This Week', 'Next Week', 'Next Week', 'Next Week', '2 Weeks\' Time']
        };
    };
}


var niceWeekStartDays = [0, 1, (new Date().getDay() === 6 ? 6 : new Date().getDay() + 1)];
var niceWeek = niceWeekStartDays.reduce(function(result, day) {
    result[day] = {
        nWeeksAgo: ['should format dates over one week ago as "[numweeks] Weeks Ago"', getNWeeksAgo(day)],
        lastWeek: ['should format dates one week ago as "Last Week"', getLastWeek(day)],
        thisWeek: ['should format occurring in this week as "This Week"', getThisWeek(day)],
        nWeeksTime: ['should format dates occurring more than one week in the future as "[n] Weeks Time"', getNWeeksTime(day)],
        nextWeek: ['should format dates occurring next week as "Next Week"', getNextWeek(day)]
    };
    return result;
}, {});


function getFuzzyDateMethod(now, contextUnknown) {
    return function getFuzzyDateExpecteds(offset) {
        var tempDate = new Date(now.getTime()),
            currentDate = now.getDate(),
            expected, day, date, suffix;

        tempDate.setDate(currentDate - offset);
        day = dateFormatting.toLongDayString(tempDate);
        date = tempDate.getDate();
        suffix = dateFormatting.getDateSuffix(tempDate);

        if (offset === -1) {
            expected = 'Tomorrow';
        } else if (offset === 1) {
            expected = 'Yesterday';
        } else if (offset === -dInW) {
            expected = contextUnknown ? 'Next ' + day + ' ' + date + suffix : 'Next ' + day;
        } else if (offset === dInW) {
            expected = contextUnknown ? 'Last ' + day + ' ' + date + suffix : 'Last ' + day;
        } else if (offset > dInW || offset < -dInW) {
            expected = dateFormatting.toShortDateString(tempDate);
        } else {
            expected = contextUnknown ? dateFormatting.toLongDayString(tempDate) + ' ' + date + suffix : dateFormatting.toLongDayString(tempDate);
        }

        return expected;
    };
}


function getTests(source, conversion, testMethod, contextUnknown) {
    return function() {
        var today = new Date(),
            todayTime = today.getTime(),
            testDates = source(today),
            testList = testDates.test.map(function(date) {
                return new Date(todayTime - (date * conversion));
            });

        testList.forEach(function(date, index) {
            it(today + ' - ' + date + ' = ' + testDates.expected[index], function() {
                var result;
                if (dateFormatting[testMethod].length == 2) {
                    result = dateFormatting[testMethod](date, contextUnknown);
                } else {
                    result = dateFormatting[testMethod](date);
                }
                expect(result.toString()).to.equal(testDates.expected[index]);
            });
        });
    };
}

describe('dateFormatting', function() {

    it('should have expected methods ' + methods.join(', '), function() {
        methods.forEach(function(method) {
            expect(dateFormatting[method]).to.exist;
        });
    });

    describe('toLocal', function() {
        datesNonLocal.forEach(function(date, index) {
            it(date + ' = ' + datesLocal[index].toString(), function() {
                expect(dateFormatting.toLocal(date).toString()).to.equal(datesLocal[index].toString());
            });
        });
    });

    describe('toShortDateString', function() {
        datesLocal.forEach(function(date, index) {
            it(date + ' = ' + shortDates[index], function() {
                expect(dateFormatting.toShortDateString(date).toString()).to.equal(shortDates[index]);
            });
        });
    });

    describe('toShortTimeString', function() {
        datesLocal.forEach(function(date, index) {
            it(date + ' = ' + shortTimes[index], function() {
                expect(dateFormatting.toShortTimeString(date).toString()).to.equal(shortTimes[index]);
            });
        });
    });

    describe('toLongDayString', function() {
        datesLocal.forEach(function(date, index) {
            it(date + ' = ' + expectedLongDaysOfWeek[index], function() {
                expect(dateFormatting.toLongDayString(date).toString()).to.equal(expectedLongDaysOfWeek[index]);
            });
        });
    });

    describe('getDateSuffix', function() {
        suffixTestDates.forEach(function(date, index) {
            it(date + ' = ' + expectedSuffixes[index], function() {
                expect(dateFormatting.getDateSuffix(date).toString()).to.equal(expectedSuffixes[index]);
            });
        });
    });





    describe('niceDate', function() {

        _.forEach(niceDateTests, function(test) {
            describe(test[0],
                getTests(test[1], test[2], 'niceDate'));
        });
    });

    describe('niceDateFuzzy', function() {

        _.forEach(niceDateFuzzyTests, function(test) {
            describe(test[0],
                getTests(test[1], msInD, 'niceDateFuzzy', test[2]));
        });

    });


    describe('niceWeek', function() {

        _.forEach(niceWeek, function(testGroup, weekStartDay) {

            describe('From start of week with specified weekStartDay = [' + weekStartDay + ']', function() {
                var oldDateFormatting;

                before(function() {
                    oldDateFormatting = dateFormatting;
                    dateFormatting = dateFormattingFactory({ weekStartDay: weekStartDay });
                });

                after(function() {
                    dateFormatting = oldDateFormatting;
                });

                _.forEach(testGroup, function(test) {
                    describe(test[0],
                        getTests(test[1], msInD, 'niceWeek'));
                });

            });

        });

    });

});
