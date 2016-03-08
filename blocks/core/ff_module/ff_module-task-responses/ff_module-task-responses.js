'use strict';

var React = require('react'),
    Modal = require('react-modal'); // TODO: Update the modal styles to final version, TBD

var TaskResponseActions = require('../ff_module-task-response-actions/ff_module-task-response-actions'),
    TaskResponseRepeater = require('../ff_module-task-event-repeater/ff_module-task-event-repeater'),
    ContainerOverlay = require('../../ff_container/ff_container-overlay/ff_container-overlay'),
    EventEditor = require('../ff_module-task-event-editor/ff_module-task-event-editor');


module.exports = React.createClass({
    displayName: 'TaskResponses',
    render: function() {

        var editor = this.props.editingEvent ? this.renderEventEditor() : null;

        return React.createElement(ContainerOverlay, {
            modifier: 'absolute-top',
            classes: 'ff_container-overlay--task-event-scrollable-top',
            body: [React.createElement(TaskResponseRepeater, {
                events: this.props.events,
                key: 'response-repeater'
            }), editor],
            bar: React.createElement(TaskResponseActions, { onClick: this.onEventChange })
        });

    },
    onEventChange: function(event) {
        this.props.editEvent(event);
    },
    addEvent: function() {
        this.props.addEvent();
    },
    renderEventEditor: function() {
        var styles = {
            overlay: { zIndex: 10000000 }
        };
        return React.createElement(Modal, {
                key: 'response-modal',
                isOpen: !!this.props.editingEvent,
                onRequestClose: this.closeEventEditor,
                style: styles
            },
            React.createElement(EventEditor, {
                event: this.props.editingEvent,
                onChange: this.onEventChange,
                onSend: this.addEvent
            }));
    },
    closeEventEditor() {
        this.props.stopEditingEvent();
    }
});

