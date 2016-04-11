'use strict';

var React = require('react');
var StampResponseAsSeenTaskEvent = require('./_src/StampResponseAsSeenTaskEvent.js'),
    SetTaskEvent = require('./_src/SetTaskEvent.js'),
    AddedCommentEvent = require('./_src/AddedCommentEvent.js'),
    RequestResubmissionTaskEvent = require('./_src/RequestResubmissionTaskEvent'),
    ConfirmedCompleteTaskEvent = require('./_src/ConfirmedCompleteTaskEvent'),
    ConfirmedStudentExcusedTaskEvent = require('./_src/ConfirmedStudentExcusedTaskEvent'),
    ConfirmedStudentUnExcusedTaskEvent = require('./_src/ConfirmedStudentUnExcusedTaskEvent'),
    MarkAndGradeTaskEvent = require('./_src/MarkAndGradeTaskEvent'),
    DeletedResponseTaskEvent = require('./_src/DeletedResponseTaskEvent'),
    AddedFileTaskEvent = require('./_src/AddedFileTaskEvent');

var eventTypes = require('./_src/events').types;

var eventComponents = {};
eventComponents[eventTypes.setTask] = SetTaskEvent;
eventComponents[eventTypes.stampResponseAsSeen] = StampResponseAsSeenTaskEvent;
eventComponents[eventTypes.comment] = AddedCommentEvent;
eventComponents[eventTypes.requestResubmission] = RequestResubmissionTaskEvent;
eventComponents[eventTypes.confirmTaskIsComplete] = ConfirmedCompleteTaskEvent;
eventComponents[eventTypes.confirmStudentIsExcused] = ConfirmedStudentExcusedTaskEvent;
eventComponents[eventTypes.markAndGrade] = MarkAndGradeTaskEvent;

eventComponents[eventTypes.deleteResponse] = DeletedResponseTaskEvent;
eventComponents[eventTypes.confirmStudentIsUnexcused] = ConfirmedStudentUnExcusedTaskEvent;
eventComponents[eventTypes.addFile] = AddedFileTaskEvent;


module.exports = React.createClass({
    displayName: 'TaskEvent',
    propTypes: {
        event: React.PropTypes.object.isRequired
    },
    render: function() {
        return React.createElement(
            eventComponents[this.props.event.type], { event: this.props.event });
    }
});
