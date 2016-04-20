'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var eventTypes = require('../ff_module-task-event/_src/events').types;
var eventStates = require('../ff_module-task-event/_src/events').states;
var stateClasses = require('../ff_module-task-event/_src/events').stateClasses;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

var messages = {};
messages[eventStates.default] = '';
messages[eventStates.unreleased] = '';
messages[eventStates.pending] = 'Sending';
messages[eventStates.error] = 'Waiting to Send';
messages[eventStates.saved] = 'Sent';
messages[eventStates.unreleased] = 'Ready to Send';

function getGeneratedClass(base, props){
    var classNames = [base];
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    if (!!props.className) classNames.push(props.className);
    if (stateClasses[props.type]) classNames.push(base+stateClasses[props.type]);
    return classNames.join(' ');
}

function getStatusMessage(props) {
    return messages[props.type] || '';
}

function getIcon(props) {
    if (props.type === eventStates.saved) {
        return <span className='ff_icon ff_icon-tick-open-success ff_module-task-event-status__icon'></span>;
    }
    return null;
}

module.exports = React.createClass({
    displayName: 'TaskEventStatus',
    propTypes: {
        type: React.PropTypes.string.isRequired
    },
    render: function() {
        return <span className={getGeneratedClass('ff_module-task-event-status', this.props)}>
            {getIcon(this.props)}
            {getStatusMessage(this.props)}
        </span>;
    }
});
