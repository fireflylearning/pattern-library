'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');


var Task = require('./ff_module-task.js'),
    selector = 'data-ff_module-task';

var props = {
    from: 'Terry Teacher',
    to: 'Sally Student',
    duedate: "27/08/2018",
    message: 'A big message from Terry Teacher',
    linkHref: '#',
    progress: {
        classes: "ff_module-other-module-class ff_utils-other-class",
        sentTo: 23,
        numExcused: 2, 
        completedBy: 20, 
        marked: 3
    }
}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
            if (domElement) {
                ReactDOM.render(React.createElement(Task, props), domElement);
            }
        });
    });
};