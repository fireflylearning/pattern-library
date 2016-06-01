'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var ScrollableList = require('../../ff_container/ff_container-scrollable-list/ff_container-scrollable-list'),
    ResponseRecipientList = require('../../ff_module/ff_module-response-recipient-list/ff_module-response-recipient-list'),
    IncrementalNavigation = require('../../ff_module/ff_module-incremental-navigation/ff_module-incremental-navigation'),
    ContainerOverlay = require('../../ff_container/ff_container-overlay/ff_container-overlay'),
    ContainerControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar'),
    ContainerControlBarSet = ContainerControlBar.ControlBarSet,
    TaskResponses = require('../../ff_module/ff_module-task-responses/ff_module-task-responses'),
    TaskMetaActions = require('../../ff_module/ff_module-task-meta-actions/ff_module-task-meta-actions'),
    Button = require('../../ff_module/ff_module-button/ff_module-button'),
    DropdownButton = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component'),
    DropdownFilters = require('../../ff_module/ff_module-dropdown-filters/ff_module-dropdown-filters');


var eventTypes = require('../../ff_module/ff_module-task-event/_src/events').types,
    activateDropdowns = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button');

var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];


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
    type: eventTypes.requestResubmission,
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
}, {
    type: eventTypes.deleteResponse,
    localEventId: '4a',
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.confirmStudentIsUnexcused,
    localEventId: '4b',
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.addFile,
    localEventId: '4c',
    sent: new Date(dStrings[2]),
    author: { name: 'Sally Student' },
    files: [{
        title: 'File one',
        href: '#'
    }]
}].map(function(description) {
    var localEventId = description.localEventId;
    delete description.localEventId;
    return {
        localEventId: localEventId,
        description: description,
        actions: [{
            key: 'edit',
            text: 'Edit',
            onClick: function() { console.log('edit'); }
        }, {
            key: 'delete',
            text: 'Delete',
            onClick: function() { console.log('delete'); }
        }]
    };
});

var eventGroups = [[events[1], events[0]],[events[2]],[events[3], events[4], events[5]], [events[6], events[7]],[events[8]],[events[9], events[10], events[11]]];



var recipientData = [{
    onSelect: function() {
        console.log("onSelect is0");
    },
    guid: "u42",
    label: "Sally Student",
    latestEvent: {
        description: {
            type: eventTypes.confirmTaskIsComplete,
            sent: new Date()
        }
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
        description: {
            type: eventTypes.markAndGrade,
            sent: new Date('4 March 2016')
        }
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
        description: {
            type: eventTypes.markAndGrade,
            sent: new Date('1 March 2016')
        }
    },
    pic_href: "/images/default_picture.png"
}, {
    onSelect: function() {
        console.log("onSelect id1");
    },
    guid: "u43a",
    label: "Terry Teacher",
    latestEvent: {
        description: {
            type: eventTypes.stampResponseAsSeen,
            sent: new Date('27 February 2016')
        }
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
        description: {
            type: eventTypes.confirmTaskIsComplete,
            sent: new Date()
        }
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
        description: {
            type: eventTypes.confirmTaskIsComplete,
            sent: new Date()
        }
    },
    pic_href: "/images/default_picture.png"
}];

var filterProps = {
        text: 'Filter by Status',
        onAddFilter: function(id, event) { console.log('Adding ' + id); },
        onRemoveFilter: function(id, event) { console.log('Removing ' + id); },
        filters: [{
            name: 'Awaiting Response',
            id: 'filter-1'
        }, {
            isActive: true,
            name: 'Approved',
            id: 'filter-2'
        }, {
            name: 'Response Received',
            id: 'filter-3'
        }]
    },
    buttonProps = { text: 'Send All Now', onClick: function() { console.log('send all now'); } },
    dropdownProps = {
        text: 'More Actions',
        list: [
            { text: 'Edit', onClick: function(event) { console.log('edit'); } },
            { text: 'Copy', onClick: function(event) { console.log('copy'); } },
            { text: 'Export', onClick: function(event) { console.log('export'); } },
            { text: 'Archive', onClick: function(event) { console.log('archive'); } },
            { text: 'Delete', onClick: function(event) { console.log('delete'); } }
        ]
    };

var metaActionProps = {
    state: {
        // archived: true
    },
    description: {
        numRecipientsAffected: 43,
        author: { name: 'Terry Teacher' }
    },
    filters: <DropdownFilters {...filterProps} />,
    singleButtons: [<Button key="send-all-now" {...buttonProps}/>],
    groupedActions: <DropdownButton {...dropdownProps}/>
};

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


var overlayInner = React.createElement(TaskResponses, {
        eventGroups: eventGroups,
        // editingEvent: events[4],
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
        }
    }),

    overlayOuter = React.createElement(ContainerOverlay, {
        modifier: 'absolute-bottom',
        classes: 'ff_container-overlay--task-event-scrollable',
        body: overlayInner,
        bar: recipientNavigation
    }),

    sidebar = React.createElement(ResponseRecipientList, {
        responses: recipientData,
        onSelect: function() {
            console.log('select recipient');
        }
    });


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-lib_test-task-responses-screen]'); //Use jquery or sim in Firefly for backwards compat
        if (el) {

            var element = <div className="ff_module-task-responses">
                <TaskMetaActions {...metaActionProps}/>

                <ScrollableList
                    main={overlayOuter}
                    sidebar={sidebar} />

            </div>

            ReactDOM.render(element, el);
        }
    });
};
