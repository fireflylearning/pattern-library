'use strict';

var React = require('react'),
    _ = require('lodash');

var Button = require('../ff_module-button/ff_module-button'),
    eventTypes = require('../ff_module-task-event/_src/events').types;


module.exports = React.createClass({
    displayName: 'TaskEventEditor',
    render: function() {
        console.log(eventEditorComponents[this.props.event.type]);
        var eventEditor = eventEditorComponents[this.props.event.type](this.props);
        return React.createElement('div', {}, [
            React.createElement('h1', {}, eventEditor.title),
            eventEditor.children,
            React.createElement(Button, { text: eventEditor.sendText, onClick: this.onSend })
        ]);
    },
    onSend: function() {
        this.props.onSend();
    }
});


function createEventWithMessageEditor(editor) {
    var messageLabelElement = editor.messageLabel ? React.createElement('p', {}, editor.messageLabel) : null;

    return function(props) {
        var onMessageChange = function(event) {
            props.onChange(_.extend({}, props.event, { message: event.target.value }));
        };

        return {
            title: editor.title,
            sendText: editor.sendText,
            children: React.createElement('div', {}, [
                messageLabelElement,
                React.createElement('textarea', { onChange: onMessageChange, value: props.event.message })
            ])
        };

    };
}

function markAndGrade(props) {

    function eventUpdater(propertyName) {
        return function(event) {
            props.onChange(_.extend({}, props.event, {
                [propertyName]: event.target.value }));
        };
    }

    var onMarkChange = eventUpdater("mark");
    var onMarkMaxChange = eventUpdater("markMax");
    var onGradeChange = eventUpdater("grade");
    var onMessageChange = eventUpdater("message");

    return {
        title: "Mark and Grade",
        sendText: "Add Mark",
        children: React.createElement('div', {}, [
            React.createElement('p', {}, [
                'Mark: ',
                React.createElement('input', { value: props.event.mark, onChange: onMarkChange }),
                ' out of ',
                React.createElement('input', { value: props.event.markMax, onChange: onMarkMaxChange }),
            ]),
            React.createElement('p', {}, [
                'Grade: ',
                React.createElement('input', { value: props.event.grade, onChange: onGradeChange })
            ]),
            React.createElement('p', {}, 'Feedback Summary (optional)'),
            React.createElement('textarea', { value: props.event.message, onChange: onMessageChange })

        ]),



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
