'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var eventTypes = require('../ff_module-task-event/_src/events').types;
var eventStates = require('../ff_module-task-event/_src/events').states;
var stateClasses = require('../ff_module-task-event/_src/events').stateClasses;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

var messages = {};
messages[eventStates.default] = '';

messages[eventStates.pending] = 'Sending';
messages[eventStates.saved] = 'Sent';
messages[eventStates.error] = 'Error Sending';

messages[states.pendingEdit] = 'Sending';
messages[states.edited] = '';
messages[states.errorEditing] = 'There was a problem editing. Try again.';

messages[states.pendingDelete] = 'Sending';
messages[states.deleted] = '';
messages[states.errorDeleting] = 'There was a problem editing. Try again.';


messages[eventStates.released] = '';
messages[eventStates.unreleased] = 'Ready to Send';


function getPresentationState(state) {
    var presentationState = eventStates.default;


    if (state.error) {
        presentationState = eventStates.error;
    } else if (state.errorEditing) {
        presentationState = eventStates.errorEditing;
    } else if (state.errorDeleting) {
        presentationState = eventStates.errorDeleting;

    } else if (state.pending) {
        presentationState = eventStates.pending;
    } else if (state.pendingEdit) {
        presentationState = eventStates.pendingEdit;
    } else if (state.pendingDelete) {
        presentationState = eventStates.pendingDelete;

    } else if (state.saved) {
        presentationState = eventStates.saved;
    } else if (state.edited) {
        presentationState = eventStates.edited;
    } else if (state.deleted) {
        presentationState = eventStates.deleted;


    } else if (state.unreleased) {
        presentationState = eventStates.unreleased;
    }

    return presentationState;
}

// function getM1State(state) {
//     var m1State = eventStates.default;
//     if (state.deleted) {
//         m1State = eventStates.deleted;
//     }
//     return m1State;
// }

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
    var state = getPresentationState(props.state);
        // type = getM1State(props.state);
    return messages[state] || '';
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
        return <span className={getGeneratedClass('ff_module-task-event-status', this.props)}>
            {getIcon(this.props)}
            {getStatusMessage(this.props)}
        </span>;
    }
});
