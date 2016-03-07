'use strict';
var React = require('react');

var ResponseRecipientList = require('./ff_module-response-recipient-list'),
    eventTypes = require('../ff_module-task-event/_src/events').types;

var responses = [{
    onSelect: function() {
        console.log("onSelect is0");
    },
    guid: "u47",
    label: "Sally Student",
    latestEvent: {
        type: eventTypes.markAndGrade,
        sent: new Date()
    },
    markAndGrade: {
        mark: 7,
        markMax: 10,
        grade: "A"
    },
    pic_href: "/images/default_picture.png"
}, {
    onSelect: function() {
        console.log("onSelect id1");
    },
    isSelected: true,
    guid: "u43",
    label: "Terry Teacher",
    latestEvent: {
        type: eventTypes.requestResubmission,
        sent: new Date()
    },
    markAndGrade: {
        grade: "A"
    },
    pic_href: "/images/default_picture.png"
}, {
    onSelect: function() {
        console.log("onSelect id2");
    },
    isRead: true,
    guid: "u44",
    label: "Joseph Goulden",
    latestEvent: {
        type: eventTypes.confirmTaskIsComplete,
        sent: new Date()
    },
    pic_href: "/images/default_picture.png"
}];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-response-recipient-list]'), function(domElement) {
            var element = React.createElement(ResponseRecipientList, {
                responses: responses
            });
            React.render(element, domElement);
        });
    });
};
