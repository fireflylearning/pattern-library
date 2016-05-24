'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');



var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    sinon = require('sinon');

import { connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer } from 'react-redux-form';

var TaskEventEditor = require('../blocks/core/ff_module/ff_module-task-event-editor/ff_module-task-event-editor'),
    eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types,
    eventStates = require('../blocks/core/ff_module/ff_module-task-event/_src/events').states;

var EditorBase = require('../blocks/core/ff_module/ff_module-task-event-editor/_src/EditorBase'),
    EditorBaseMini = require('../blocks/core/ff_module/ff_module-task-event-editor/_src/EditorBaseMini'),
    EditorCommon = require('../blocks/core/ff_module/ff_module-task-event-editor/_src/EditorCommon'),
    EditorMarkAndGrade = require('../blocks/core/ff_module/ff_module-task-event-editor/_src/EditorMarkAndGrade'),
    EditorAddFile = require('../blocks/core/ff_module/ff_module-task-event-editor/_src/EditorAddFile'),
    ContainerDialog = require('../blocks/core/ff_container/ff_container-dialog/ff_container-dialog'),
    dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];


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
}, {
    type: eventTypes.deleteResponse,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.addFile,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.addFile,
    erroredSend: true,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.addFile,
    erroredSave: true,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}].map(function(event) {
    return {
        description: event,
        state: {}
    };
});


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
    grade: 'event.description.grade'
};

var models = {};
models[modelKeys.mark] = modelKeys.mark; // so different model string values can be used if required
models[modelKeys.markMax] = modelKeys.markMax;
models[modelKeys.grade] = modelKeys.grade;


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


var types = {};
types[eventTypes.stampResponseAsSeen] = [EditorBase, EditorCommon];
types[eventTypes.requestResubmission] = [EditorBase, EditorCommon];
types[eventTypes.confirmTaskIsComplete] = [EditorBase, EditorCommon];
types[eventTypes.confirmStudentIsExcused] = [EditorBase, EditorCommon];
types[eventTypes.comment] = [EditorBase, EditorCommon];
types[eventTypes.markAndGrade] = [EditorBase, EditorMarkAndGrade];

types[eventTypes.addFile] = [EditorBase, EditorAddFile];
types[eventTypes.deleteResponse] = [EditorBaseMini, ContainerDialog];
types[eventStates.erroredSend] = [EditorBaseMini, ContainerDialog];
types[eventStates.erroredSave] = [EditorBaseMini, ContainerDialog];

describe('TaskEventEditor', function() {

    it('should render', function() {

        var store = createStore(combineReducers({
            event: modelReducer('event', events[0]),
            eventForm: formReducer('event', events[0])
        }));

        function mapStateToProps(state) {
            return {
                event: state.event,
                eventForm: state.eventForm,
                validation: validation,
                models: models,
                onSend: sinon.spy(),
                onChange: sinon.spy(),
                onClose: sinon.spy(),
            };
        }

        var ConnectedEditForm = connect(mapStateToProps)(TaskEventEditor);
        var ProvidedForm = <Provider store={store}>
                    <ConnectedEditForm />
                </Provider>;

        var component = TestUtils.renderIntoDocument(ProvidedForm);
        expect(component).to.exist;
    });

    it('should render correct views for each event type', function() {
        events.forEach(function(event) {

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
                    onSend: sinon.spy(),
                    onChange: sinon.spy(),
                    onClose: sinon.spy(),
                };
            }

            var ConnectedEditForm = connect(mapStateToProps)(TaskEventEditor);
            var ProvidedForm = <Provider store={store}>
                    <ConnectedEditForm />
                </Provider>;

            var component = TestUtils.renderIntoDocument(ProvidedForm);
            var typeName = event.description.type;

            if (event.erroredSave) typeName = eventStates.erroredSave;
            else if (event.erroredSend) typeName = eventStates.erroredSend;

            var rootView = TestUtils.findRenderedComponentWithType(component, types[typeName][0]);
            expect(rootView).to.exist;
            var subView = TestUtils.findRenderedComponentWithType(rootView, types[typeName][1]);
            expect(subView).to.exist;

        });
    });


});
