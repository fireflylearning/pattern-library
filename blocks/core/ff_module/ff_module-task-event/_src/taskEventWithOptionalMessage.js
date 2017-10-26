'use strict';
var React = require('react');
var TaskEventBase = require('./TaskEventBase.js');
var eventStates = require('./events').states;
var _ = require('underscore');



function defaultState(text) {
    return function() {
        var messageText = this.props.description.message || '',
            outputText = getText(text, this.props, TaskEventBase.getAuthor(this.props));

        var message = messageText ? <p className="ff_module-task-event__message">{messageText}</p> : null;

        return renderBase(this.props, outputText, message);
    };
};

function editedState(text) {
    return function() {
        var messageText = this.props.description.message || '',
        outputText = getText(text, this.props, TaskEventBase.getAuthor(this.props)),
        editedFlag = getEditedFlag(this.props);

        var message = messageText ? <p className="ff_module-task-event__message">{messageText}{editedFlag}</p> : null;

        return renderBase(this.props, outputText, message);
    };
};

function deletedState(text) {
    return function() {
        var outputText = getText(text, this.props, TaskEventBase.getAuthor(this.props));
        var newProps = _.extend({}, this.props, { actions: [] })

        return  <TaskEventBase {...newProps}>
                    <p className='ff_module-task-event__author-action'>{outputText}</p>
                </TaskEventBase>;
    };
};

function renderBase(props, outputText, message) {
    return  <TaskEventBase {...props}>
                <p className='ff_module-task-event__author-action'>{outputText}{message ? ':' : '.'}</p>
                {message}
            </TaskEventBase>;
}


function getText(text, props, author){
    if (typeof text === 'string') {
        return author + ' ' + text;
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
