'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var ModuleFormSetPersonalTask = require('./ff_module-form-set-personal-task');

import { connect } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, actions } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer } from 'react-redux-form';
import thunk from 'redux-thunk';
import { isRequired, isNumber, maxLength , isString } from '../../_lib/simpleValidation';

var personalTaskKeys = {
    taskTitle: 'taskTitle',
    dueDate: 'dueDate',
    class: 'class',
    description: 'description'
};

var personalTask = {
    taskTitle: 'Title',
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

var store = applyMiddleware(thunk)(createStore)(combineReducers({
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
