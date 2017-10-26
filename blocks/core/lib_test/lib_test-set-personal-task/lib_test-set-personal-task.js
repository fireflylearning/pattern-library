'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { modelReducer, formReducer } from 'react-redux-form';
import thunk from 'redux-thunk';

var Button = require('../../ff_module/ff_module-button/ff_module-button');
var ContainerModal = require('../../ff_container/ff_container-modal/ff_container-modal');
var ContainerDialog = require('../../ff_container/ff_container-dialog/ff_container-dialog');
var ModuleFormSetPersonalTask = require('../../ff_module/ff_module-form-set-personal-task/ff_module-form-set-personal-task');

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

var formSetPersonalTaskProps = {
    classList: [{
        text: 'Please select...',
    }, {
        text: 'Class 1B',
        value: 1
    }, {
        text: 'Option 2E',
        value: 2
    }]
}

//so different model string values can be used if required
var models = Object.keys(personalTaskKeys).reduce(function(memo, key) {
    memo[personalTaskKeys[key]] = 'personalTask.' + personalTaskKeys[key];
    return memo;
}, {});
    
var validation = {};

var store = applyMiddleware(thunk)(createStore)(combineReducers({
    personalTask: modelReducer('personalTask', personalTask),
    personalTaskForm: formReducer('personalTask', personalTask)
}));

function mapStateToContainerModalProps(state) {
    return {
        personalTask: state.personalTask,
        personalTaskForm: state.personalTaskForm,
        models: models,
        modifier: 'compact'
    };
};

function mapStateToContainerDialogProps(state) {
    var invalid = state.personalTaskForm ? !state.personalTaskForm.valid : false;
    return {
        personalTask: state.personalTask,
        personalTaskForm: state.personalTaskForm,
        models: models,
        validation: validation,
        controls: [<Button key="set-task" modifier="primary" text="Set Task" disabled={invalid}></Button>],
        modifier: 'constrained-height',
        title: 'Set a Personal Task',
        body: <ConnectedFormSetPersonalTask {...formSetPersonalTaskProps} />
    };
};

function mapStateToPersonalTaskProps(state) {
    return {
        personalTask: state.personalTask,
        personalTaskForm: state.personalTaskForm,
        models: models,
        modifier: '',
        validation: validation,
    };
};

var ConnectedContainerModal = connect(mapStateToContainerModalProps)(ContainerModal), 
    ConnectedContainerDialog = connect(mapStateToContainerDialogProps)(ContainerDialog),
    ConnectedFormSetPersonalTask = connect(mapStateToPersonalTaskProps)(ModuleFormSetPersonalTask);

module.exports = React.createClass({
    displayName: 'App',
    getInitialState: function() {
        return { modalIsOpen: false };
    },
    openModal: function() {
        this.setState({modalIsOpen: true});
    },
    closeModal: function() {
        this.setState({modalIsOpen: false});
    },
    render: function() {
        return (
            <Provider store={store}>
                <div>
                    <Button key="add-task" onClick={this.openModal} text="Add a Task" modifier="primary" />
                    <ConnectedContainerModal
                        isOpen={this.state.modalIsOpen}
                        onClose={this.closeModal}
                        >
                        <ConnectedContainerDialog />         
                    </ConnectedContainerModal>
                </div>
            </Provider>
        );
    }
});

