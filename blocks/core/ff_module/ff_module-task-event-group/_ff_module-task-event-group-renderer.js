'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskEventGroup = require('./ff_module-task-event-group');
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];
var eventTypes = require('../ff_module-task-event/_src/events').types;

var groups = [
    [{
        localEventId: 'event-01',
        description: {
            type: eventTypes.setTask,
            sent: new Date(dStrings[2]),
            author: { name: 'Terry Teacher' },
            message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!',
            taskTitle: 'Task Title'
        },
        actions: [{
            key: 'edit',
            text: 'Edit',
            onClick: function() { console.log('edit'); }
        }, {
            key: 'delete',
            text: 'Delete',
            onClick: function() { console.log('delete'); }
        }],
        state: {
            // deleted: true
        }

    }, {
        localEventId: 'event-02',
        description: {
            type: eventTypes.sendReminder,
            sent: new Date(dStrings[2]),
            author: { name: 'Terry Teacher' }
        },
        actions: [],
        state: {
            released: true
        }

    }],
    [{
        localEventId: 'event-03',
        description: {
            type: eventTypes.markAndGrade,
            sent: new Date(dStrings[2]),
            author: { name: 'Terry Teacher' },
            message: 'Needs improvement',
            mark: 4,
            markMax: 10,
            grade: 'C'
        },
        actions: [{
            key: 'edit',
            text: 'Edit',
            onClick: function() { console.log('edit'); }
        }, {
            key: 'delete',
            text: 'Delete',
            onClick: function() { console.log('delete'); }
        }],
        state: {
            released: true
        }

    }],
    [{
        localEventId: 'event-04',
        description: {
            type: eventTypes.comment,
            sent: new Date(dStrings[2]),
            author: { name: 'Terry Teacher' },
            message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!',
        },
        actions: [{
            key: 'edit',
            text: 'Edit',
            onClick: function() { console.log('edit'); }
        }, {
            key: 'delete',
            text: 'Delete',
            onClick: function() { console.log('delete'); }
        }],
        state: {
            deleted: true
        }

    }],
    [{
        localEventId: 'event-05',
        description: {
            type: eventTypes.setTask,
            sent: new Date(dStrings[2]),
            author: { name: 'Terry Teacher' },
            message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!',
            taskTitle: 'Task Title'
        },
        actions: [{
            key: 'edit',
            text: 'Edit',
            onClick: function() { console.log('edit'); }
        }, {
            key: 'delete',
            text: 'Delete',
            onClick: function() { console.log('delete'); }
        }],
        state: {
            pending: true
        }

    }, {
        localEventId: 'event-06',
        description: {
            type: eventTypes.sendReminder,
            sent: new Date(dStrings[2]),
            author: { name: 'Terry Teacher' }
        },
        actions: [],
        state: {
            released: true
        }

    }, {
        localEventId: 'event-07',
        description: {
            type: eventTypes.comment,
            sent: new Date(dStrings[2]),
            author: { name: 'Terry Teacher' },
            message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!',
        },
        actions: [{
            key: 'edit',
            text: 'Edit',
            onClick: function() { console.log('edit'); }
        }, {
            key: 'delete',
            text: 'Delete',
            onClick: function() { console.log('delete'); }
        }],
        state: {
            released: true
        }

    }]
];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {

        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-event-group]'), function(domElement) {
            var root = React.createElement('ul', { style: { listStyle: 'none', margin: 0, padding: 0 } }, groups.map(function(events, index) {
                return React.createElement('li', { style: { listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' } },
                    React.createElement(TaskEventGroup, {
                        key: 'el' + (index),
                        events: events
                    }));
            }));
            ReactDOM.render(root, domElement);
        });
    });
};
