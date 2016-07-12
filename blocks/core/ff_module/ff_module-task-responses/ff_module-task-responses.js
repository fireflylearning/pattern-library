'use strict';

var React = require('react'),
    Modal = require('react-modal');

var TaskResponseActions = require('../ff_module-task-response-actions/ff_module-task-response-actions'),
    TaskResponseActionsIndividual = require('../ff_module-task-response-actions-individual/ff_module-task-response-actions-individual'),
    TaskResponseRepeater = require('../ff_module-task-event-repeater/ff_module-task-event-repeater'),
    ContainerOverlay = require('../../ff_container/ff_container-overlay/ff_container-overlay'),
    EventEditor = require('../ff_module-task-event-editor/ff_module-task-event-editor'),
    ContainerModal = require('../../ff_container/ff_container-modal/ff_container-modal'),
    TaskEvent = require('../../ff_module/ff_module-task-event/ff_module-task-event');

var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;

function generateClassLocal(base, props) {
    var className = generateClasses(base, props);
    var mods = '';
    if (props.modifier) {
        mods = base+'--'+props.modifier+'-cannot-edit';
    } else {
        mods = base+'--cannot-edit';
    }

    if (props.state && props.state.userCanEdit === false) {
        className = className + ' ' + mods;
    }
    return className;
}

module.exports = React.createClass({
    displayName: 'TaskResponses',
    props: {
        eventGroups: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.shape(TaskEvent.PropTypes))).isRequired,
        editEvent: React.PropTypes.func,
        stopEditingEvent: React.PropTypes.func,
        addEvent: React.PropTypes.func,
        state: React.PropTypes.shape({
            userCanEdit: React.PropTypes.bool
        }),
        editingEvent: React.PropTypes.shape(TaskEvent.PropTypes),
        editorModels: React.PropTypes.object,
        editorValidation: React.PropTypes.object,
        actionsComponent: React.PropTypes.oneOf([
                React.PropTypes.instanceOf(TaskResponseActions),
                React.PropTypes.instanceOf(TaskResponseActionsIndividual)])
    },
    render: function() {

        var editor = this.props.editingEvent ? this.renderEventEditor() : null;
        var ActionsComponent = this.props.actionsComponent ? this.props.actionsComponent : TaskResponseActions;
        var actions = this.props.state && (this.props.state.userCanEdit === false) ?
            null :
            <ActionsComponent
                    onClick={this.onEventChange}
                    state={this.props.state}
                    classes="ff_module-task-responses__actions"/>;

        return (
            <div className={generateClassLocal("ff_module-task-responses", this.props)}>
                {actions}
                <div className="ff_module-task-responses__content">
                    <TaskResponseRepeater
                        eventGroups={this.props.eventGroups}
                        key="response-repeater" />
                    {editor}
                </div>
            </div>
        )

    },
    onEventChange: function(event) {
        this.props.editEvent(event);
    },
    addEvent: function() {
        this.props.addEvent();
    },
    renderEventEditor: function() {
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
