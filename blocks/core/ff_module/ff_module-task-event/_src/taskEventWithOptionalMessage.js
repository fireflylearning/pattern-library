'use strict';
var React = require('react/addons');
var TaskEventBase = require('./TaskEventBase.js');
module.exports = function(text) {
    return function() {
        var message = this.props.event.message ? <p className="ff_module-task-event__message">{this.props.event.message}</p> : null;

        return  <TaskEventBase event={this.props.event}>
                    <p className='ff_module-task-event__author-action'>{this.props.event.author.name + ' ' + text}</p>
                    {message}
                </TaskEventBase>;
    };
};
