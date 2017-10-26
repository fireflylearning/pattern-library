'use strict';

var React = require('react');
var eventStates = require('./events').states,
    TaskEventBase = require('./TaskEventBase'),
    MarkAndGrade = require('../../ff_module-mark-and-grade/ff_module-mark-and-grade'),
    Utils = require('./utils'),
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;


var defaultState = React.createClass({
    displayName: 'MarkAndGradeTaskEventDefault',
    render: renderDefault
});

var deletedState = React.createClass({
    displayName: 'MarkAndGradeTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted(function(props) {
        return `${TaskEventBase.getAuthor(props)} deleted ${describeEvent(props.description)}`;
    })
});

var editedState = React.createClass({
    displayName: 'MarkAndGradeTaskEventEdited',
    render: renderDefault
});

function renderDefault(){
    return  (
        <TaskEventBase {...this.props}>
            <TaskEventStatus {...this.props} />
            <MarkAndGrade {...this.props.description} classes='ff_module-task-event__mark-and-grade' />
            <TaskEventMessage {...this.props} />
        </TaskEventBase>
    );
}

function getEditedFlag(props) {
    var state = props.state || {};
    var isEdited = !!state[eventStates.edited];
    return isEdited ? <span className="ff_module-task-event__editedflag"> [Edited]</span> : null;
}

function TaskEventMessage(props) {
    var description = props.description || {},
        messageText = description.message;

    return messageText ? <p className="ff_module-task-event__message">{Utils.breakifyComponents(Utils.urlifyText(messageText))}</p> : <span/>;
}

function TaskEventStatus(props) {
    var statusText = getStatusText(props),
        editedFlag = getEditedFlag(props);

    return statusText ? <p className="ff_module-task-event__author-action">{statusText}{editedFlag}:</p> : <span/>;
}

function getStatusText(props) {
    let author = TaskEventBase.getAuthor(props);
    return `${author} added ${describeEvent(props.description)}`;
}

function describeEvent(description) {
    if (description.mark != null && description.grade == null){
        return 'a mark';
    } else if(description.mark == null && description.grade != null) {
        return 'a grade';
    } else if (description.mark != null && description.grade != null) {
        return 'a mark and grade';
    } else if (description.message != null) {
        return 'feedback';
    }
    return '';
}

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
