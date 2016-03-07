'use strict';

var React = require('react');

var TaskEventEditor = require('./ff_module-task-event-editor');

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-event-editor]'), function(domElement, index) {

            var element = React.createElement(TaskEventEditor);
            React.render(element, domElement);
        });
    });
};
