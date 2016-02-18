'use strict';
var React = require('react');

var TaskEventRepeater = require('./ff_module-task-event-repeater');
var events = [
    { type: 'set-task', sent: '20:40', author: { name: 'Sally Student' }, taskTitle: 'Write an Essay' }, {
        type: 'stamp-response-as-seen',
        sent: '21:47',
        author: { name: 'Terry Teacher' }
    }
];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_module-task-event-repeater]'); //Use jquery or sim in Firefly for backwards compat
        if (el) {
            var repeater = React.createElement(TaskEventRepeater, {events: events });
            React.render(repeater, el);
        }
    });
};
