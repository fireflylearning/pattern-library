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

function getPresentationState(state) {
    state = state || {};
    var presentationState = eventStates.default;

    if (state.deleted) {
        presentationState = eventStates.deleted;
    } else if (state.error) {
        presentationState = eventStates.error;
    } else if (state.pending) {
        presentationState = eventStates.pending;
    } else if (state.unreleased) {
        presentationState = eventStates.unreleased;
    } else if (state.released) {
        presentationState = eventStates.released;
    } else if (state.saved) {
        presentationState = eventStates.saved;
    }

    return presentationState;
}

function canEdit(state){
    state = state || {};

    if (state.error || state.pending || state.deleted) {
        return false;
    }
    return true;
}

function generateClass(base, props) {
    var classNames = [];
    classNames.push(base);
    var description = props.description || {},
        presentationClass = stateClasses[getPresentationState(props.state)];

    if (description.type) classNames.push(base + '--' + description.type);
    if (presentationClass) classNames.push(base + presentationClass);
    return classNames.join(' ');
}

function renderActions(props) {
    var list = props.actions;
    if (list && list.length && canEdit(props.state)) {
        return <DropDownButton text="..." list={list} modifier="link-right" icon="response-edit" hideText={true} hideArrow={true} classes="ff_module-task-event__actions"/>
    }
    return null;
}

function renderStatus(props) {
    return <TaskEventStatus type={props.description.type} state={props.state || {}} onError={props.onRetryAfterStatusError} classes='ff_module-task-event__status'/>
}

module.exports = React.createClass({
    displayName: 'TaskEventBase',
    render: function(){
        return  <div className={generateClass('ff_module-task-event', this.props)}>
                    <time className="ff_module-task-event__sent">{formatDate(this.props.description.sent)}</time>
                    {renderActions(this.props)}
                    {this.props.children}
                    {renderStatus(this.props)}
                </div>
    }
});
