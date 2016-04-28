'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Button = require('../ff_module-button/ff_module-button');

var eventTypes = require('../ff_module-task-event/_src/events').types,
    eventStates = require('../ff_module-task-event/_src/events').states,
    stateClasses = require('../ff_module-task-event/_src/events').stateClasses;

var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

function getTryAgainText(text, props, showButton) {
    var onErrorHandler = props.onError || function(){},
        tryAgainButton = showButton ? <Button text='Try again.' modifier='link' classes='ff_module-task-event-status__error-button' onClick={onErrorHandler} /> : null;

    return <span className='ff_module-task-event-status__text'>{text} {tryAgainButton}</span>;
}

function getStatusMessage(props, presentationState) {

    var messages = {};
    messages[eventStates.default] = '';

    messages[eventStates.pendingSend]   = getTryAgainText('Sending', props);
    messages[eventStates.sent]          = getTryAgainText('Sent', props);
    messages[eventStates.erroredSend]   = getTryAgainText('There was a problem sending.', props, true);

    messages[eventStates.pendingSave]   = getTryAgainText('Saving', props);
    messages[eventStates.saved]         = getTryAgainText('Saved', props);
    messages[eventStates.erroredSave]   = getTryAgainText('There was a problem saving.', props, true);

    messages[eventStates.pendingEdit]   = getTryAgainText('Saving', props);
    messages[eventStates.edited]        = '';
    messages[eventStates.erroredEdit]   = getTryAgainText('There was a problem editing.', props, true);

    messages[eventStates.pendingDelete] = getTryAgainText('Deleting', props);
    messages[eventStates.deleted]       = '';
    messages[eventStates.erroredDelete] = getTryAgainText('There was a problem deleting.', props, true);

    messages[eventStates.released]      = '';
    messages[eventStates.unreleased]    = getTryAgainText('Ready to Send', props);

    return messages[presentationState] || '';
}

function getEditState(state) {
    var editState = '';
    state = state || {};
    if (state[eventStates.deleted]) {
        editState = eventStates.deleted; // deleted overrides any send-states
    }
    // we don't care about edited, sent or saved here

    return editState;
}

function getReleaseState(state) {
    var releaseState = '';
    state = state || {};
    if (state[eventStates.unreleased]) {
        releaseState = eventStates.unreleased;
    }
    return releaseState;
}

function getTransientDisplayState(eventState, uiState) {
    var transientDisplayState = '';

    eventState = eventState || {};

    if (uiState.transientDisplayStatesActive) {
        if (eventState[eventStates.saved]) {
            transientDisplayState = eventStates.saved;
        } else if (eventState[eventStates.sent]) {
            transientDisplayState = eventStates.sent;
        }
    }
    return transientDisplayState;
}

function getSendState(state) {
    var sendState = '';
    state = state || {};

    if (state[eventStates.erroredSend]) {
        sendState = eventStates.erroredSend;
    } else if (state[eventStates.erroredSave]) {
        sendState = eventStates.erroredSave;
    } else if (state[eventStates.erroredEdit]) {
        sendState = eventStates.erroredEdit;
    } else if (state[eventStates.erroredDelete]) {
        sendState = eventStates.erroredDelete;

    } else if (state[eventStates.pendingSend]) {
        sendState = eventStates.pendingSend;
    } else if (state[eventStates.pendingSave]) {
        sendState = eventStates.pendingSave;
    } else if (state[eventStates.pendingEdit]) {
        sendState = eventStates.pendingEdit;
    } else if (state[eventStates.pendingDelete]) {
        sendState = eventStates.pendingDelete;
    }

    return sendState;
}

function getPresentationState(eventState, uiState) {

    var sendState = getSendState(eventState),
        editState = getEditState(eventState),
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

function hasTransientClasses(props) {
    var sendState = getSendState(props.state);
    return !sendState && !!(props.state[eventStates.saved] || props.state[eventStates.sent]);
}

function getIconClass(base, props, presentationState) {
    var classNames = [base];

    switch (presentationState) {
        case eventStates.saved:
        case eventStates.sent:
            classNames = ['ff_icon','ff_icon-tick-open-success'].concat(classNames);
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
    initTransientDisplayStateTimeout: function(){
        var self = this;

        if (this.state.transitionTimeout) {
            clearTimeout(this.state.transitionTimeout);
            this.setState({
                transitionTimeout: null
            });
        }

        var transitionTimeout = setTimeout(function() {
            self.setState({
                transientDisplayStatesActive: false
            });
        }, 5000);

        this.setState({
            transitionTimeout: transitionTimeout
        });
    },
    componentWillReceiveProps(){
        this.initTransientDisplayStateTimeout();
    },
    componentWillMount: function(){
        this.initTransientDisplayStateTimeout();
    },
    render: function() {

        var presentationState = getPresentationState(this.props.state, this.state),
            containerClass = getGeneratedClass('ff_module-task-event-status', this.props, presentationState),
            icon = getIcon(this.props, presentationState),
            statusMessage = getStatusMessage(this.props, presentationState);

        var items = [<StatusItem key={presentationState} presentationState={presentationState} containerClass={containerClass} icon={icon} statusMessage={statusMessage} />];

        return <ReactCSSTransitionGroup transitionName="transition" transitionEnterTimeout={1000} transitionLeaveTimeout={1000} component='div' className='ff_module-task-event-status__transition-wrapper'>
                    {items}
                </ReactCSSTransitionGroup>;

    }
});
