'use strict';

var React = require('react');
var StampResponseAsSeenTaskEvent = require('./_src/_StampResponseAsSeenTaskEvent.js'),
    SetTaskEvent = require('./_src/_SetTaskEvent.js'),
    AddedCommentEvent = require('./_src/_AddedCommentEvent.js'),
    RequestResubmissionTaskEvent = require('./_src/_RequestResubmissionTaskEvent'),
    ConfirmedCompleteTaskEvent = require('./_src/_ConfirmedCompleteTaskEvent'),
    ConfirmedStudentExcusedTaskEvent = require('./_src/_ConfirmedStudentExcusedTaskEvent'),
    MarkAndGradeTaskEvent = require('./_src/_MarkAndGradeTaskEvent');

var eventTypes = require('./_src/events').types;

var eventComponents = {};
eventComponents[eventTypes.setTask] = SetTaskEvent;
eventComponents[eventTypes.stampResponseAsSeen] = StampResponseAsSeenTaskEvent;
eventComponents[eventTypes.comment] = AddedCommentEvent;
eventComponents[eventTypes.requestResubmission] = RequestResubmissionTaskEvent;
eventComponents[eventTypes.confirmTaskIsComplete] = ConfirmedCompleteTaskEvent;
eventComponents[eventTypes.confirmStudentIsExcused] = ConfirmedStudentExcusedTaskEvent;
eventComponents[eventTypes.markAndGrade] = MarkAndGradeTaskEvent;

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
