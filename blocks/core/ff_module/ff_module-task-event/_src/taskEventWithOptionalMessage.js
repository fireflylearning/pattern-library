'use strict';
var React = require('react/addons');
var TaskEventBase = require('./TaskEventBase.js');

module.exports = function(text) {

    return function() {
        var outputText = getText(text, this.props);

        var message = this.props.event.message ? <p className="ff_module-task-event__message">{this.props.event.message}</p> : null;

        return  <TaskEventBase event={this.props.event}>
                    <p className='ff_module-task-event__author-action'>{outputText}</p>
                    {message}
                </TaskEventBase>;
    };
};

function getText(text, props){
    if (typeof text === 'string') {
        return props.event.author.name + ' ' +text;
    } else if (typeof text === 'function') {
        return text(props);
    }
}
