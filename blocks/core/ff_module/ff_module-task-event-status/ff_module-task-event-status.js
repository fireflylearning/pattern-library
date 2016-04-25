'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var eventTypes = require('../ff_module-task-event/_src/events').types;
var eventStates = require('../ff_module-task-event/_src/events').states;
var stateClasses = require('../ff_module-task-event/_src/events').stateClasses;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

var messages = {};
messages[eventStates.default] = {};
messages[eventStates.default][eventStates.default] = '';
messages[eventStates.default][eventStates.released] = '';
messages[eventStates.default][eventStates.pending] = 'Sending';
messages[eventStates.default][eventStates.error] = 'Error Sending';
messages[eventStates.default][eventStates.saved] = 'Sent';
messages[eventStates.default][eventStates.unreleased] = 'Ready to Send';

messages[eventStates.deleted] = {};
messages[eventStates.deleted][eventStates.default] = '';
messages[eventStates.deleted][eventStates.released] = '';
messages[eventStates.deleted][eventStates.pending] = 'Deleting';
messages[eventStates.deleted][eventStates.error] = 'Error Deleting';
messages[eventStates.deleted][eventStates.saved] = 'Deleted';
messages[eventStates.deleted][eventStates.unreleased] = 'Ready to Delete';

function getPresentationState(state) {
    var presentationState = eventStates.default;

    if (state.error) {
        presentationState = eventStates.error;
    } else if (state.pending) {
        presentationState = eventStates.pending;
    } else if (state.unreleased) {
        presentationState = eventStates.unreleased;
    } else if (state.saved) {
        presentationState = eventStates.saved;
    }
    return presentationState;
}

function getM1State(state) {
    var m1State = eventStates.default;
    if (state.deleted) {
        m1State = eventStates.deleted;
    }
    return m1State;
}

function getGeneratedClass(base, props){
    var classNames = [base],
        type = getPresentationState(props.state);
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    if (!!props.className) classNames.push(props.className);
    if (stateClasses[type]) classNames.push(base+stateClasses[type]);
    return classNames.join(' ');
}

function getStatusMessage(props) {
    var state = getPresentationState(props.state),
        type = getM1State(props.state);
    return messages[type] && messages[type][state] || '';
}

function getIcon(props) {
    var type = getPresentationState(props.state);
    if (type === eventStates.saved) {
        return <span className='ff_icon ff_icon-tick-open-success ff_module-task-event-status__icon'></span>;
    }
    return null;
}

module.exports = React.createClass({
    displayName: 'TaskEventStatus',
    propTypes: {
        state: React.PropTypes.object.isRequired
    },
    render: function() {
        console.log(this.props.state);
        return <span className={getGeneratedClass('ff_module-task-event-status', this.props)}>
            {getIcon(this.props)}
            {getStatusMessage(this.props)}
        </span>;
    }
});
