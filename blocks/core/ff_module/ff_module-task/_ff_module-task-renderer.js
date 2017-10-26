'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var Task = require('./ff_module-task.js'),
    selector = 'data-ff-crate-block-react-item';

function createHeading(domElement) {
    let title = document.createTextNode('React Component'),
        heading = document.createElement('h1');
    heading.appendChild(title);
    domElement.insertBefore(heading, domElement.childNodes[0])
}

function getCount(data) {
    let count = 0;
    data.items.forEach((item) => {
        if (!item.latest_read) count++;
    })
    return count;
}

var data = {
    items: [
        {"latest_read": true},
        {"latest_read": false},
        {"latest_read": true},
        {"latest_read": true},
        {"latest_read": false},
        {"latest_read": true},
        {"latest_read": false},
        {"latest_read": true}
    ]
}

var props = {
    from: 'Terry Teacher',
    to: 'Sally Student',
    duedate: "27/08/2018",
    fuzzydate: "Tomorrow",
    message: 'A big message from Terry Teacher',
    linkHref: '#',
    hasCheckbox: true,
    progress: {
        classes: "ff_module-other-module-class ff_utils-other-class",
        sentTo: 23,
        numExcused: 2,
        completedBy: 20,
        marked: 3
    },
    input: {
        id: 'input-id',
        value: 'Form input',
        name: 'input-name',
        type: 'checkbox'
    },
    indicator: {
        count: getCount(data),
        title: 'You have ' + getCount(data) + ' unread responses' 
    }
}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
            if (domElement) {
                ReactDOM.render(React.createElement(Task, props), domElement);
                createHeading(domElement);
            }
        });
    });
};
