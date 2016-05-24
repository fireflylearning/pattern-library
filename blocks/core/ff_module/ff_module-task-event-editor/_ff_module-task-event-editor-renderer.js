'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var TaskEventEditor = require('./ff_module-task-event-editor');
var eventTypes = require('../ff_module-task-event/_src/events').types;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

import { connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer } from 'react-redux-form';


var events = [{
    type: eventTypes.stampResponseAsSeen,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    message: 'Message to the student'
}, {
    type: eventTypes.comment,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!'
}, {
    type: eventTypes.requestResubmission,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    message: 'Please resubmit'
}, {
    type: eventTypes.confirmTaskIsComplete,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    message: 'Please resubmit'
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
}, {
    type: eventTypes.deleteResponse,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.addFile,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}].map(function(event) {
    return {
        description: event
    };
}).concat(
    [{
        description: {
            type: eventTypes.addFile,
            sent: new Date(dStrings[1]),
            author: { name: 'UnreleasedError Teacher' }
        },
        state: {
            error: true
        }
    }, {
        description: {
            type: eventTypes.addFile,
            sent: new Date(dStrings[1]),
            author: { name: 'ReleasedError Teacher' }
        },
        state: {
            error: true,
            released: true
        }
    }]
);



// Validation

function isRequired(value) {
    return value && value.length;
}

function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

var modelKeys = {
    mark: 'event.description.mark',
    markMax: 'event.description.markMax',
    grade: 'event.description.grade',
    message: 'event.description.message'
};

// so different model string values can be used if required
var models = Object.keys(modelKeys).reduce(function(memo, key){
    memo[modelKeys[key]] = modelKeys[key];
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
        required: 'Please provide a mark.',
        valid: (val) => val ? `"${val}" is not a valid mark.` : '',
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
        required: 'Please provide a maximum mark.',
        valid: (val) => val ? `"${val}" is not a valid maximum mark.` : '',
    }
};
validation[modelKeys.grade] = {
    validateOn: 'blur',
    rules: {
        required: isRequired
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please provide a grade.'
    }
};
validation[modelKeys.message] = {
    validateOn: 'blur',
    rules: {
        required: isRequired
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please provide a comment.'
    }
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-event-editor]'), function(domElement, index) {

            var root = React.createElement('ul', { style: { listStyle: 'none', margin: 0, padding: 0 } }, events.map(function(event) {

                var store = createStore(combineReducers({
                    event: modelReducer('event', event),
                    eventForm: formReducer('event', event)
                }));

                function mapStateToProps(state) {
                    return {
                        event: state.event,
                        eventForm: state.eventForm,
                        validation: validation,
                        models: models,
                        onSend: function(event) {
                            console.log('send', event.type);
                        },
                        onChange: function(event) {
                            console.log(event);
                        },
                        onClose: function(event) {
                            console.log('close', event.type);
                        },
                    };
                }

                var ConnectedEditForm = connect(mapStateToProps)(TaskEventEditor);

                return React.createElement('li', { style: { listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' } },
                    <Provider store={store}>
                        <ConnectedEditForm />
                    </Provider>
                )
            }));
            ReactDOM.render(root, domElement);
        });
    });
};
