'use strict';

var React = require('react');
var StampResponseAsSeenTaskEvent = require('./_src/_StampResponseAsSeenTaskEvent.js'),
    SetTaskEvent = require('./_src/_SetTaskEvent.js'),
    AddedCommentEvent = require('./_src/_AddedCommentEvent.js'),
    RequestResubmissionTaskEvent = require('./_src/_RequestResubmissionTaskEvent'),
    ConfirmedCompleteTaskEvent = require('./_src/_ConfirmedCompleteTaskEvent'),
    ConfirmedStudentExcusedTaskEvent = require('./_src/_ConfirmedStudentExcusedTaskEvent');

var eventTypes = require('./_src/events').types;

var eventComponents = {
    [eventTypes.setTask]: SetTaskEvent,
    [eventTypes.stampResponseAsSeen]: StampResponseAsSeenTaskEvent,
    [eventTypes.comment]: AddedCommentEvent,
    [eventTypes.requestResubmission]: RequestResubmissionTaskEvent,
    [eventTypes.confirmTaskIsComplete]: ConfirmedCompleteTaskEvent,
    [eventTypes.confirmStudentIsExcused]: ConfirmedStudentExcusedTaskEvent
};


module.exports = React.createClass({
    displayName: 'TaskEvent',
    render: function() {
        return React.createElement(
            eventComponents[this.props.event.type], { event: this.props.event });
    }
});
