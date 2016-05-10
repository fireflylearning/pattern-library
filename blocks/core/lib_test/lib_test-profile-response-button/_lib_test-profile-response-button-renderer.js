'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ProfileResponseButton = require('../../ff_module/ff_module-profile-response-button/ff_module-profile-response-button'),
    selector = 'data-ff_module-profile-response-button-lib',
    eventTypes = require('../../ff_module/ff_module-task-event/_src/events').types;

var data = {
    id0: {
        onSelect: function() {
            console.log("onSelect is0");
        },
        guid: "u42",
        label: "Sally Student",
        event: {
            description: {
                type: eventTypes.markAndGrade,
                sent: new Date()
            }
        },
        markAndGrade: {
            mark: 7,
            markMax: 10,
            grade: "A"
        },
        pic_href: "/images/default_picture.png"
    },
    id1: {
        onSelect: function() {
            console.log("onSelect id1");
        },
        isSelected: true,
        guid: "u43",
        label: "Terry Teacher",
        event: {
            description: {
                type: eventTypes.requestResubmission,
                sent: new Date()
            }
        },
        markAndGrade: {
            grade: "A"
        },
        pic_href: "/images/default_picture.png"
    },
    id2: {
        onSelect: function() {
            console.log("onSelect id2");
        },
        isRead: true,
        guid: "u44",
        label: "Joseph Goulden",
        event: {
            description: {
                type: eventTypes.confirmTaskIsComplete,
                sent: new Date()
            }
        },
        markAndGrade: {
            mark: 7,
            markMax: 10
        },
        pic_href: "/images/default_picture.png"
    }
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
            var id = domElement.getAttribute(selector);
            var element = React.createElement(ProfileResponseButton, data[id]);
            ReactDOM.render(element, domElement);
        });
    });
};
