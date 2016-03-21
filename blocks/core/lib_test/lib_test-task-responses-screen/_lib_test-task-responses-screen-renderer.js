'use strict';

var React = require('react');

var ScrollableList = require('../../ff_container/ff_container-scrollable-list/ff_container-scrollable-list'),
    ResponseRecipientList = require('../../ff_module/ff_module-response-recipient-list/ff_module-response-recipient-list'),
    IncrementalNavigation = require('../../ff_module/ff_module-incremental-navigation/ff_module-incremental-navigation'),
    ContainerOverlay = require('../../ff_container/ff_container-overlay/ff_container-overlay'),
    ContainerControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar'),
    ControlBarSet = require('../../ff_container/ff_container-control-bar/ff_container-control-bar').ControlBarSet,
    TaskResponses = require('../../ff_module/ff_module-task-responses/ff_module-task-responses'),
    Button = require('../../ff_module/ff_module-button/ff_module-button'),
    DropdownButton = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component'),
    DropdownFilters = require('../../ff_module/ff_module-dropdown-filters/ff_module-dropdown-filters').default;

var eventTypes = require('../../ff_module/ff_module-task-event/_src/events').types,
    activateDropdowns = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button');

var events = [{
    type: eventTypes.setTask,
    localEventId: '2',
    pending: true,
    sent: '14 March, 20:40',
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    localEventId: '3',
    sent: '14 March, 21:47',
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    localEventId: '1',
    sent: 'Mon 7 Dec, 18:45:15',
    author: { name: 'Sally Student' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work! (15)'
}, {
    type: eventTypes.setTask,
    localEventId: '2a',
    sent: '13 March 20:40',
    error: true,
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    localEventId: '3a',
    sent: '13 March 21:47',
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    localEventId: '1a',
    sent: 'Mon 7 Dec, 18:45',
    author: { name: 'Sally Student' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work! (0)'
}, {
    type: eventTypes.setTask,
    localEventId: '2b',
    sent: '12 March 20:40',
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    localEventId: '3b',
    sent: '12 March 21:47',
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    localEventId: '1b',
    sent: 'Mon 7 Dec, 18:45:10',
    author: { name: 'Sally Student' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work! (10)'
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
    // editingEvent: events[1],
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

            var element =
            <div className="ff_module-task-responses">
                <div className="ff_util-row-bottom">
                    <ContainerControlBar modifier= "split">
                        <ControlBarSet>
                            <DropdownFilters
                                modifier="compact"
                                text="Filter by Status"
                                classes="ff_module-task-responses__filter"
                                onAddFilter={(id, event)=>console.log('Adding '+id)}
                                onRemoveFilter={(id, event)=>console.log('Removing '+id)}
                                filters={[{
                                    name: 'Awaiting Response',
                                    id: 'filter-1'
                                }, {
                                    isActive: true,
                                    name: 'Approved',
                                    id: 'filter-2'
                                }, {
                                    name: 'Response Received',
                                    id: 'filter-3'
                                }]}
                            />
                        </ControlBarSet>

                        <ControlBarSet>
                            <p>Send feedback and marks to 27 students</p>
                            <Button
                                modifier="compact"
                                text="Send All Now"
                            />
                            <DropdownButton
                                modifier="compact-right"
                                text="More Actions"
                                list={[{
                                        href: '#',
                                        text: 'Item A'
                                    }, {
                                        href: '#',
                                        text: 'Item B'
                                    }, {
                                        href: '#',
                                        text: 'Item C'
                                    }]}
                            />
                        </ControlBarSet>

                    </ContainerControlBar>
                </div>

                <ScrollableList
                    main={overlayOuter}
                    sidebar={sidebar} />

            </div>

            React.render(element, el);
        }
    });
};
