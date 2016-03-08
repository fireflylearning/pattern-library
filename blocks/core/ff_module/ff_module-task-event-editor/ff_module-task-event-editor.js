'use strict';

var React = require('react'),
    _ = require('lodash');

var EditorBase = require('./_src/EditorBase'),
    EditorCommon = require('./_src/EditorCommon'),
    EditorMarkAndGrade = require('./_src/EditorMarkAndGrade'),
    eventTypes = require('../ff_module-task-event/_src/events').types;


module.exports = React.createClass({
    displayName: 'TaskEventEditor',
    render: function() {
        var eventEditor = eventEditorComponents[this.props.event.type](this.props);

        return React.createElement(EditorBase, {
                title: eventEditor.title,
                sendText: eventEditor.sendText,
                onSend: this.onSend
            },
            eventEditor.children);
    },
    onSend: function() {
        this.props.onSend();
    }
});


function createEventWithMessageEditor(editor) {

    return function(props) {
        var onMessageChange = function(event) {
            props.onChange(_.extend({}, props.event, { message: event.target.value }));
        };

        return {
            title: editor.title,
            sendText: editor.sendText,
            children: React.createElement(EditorCommon, {
                messageLabel: editor.messageLabel,
                onMessageChange: onMessageChange,
                event: props.event
            })
        };

    };
}

function markAndGrade(props) {

    function eventUpdater(propertyName) {
        return function(event) {
            props.onChange(_.extend({}, props.event, {
                [propertyName]: event.target.value
            }));
        };
    }


    var onMarkChange = eventUpdater("mark");
    var onMarkMaxChange = eventUpdater("markMax");
    var onGradeChange = eventUpdater("grade");
    var onMessageChange = eventUpdater("message");

    return {
        title: "Mark and Grade",
        sendText: "Add Mark",
        children: React.createElement(EditorMarkAndGrade, {
            event: props.event,
            onMarkChange: onMarkChange,
            onGradeChange: onGradeChange,
            onMarkMaxChange: onMarkMaxChange,
            onMessageChange: onMessageChange
        })

    };
}

var eventEditorComponents = {
    [eventTypes.stampResponseAsSeen]: createEventWithMessageEditor({
        title: "Stamp as Seen",
        messageLabel: "Feedback (optional)",
        sendText: "Send Stamp"
    }),
    [eventTypes.requestResubmission]: createEventWithMessageEditor({
        title: "Request Resubmission",
        messageLabel: "Reason for Request (optional)",
        sendText: "Send Request"
    }),
    [eventTypes.confirmTaskIsComplete]: createEventWithMessageEditor({
        title: "Confirm Task is Complete",
        messageLabel: "Feedback (optional)",
        sendText: "Send Confirmation"
    }),
    [eventTypes.confirmStudentIsExcused]: createEventWithMessageEditor({
        title: "Confirm Student is Excused",
        messageLabel: "Comment (optional)",
        sendText: "Send Confirmation"
    }),
    [eventTypes.comment]: createEventWithMessageEditor({
        title: "Comment",
        sendText: "Add Comment"
    }),
    [eventTypes.markAndGrade]: markAndGrade
};
