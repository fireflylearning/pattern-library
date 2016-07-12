/*'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ModuleSetPersonalTaskKeys = require('./ff_module-set-personal-task');

var props = { 
	isOpen: true,
	modifier: 'popup',
	title: 'Set a Personal Task',
	body: <p>Test body text</p> 
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_module-set-personal-task]');
        if (el) {
            ReactDOM.render(
            	<ModuleSetPersonalTaskKeys {...props}></ModuleSetPersonalTaskKeys>
            , el);
        }
    });
};*/


'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ModuleFormSetPersonalTask = require('./ff_module-form-set-personal-task');

// var eventTypes = require('../ff_module-task-event/_src/events').types;
// var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

import { connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer } from 'react-redux-form';
import { isRequired, isNumber, maxLength , isString } from '../../_lib/simpleValidation';

var personalTaskKeys = {
    taskTitle: 'taskTitle',
    dueDate: 'dueDate',
    class: 'class',
    description: 'description'
};

var personalTask = {
    taskTitle: '',
    dueDate: '',
    class: 'Class Name',
    description: ''
};

//so different model string values can be used if required
var models = Object.keys(personalTaskKeys).reduce(function(memo, key) {
    memo[personalTaskKeys[key]] = 'personalTask.' + personalTaskKeys[key];
    return memo;
}, {});
    
var validation = {};
validation[personalTaskKeys.taskTitle] = {
    validateOn: 'blur',
    rules: {
        required: isRequired
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please add a Title to this task'
    }
};
validation[personalTaskKeys.dueDate] = {
    validateOn: 'blur',
    rules: {
        required: isRequired
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please set a due date',
        valid: (val) => val ? 'Please use numbers' : '',
    }
};
validation[personalTaskKeys.class] = {
    validateOn: 'blur',
    rules: {
        required: isRequired
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please choose a class',
        valid: (val) => val ? '5 characters maximum' : '',
    }
};
validation[personalTaskKeys.description] = {
    validateOn: 'blur',
    rules: {
        required: isRequired
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please add a description'
    }
};

var store = createStore(combineReducers({
    personalTask: modelReducer('personalTask', personalTask),
    personalTaskForm: formReducer('personalTask', personalTask)
}));

function mapStateToProps(state) {
    return {
        personalTask: state.personalTask,
        models: models,
        validation: validation
    };
};

var ConnectedFormSetPersonalTask = connect(mapStateToProps)(ModuleFormSetPersonalTask);

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-form-set-personal-task]'), function(domElement, index) {
            ReactDOM.render(
                <Provider store={store}>
                    <ConnectedFormSetPersonalTask />
                </Provider>, domElement);
        });
    });
};
