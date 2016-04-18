'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

let Progress = require('../../ff_module/ff_module-progress/ff_module-progress.js'),
    selector = 'data-ff_module-progress';

var data = {
    id0: {
        id: 1,
        classes: "ff_module-other-module-class ff_utils-other-class",
        sentTo: 23,
        numExcused: 2,
        completedBy: 20,
        marked: 3
    },
    id1: {
        id: 2,
        sentTo: 23,
        numExcused: 2,
        completedBy: 20,
        marked: 0
    },
    id2: {
        id: 3,
        sentTo: 23,
        numExcused: 2,
        completedBy: 0,
        marked: 0
    },
    id3: {
        id: 4,
        sentTo: 0,
        numExcused: 0,
        completedBy: 0,
        marked: 0
    },
    id4: {
        id: 5,
        sentTo: 10096,
        numExcused: 2,
        completedBy: 875,
        marked: 100
    },
    id5: {
        id: 6,
        sentTo: 10096,
        numExcused: 2,
        completedBy: 875,
        marked: 30
    },
    id6: {
        id: 7,
        sentTo: 100,
        numExcused: 0,
        completedBy: 100,
        marked: 50
    },
    id7: {
        id: 8,
        sentTo: 100,
        numExcused: 0,
        completedBy: 100,
        marked: 100
    }
}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
            var id = domElement.getAttribute(selector);
            var element = React.createElement(Progress, data[id]);
            ReactDOM.render(element, domElement);
        });
    });
};
