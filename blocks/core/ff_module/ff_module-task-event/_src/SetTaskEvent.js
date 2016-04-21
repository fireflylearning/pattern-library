'use strict';

var React = require('react');
var TaskEventBase = require('./TaskEventBase'),
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;


function defaultState(){
    var description = this.props.description,
        name = description.author && description.author.name || 'User',
        taskTitle = description.taskTitle;

    return  <TaskEventBase description={description} actions={this.props.actions}>
                    <p className="ff_module-task-event__author-action">{name} set a task:</p>
                    <p className="ff_module-task-event__task-title">{taskTitle}</p>
                </TaskEventBase>;
}

module.exports.defaultState = React.createClass({
    displayName: 'SetTaskEventDefault',
    render: defaultState
});

module.exports.deletedState = React.createClass({
    displayName: 'SetTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted this task.')
});
