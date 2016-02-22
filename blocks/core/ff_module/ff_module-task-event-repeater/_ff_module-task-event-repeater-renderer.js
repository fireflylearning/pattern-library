'use strict';
var React = require('react');

var TaskEventRepeater = require('./ff_module-task-event-repeater');
var events = [{
    type: 'set-task',
    sent: '20:40',
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: 'stamp-response-as-seen',
    sent: '21:47',
    author: { name: 'Terry Teacher' }
}, {
    type: 'added-comment',
    sent: 'Mon 7 Dec, 18:45',
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
