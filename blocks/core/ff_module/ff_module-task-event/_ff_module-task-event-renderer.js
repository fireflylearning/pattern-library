'use strict';
var React = require('react');

var TaskEvent = require('./ff_module-task-event');
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

var events = [{
    type: 'set-task',
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: 'stamp-response-as-seen',
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: 'comment',
    sent: new Date(dStrings[2]),
    author: { name: 'Sally Student' },
    comment: '“Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!”'
}];
module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-event]'), function(domElement, index) {
            var id = domElement.getAttribute('data-ff_module-task-event');

            var element = React.createElement(TaskEvent, {
                event:events[index]
            });
            React.render(element, domElement);
        });
    });
};
