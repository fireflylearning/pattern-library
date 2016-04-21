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
var eventStates = require('./_src/events').states;

var eventComponents = {};
eventComponents[eventTypes.setTask] = {};
eventComponents[eventTypes.setTask][eventStates.default] = SetTaskEvent.defaultState;
eventComponents[eventTypes.setTask][eventStates.deleted] = SetTaskEvent.deletedState;
// eventComponents[eventTypes.setTask][eventStates.pending] = SetTaskEvent;
// eventComponents[eventTypes.setTask][eventStates.error] = SetTaskEvent;

eventComponents[eventTypes.stampResponseAsSeen] = {};
eventComponents[eventTypes.stampResponseAsSeen][eventStates.default] = StampResponseAsSeenTaskEvent.defaultState;
eventComponents[eventTypes.stampResponseAsSeen][eventStates.deleted] = StampResponseAsSeenTaskEvent.deletedState;
// eventComponents[eventTypes.stampResponseAsSeen][eventStates.pending] = StampResponseAsSeenTaskEvent;
// eventComponents[eventTypes.stampResponseAsSeen][eventStates.error] = StampResponseAsSeenTaskEvent;

eventComponents[eventTypes.comment] = {};
eventComponents[eventTypes.comment][eventStates.default] = AddedCommentEvent.defaultState;
eventComponents[eventTypes.comment][eventStates.deleted] = AddedCommentEvent.deletedState;
// eventComponents[eventTypes.comment][eventStates.pending] = AddedCommentEvent.defaultState;
// eventComponents[eventTypes.comment][eventStates.error] = AddedCommentEvent.defaultState;

eventComponents[eventTypes.requestResubmission] = {};
eventComponents[eventTypes.requestResubmission][eventStates.default] = RequestResubmissionTaskEvent.defaultState;
eventComponents[eventTypes.requestResubmission][eventStates.deleted] = RequestResubmissionTaskEvent.deletedState;
// eventComponents[eventTypes.requestResubmission][eventStates.pending] = RequestResubmissionTaskEvent;
// eventComponents[eventTypes.requestResubmission][eventStates.error] = RequestResubmissionTaskEvent;

eventComponents[eventTypes.confirmTaskIsComplete] = {};
eventComponents[eventTypes.confirmTaskIsComplete][eventStates.default] = ConfirmedCompleteTaskEvent.defaultState;
eventComponents[eventTypes.confirmTaskIsComplete][eventStates.deleted] = ConfirmedCompleteTaskEvent.deletedState;
// eventComponents[eventTypes.confirmTaskIsComplete][eventStates.pending] = ConfirmedCompleteTaskEvent;
// eventComponents[eventTypes.confirmTaskIsComplete][eventStates.error] = ConfirmedCompleteTaskEvent;

eventComponents[eventTypes.confirmStudentIsExcused] = {};
eventComponents[eventTypes.confirmStudentIsExcused][eventStates.default] = ConfirmedStudentExcusedTaskEvent.defaultState;
eventComponents[eventTypes.confirmStudentIsExcused][eventStates.deleted] = ConfirmedStudentExcusedTaskEvent.deletedState;
// eventComponents[eventTypes.confirmStudentIsExcused][eventStates.pending] = ConfirmedStudentExcusedTaskEvent;
// eventComponents[eventTypes.confirmStudentIsExcused][eventStates.error] = ConfirmedStudentExcusedTaskEvent;

eventComponents[eventTypes.markAndGrade] = {};
eventComponents[eventTypes.markAndGrade][eventStates.default] = MarkAndGradeTaskEvent.defaultState;
eventComponents[eventTypes.markAndGrade][eventStates.deleted] = MarkAndGradeTaskEvent.deletedState;
// eventComponents[eventTypes.markAndGrade][eventStates.pending] = MarkAndGradeTaskEvent.defaultState;
// eventComponents[eventTypes.markAndGrade][eventStates.error] = MarkAndGradeTaskEvent.defaultState;

eventComponents[eventTypes.deleteResponse] = {};
eventComponents[eventTypes.deleteResponse][eventStates.default] = DeletedResponseTaskEvent.defaultState;
eventComponents[eventTypes.deleteResponse][eventStates.deleted] = DeletedResponseTaskEvent.deletedState;
// eventComponents[eventTypes.deleteResponse][eventStates.pending] = DeletedResponseTaskEvent;
// eventComponents[eventTypes.deleteResponse][eventStates.error] = DeletedResponseTaskEvent;

eventComponents[eventTypes.confirmStudentIsUnexcused] = {};
eventComponents[eventTypes.confirmStudentIsUnexcused][eventStates.default] = ConfirmedStudentUnExcusedTaskEvent.defaultState;
eventComponents[eventTypes.confirmStudentIsUnexcused][eventStates.deleted] = ConfirmedStudentUnExcusedTaskEvent.deletedState;
// eventComponents[eventTypes.confirmStudentIsUnexcused][eventStates.pending] = ConfirmedStudentUnExcusedTaskEvent;
// eventComponents[eventTypes.confirmStudentIsUnexcused][eventStates.error] = ConfirmedStudentUnExcusedTaskEvent;

eventComponents[eventTypes.addFile] = {};
eventComponents[eventTypes.addFile][eventStates.default] = AddedFileTaskEvent.defaultState;
eventComponents[eventTypes.addFile][eventStates.deleted] = AddedFileTaskEvent.deletedState;
// eventComponents[eventTypes.addFile][eventStates.pending] = AddedFileTaskEvent.defaultState;
// eventComponents[eventTypes.addFile][eventStates.error] = AddedFileTaskEvent.defaultState;

function getPresentationState(description, state) {
    state = state || {};
    var presentationState = eventStates.default;
    // TODO : Will need to update this to handle combinations/conflicts of states, etc.

    if (state.deleted) {
        presentationState = eventStates.deleted;
    }

    return presentationState;

}

function getComponent(description, state) {
    var presentationState = getPresentationState(description, state);
    return eventComponents[description.type][presentationState];
}

module.exports = React.createClass({
    displayName: 'TaskEvent',
    propTypes: {
        description: React.PropTypes.shape({
            type: React.PropTypes.string.isRequired,
            sent: React.PropTypes.object.isRequired
        }).isRequired,
        actions: React.PropTypes.array,
        state: React.PropTypes.object
    },
    render: function() {
        var Component = getComponent(this.props.description, this.props.state);
        return <Component {...this.props} />;
        // return React.createElement(getComponent(this.props.event), { event: this.props.event });
    },
    getName: function(){
        console.log(this.props.description.author.name);
    }
});
