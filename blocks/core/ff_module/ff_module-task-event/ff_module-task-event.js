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
    AddedFileTaskEvent = require('./_src/AddedFileTaskEvent'),
    SentReminderTaskEvent = require('./_src/SentReminderTaskEvent'),
    SentFeedbackAndMarks = require('./_src/SentFeedbackAndMarks');

var eventTypes = require('./_src/events').types;
var eventStates = require('./_src/events').states;
var presentationStates = require('./_src/presentationStates').presentationStates;

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
eventComponents[eventTypes.sendReminder] = SentReminderTaskEvent;
eventComponents[eventTypes.releaseFeedbackAndMarks] = SentFeedbackAndMarks;

function getPresentationState(description, state) {
    state = state || {};
    var presentationState = eventStates.default;

    if (state[eventStates.deleted] || state[eventStates.deleteSuccess]) {
        presentationState = presentationStates.deleted;
    } else if (state[eventStates.edited] || state[eventStates.editSuccess]) {
        presentationState = presentationStates.edited;
    }

    return presentationState;
}

function getComponent(description, state) {
    var presentationState = getPresentationState(description, state);
    return eventComponents[description.type][presentationState] || eventComponents[description.type][eventStates.default];
}

module.exports = React.createClass({
    displayName: 'TaskEvent',
    propTypes: {
        description: React.PropTypes.shape({
            type: React.PropTypes.string.isRequired,
            sent: React.PropTypes.object.isRequired
        }).isRequired,
        actions: React.PropTypes.array,
        state: React.PropTypes.object,
        onRetryAfterStatusError: React.PropTypes.func.isRequired
    },
    render: function() {
        var Component = getComponent(this.props.description, this.props.state);
        return <Component {...this.props} />;
    }
});
