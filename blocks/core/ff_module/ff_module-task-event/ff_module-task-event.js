'use strict';

var React = require('react');
var StampResponseAsSeenTaskEvent = require('./_src/StampResponseAsSeenTaskEvent.js'),
    SetTaskEvent = require('./_src/SetTaskEvent.js'),
    EditTaskEvent = require('./_src/EditTaskEvent.js'),
    ArchiveTaskEvent = require('./_src/ArchiveTaskEvent.js'),
    UnarchiveTaskEvent = require('./_src/UnarchiveTaskEvent.js'),
    AddedCommentEvent = require('./_src/AddedCommentEvent.js'),
    RequestResubmissionTaskEvent = require('./_src/RequestResubmissionTaskEvent'),
    MarkAsDoneTaskEvent = require('./_src/MarkAsDoneTaskEvent'),
    MarkAsUndoneTaskEvent = require('./_src/MarkAsUndoneTaskEvent'),
    ConfirmedCompleteTaskEvent = require('./_src/ConfirmedCompleteTaskEvent'),
    RevertToToDoTaskEvent = require('./_src/RevertToToDoTaskEvent'),
    ConfirmedStudentExcusedTaskEvent = require('./_src/ConfirmedStudentExcusedTaskEvent'),
    ConfirmedStudentUnExcusedTaskEvent = require('./_src/ConfirmedStudentUnExcusedTaskEvent'),
    MarkAndGradeTaskEvent = require('./_src/MarkAndGradeTaskEvent'),
    AddedFileTaskEvent = require('./_src/AddedFileTaskEvent'),
    SentReminderTaskEvent = require('./_src/SentReminderTaskEvent'),
    SentFeedbackAndMarks = require('./_src/SentFeedbackAndMarks'),
    InvalidType = require('./_src/InvalidType');

var eventTypes = require('./_src/events').types;
var eventStates = require('./_src/events').states;
var presentationStates = require('./_src/presentationStates').presentationStates;

var eventComponents = {};
eventComponents[eventTypes.setTask] = SetTaskEvent;
eventComponents[eventTypes.stampResponseAsSeen] = StampResponseAsSeenTaskEvent;
eventComponents[eventTypes.comment] = AddedCommentEvent;
eventComponents[eventTypes.requestResubmission] = RequestResubmissionTaskEvent;
eventComponents[eventTypes.markAsDone] = MarkAsDoneTaskEvent;
eventComponents[eventTypes.markAsUndone] = MarkAsUndoneTaskEvent;
eventComponents[eventTypes.confirmTaskIsComplete] = ConfirmedCompleteTaskEvent;
eventComponents[eventTypes.revertTaskToToDo] = RevertToToDoTaskEvent;
eventComponents[eventTypes.confirmStudentIsExcused] = ConfirmedStudentExcusedTaskEvent;
eventComponents[eventTypes.markAndGrade] = MarkAndGradeTaskEvent;
eventComponents[eventTypes.confirmStudentIsUnexcused] = ConfirmedStudentUnExcusedTaskEvent;
eventComponents[eventTypes.addFile] = AddedFileTaskEvent;
eventComponents[eventTypes.sendReminder] = SentReminderTaskEvent;
eventComponents[eventTypes.releaseFeedbackAndMarks] = SentFeedbackAndMarks;
eventComponents[eventTypes.editTask] = EditTaskEvent;
eventComponents[eventTypes.archivedTask] = ArchiveTaskEvent;
eventComponents[eventTypes.unarchivedTask] = UnarchiveTaskEvent;

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
    var componentType = getComponentType(description);
    return componentType[presentationState] || componentType[eventStates.default];
}

function getComponentType(description) {
    return eventComponents[description.type] || InvalidType;
}

module.exports = React.createClass({
    displayName: 'TaskEvent',
    propTypes: {
        description: React.PropTypes.shape({
            type: React.PropTypes.string.isRequired,
            sent: React.PropTypes.object.isRequired
        }).isRequired,
        localEventId: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number]).isRequired,
        actions: React.PropTypes.array,
        state: React.PropTypes.object,
        tryAgainCallback: React.PropTypes.func,
        loggedInUserGuid: React.PropTypes.string,
        recipient: React.PropTypes.object,
        setTransitionFinished: React.PropTypes.func.isRequired,
        setTaskDetails: React.PropTypes.object.isRequired
    },
    render: function() {
        var Component = getComponent(this.props.description, this.props.state);
        return <Component {...this.props} />;
    }
});
