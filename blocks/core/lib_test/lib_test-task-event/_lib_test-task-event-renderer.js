'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskEvent = require('../../ff_module/ff_module-task-event/ff_module-task-event');
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];
var eventTypes = require('../../ff_module/ff_module-task-event/_src/events').types;

var events = [{
    type: eventTypes.setTask,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    message: 'Message to the student'
}, {
    type: eventTypes.comment,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!'
}, {
    type: eventTypes.requestResubmission,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.confirmTaskIsComplete,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.confirmStudentIsExcused,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    mark: 7,
    markMax: 10,
    grade: 'B'
}, {
    type: eventTypes.confirmStudentIsUnexcused,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
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
    }]
}, {
    type: eventTypes.deleteResponse,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' }
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
    }]
}, {
    type: eventTypes.markAndGrade,
    deleted: true,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    mark: 7,
    markMax: 10,
    grade: 'B'
}, {
    type: eventTypes.comment,
    deleted: true,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
}, {
    type: eventTypes.requestResubmission,
    sent: new Date(dStrings[0]),
    error: true,
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.setTask,
    sent: new Date(dStrings[0]),
    pending: true,
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {

        Array.prototype.forEach.call(document.querySelectorAll('[data-lib_test-task-event]'), function(domElement, index) {
            var root = React.createElement('ul', { style: { listStyle: 'none', margin: 0, padding: 0 } }, events.map(function(event) {
                return React.createElement('li', { style: { listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' } },
                    React.createElement(TaskEvent, {
                        key: 'el' + (index),
                        event: event,
                        actions: [{
                            key: 'edit',
                            text: 'Edit',
                            onClick: function() { console.log('edit'); }
                        }, {
                            key: 'delete',
                            text: 'Delete',
                            onClick: function() { console.log('delete'); }
                        }]
                    }));
            }));
            ReactDOM.render(root, domElement);
        });
    });
};
