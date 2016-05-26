'use strict';
var React = require('react/addons');
var TaskEventBase = require('./TaskEventBase.js');
var eventStates = require('./events').states;
var _ = require('underscore');



function defaultState(text) {
    return function() {
        var messageText = this.props.description.message || '',
            outputText = getText(text, this.props);

        var message = messageText ? <p className="ff_module-task-event__message">{messageText}</p> : null;

        return renderBase(this.props, outputText, message);
    };
};

function editedState(text) {
    return function() {
        var messageText = this.props.description.message || '',
        outputText = getText(text, this.props),
        editedFlag = getEditedFlag(this.props);

        var message = messageText ? <p className="ff_module-task-event__message">{messageText}{editedFlag}</p> : null;

        return renderBase(this.props, outputText, message);
    };
};

function deletedState(text) {
    return function() {
        var outputText = getText(text, this.props);
        var newProps = _.extend({}, this.props, { actions: [], onRetryAfterStatusError: function(){}})

        return  <TaskEventBase {...newProps}>
                    <p className='ff_module-task-event__author-action'>{outputText}</p>
                </TaskEventBase>;
    };
};

function renderBase(props, outputText, message) {
    return  <TaskEventBase {...props}>
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
