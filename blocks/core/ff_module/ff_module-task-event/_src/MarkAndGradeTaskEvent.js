'use strict';

var React = require('react');
var eventStates = require('./events').states,
    TaskEventBase = require('./TaskEventBase'),
    MarkAndGrade = require('../../ff_module-mark-and-grade/ff_module-mark-and-grade'),
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;


var defaultState = React.createClass({
    displayName: 'MarkAndGradeTaskEventDefault',
    render: renderDefault
});

var deletedState = React.createClass({
    displayName: 'MarkAndGradeTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted(function(props) {
        return getStatusText(props.description.author.name + ' deleted a ', props.description) + '.';
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

    return messageText ? <p className="ff_module-task-event__message">{messageText}</p> : <span/>;
}

function TaskEventStatus(props) {
    var statusText = getStatusText(props.description.author.name + ' added a ', props.description),
        editedFlag = getEditedFlag(props);

    return statusText ? <p className="ff_module-task-event__author-action">{statusText}{editedFlag}:</p> : <span/>;
}

function getStatusText(base, description) {

    if (description.mark && !description.grade){
        return base + 'mark';
    } else if(!description.mark && description.grade) {
        return base + 'grade';
    } else if (description.mark && description.grade) {
        return base + 'mark and grade';
    } else {
        return '';
    }
}

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
