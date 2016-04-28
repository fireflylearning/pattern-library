'use strict';
var React = require('react/addons');
var TaskEventBase = require('./TaskEventBase.js');
var eventStates = require('./events').states;


function renderEdited(){
    var messageText = this.props.description.message || '',
        outputText = getText('stamped response as seen.', this.props),
        editedFlag = getEditedFlag(this.props);

        var message = messageText ? <p className="ff_module-task-event__message">{messageText}{editedFlag}</p> : null;

        return  <TaskEventBase description={this.props.description} actions={this.props.actions} state={this.props.state}>
                    <p className='ff_module-task-event__author-action'>{outputText}</p>
                    {message}
                </TaskEventBase>;
}

function defaultState(text) {
    return function() {
        var messageText = this.props.description.message || '',
            outputText = getText(text, this.props);

        var message = messageText ? <p className="ff_module-task-event__message">{messageText}</p> : null;

        return  <TaskEventBase description={this.props.description} actions={this.props.actions} state={this.props.state}>
                    <p className='ff_module-task-event__author-action'>{outputText}</p>
                    {message}
                </TaskEventBase>;
    };
};

function deletedState(text) {
    return function() {
        var outputText = getText(text, this.props);

        return  <TaskEventBase description={this.props.description} state={this.props.state}>
                    <p className='ff_module-task-event__author-action'>{outputText}</p>
                </TaskEventBase>;
    };
};

function editedState(text) {
    return function() {
        var messageText = this.props.description.message || '',
        outputText = getText(text, this.props),
        editedFlag = getEditedFlag(this.props);

        var message = messageText ? <p className="ff_module-task-event__message">{messageText}{editedFlag}</p> : null;

        return  <TaskEventBase description={this.props.description} actions={this.props.actions} state={this.props.state}>
                    <p className='ff_module-task-event__author-action'>{outputText}</p>
                    {message}
                </TaskEventBase>;
    };
};

function renderBase(text, message, status, actions, list, state) {
    var outputText = getText(text, this.props);

    return  <TaskEventBase description={this.props.description} actions={this.props.actions} state={this.props.state}>
                <p className='ff_module-task-event__author-action'>{outputText}</p>
                {message}
            </TaskEventBase>;
}

function getText(text, props){
    var description = props.description;

    if (typeof text === 'string') {
        if (description.author && description.author.name) {
            return description.author.name + ' ' + text;
        }
        return 'User ' + text;
    } else if (typeof text === 'function') {
        return text(props);
    }
}

function getEditedFlag(props) {
    var state = props.state || {};
    var isEdited = !!state[eventStates.edited];
    return isEdited ? <span className="ff_module-task-event__editedflag"> [Edited]</span> : null;
}

module.exports.defaultState = defaultState;
module.exports.deletedState = deletedState;
module.exports.editedState = editedState;
