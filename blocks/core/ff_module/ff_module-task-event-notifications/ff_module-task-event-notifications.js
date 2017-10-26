'use strict';

var React = require('react'),
    _ = require('underscore');

var NotificationBase = require('./_src/NotificationBase'),
    NotificationDeleteTask = require('./_src/NotificationDeleteTask'),
    simplePlural = require('../../_lib/_ui/grammar-utils.js').simplePlural,
    eventTypes = require('../ff_module-task-event/_src/events').types;


module.exports = React.createClass({
    displayName: 'TaskEventNotifications',
    propTypes: {
        event: React.PropTypes.shape({
            description: React.PropTypes.shape({
                type: React.PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
        onConfirm: React.PropTypes.func.isRequired,
        onClose: React.PropTypes.func.isRequired,
    },
    render: function() {
        var eventNotification = getEventEditor(this.props);
        if (eventNotification) {
            return React.createElement(eventNotification.base,
            _.extend({}, eventNotification.props, {
                onConfirm: this.onConfirm,
                onClose: this.onClose
            }),
            eventNotification.children);
        } else {
            return null;
        }
    },
    onConfirm: function() {
        this.props.onConfirm();
    },
    onClose: function() {
        this.props.onClose();
    }
});

function getEventEditor(props){
    if (props.event && eventNotificationComponents[props.event.description.type]) {
        return eventNotificationComponents[props.event.description.type](props);
    }
    else return null;
}

function createEventWithMessageNotification(editor) {
    return function(props) {
        return {
            base: NotificationBase,
            props: {
                title: editor.title,
                sendText: editor.sendText,
                closeText: editor.closeText,
                sendModifier: editor.sendModifier
            },
            children: editor.message(props)
        };
    };
}


function deleteTask(props) {

    return {
        base: NotificationDeleteTask,
        props: {
            event: props.event
        },
        children: null
    };
}

function getStudentText(num) {
    return simplePlural(num, 'student');
}

function getChangesText(num) {
    return simplePlural(num, 'change');
}

var eventNotificationComponents = {};

eventNotificationComponents[eventTypes.deleteTask] = deleteTask;
eventNotificationComponents[eventTypes.releaseFeedbackAndMarks] = createEventWithMessageNotification({
    title: "Send Responses",
    message: function(props) {
        var numAffected = (props.event.description && props.event.description.numRecipientsAffected) || 0;
        return <p>This will send responses immediately to <b>{numAffected} {getStudentText(numAffected)}</b>.</p>;
    },
    sendText: "Send",
    closeText: "Cancel"
});
eventNotificationComponents[eventTypes.sendReminder] = createEventWithMessageNotification({
    title: "Send Reminder",
    message: function(props) {
        var numAffected = (props.event.description && props.event.description.numRecipientsAffected) || 0;
        return <p>This will notify <b>{numAffected} {getStudentText(numAffected)}</b> that they have a task due soon.</p>
    },
    sendText: "Send",
    closeText: "Cancel"
});
eventNotificationComponents[eventTypes.toAllUpdate] = createEventWithMessageNotification({
    title: "Update for all",
    message: function(props) {
        var numAffected = (props.event.description && props.event.description.numRecipientsAffected) || 0;
        return <p>This will immediately update and release for all <b>{numAffected} {getStudentText(numAffected)}</b>.</p>
    },
    sendText: "Update",
    closeText: "Cancel"
});
eventNotificationComponents[eventTypes.toAllAdd] = createEventWithMessageNotification({
    title: "Release to all",
    message: function(props) {
        var numAffected = (props.event.description && props.event.description.numRecipientsAffected) || 0;
        return <p>This will immediately release to all <b>{numAffected} {getStudentText(numAffected)}</b>.</p>
    },
    sendText: "Release",
    closeText: "Cancel"
});
eventNotificationComponents[eventTypes.toAllDelete] = createEventWithMessageNotification({
    title: "Delete for all",
    message: function(props) {
        var numAffected = (props.event.description && props.event.description.numRecipientsAffected) || 0;
        return <p>This will immediately delete for all <b>{numAffected} {getStudentText(numAffected)}</b>.</p>
    },
    sendText: "Delete",
    closeText: "Cancel"
});

eventNotificationComponents[eventTypes.navigateTo] = createEventWithMessageNotification({
    title: "Saving changes...",
    message: function(props) {
        var outstandingChanges = props.event.description.outstandingChanges;
        return <p>{outstandingChanges} outstanding {getChangesText(outstandingChanges)} are being saved.<br />{props.event.description.description}</p>;
    },
    sendText: "Abandon changes",
    closeText: "Cancel"
});
