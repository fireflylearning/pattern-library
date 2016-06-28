'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    _ = require('underscore');

var TaskEventEditor = require('./ff_module-task-event-editor');
var eventTypes = require('../ff_module-task-event/_src/events').types;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

import { connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer } from 'react-redux-form';
import { isRequired, isNumber, maxLength} from '../../_lib/simpleValidation';

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
    type: eventTypes.confirmStudentIsUnexcused,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry IsUnexcused' }
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
    }]
).map(function(event){
    return {
        description: event.description,
        state: _.extend({}, event.state, {
            allStudents: false,
            released: true
        })
    };
});


var modelKeys = {
    mark: 'mark',
    markMax: 'markMax',
    grade: 'grade',
    message: 'message',
    comment: 'comment'
};

// so different model string values can be used if required
var models = Object.keys(modelKeys).reduce(function(memo, key){
    memo[modelKeys[key]] = 'event.description.' + modelKeys[key];
    return memo;
}, {});

models['comment'] = 'event.description.message';

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
                        onNext: function(event){
                            console.log('next', event.description);
                        },
                        onSend: function(event) {
                            console.log('send', event.description);
                        },
                        onChange: function(event) {
                            console.log('event', event.description);
                        },
                        onClose: function(event) {
                            console.log('close', event.description);
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
