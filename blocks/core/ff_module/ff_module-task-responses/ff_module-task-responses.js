'use strict';

var React = require('react'),
    Modal = require('react-modal');

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
                eventGroups: this.props.eventGroups,
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
        return <ContainerModal
                    ref={this.bindModalRef}
                    isOpen={!!this.props.editingEvent}
                    onRequestClose={this.closeEventEditor}
                    >
                    <EventEditor
                        validation={this.props.editorValidation}
                        models={this.props.editorModels}
                        event={this.props.editingEvent}
                        onChange={this.onEventChange}
                        onSend={this.addEvent}
                        onClose={this.closeEventEditor}
                        />
                </ContainerModal>;
    },
    bindModalRef(component){
        this.modal = component;
    },
    closeEventEditor() {
        this.props.stopEditingEvent();
    },
    getOverlay() {
        var modal = this.modal;
        if (modal) return modal.getOverlay();
        return undefined;
    },
    componentWillMount() {
        if (typeof document !== "undefined" && document.body) {
            Modal.setAppElement(document.body);
        }
    }
});
