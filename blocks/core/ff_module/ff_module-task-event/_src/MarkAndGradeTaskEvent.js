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
        return getStatusText(props.event.author.name + ' deleted a ', props.event) + '.';
    })
});

function defaultState(){
    var event = this.props.event,
        actions = this.props.actions,
        messageText = event.message,
        markText = getMarkText(event),
        gradeText = event.grade;

    var statusText = getStatusText(event.author.name + ' added a ', event);

    var mark = markText ? <span className="ff_module-task-event__mark">{markText}</span> : null,
        grade = gradeText ? <span className="ff_module-task-event__grade">{gradeText}</span> : null,
        sep = (markText && gradeText) ? ', ' : '';

    var markAndGrade = (mark || grade) ? <p className="ff_module-task-event__mark-and-grade">{mark}{sep}{grade}</p> : null;

    var message = messageText ? <p className="ff_module-task-event__message">{messageText}</p> : null;
    var status = statusText ? <p className="ff_module-task-event__author-action">{statusText+':'}</p> : null;
    return  <TaskEventBase event={event} actions={actions}>
                {status}
                {markAndGrade}
                {message}
            </TaskEventBase>
}

function getStatusText(base, event) {

    if (event.mark && !event.grade){
        return base + 'mark';
    } else if(!event.mark && event.grade) {
        return base + 'grade';
    } else if (event.mark && event.grade) {
        return base + 'mark and grade';
    } else {
        return '';
    }
}

function getMarkText(event) {
    if (event.mark) {
        if (event.markMax) {
            return event.mark + '/' + event.markMax;
        }
        return event.mark;
    }
    return null;
}
