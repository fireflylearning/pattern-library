'use strict';

var React = require('react');
var dateFormatting = require('../../../_lib/_ui/dateFormatting')();
var ensureIsDate = require('../../../_lib/_ui/date-utils').ensureIsDate;
var DropDownButton = require('../../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component');
var TaskEventStatus = require('../../../ff_module/ff_module-task-event-status/ff_module-task-event-status');

var generateClass = require('./utils').generateClass;


function canEdit(state){
    state = state || {};

    if (state.pending || state.editPending || state.deletePending) {
        return false;
    }
    return true;
}

function renderActions(props) {
    var list = props.actions;
    var isDisabled = !canEdit(props.state);
    if (list && list.length) {
        return <DropDownButton text="..." list={list} isDisabled={isDisabled} modifier="link-right" icon="response-edit" hideText={true} hideArrow={true} classes="ff_module-task-event__actions"/>
    }
    return null;
}

function renderStatus(props) {
    return <TaskEventStatus type={props.description.type} state={props.state || {}} onError={props.onRetryAfterStatusError || function(){}} classes='ff_module-task-event__status'/>
}

module.exports = React.createClass({
    displayName: 'TaskEventBase',
    render: function(){
        return (
            <div className={generateClass('ff_module-task-event', this.props)}>
                {renderActions(this.props)}
                {this.props.children}
                {renderStatus(this.props)}
            </div>
        );
    }
});
