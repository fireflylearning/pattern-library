'use strict';

var React = require('react');
var eventStates = require('./events').states,
    TaskEventBase = require('./TaskEventBase');

var defaultState = React.createClass({
    displayName: 'ArchiveTaskEventDefault',
    render: renderDefault
});

function renderDefault(){
    var description = this.props.description,
        name = TaskEventBase.getAuthor(this.props),
        taskTitle = description.taskTitle;

    return <TaskEventBase {...this.props}>
                <p className="ff_module-task-event__author-action">{name} archived the task.</p>
            </TaskEventBase>;
}

module.exports = {};
module.exports[eventStates.default] = defaultState;
