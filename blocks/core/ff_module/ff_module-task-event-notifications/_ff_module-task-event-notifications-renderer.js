'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var TaskEventNotifications = require('./ff_module-task-event-notifications');
var eventTypes = require('../ff_module-task-event/_src/events').types;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

var events = [{
    type: eventTypes.deleteTask,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    numRecipientsAffected: 123
},{
    type: eventTypes.releaseFeedbackAndMarks,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    numRecipientsAffected: 23
},{
    type: eventTypes.sendReminder,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    numRecipientsAffected: 38
}];


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-event-notifications]'), function(domElement, index) {

            var root = React.createElement('ul', { style: { listStyle: 'none', margin: 0, padding: 0 } }, events.map(function(event) {
                return React.createElement('li', { style: { listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' } },
                    React.createElement(TaskEventNotifications, {
                        event: event,
                        onConfirm: function() {
                            console.log('confirm');
                        },
                        onClose: function() {
                            console.log('close');
                        },
                    }));
            }));
            ReactDOM.render(root, domElement);
        });
    });
};
