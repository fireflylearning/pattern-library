'use strict';

var React = require('react');
var dateFormatting = require('../../../_lib/_ui/dateFormatting')();
var ensureIsDate = require('../../../_lib/_ui/date-utils').ensureIsDate;
var DropDownButton = require('../../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component');
var TaskEventStatus = require('../../../ff_module/ff_module-task-event-status/ff_module-task-event-status');

var stateClasses = require('./events').stateClasses;
var eventStates = require('./events').states;

function formatDate(date) {
    var validDate = ensureIsDate(date);
    if (validDate) {
        return dateFormatting.niceDate(date);
    }
    return '';
}

function getPresentationState(event) {
    var state = eventStates.default;

    // TODO : Will need to update this to handle combinations/conflicts of states, etc.
    if (event.deleted) {
        state = eventStates.deleted;
    } else if (event.error) {
        state = eventStates.error;
    } else if (event.pending) {
        state = eventStates.pending;
    } else if (event.unreleased) {
        state = eventStates.unreleased;
    } else if (event.released) {
        state = eventStates.released;
    } else if (event.saved) {
        state = eventStates.saved;
    }

    return state;
}

function generateClass(base, props) {
    var classNames = [];
    classNames.push(base);
    var event = props.event || {},
        presentationClass = stateClasses[getPresentationState(event)];

    if (event.type) classNames.push(base + '--' + event.type);
    if (presentationClass) classNames.push(base + presentationClass);
    return classNames.join(' ');
}

function renderActions(props) {
    var list = props.actions;
    if (list && list.length) {
        return <DropDownButton text="..." list={list} modifier="link-right" icon="response-edit" hideText={true} hideArrow={true} classes="ff_module-task-event__actions"/>
    }
    return null;
}

module.exports = React.createClass({
    displayName: 'TaskEventBase',
    render: function(){
        return  <div className={generateClass('ff_module-task-event', this.props)}>
                    <time className="ff_module-task-event__sent">{formatDate(this.props.description.sent)}</time>
                    {renderActions(this.props)}
                    {this.props.children}
                    <TaskEventStatus event={this.props.event} classes='ff_module-task-event__status'/>
                </div>
    }
});
