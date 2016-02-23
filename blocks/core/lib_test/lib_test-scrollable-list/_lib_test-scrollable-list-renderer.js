'use strict';
var React = require('react');
var _ = require('lodash');

var ScrollableList = require('../../ff_container/ff_container-scrollable-list/ff_container-scrollable-list');
var TaskEventRepeater = require('../../ff_module/ff_module-task-event-repeater/ff_module-task-event-repeater');
var ResponseRecipientList = require('../../ff_module/ff_module-response-recipient-list/ff_module-response-recipient-list');
var Button = require('../../ff_module/ff_module-button/ff_module-button');
var eventTypes = require('../../ff_module/ff_module-task-event/_src/events').types;

var events = [{
    type: eventTypes.setTask,
    localEventId: 2,
    sent: '20:40',
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    localEventId: 3,
    sent: '21:47',
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    localEventId: 1,
    sent: 'Mon 7 Dec, 18:45',
    author: { name: 'Sally Student' },
    comment: '“Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!”'
}];

var recipientData = [{
    onSelect: function() {
        console.log("onSelect is0");
    },
    guid: "u42",
    label: "Sally Student",
    status: "Marked",
    mark: "B, 76%",
    pic_href: "/images/default_picture.png"
}, {
    onSelect: function() {
        console.log("onSelect is0");
    },
    guid: "u42a",
    label: "Tally Student",
    status: "Marked",
    mark: "B, 76%",
    pic_href: "/images/default_picture.png"
}, {
    onSelect: function() {
        console.log("onSelect id1");
    },
    isSelected: true,
    guid: "u43",
    label: "Terry Teacher",
    status: "Resubmission Requested",
    pic_href: "/images/default_picture.png"
}, {
    onSelect: function() {
        console.log("onSelect id1");
    },
    guid: "u43a",
    label: "Terry Teacher",
    status: "Resubmission Requested",
    pic_href: "/images/default_picture.png"
}, {
    onSelect: function() {
        console.log("onSelect id1");
    },
    guid: "u43b",
    label: "Terry Teacher",
    status: "Resubmission Requested",
    pic_href: "/images/default_picture.png"
}, {
    onSelect: function() {
        console.log("onSelect id2");
    },
    isRead: true,
    guid: "u44",
    label: "Joseph Goulden",
    status: "Awaiting Response",
    pic_href: "/images/default_picture.png"
}];




var main = React.createElement(TaskEventRepeater, { events: events });
var sidebar = React.createElement(ResponseRecipientList, { responses: recipientData });

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-lib_test-scrollable-list]'); //Use jquery or sim in Firefly for backwards compat
        if (el) {
            var element = React.createElement(ScrollableList, {
                main: main,
                sidebar: sidebar
            });
            React.render(element, el);
        }
    });
};
