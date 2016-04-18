'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskResponses = require('./ff_module-task-responses');
var eventTypes = require('../ff_module-task-event/_src/events').types;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

var events = [{
    type: eventTypes.stampResponseAsSeen,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    message: 'Message to the student',
    canDelete: true,
    canEdit: false
}, {
    type: eventTypes.comment,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    comment: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!',
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!',
    canDelete: true,
    canEdit: true
}, {
    type: eventTypes.requestResubmission,
    sent: new Date(dStrings[0]),
    error: true,
    author: { name: 'Terry Teacher' },
    canDelete: true,
    canEdit: false
}, {
    type: eventTypes.confirmTaskIsComplete,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    canDelete: true,
    canEdit: false
}, {
    type: eventTypes.confirmStudentIsExcused,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    canDelete: false,
    canEdit: false
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    mark: 7,
    markMax: 10,
    grade: 'B',
    canDelete: true,
    canEdit: true
}].map(function(event, index) { event.localEventId = 'event' + index;
    return event; });

var props = [{
    events: events,
    editingEvent: events[0],

    editEvent: function(event) {
        console.log('editEvent');
        console.log(event);
    },
    addEvent: function() {
        console.log('addEvent');
        console.log('stopEditingEvent');
    },
    stopEditingEvent: function() {
        console.log('stopEditingEvent');
    }
}, {
    events: events,

    editEvent: function(event) {
        console.log('editEvent');
        console.log(event);
    },
    addEvent: function() {
        console.log('addEvent');
        console.log('stopEditingEvent');
    },
    stopEditingEvent: function() {
        console.log('stopEditingEvent');
    }
}];


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-responses]'), function(domElement, index) {
            var element = React.createElement(TaskResponses, props[0]);
            ReactDOM.render(element, domElement);
        });
    });
};
