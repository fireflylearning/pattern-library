'use strict';

var React = require('react');
var eventStates = require('./events').states,
    TaskEventBase = require('./TaskEventBase'),
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
    var description = this.props.description,
        actions = this.props.actions;

    var markAndGrade = getMarkAndGrade(this.props);
    var message = getMessage(this.props);
    var status = getStatus(this.props);

    return  <TaskEventBase description={description} actions={actions} state={this.props.state}>
                {status}
                {markAndGrade}
                {message}
            </TaskEventBase>
}

function getEditedFlag(props, type) {
    var isEdited = props.state[eventStates.edited] && props.state[type];
    return isEdited ? <span className="ff_module-task-event__editedflag">[Edited]</span> : null;
}

function getMessage(props) {
    var description = props.description,
        messageText = description.message,
        editedFlag = getEditedFlag(props, 'messageEdited');

    return messageText ? <p className="ff_module-task-event__message">{messageText} {editedFlag}</p> : null;
}

function getStatus(props) {
    var statusText = getStatusText(props.description.author.name + ' added a ', props.description);
    return statusText ? <p className="ff_module-task-event__author-action">{statusText+':'}</p> : null;
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

function getMarkAndGrade(props) {
    var markText = getMarkText(props.description),
        gradeText = props.description.grade,
        editedFlag = getEditedFlag(props, 'markAndGradeEdited');


    var mark = markText ? <span className="ff_module-task-event__mark">{markText}</span> : null,
        grade = gradeText ? <span className="ff_module-task-event__grade">{gradeText}</span> : null,
        sep = (markText && gradeText) ? ', ' : '';

    return (mark || grade) ? <p className="ff_module-task-event__mark-and-grade">{mark}{sep}{grade} {editedFlag}</p> : null;
}

function getMarkText(description) {
    if (description.mark) {
        if (description.markMax) {
            return description.mark + '/' + description.markMax;
        }
        return description.mark;
    }
    return null;
}

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
