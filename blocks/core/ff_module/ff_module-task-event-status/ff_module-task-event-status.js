'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Button = require('../ff_module-button/ff_module-button');

var eventTypes = require('../ff_module-task-event/_src/events').types,
    eventStates = require('../ff_module-task-event/_src/events').states,
    presentationStates = require('./_src/presentationStates').presentationStates,
    stateClasses = require('./_src/presentationStates').stateClasses;

var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

function getTryAgainText(text, props, showButton) {
    var onErrorHandler = props.onError || function(){},
        tryAgainButton = showButton ? <span> <Button text='Try again.' modifier='link' classes='ff_module-task-event-status__error-button' onClick={onErrorHandler} /></span> : null;

    return <span className='ff_module-task-event-status__text'>{text}{tryAgainButton}</span>;
}

function getStatusMessage(props, presentationState) {

    var messages = {};
    messages[presentationStates.default] = '';

    messages[presentationStates.pendingSend]   = getTryAgainText('Sending', props);
    messages[presentationStates.sent]          = getTryAgainText('Sent', props);
    messages[presentationStates.erroredSend]   = getTryAgainText('Your response didn\'t send.', props, true);

    messages[presentationStates.pendingSave]   = getTryAgainText('Saving', props);
    messages[presentationStates.saved]         = getTryAgainText('Saved', props);
    messages[presentationStates.erroredSave]   = getTryAgainText('Your response didn\'t save.', props, true);

    messages[presentationStates.pendingEdit]           = getTryAgainText('Saving', props);
    messages[presentationStates.pendingEditReleased]   = getTryAgainText('Sending', props);
    messages[presentationStates.erroredEdit]           = getTryAgainText('Your edit didn\'t save.', props, true);
    messages[presentationStates.erroredEditReleased]   = getTryAgainText('Your edit didn\'t send.', props, true);

    messages[presentationStates.pendingDelete] = getTryAgainText('Deleting', props);
    messages[presentationStates.erroredDelete] = getTryAgainText('Your response didn\'t delete.', props, true);

    messages[presentationStates.unreleased]    = getTryAgainText('Ready to Send', props);

    return messages[presentationState] || '';
}

function getDeleteState(state) {
    var deleteState = '';
    state = state || {};
    if (state[eventStates.deleted] || state[eventStates.deleteSuccess]) {
        deleteState = presentationStates.deleted; // deleted overrides any send-states
    }
    // we don't care about edited, sent or saved here

    return deleteState;
}

function getReleaseState(state) {
    var releaseState = '';
    state = state || {};
    if (!state[eventStates.released]) {
        releaseState = presentationStates.unreleased;
    }
    return releaseState;
}

function getTransientDisplayState(eventState, uiState) {
    var transientDisplayState = '';

    eventState = eventState || {};

    if (uiState.transientDisplayStatesActive) {
        if (eventState[eventStates.success] || eventState[eventStates.editSuccess]) {
            if (eventState[eventStates.released]) {
                transientDisplayState = presentationStates.sent;
            } else {
                transientDisplayState = presentationStates.saved;
            }
        }
    }
    return transientDisplayState;
}

function getSendState(state) {
    var sendState = '';
    state = state || {};


    if (state[eventStates.error]) {
        if (state[eventStates.released]) {
            sendState = presentationStates.erroredSend;
        } else {
            sendState = presentationStates.erroredSave;
        }

    } else if (state[eventStates.editError]) {

        if (state[eventStates.released]) {
            sendState = presentationStates.erroredEditReleased;
        } else {
            sendState = presentationStates.erroredEdit;
        }
    } else if (state[eventStates.deleteError]) {

        sendState = presentationStates.erroredDelete;

    } else if (state[eventStates.pending]) {

        if (state[eventStates.released]) {
            sendState = presentationStates.pendingSend;
        } else {
            sendState = presentationStates.pendingSave;
        }

    } else if (state[eventStates.editPending]) {

        if (state[eventStates.released]) {
            sendState = presentationStates.pendingEditReleased;
        } else {
            sendState = presentationStates.pendingEdit;
        }

    } else if (state[eventStates.deletePending]) {

        sendState = presentationStates.pendingDelete;

    }

    return sendState;
}

function getPresentationState(eventState, uiState) {

    var sendState = getSendState(eventState),
        editState = getDeleteState(eventState),
        transientDisplayState = getTransientDisplayState(eventState, uiState),
        releaseState = getReleaseState(eventState),

        presentationState = eventStates.default;

    if (editState) {
        presentationState = editState;
    } else if (sendState) {
        presentationState = sendState;
    } else if (transientDisplayState) {
        presentationState = transientDisplayState;
    } else if (releaseState) {
        presentationState = releaseState;
    }


    return presentationState;
}

function getGeneratedClass(base, props, presentationState){
    var classNames = [base];

    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    if (!!props.className) classNames.push(props.className);

    if (stateClasses[presentationState]) classNames.push(base + stateClasses[presentationState]);

    return classNames.join(' ');
}

function getContentClass(base, presentationState) {
    var classNames = [base];

    if (stateClasses[presentationState]) classNames.push(base+stateClasses[presentationState]);

    return classNames.join(' ');
}

function getWrapperClass(base, props, presentationState) {
    var stateClass = stateClasses[presentationState];
    var classNames = [base + '__transition-wrapper'];

    if (stateClass) classNames.push(base + '__transition-wrapper' + stateClass);
    if (props.classes) {
        classNames.push(props.classes + '__transition-wrapper');
        if (stateClass) classNames.push(props.classes + '__transition-wrapper' + stateClass);
    }

    return classNames.join(' ');
}


function getIconClass(base, props, presentationState) {
    var classNames = [],
        classSuffix = [base];

    switch (presentationState) {
        case presentationStates.saved:
        case presentationStates.sent:
            classNames = ['ff_icon','ff_icon-tick-open-success'].concat(classSuffix);
            break;
        case presentationStates.pendingEdit:
        case presentationStates.pendingEditReleased:
        case presentationStates.pendingSave:
        case presentationStates.pendingSend:
        case presentationStates.pendingDelete:
            classNames = ['ff_icon','ff_icon-response-pending'].concat(classSuffix);
            break;
        case presentationStates.erroredSave:
        case presentationStates.erroredSend:
        case presentationStates.erroredEdit:
        case presentationStates.erroredEditReleased:
            classNames = ['ff_icon','ff_icon-response-errored'].concat(classSuffix);
            break;
    }

    return classNames.join(' ');
}

function getIcon(props, presentationState) {
    return <span className={getIconClass('ff_module-task-event-status__icon', props, presentationState)}></span>;
}

var StatusItem = React.createClass({
    render: function(){
        var presentationState = this.props.presentationState;

        return <div className={this.props.containerClass}>
                {this.props.icon}
                {this.props.statusMessage}
            </div>
    }
})

module.exports = React.createClass({
    displayName: 'TaskEventStatus',
    propTypes: {
        state: React.PropTypes.object.isRequired,
        onError: React.PropTypes.func.isRequired
    },
    getInitialState: function(){
        return {
            transientDisplayStatesActive: true
        }
    },

    componentWillReceiveProps(nextProps){
        var nextPresentatationState = getPresentationState(nextProps.state, this.state);

        if (this.hasTransientDisplayState(nextPresentatationState)) {
            this.initTransientDisplayStateTimeout();
        }
    },
    componentWillMount: function(){
        var presentationState = getPresentationState(this.props.state, this.state);
        // only start timeout if presentationState requires it
        if (this.hasTransientDisplayState(presentationState)) {
            this.initTransientDisplayStateTimeout();
        }
    },
    hasTransientDisplayState: function(presentationState){
        switch(presentationState) {
            case presentationStates.saved:
            case presentationStates.sent:
                return true;
                break;
        }
        return false;
    },
    initTransientDisplayStateTimeout: function(){
        var self = this;

        if (this.state.transitionTimeout) {
            window.clearTimeout(this.state.transitionTimeout);
            this.setState({
                transitionTimeout: null
            });
        }

        var transitionTimeout = window.setTimeout(function() {
            self.setState({
                transientDisplayStatesActive: false
            });
        }, 5000);

        this.setState({
            transitionTimeout: transitionTimeout
        });
    },
    render: function() {
        var baseClassName = 'ff_module-task-event-status',
            presentationState = getPresentationState(this.props.state, this.state),
            containerClass = getGeneratedClass(baseClassName, this.props, presentationState),
            icon = getIcon(this.props, presentationState),
            statusMessage = getStatusMessage(this.props, presentationState);

        var items = [<StatusItem key={presentationState} presentationState={presentationState} containerClass={containerClass} icon={icon} statusMessage={statusMessage} />];

        return <ReactCSSTransitionGroup transitionName="transition" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} component='div' className={getWrapperClass(baseClassName, this.props, presentationState)}>
                    {items}
                </ReactCSSTransitionGroup>;

    }
});
