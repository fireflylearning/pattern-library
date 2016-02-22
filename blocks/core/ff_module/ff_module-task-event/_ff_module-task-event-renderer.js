'use strict';
var React = require('react');

var TaskEvent = require('./ff_module-task-event');

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
