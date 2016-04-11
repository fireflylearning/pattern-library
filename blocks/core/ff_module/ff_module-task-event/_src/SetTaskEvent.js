'use strict';

var React = require('react');
var TaskEventBase = require('./TaskEventBase');

module.exports = React.createClass({
    displayName: 'SetTaskEvent',
    render: function(){
        return  <TaskEventBase event={this.props.event}>
                    <p className="ff_module-task-event__author-action">{this.props.event.author.name} set a task:</p>
                    <p className="ff_module-task-event__task-title">{this.props.event.taskTitle}</p>
                </TaskEventBase>
    }
});
