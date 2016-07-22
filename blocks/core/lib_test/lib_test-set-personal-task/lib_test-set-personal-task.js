'use strict';

import React from 'react';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { modelReducer, formReducer } from 'react-redux-form';
import thunk from 'redux-thunk';
import { isRequired, isNumber, maxLength , isString } from '../../_lib/simpleValidation';

// import ContainerModalWithDialog from '../../ff_container/ff_container-modal-with-dialog/ff_container-modal-with-dialog';
var ContainerModalWithDialog = require('../../ff_container/ff_container-modal-with-dialog/ff_container-modal-with-dialog');
var ModuleFormSetPersonalTask = require('../../ff_module/ff_module-form-set-personal-task/ff_module-form-set-personal-task');
// var generateClass = require('../../_lib/_ui/class-utils.js').generateClass; //(base, props)

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
        required: 'Please add a title to this task'
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

var props = {
	isOpen: true, 
	modifier: 'parent',
	title: 'Set a Personal Task',
	controls: <button key="set-task" className="ff_module-button ff_module-button--primary">Set Task</button>,
	dataAnchor: 'date-picker'
};

export class App extends React.Component {
	render() {
		return ( 
			<Provider store={store}>
				<ContainerModalWithDialog {...props} >
					<ConnectedFormSetPersonalTask {...props} />
				</ContainerModalWithDialog>
			</Provider>
		)
	}
}

module.exports = App;
