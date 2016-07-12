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
    EditorCommon = require('../blocks/core/ff_module/ff_module-task-event-editor/_src/EditorCommon'),
    EditorComment = require('../blocks/core/ff_module/ff_module-task-event-editor/_src/EditorComment'),
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
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.addFile,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}].map(function(event) {
    return {
        description: event,
        state: {}
    };
}).concat({
    description: {
        type: eventTypes.confirmStudentIsExcused,
        sent: new Date(dStrings[2]),
        author: { name: 'Terry Teacher' }
    },
    state: {
        error: true
    }
});


// Validation

function isRequired(value) {
    return value && value.length;
}

function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

var modelKeys = {
    mark: 'mark',
    markMax: 'markMax',
    grade: 'grade',
    message: 'message',
    comment: 'comment'
};

// so different model string values can be used if required
var models = Object.keys(modelKeys).reduce(function(memo, key) {
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

var types = {};
types[eventTypes.stampResponseAsSeen] = [EditorBase, EditorCommon];
types[eventTypes.requestResubmission] = [EditorBase, EditorCommon];
types[eventTypes.confirmTaskIsComplete] = [EditorBase, EditorCommon];
types[eventTypes.confirmStudentIsExcused] = [EditorBase, EditorCommon];
types[eventTypes.comment] = [EditorBase, EditorComment];
types[eventTypes.markAndGrade] = [EditorMarkAndGrade, EditorBase];

types[eventTypes.addFile] = [EditorBase, EditorAddFile];
types[eventTypes.deleteResponse] = [EditorBase, ContainerDialog];
types[eventStates.error] = [EditorBase, ContainerDialog];

var buttonClasses = {};
buttonClasses[eventTypes.stampResponseAsSeen] = [
    [0, 'ff_module-button ff_module-button--primary', 'onSend'],
    [1, 'ff_module-button ff_module-button--primary', 'onNext']
];
buttonClasses[eventTypes.requestResubmission] = [
    [0, 'ff_module-button ff_module-button--primary', 'onSend']
];
buttonClasses[eventTypes.confirmTaskIsComplete] = [
    [0, 'ff_module-button ff_module-button--primary', 'onSend']
];
buttonClasses[eventTypes.confirmStudentIsExcused] = [
    [0, 'ff_module-button ff_module-button--primary', 'onSend']
];
buttonClasses[eventTypes.comment] = [
    [0, 'ff_module-button ff_module-button--primary', 'onSend']
];
buttonClasses[eventTypes.markAndGrade] = [
    [0, 'ff_module-button ff_module-button--primary', 'onSend'],
    [1, 'ff_module-button ff_module-button--primary', 'onNext']
];
buttonClasses[eventTypes.addFile] = [
    [0, 'ff_module-button ff_module-button--primary', 'onSend']
];
buttonClasses[eventTypes.deleteResponse] = [
    [0, 'ff_module-button ff_module-button--danger', 'onSend'],
    [0, 'ff_module-button ff_module-button--tertiary', 'onClose']
];
buttonClasses[eventStates.error] = [
    [0, 'ff_module-button ff_module-button--primary', 'onSend'],
    [0, 'ff_module-button ff_module-button--tertiary', 'onClose']
];

function getStore(event) {
    return createStore(combineReducers({
        event: modelReducer('event', event),
        eventForm: formReducer('event', event)
    }));
}

function getMapStateToProps(spies) {
    return function mapStateToProps(state) {
        return {
            event: state.event,
            eventForm: state.eventForm,
            validation: validation,
            models: models,
            onSend: spies.onSend,
            onChange: spies.onChange,
            onClose: spies.onClose,
            onNext: spies.onNext
        };
    };
}

function getProvidedForm(store, mapStateToProps) {
    var ConnectedEditForm = connect(mapStateToProps)(TaskEventEditor);
    return (<Provider store = { store }>
        <ConnectedEditForm/>
        </Provider>);
}

function getTypeName(event) {
    var typeName = event.description.type;
    if (event.state.error) typeName = eventStates.error;
    return typeName;
}

function getSpies() {
    return {
        onSend: sinon.spy(),
        onChange: sinon.spy(),
        onClose: sinon.spy(),
        onNext: sinon.spy()
    }
}

describe('TaskEventEditor', function() {

    it('should render', function() {

        var store = getStore(events[0]);

        var mapStateToProps = getMapStateToProps(getSpies());

        var ProvidedForm = getProvidedForm(store, mapStateToProps);

        var component = TestUtils.renderIntoDocument(ProvidedForm);
        expect(component).to.exist;
    });

    it('should render correct views for each event type', function() {
        events.forEach(function(event) {

            var store = getStore(event);

            var mapStateToProps = getMapStateToProps(getSpies());

            var ProvidedForm = getProvidedForm(store, mapStateToProps);

            var component = TestUtils.renderIntoDocument(ProvidedForm);
            var typeName = getTypeName(event);

            var rootView = TestUtils.findRenderedComponentWithType(component, types[typeName][0]);
            expect(rootView).to.exist;
            var subView = TestUtils.findRenderedComponentWithType(rootView, types[typeName][1]);
            expect(subView).to.exist;

        });
    });

    it('should fire correct handlers', function() {
        events.forEach(function(event) {

            var store = getStore(event);

            var spies = getSpies();
            var mapStateToProps = getMapStateToProps(spies);

            var ProvidedForm = getProvidedForm(store, mapStateToProps);

            var component = TestUtils.renderIntoDocument(ProvidedForm);
            var typeName = getTypeName(event);

            var topCloseBtn = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-dialog__close-top');
            expect(topCloseBtn).to.exist;
            TestUtils.Simulate.click(topCloseBtn);
            expect(spies.onClose.calledOnce).to.equal(true);

            var classes = buttonClasses[typeName];
            classes.forEach(function(classDef) {
                var index = classDef[0],
                    className = classDef[1],
                    spyName = classDef[2],
                    spy = spies[spyName];

                var buttonList = TestUtils.scryRenderedDOMComponentsWithClass(component, className);
                var button = buttonList[index];
                expect(button).to.exist;

                TestUtils.Simulate.click(button);

                if (spyName === 'onClose') {
                    expect(spy.calledTwice).to.equal(true);
                } else {
                    expect(spy.calledOnce).to.equal(true);
                }

            })
        });
    });
});
