'use strict';

var React = require('react'),
    _ = require('lodash');

var NotificationBase = require('./_src/NotificationBase'),
    NotificationDeleteTask = require('./_src/NotificationDeleteTask'),
    eventTypes = require('../ff_module-task-event/_src/events').types;
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
    if (eventNotificationComponents[props.event.description.type]) return eventNotificationComponents[props.event.description.type](props);
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

var eventNotificationComponents = {};

eventNotificationComponents[eventTypes.deleteTask] = deleteTask;
eventNotificationComponents[eventTypes.releaseFeedbackAndMarks] = createEventWithMessageNotification({
    title: "Send Feedback and Marks",
    message: function(props) {
        return <p>This will release marks and feedback immediately to <b>{props.event.numRecipientsAffected} students</b>.</p>;
    },
    sendText: "Send",
    closeText: "Cancel"
});
eventNotificationComponents[eventTypes.sendReminder] = createEventWithMessageNotification({
    title: "Send Reminder",
    message: function(props) {
        return <p>This will notify <b>{props.event.numRecipientsAffected} students</b> that they have a task due soon.</p>
    },
    sendText: "Send",
    closeText: "Cancel"
});
