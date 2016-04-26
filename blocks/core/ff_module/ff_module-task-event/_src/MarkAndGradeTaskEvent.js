'use strict';

var React = require('react');
var TaskEventBase = require('./TaskEventBase'),
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage');

module.exports.defaultState = React.createClass({
    displayName: 'MarkAndGradeTaskEventDefault',
    render: defaultState
});

module.exports.deletedState = React.createClass({
    displayName: 'MarkAndGradeTaskEventDeleted',
    render: taskEventWithOptionalMessage(function(props) {
        return getStatusText(props.description.author.name + ' deleted a ', props.description) + '.';
    })
});

function defaultState(){
    var description = this.props.description,
        actions = this.props.actions,
        messageText = description.message,
        markText = getMarkText(description),
        gradeText = description.grade;

    var statusText = getStatusText(description.author.name + ' added a ', description);

    var mark = markText ? <span className="ff_module-task-event__mark">{markText}</span> : null,
        grade = gradeText ? <span className="ff_module-task-event__grade">{gradeText}</span> : null,
        sep = (markText && gradeText) ? ', ' : '';

    var markAndGrade = (mark || grade) ? <p className="ff_module-task-event__mark-and-grade">{mark}{sep}{grade}</p> : null;

    var message = messageText ? <p className="ff_module-task-event__message">{messageText}</p> : null;
    var status = statusText ? <p className="ff_module-task-event__author-action">{statusText+':'}</p> : null;
    return  <TaskEventBase description={description} actions={actions}>
                {status}
                {markAndGrade}
                {message}
            </TaskEventBase>
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

function getMarkText(description) {
    if (description.mark) {
        if (description.markMax) {
            return description.mark + '/' + description.markMax;
        }
        return description.mark;
    }
    return null;
}
