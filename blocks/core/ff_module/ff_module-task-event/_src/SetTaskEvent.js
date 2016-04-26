'use strict';

var React = require('react');
var TaskEventBase = require('./TaskEventBase');

module.exports = React.createClass({
    displayName: 'SetTaskEvent',
    render: function(){
        var description = this.props.description,
            name = description.author && description.author.name || 'User',
            taskTitle = description.taskTitle;

        return  <TaskEventBase description={this.props.description}>
                    <p className="ff_module-task-event__author-action">{name} set a task:</p>
                    <p className="ff_module-task-event__task-title">{taskTitle}</p>
                </TaskEventBase>
    }
});
