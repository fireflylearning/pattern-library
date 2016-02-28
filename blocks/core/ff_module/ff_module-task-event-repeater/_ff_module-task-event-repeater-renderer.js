'use strict';
var React = require('react');

var TaskEventRepeater = require('./ff_module-task-event-repeater');
var eventTypes = require('../ff_module-task-event/_src/events').types;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

var events = [{
    type: eventTypes.setTask,
    localEventId: 1,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    localEventId: 2,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    localEventId: 3,
    sent: new Date(dStrings[2]),
    author: { name: 'Sally Student' },
    comment: '“Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!”'
}];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_module-task-event-repeater]'); //Use jquery or sim in Firefly for backwards compat
        if (el) {
            var repeater = React.createElement(TaskEventRepeater, { events: events });
            React.render(repeater, el);
        }
    });
};
