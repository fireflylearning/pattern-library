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

var taskEventWithOptionalMessage = require('./_src/taskEventWithOptionalMessage');

var eventTypes = require('./_src/events').types;
var eventStates = require('./_src/events').states;

var eventComponents = {};
eventComponents[eventTypes.setTask] = {};
eventComponents[eventTypes.setTask][eventStates.default] = SetTaskEvent;

eventComponents[eventTypes.stampResponseAsSeen] = {};
eventComponents[eventTypes.stampResponseAsSeen][eventStates.default] = StampResponseAsSeenTaskEvent;

eventComponents[eventTypes.comment] = {};
eventComponents[eventTypes.comment][eventStates.default] = AddedCommentEvent.defaultState;
eventComponents[eventTypes.comment][eventStates.deleted] = AddedCommentEvent.deletedState;

eventComponents[eventTypes.requestResubmission] = {};
eventComponents[eventTypes.requestResubmission][eventStates.default] = RequestResubmissionTaskEvent;

eventComponents[eventTypes.confirmTaskIsComplete] = {};
eventComponents[eventTypes.confirmTaskIsComplete][eventStates.default] = ConfirmedCompleteTaskEvent;

eventComponents[eventTypes.confirmStudentIsExcused] = {};
eventComponents[eventTypes.confirmStudentIsExcused][eventStates.default] = ConfirmedStudentExcusedTaskEvent;

eventComponents[eventTypes.markAndGrade] = {};
eventComponents[eventTypes.markAndGrade][eventStates.default] = MarkAndGradeTaskEvent.defaultState;
eventComponents[eventTypes.markAndGrade][eventStates.deleted] = MarkAndGradeTaskEvent.deletedState;

eventComponents[eventTypes.deleteResponse] = {};
eventComponents[eventTypes.deleteResponse][eventStates.default] = DeletedResponseTaskEvent;

eventComponents[eventTypes.confirmStudentIsUnexcused] = {};
eventComponents[eventTypes.confirmStudentIsUnexcused][eventStates.default] = ConfirmedStudentUnExcusedTaskEvent;

eventComponents[eventTypes.addFile] = {};
eventComponents[eventTypes.addFile][eventStates.default] = AddedFileTaskEvent.defaultState;
eventComponents[eventTypes.addFile][eventStates.deleted] = AddedFileTaskEvent.deletedState;

function getState(event) {
    var state;
    // TODO : Will need to update this to handle combinations/conflicts of states, etc.
    switch (true) {
        case !!event.deleted:
            state = eventStates.deleted;
            break;
        // case !!event.pending:
        //     state = eventStates.pending;
        //     break;
        // case !!event.error:
        //     state = eventStates.error;
        //     break;
        // case !!event.released:
        //     state = eventStates.released;
        //     break;
        default:
            state = eventStates.default;
    }
    return state;
}

function getComponent(event){
    event.presentationState = getState(event);
    return eventComponents[event.type][event.presentationState];
}

module.exports = React.createClass({
    displayName: 'TaskEvent',
    propTypes: {
        event: React.PropTypes.object.isRequired,
        onDelete: React.PropTypes.func.isRequired,
        onEdit: React.PropTypes.func.isRequired
    },
    render: function() {
        var eventActionsVar = eventActions(this.props);
        return React.createElement(
            getComponent(this.props.event), { 
                event: this.props.event,
                eventActionsList: eventActionsVar
            });
    }
});

var eventActions = function(props) {
    var actions = [];
    deleteAction(actions, props);
    editAction(actions, props);
    return actions;
}

var deleteAction = function(actions, props) {
    console.log(props);
    if (props.event.canDelete) {
        actions.push({
            text: 'Delete',
            key: eventTypes.delete,
            onClick: props.onDelete
        });
    }
}

var editAction = function(actions, props) {
    if (props.event.canEdit) {
        actions.push({
            text: "Edit",
            key: "event-edit",
            onClick: props.onEdit
        });
    }
}
