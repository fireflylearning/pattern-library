'use strict';
var React = require('react/addons');
var TaskEventBase = require('./TaskEventBase.js');


module.exports = function(text) {

    return function() {
        var messageText = this.props.description.message || '',
            outputText = getText(text, this.props);

        var message = messageText ? <p className="ff_module-task-event__message">{messageText}</p> : null;

        return  <TaskEventBase description={this.props.description}>
                    <p className='ff_module-task-event__author-action'>{outputText}</p>
                    {message}
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
