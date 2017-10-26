'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

import TaskTodo from './ff_module-task-todo';
var selector = 'data-ff-crate-block-react-item';

function createHeading(domElement) {
    let title = document.createTextNode('React Component'),
        heading = document.createElement('h1');
    heading.appendChild(title);
    domElement.insertBefore(heading, domElement.childNodes[0])
}

var props = {
	modifier: '',
	id: "100",
	message: "Read pages 45-58 of your history coursework books, we'll discuss in class.",
	link_href: "#",
	from: "Terrance Teacher",
	to: "Class 8y/En1",
	fuzzy_date: "Tomorrow",
	duedate: "27/08/2018"
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
            if (domElement) {
                ReactDOM.render(React.createElement(TaskTodo, props), domElement);
                createHeading(domElement);
            }
        });
    });
};