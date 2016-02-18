'use strict';
var React = require('react');

var TaskEvent = require('./ff_module-task-event');
var event = { type: 'added-comment', sent: 'Mon 7 Dec, 18:45', author: { name: 'Sally Student' }, comment: '“Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!”' };

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
