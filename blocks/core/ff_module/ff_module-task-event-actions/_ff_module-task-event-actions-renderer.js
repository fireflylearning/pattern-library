'use strict';
var React = require('react');

var TaskEventActions = require('./ff_module-task-event-actions');

var props = {
    onClick: function(e){
        console.log(e);
    }
};


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-event-actions]'), function(domElement, index) {
            var element = React.createElement(TaskEventActions, props);
            React.render(element, domElement);
        });
    });
};
