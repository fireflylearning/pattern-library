'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskResponses = require('./ff_module-task-responses');
var eventTypes = require('../ff_module-task-event/_src/events').types;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

import { connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer } from 'react-redux-form';
import { isRequired, isNumber, maxLength } from '../../_lib/simpleValidation';

var events = [{
    type: eventTypes.stampResponseAsSeen,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    message: 'Message to the student',
}, {
    type: eventTypes.comment,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!'
}, {
    type: eventTypes.requestResubmission,
    sent: new Date(dStrings[0]),
    error: true,
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.confirmTaskIsComplete,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.confirmStudentIsExcused,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    mark: 7,
    markMax: 10,
    grade: 'B'
}].map(function(description, index) {
    return {
        description: description,
        localEventId: 'event' + index,
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
    [events[4], events[1], events[2]],
    [events[5], events[2], events[3]]
];


var modelKeys = {
    mark: 'mark',
    markMax: 'markMax',
    grade: 'grade',
    message: 'message'
};

// so different model string values can be used if required
var models = Object.keys(modelKeys).reduce(function(memo, key){
    memo[modelKeys[key]] = 'editingEvent.description.' + modelKeys[key];
    return memo;
}, {});


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
validation[modelKeys.message] = {
    validateOn: 'blur',
    rules: {
        required: isRequired
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please add a comment'
    }
};


var store = createStore(combineReducers({
    editingEvent: modelReducer('editingEvent', eventGroups[5]),
    editingEventForm: formReducer('editingEvent', eventGroups[5])
}));

function mapStateToProps(state) {
    return {
        eventGroups: eventGroups,

        editingEvent: state.editingEvent,

        editorValidation: validation,
        editorModels: models,
        editEvent: function(event) {
            console.log('editEvent');
            console.log(event);
        },
        addEvent: function() {
            console.log('addEvent');
            console.log('stopEditingEvent');
        },
        stopEditingEvent: function() {
            console.log('stopEditingEvent');
        }
    };
}

var ConnectedTaskResponses = connect(mapStateToProps)(TaskResponses);

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-responses]'), function(domElement, index) {
            ReactDOM.render(
                <Provider store={store}>
                    <ConnectedTaskResponses />
                </Provider>
            , domElement);
        });
    });
};
