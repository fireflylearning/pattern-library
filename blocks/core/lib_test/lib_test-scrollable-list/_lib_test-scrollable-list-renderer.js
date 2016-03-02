'use strict';

var React = require('react'),
    _ = require('lodash');

var ScrollableList = require('../../ff_container/ff_container-scrollable-list/ff_container-scrollable-list'),
    TaskEventRepeater = require('../../ff_module/ff_module-task-event-repeater/ff_module-task-event-repeater'),
    ResponseRecipientList = require('../../ff_module/ff_module-response-recipient-list/ff_module-response-recipient-list'),
    Button = require('../../ff_module/ff_module-button/ff_module-button'),
    DropdownButton = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component'),
    IncrementalNavigation = require('../../ff_module/ff_module-incremental-navigation/ff_module-incremental-navigation'),
    TaskResponseActions = require('../../ff_module/ff_module-task-response-actions/ff_module-task-response-actions'),
    ContainerControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar'),
    ContainerOverlay = require('../../ff_container/ff_container-overlay/ff_container-overlay');

var eventTypes = require('../../ff_module/ff_module-task-event/_src/events').types,
    activateDropdowns = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button');

var events = [{
    type: eventTypes.setTask,
    localEventId: '2',
    pending: true,
    sent: '20:40',
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    localEventId: '3',
    sent: '21:47',
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    localEventId: '1',
    sent: 'Mon 7 Dec, 18:45',
    author: { name: 'Sally Student' },
    comment: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!'
}, {
    type: eventTypes.setTask,
    localEventId: '2a',
    sent: '20:40',
    error: true,
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    localEventId: '3a',
    sent: '21:47',
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    localEventId: '1a',
    sent: 'Mon 7 Dec, 18:45',
    author: { name: 'Sally Student' },
    comment: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!'
}, {
    type: eventTypes.setTask,
    localEventId: '2b',
    sent: '20:40',
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    localEventId: '3b',
    sent: '21:47',
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    localEventId: '1b',
    sent: 'Mon 7 Dec, 18:45',
    author: { name: 'Sally Student' },
    comment: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!'
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



var taskResponseActions = React.createElement(TaskResponseActions, {
    onClick: function onEventChange(event) {
        console.log('this.props.editEvent:', event);
    },
    key: 'controlBarUpper'
});



var recipientNavigation = React.createElement(IncrementalNavigation, {
    nextText: 'Next Student',
    previousText: 'Previous Student',
    isFirst: true,
    onNext: function() {
        console.log('Click Next Student');
    },
    onPrevious: function() {
        console.log('Click Previous Student');
    }
});


var taskEventRepeater = React.createElement(TaskEventRepeater, { key: 'evnt1', events: events }),
    overlayInner = React.createElement(ContainerOverlay, { modifier: 'absolute-top', classes: 'ff_container-overlay--task-event-scrollable-top', body: taskEventRepeater, bar: taskResponseActions }),
    overlayOuter = React.createElement(ContainerOverlay, { modifier: 'absolute-bottom', classes: 'ff_container-overlay--task-event-scrollable', body: overlayInner, bar: recipientNavigation }),
    sidebar = React.createElement(ResponseRecipientList, { responses: recipientData });


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-lib_test-scrollable-list]'); //Use jquery or sim in Firefly for backwards compat
        if (el) {
            var element = React.createElement(ScrollableList, {
                main: overlayOuter,
                sidebar: sidebar
            });
            React.render(element, el);
        }
        activateDropdowns();
    });
};
