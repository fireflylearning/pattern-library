'use strict';

var React = require('react');
var TaskEventBase = require('./TaskEventBase');

module.exports = React.createClass({
    displayName: 'MarkAndGradeTaskEvent',
    render: function(){
        var event = this.props.event,
            messageText = event.message,
            markText = getMarkText(event),
            gradeText = event.grade;

        var statusText = getStatusText(' added a ', event);

        var mark = markText ? <span className="ff_module-task-event__mark">{markText}</span> : null,
            grade = gradeText ? <span className="ff_module-task-event__grade">{gradeText}</span> : null,
            sep = (markText && gradeText) ? ', ' : '';

        var markAndGrade = (mark || grade) ? <p className="ff_module-task-event__mark-and-grade">{mark}{sep}{grade}</p> : null;

        var message = messageText ? <p className="ff_module-task-event__message">{messageText}</p> : null;

        return  <TaskEventBase event={event}>
                    <p className="ff_module-task-event__author-action">{event.author.name}{statusText}:</p>
                    {markAndGrade}
                    {message}
                </TaskEventBase>
    }
});

function getStatusText(base, event) {
    switch (true) {
        case !!(event.mark && !event.grade):
            return base + 'mark';
            break;
        case !!(!event.mark && event.grade):
            return base + 'grade';
            break;
        case !!(event.mark && event.grade):
            return base + 'mark and a grade';
            break;
    }
}

function getMarkText(event){
    if (event.mark) {
        if (event.markMax) {
            return event.mark +'/'+event.markMax;
        }
        return event.mark;
    }
    return null;
}
