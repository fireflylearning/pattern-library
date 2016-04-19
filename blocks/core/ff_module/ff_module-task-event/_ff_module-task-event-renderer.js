'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskEvent = require('./ff_module-task-event');
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];
var eventTypes = require('./_src/events').types;

var events = [{
    type: eventTypes.setTask,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay',
    canEdit: false,
    canDelete: false
}, {
    type: eventTypes.stampResponseAsSeen,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    message: 'Message to the student',
    canEdit: true,
    canDelete: true
}, {
    type: eventTypes.comment,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!',
    canEdit: true,
    canDelete: true
}, {
    type: eventTypes.requestResubmission,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    canEdit: false,
    canDelete: true
}, {
    type: eventTypes.confirmTaskIsComplete,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    canEdit: false,
    canDelete: true
}, {
    type: eventTypes.confirmStudentIsExcused,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    canEdit: false,
    canDelete: false
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    mark: 7,
    markMax: 10,
    grade: 'B',
    canEdit: true,
    canDelete: true
}, {
    type: eventTypes.confirmStudentIsUnexcused,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    canEdit: false,
    canDelete: false
}, {
    type: eventTypes.addFile,
    sent: new Date(dStrings[2]),
    author: { name: 'Sally Student' },
    files:[{
        title: 'File one',
        href:'#'
    }, {
        title: 'File two',
        type: 'page',
        href:'#'
    }],
    canEdit: true,
    canDelete: true
}, {
    type: eventTypes.deleteResponse,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    canEdit: false,
    canDelete: false
}, {
    type: eventTypes.addFile,
    sent: new Date(dStrings[2]),
    author: { name: 'Sally Student' },
    deleted: true,
    files:[{
        title: 'File one',
        href:'#'
    }, {
        title: 'File two',
        type: 'page',
        href:'#'
    }],
    canEdit: true,
    canDelete: true
}, {
    type: eventTypes.markAndGrade,
    deleted: true,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    mark: 7,
    markMax: 10,
    grade: 'B',
    canEdit: true,
    canDelete: true
}, {
    type: eventTypes.comment,
    deleted: true,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    canEdit: true,
    canDelete: true
}, {
    type: eventTypes.requestResubmission,
    sent: new Date(dStrings[0]),
    error: true,
    author: { name: 'Terry Teacher' },
    canEdit: false,
    canDelete: true
}, {
    type: eventTypes.setTask,
    sent: new Date(dStrings[0]),
    pending: true,
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay',
    canEdit: false,
    canDelete: false
}];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {

        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-event]'), function(domElement, index) {
            var root = React.createElement('ul', { style: { listStyle: 'none', margin: 0, padding: 0 } }, events.map(function(event) {
                return React.createElement('li', { style: { listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' } },
                    React.createElement(TaskEvent, {
                        key: 'el' + (index),
                        event: event
                    }));
            }));
            ReactDOM.render(root, domElement);
        });
    });
};
