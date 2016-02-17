'use strict';
var React = require('react');

var TaskEvent = require('./ff_module-task-event');
var event = { type: 'set-task', sent: '20:40', author: { name: 'Sally Student' }, taskTitle: 'Write an Essay' };

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-event]'), function(domElement) {
            var element = React.createElement(TaskEvent, {
                event:event
            });
            React.render(element, domElement);
        });
    });
};
