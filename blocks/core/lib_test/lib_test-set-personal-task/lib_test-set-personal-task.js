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




var store = createStore(combineReducers({
	user: modelReducer('personalTask', personalTask),
	userForm: formReducer('personalTask', personalTask)
}));

var ConnectedFormSetPersonalTask = connect(mapStateToProps)(ModuleFormSetPersonalTask);



var props = {
	isOpen: true, 
	modifierModal: 'parent',
	modifierDialog: 'arrow',
	title: 'Set a Personal Task'
};

export class App extends React.Component {
	render() {
		return ( 
			<Provider store = { store }>
				<ContainerModalWithDialog {...props} >
					<ConnectedFormSetPersonalTask />
				</ContainerModalWithDialog>
			</Provider>
		)
	}
}

module.exports = App;
