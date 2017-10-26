'use strict';

var React = require('react');

var TaskResponseActions = require('../ff_module-task-response-actions/ff_module-task-response-actions'),
    TaskResponseActionsIndividual = require('../ff_module-task-response-actions-individual/ff_module-task-response-actions-individual'),
    TaskResponseRepeater = require('../ff_module-task-event-repeater/ff_module-task-event-repeater'),
    EventEditor = require('../ff_module-task-event-editor/ff_module-task-event-editor'),
    ContainerModal = require('../../ff_container/ff_container-modal/ff_container-modal'),
    ContainerModalWithDialog = require('../../ff_container/ff_container-modal-with-dialog/ff_container-modal-with-dialog'),
    eventTypes = require('../ff_module-task-event/_src/events').types,
    TaskEvent = require('../../ff_module/ff_module-task-event/ff_module-task-event');

import Button from '../ff_module-button/ff_module-button';
import {generateStandardClass as generateClasses} from '../../_lib/_ui/class-utils.js';

function generateClassLocal(base, props) {
    var className = generateClasses(base, props);
    var mods = '';
    if (props.modifier) {
        mods = base+'--'+props.modifier+'-cannot-edit';
    } else {
        mods = base+'--cannot-edit';
    }

    if (props.state && props.state.userCanCreate === false) {
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
        completeEditingEvent: React.PropTypes.func,
        addEvent: React.PropTypes.func,
        nextRecipient: React.PropTypes.func,
        state: React.PropTypes.shape({
            userCanEdit: React.PropTypes.bool,
            userCanCreate: React.PropTypes.bool,
            excused: React.PropTypes.bool,
            complete: React.PropTypes.bool
        }),
        descriptionContainsQuestions: React.PropTypes.bool,
        editingEvent: React.PropTypes.shape(TaskEvent.PropTypes),
        editingEventForm: React.PropTypes.object,
        editorModels: React.PropTypes.object,
        editorValidation: React.PropTypes.object,
        actionsComponent: React.PropTypes.oneOf([
                React.PropTypes.instanceOf(TaskResponseActions),
                React.PropTypes.instanceOf(TaskResponseActionsIndividual)]),
        releaseMode: React.PropTypes.number.isRequired,
        allStudents: React.PropTypes.bool.isRequired,
        showSaveAndNext: React.PropTypes.bool,
        loggedInUserGuid: React.PropTypes.string,
        recipient: React.PropTypes.object,
        setTransitionFinished: React.PropTypes.func.isRequired,
        setTaskDetails: React.PropTypes.object.isRequired,
        updatePersistTaskEvent: React.PropTypes.func
    },
    render: function() {
        const { editingEvent } = this.props;
        const { couldNotMarkAsTodo } = this.state || {};

        let modal = null;
        if (editingEvent) {
            modal = this.renderEventEditor();
        } else if (couldNotMarkAsTodo) {
            modal = this.renderCouldNotMarkAsTodo();
        }

        var ActionsComponent = this.props.actionsComponent;
        var actions = (this.props.state && this.props.state.userCanCreate === false) || this.props.isTaskArchived ?
            null :
            <ActionsComponent
                    onClick={this.onEventChange}
                    onToggleCompleteStatus={this.toggleCompleteStatus}
                    state={this.props.state}
                    allStudentsSelected={this.props.allStudents}
                    isHiddenFromRecipients={this.props.isHiddenFromRecipients}
                    isPersonalTask={this.props.isPersonalTask}
                    isCompletedTask={this.props.isCompletedTask}
                    classes="ff_module-task-responses__actions"/>;

        return (
            <div className={generateClassLocal("ff_module-task-responses", this.props)}>
                {actions}
                <div className="ff_module-task-responses__content">
                    <TaskResponseRepeater
                        eventGroups={this.props.eventGroups}
                        key="response-repeater"
                        loggedInUserGuid={this.props.loggedInUserGuid}
                        setTransitionFinished={this.props.setTransitionFinished}
                        recipient={this.props.recipient}
                        setTaskDetails={this.props.setTaskDetails} />
                    {modal}
                </div>
            </div>
        );

    },
    onEventChange: function(event) {
        this.props.editEvent(event);
    },
    addEvent: function(event) {
        this.props.updatePersistTaskEvent(event);
        this.props.completeEditingEvent();
    },
    addEventAndNext: function(event) {
        this.props.updatePersistTaskEvent(event);
        this.props.completeEditingEvent(() => {
            this.props.nextRecipient();
            if (event) {
                this.props.editEvent(event);
            }
        });
    },
    renderCouldNotMarkAsTodo() {
        return (
            <ContainerModalWithDialog
                title="Mark as Todo"
                onClose={this.closeCouldNotMarkAsTodo}
                isOpen={this.state.couldNotMarkAsTodo}
                controls={[<Button
                    key="close"
                    modifier="tertiary-compact"
                    onClick={this.closeCouldNotMarkAsTodo}
                    text="OK"
                />]}
            >
                <p>
                    {'If you would like to complete this task again, please ask your teacher to Request Resubmission.'}
                </p>
            </ContainerModalWithDialog>);
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
                        eventForm={this.props.editingEventForm}
                        allStudents={this.props.allStudents}
                        studentName={this.props.recipient.name}
                        releaseMode={this.props.releaseMode}
                        onChange={this.onEventChange}
                        onSend={this.addEvent}
                        onNext={this.addEventAndNext}
                        onClose={this.closeEventEditor}
                        showSaveAndNext={this.props.showSaveAndNext}
                        persistTaskEventState={this.props.persistTaskEventState}
                        setInputInitialValue={this.props.setInputInitialValue}
                        />
                </ContainerModal>;
    },
    bindModalRef(component){
        this.modal = component;
    },
    closeEventEditor() {
        this.props.stopEditingEvent();
    },
    closeCouldNotMarkAsTodo() {
        this.setState({ couldNotMarkAsTodo: false });
    },
    getOverlay() {
        var modal = this.modal;
        if (modal) return modal.getOverlay();
        return undefined;
    },
    createEvent: function(type) {
        return {
            description: { type: type },
            state: {}
        };
    },
    toggleCompleteStatus: function() {
        const { state, addEvent, descriptionContainsQuestions, setTaskDetails } = this.props;
        const { complete } = state;

        const enableSubmissionControl = window && window.ff_globals && window.ff_globals.enableSubmissionsControl;
        if (enableSubmissionControl && descriptionContainsQuestions) {
            if (complete) {
                this.setState({ couldNotMarkAsTodo: true });
            }
            else {
                window.open(setTaskDetails.descriptionPageUrl);
            }
        }
        else {
            const event = this.createEvent(complete ? eventTypes.markAsUndone : eventTypes.markAsDone);
            addEvent(event);
        }
    }
});
