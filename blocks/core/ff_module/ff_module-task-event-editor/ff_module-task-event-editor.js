'use strict';

var React = require('react'),
    _ = require('lodash');

var EditorBase = require('./_src/EditorBase'),
    EditorBaseMini = require('./_src/EditorBaseMini'),
    EditorCommon = require('./_src/EditorCommon'),
    EditorMarkAndGrade = require('./_src/EditorMarkAndGrade'),
    EditorAddFile = require('./_src/EditorAddFile'),
    eventTypes = require('../ff_module-task-event/_src/events').types,
    eventStates = require('../ff_module-task-event/_src/events').states;


module.exports = React.createClass({
    displayName: 'TaskEventEditor',
    propTypes: {
        event: React.PropTypes.object.isRequired,
        onSend: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onClose: React.PropTypes.func.isRequired,
    },
    render: function() {
        var eventEditor = getEventEditor(this.props);
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

function getEventEditor(props){
    if (props.event.erroredSend) {
        return eventEditorComponents[eventStates.erroredSend](props);
    } else if (props.event.erroredSave) {
        return eventEditorComponents[eventStates.erroredSave](props);
    } else {
        return eventEditorComponents[props.event.type](props);
    }
}

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

function createEventWithMessageNotification(editor) {
    return function(props) {
        return {
            base: EditorBaseMini,
            props: {
                title: editor.title,
                sendText: editor.sendText,
                closeText: editor.closeText,
                sendModifier: editor.sendModifier
            },
            children: editor.message(props)
        };
    }
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

function addFile(props) {

    var onFileDrop = function(event) {
        props.onChange(_.extend({}, props.event, { files: event.dataTransfer.files }));
    };

    return {
        base: EditorBase,
        props: {
            title: 'File',
            sendText: 'Add File',
        },
        children: <div><br/><EditorAddFile
                event={props.event}
                onFileDrop={onFileDrop}/></div>

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

//
// unconfirmed types
//
eventEditorComponents[eventTypes.addFile] = addFile;
eventEditorComponents[eventTypes.deleteResponse] = createEventWithMessageNotification({
    title: "Delete Feedback",
    message: function(props) {
        return  <p>
                    Delete feedback to {props.event.author.name}.<br/>
                    This cannot be undone.</p>
    },
    sendText: "Delete",
    closeText: "Cancel",
    sendModifier: "danger"
});

//
// unconfirmed states
//
eventEditorComponents[eventStates.erroredSend] = createEventWithMessageNotification({
    title: "Unable to Send Feedback",
    message: function(props) {
        return  <p>We'll try again in a few seconds</p>
    },
    sendText: "Try again",
    closeText: "Close"
});
eventEditorComponents[eventStates.erroredSave] = createEventWithMessageNotification({
    title: "Unable to Save Feedback",
    message: function(props) {
        return  <p>We'll try again in a few seconds</p>
    },
    sendText: "Try again",
    closeText: "Close"
});
