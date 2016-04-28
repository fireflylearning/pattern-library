'use strict';

var React = require('react');
var eventStates = require('./events').states,
    TaskEventBase = require('./TaskEventBase'),
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;


var defaultState = React.createClass({
    displayName: 'SetTaskEventDefault',
    render: renderDefault
});

var deletedState = React.createClass({
    displayName: 'SetTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted this task.')
});

var editedState = React.createClass({
    displayName: 'SetTaskEventEdited',
    render: renderDefault
});

function renderDefault(){
    var description = this.props.description,
        name = description.author && description.author.name || 'User',
        taskTitle = description.taskTitle,
        editedFlag = getEditedFlag(this.props);

    return  <TaskEventBase description={description} actions={this.props.actions} state={this.props.state}>
                    <p className="ff_module-task-event__author-action">{name} set a task:</p>
                    <p className="ff_module-task-event__task-title">{taskTitle}{editedFlag}</p>
                </TaskEventBase>;
}

function getEditedFlag(props) {
    var state = props.state || {};
    var isEdited = !!state[eventStates.edited];
    return isEdited ? <span className="ff_module-task-event__editedflag"> [Edited]</span> : null;
}


module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
