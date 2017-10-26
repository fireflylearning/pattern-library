'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');


var Task = require('./ff_module-task-mark.js'),
    selector = 'data-ff_module-task-mark';

var props = {
    to: 'Sally Student',
    assignment: 'A big message from Terry Teacher',
    postbackHref: '#',
    markGrade: {
        mark: 5, 
        markMax: 10, 
        grade: 'D'        
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
