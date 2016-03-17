'use strict';

var React = require('react'),
    Modal = require('react-modal'); // TODO: Update the modal styles to final version, TBD

var TaskResponseActions = require('../ff_module-task-response-actions/ff_module-task-response-actions'),
    TaskResponseRepeater = require('../ff_module-task-event-repeater/ff_module-task-event-repeater'),
    ContainerOverlay = require('../../ff_container/ff_container-overlay/ff_container-overlay'),
    EventEditor = require('../ff_module-task-event-editor/ff_module-task-event-editor'),
    ContainerModal = require('../../ff_container/ff_container-modal/ff_container-modal');


module.exports = React.createClass({
    displayName: 'TaskResponses',
    render: function() {

        var editor = this.props.editingEvent ? this.renderEventEditor() : null;

        return React.createElement(ContainerOverlay, {
            modifier: 'absolute-top',
            classes: 'ff_container-overlay--task-event-scrollable-top',
            body: React.createElement('div', {},
                React.createElement(TaskResponseRepeater, {
                events: this.props.events,
                key: 'response-repeater'
            }), editor),
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
        return <Modal
                    ref="ffContainerModal"
                    key="response-modal"
                    isOpen={!!this.props.editingEvent}
                    onRequestClose={this.closeEventEditor}
                    style={styles}>
                    <EventEditor
                        event={this.props.editingEvent}
                        onChange={this.onEventChange}
                        onSend={this.addEvent}
                        />
                </Modal>;
    },
    closeEventEditor() {
        this.props.stopEditingEvent();
    },
    getOverlay() {
        var ref = this.refs.ffContainerModal;
        if (ref) return ref.portal;
    },
    componentWillMount() {
        Modal.setAppElement('body');
    }
});
