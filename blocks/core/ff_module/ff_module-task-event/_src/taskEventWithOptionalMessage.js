'use strict';
var React = require('react/addons');
var TaskEventBase = require('./TaskEventBase.js');


function defaultState(text) {
    return function() {
        var messageText = this.props.description.message || '',
            outputText = getText(text, this.props);

        var message = messageText ? <p className="ff_module-task-event__message">{messageText}</p> : null;

        return  <TaskEventBase description={this.props.description} actions={this.props.actions}>
                    <p className='ff_module-task-event__author-action'>{outputText}</p>
                    {message}
                </TaskEventBase>;
    };
};

function deletedState(text) {
    return function() {
        var outputText = getText(text, this.props);

        return  <TaskEventBase event={this.props.event}>
                    <p className='ff_module-task-event__author-action'>{outputText}</p>
                </TaskEventBase>;
    };
};


function getText(text, props){
    var description = props.description;

    if (typeof text === 'string') {
        if (description.author && description.author.name) {
            return description.author.name + ' ' + text;
        }
        return 'User ' + text;
    } else if (typeof text === 'function') {
        return text(this.props);
    }
}


module.exports.defaultState = defaultState;
module.exports.deletedState = deletedState;
