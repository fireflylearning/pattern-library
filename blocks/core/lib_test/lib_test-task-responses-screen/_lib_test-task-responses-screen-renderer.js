'use strict';

var React = require('react');

var ScrollableList = require('../../ff_container/ff_container-scrollable-list/ff_container-scrollable-list'),
    ResponseRecipientList = require('../../ff_module/ff_module-response-recipient-list/ff_module-response-recipient-list'),
    IncrementalNavigation = require('../../ff_module/ff_module-incremental-navigation/ff_module-incremental-navigation'),
   ContainerOverlay = require('../../ff_container/ff_container-overlay/ff_container-overlay'),
    TaskResponses = require('../../ff_module/ff_module-task-responses/ff_module-task-responses');

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
    latestEvent: {
        type: eventTypes.confirmTaskIsComplete,
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
        console.log("onSelect is0");
    },
    guid: "u42a",
    label: "Tally Student",
    latestEvent: {
        type: eventTypes.markAndGrade,
        sent: new Date('4 March 2016')
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
        type: eventTypes.markAndGrade,
        sent: new Date('1 March 2016')
    },
    pic_href: "/images/default_picture.png"
}, {
    onSelect: function() {
        console.log("onSelect id1");
    },
    guid: "u43a",
    label: "Terry Teacher",
    latestEvent: {
        type: eventTypes.stampResponseAsSeen,
        sent: new Date('27 February 2016')
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
    guid: "u43b",
    label: "Terry Teacher",
    latestEvent: {
        type: eventTypes.confirmTaskIsComplete,
        sent: new Date()
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


var overlayInner = React.createElement(TaskResponses, {events: events,
    editingEvent: events[1],
    editEvent: function(event) {
        console.log('editEvent');
        console.table(event);
    },
    addEvent: function() {
        console.log('addEvent');
        console.log('stopEditingEvent');
    },
    stopEditingEvent: function() {
        console.log('stopEditingEvent');
    }} ),
    overlayOuter = React.createElement(ContainerOverlay, { modifier: 'absolute-bottom', classes: 'ff_container-overlay--task-event-scrollable', body: overlayInner, bar: recipientNavigation }),
    sidebar = React.createElement(ResponseRecipientList, { responses: recipientData, onSelect: function(){
        console.log('select recipient');
    } });


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-lib_test-task-responses-screen]'); //Use jquery or sim in Firefly for backwards compat
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
