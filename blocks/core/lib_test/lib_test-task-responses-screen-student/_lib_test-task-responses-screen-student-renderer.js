'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var ScrollableList = require('../../ff_container/ff_container-scrollable-list/ff_container-scrollable-list'),
    ItemRepeater = require('../../ff_container/ff_container-item-repeater/ff_container-item-repeater'),
    IncrementalNavigation = require('../../ff_module/ff_module-incremental-navigation/ff_module-incremental-navigation'),
    ContainerOverlay = require('../../ff_container/ff_container-overlay/ff_container-overlay'),
    ContainerControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar'),
    ContainerControlBarSet = ContainerControlBar.ControlBarSet,
    TaskResponses = require('../../ff_module/ff_module-task-responses/ff_module-task-responses'),
    TaskResponseActionsIndividual = require('../../ff_module/ff_module-task-response-actions-individual/ff_module-task-response-actions-individual'),
    TaskMetaActions = require('../../ff_module/ff_module-task-meta-actions/ff_module-task-meta-actions'),
    Button = require('../../ff_module/ff_module-button/ff_module-button'),
    DropdownButton = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component'),
    DropdownFilters = require('../../ff_module/ff_module-dropdown-filters/ff_module-dropdown-filters');


var eventTypes = require('../../ff_module/ff_module-task-event/_src/events').types,
    activateDropdowns = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button');

import { connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer } from 'react-redux-form';
import { isRequired, isNumber, maxLength } from '../../_lib/simpleValidation';

var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'],
    dStrings2 = [
        '7 Dec 2015 18:45', // 0
        '7 Dec 2015 18:45:10', // 1
        '7 Dec 2015 18:45:15', // 2
        '12 March 2016 20:40', // 3
        '12 March 2016 21:47', // 4
        '13 March 2016 20:40', // 5
        '13 March 2016 21:47', // 6
        '14 March 2016 20:40', // 7
        '14 March 2016 21:47' // 8
    ];


var events = [{
    type: eventTypes.setTask,
    localEventId: '2g',
    pending: true,
    sent: new Date(dStrings2[7]),
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    localEventId: '3g',
    sent: new Date(dStrings2[8]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    localEventId: '1g',
    sent: new Date(dStrings2[2]),
    author: { name: 'Sally Student' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work! (15)'
}, {
    type: eventTypes.setTask,
    localEventId: '2a',
    sent: new Date(dStrings2[5]),
    error: true,
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.requestResubmission,
    localEventId: '3a',
    sent: new Date(dStrings2[6]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    localEventId: '1a',
    sent: new Date(dStrings2[0]),
    author: { name: 'Sally Student' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work! (0)'
}, {
    type: eventTypes.setTask,
    localEventId: '2b',
    sent: new Date(dStrings2[3]),
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    localEventId: '3b',
    sent: new Date(dStrings2[4]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    localEventId: '1b',
    sent: new Date(dStrings2[1]),
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
}, {
    type: 'invalid-type',
    localEventId: '4v',
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
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
        }],
        state: {
            released: true
        }
    };
});

var eventGroups = [
    [events[1], events[0]],
    [events[2]],
    [events[3], events[4], events[5]],
    [events[6], events[7]],
    [events[8]],
    [events[9], events[10], events[11]],
    [events[5], events[8], events[2]],
    [events[12]],
];




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


var modelKeys = {
    mark: 'mark',
    markMax: 'markMax',
    grade: 'grade',
    message: 'message',
    comment: 'comment'
};

// so different model string values can be used if required
var models = Object.keys(modelKeys).reduce(function(memo, key) {
    memo[modelKeys[key]] = 'editingEvent.description.' + modelKeys[key];
    return memo;
}, {});
models['comment'] = 'editingEvent.description.message';

var validation = {};
validation[modelKeys.mark] = {
    validateOn: 'blur',
    rules: {
        required: isRequired,
        valid: isNumber
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please add a mark',
        valid: (val) => val ? 'Please use numbers' : '',
    }
};
validation[modelKeys.markMax] = {
    validateOn: 'blur',
    rules: {
        required: isRequired,
        valid: isNumber
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please add a maximum mark',
        valid: (val) => val ? 'Please use numbers' : '',
    }
};
validation[modelKeys.grade] = {
    validateOn: 'blur',
    rules: {
        required: isRequired,
        valid: maxLength(5)
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please add a grade',
        valid: (val) => val ? '5 characters maximum' : '',
    }
};
validation[modelKeys.comment] = {
    validateOn: 'blur',
    rules: {
        required: isRequired
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please add a comment'
    }
};
var max = 255;
validation[modelKeys.message] = {
    validateOn: 'blur',
    rules: {
        valid: maxLength(max)
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        valid: (val) => val ? '' + max + ' characters maximum' : '',
    }
};


var store = createStore(combineReducers({
    editingEvent: modelReducer('editingEvent', events[12]),
    editingEventForm: formReducer('editingEvent', events[12])
}));


function mapStateToProps(state) {
    return {
        eventGroups: eventGroups,

        editingEvent: null, //state.editingEvent,

        editorValidation: validation,
        editorModels: models,
        editEvent: function editEvent(event) {
            console.log('editEvent');
            console.log(event);
        },
        addEvent: function() {
            console.log('addEvent');
            console.log('stopEditingEvent');
        },
        stopEditingEvent: function() {
            console.log('stopEditingEvent');
        },
        state: {
            // userCanEdit: false
        },
        modifier: 'standalone',
        actionsComponent: TaskResponseActionsIndividual
    };
}

var ConnectedTaskResponses = connect(mapStateToProps)(TaskResponses);


var overlayInner = React.createElement(ConnectedTaskResponses),

    overlayOuter = React.createElement(ContainerOverlay, {
        modifier: 'absolute-bottom',
        classes: 'ff_container-overlay--task-event-scrollable',
        body: overlayInner,
        bar: recipientNavigation
    }),

    sidebar = <ItemRepeater>
        <div>Task details</div>
        <div>Files</div>
        </ItemRepeater>;


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-lib_test-task-responses-screen-student]');
        if (el) {

            var element = (
                <Provider store={store}>
                    <div>

                        <div className="ff_grid ff_grid--1-2">
                            <div className="ff_grid__column">
                                {sidebar}
                            </div>
                            <div className="ff_grid__column">
                                <ConnectedTaskResponses/>
                            </div>
                        </div>
                    </div>
                </Provider>
            )


            ReactDOM.render(element, el);
        }
    });
};
