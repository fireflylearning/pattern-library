'use strict';
var React = require('react'),
    ReactDOM = require('react');

var TaskEventRepeater = require('./ff_module-task-event-repeater');
var eventTypes = require('../ff_module-task-event/_src/events').types;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

var events = [{
    type: eventTypes.setTask,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    sent: new Date(dStrings[2]),
    author: { name: 'Sally Student' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!'
}].map(function(description, index) {
    return {
        description: description,
        localEventId: 'evnt-'+index,
        actions: [{
            key: 'edit',
            text: 'Edit',
            onClick: function() { console.log('edit'); }
        }, {
            key: 'delete',
            text: 'Delete',
            onClick: function() { console.log('delete'); }
        }],
        state: { released: true }
    };
});

var eventGroups = [[events[1], events[0]],[events[2]],[events[0], events[1], events[2]]];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(e) {
        var el = document.querySelector('[data-ff_module-task-event-repeater]');
        if (el) {
            var repeater = React.createElement(TaskEventRepeater, { eventGroups: eventGroups });
            ReactDOM.render(repeater, el);
        }
    });
};
