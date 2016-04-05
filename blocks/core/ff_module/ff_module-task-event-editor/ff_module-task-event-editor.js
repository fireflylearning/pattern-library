'use strict';

var React = require('react'),
    _ = require('lodash');

var EditorBase = require('./_src/EditorBase'),
    EditorCommon = require('./_src/EditorCommon'),
    EditorMarkAndGrade = require('./_src/EditorMarkAndGrade'),
    EditorDelete = require('./_src/EditorDelete'),
    eventTypes = require('../ff_module-task-event/_src/events').types;


module.exports = React.createClass({
    displayName: 'TaskEventEditor',
    render: function() {
        var eventEditor = eventEditorComponents[this.props.event.type](this.props);
        return React.createElement(eventEditor.base,
            _.extend({}, eventEditor.props, {
                onSend: this.onSend,
                onClose: this.onClose
            }),
            eventEditor.children);
    },
    onSend: function() {
        this.props.onSend();
    },
    onClose: function() {
        this.props.onClose();
    }
});


function createEventWithMessageEditor(editor) {

    return function(props) {
        var onMessageChange = function(event) {
            props.onChange(_.extend({}, props.event, { message: event.target.value }));
        };

        return {
            base: EditorBase,
            props: {
                title: editor.title,
                sendText: editor.sendText,
            },
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
            var updated = {};
            updated[propertyName] = event.target.value;
            props.onChange(_.extend({}, props.event, updated));
        };
    }

    var onMarkChange = eventUpdater("mark");
    var onMarkMaxChange = eventUpdater("markMax");
    var onGradeChange = eventUpdater("grade");
    var onMessageChange = eventUpdater("message");

    return {
        base: EditorBase,
        props: {
            title: "Mark or Grade",
            sendText: "Add Mark or Grade"
        },
        children: React.createElement(EditorMarkAndGrade, {
            event: props.event,
            onMarkChange: onMarkChange,
            onGradeChange: onGradeChange,
            onMarkMaxChange: onMarkMaxChange,
            onMessageChange: onMessageChange
        })

    };
}

function deleteTask(props) {

    return {
        base: EditorDelete,
        props: {
            event: props.event
        },
        children: null
    };
}

var eventEditorComponents = {};

eventEditorComponents[eventTypes.stampResponseAsSeen] = createEventWithMessageEditor({
    title: "Stamp as Seen",
    messageLabel: "Feedback",
    sendText: "Send Stamp"
});
eventEditorComponents[eventTypes.requestResubmission] = createEventWithMessageEditor({
    title: "Request Resubmission",
    messageLabel: "Reason for Request",
    sendText: "Send Request"
});
eventEditorComponents[eventTypes.confirmTaskIsComplete] = createEventWithMessageEditor({
    title: "Confirm Task is Complete",
    messageLabel: "Feedback",
    sendText: "Send Confirmation"
});
eventEditorComponents[eventTypes.confirmStudentIsExcused] = createEventWithMessageEditor({
    title: "Confirm Student is Excused",
    messageLabel: "Comment",
    sendText: "Send Confirmation"
});
eventEditorComponents[eventTypes.comment] = createEventWithMessageEditor({
    title: "Comment",
    sendText: "Add Comment"
});
eventEditorComponents[eventTypes.markAndGrade] = markAndGrade;

// unconfirmed types
//
eventEditorComponents[eventTypes.deleteTask] = deleteTask;
