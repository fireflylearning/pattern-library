'use strict';

var React = require('react');
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
        return <DropDownButton key="actions" text="..." list={list} isDisabled={isDisabled} modifier="link" icon="response-edit" hideText={true} hideArrow={true} classes="ff_module-task-event__actions"/>
    }
    return null;
}

function renderStatus(props) {
    return <TaskEventStatus
        key="status"
        type={props.description.type}
        state={props.state || {}}
        tryAgainCallback={props.tryAgainCallback || function(){}}
        eventId={props.localEventId}
        setTransitionFinished={props.setTransitionFinished}
        classes='ff_module-task-event__status'/>
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
    },
    statics: {
        getAuthor: function(props) {
            if (props.description.author) {
                if (props.description.author.guid == props.loggedInUserGuid)
                    return "You";
                if (props.description.author.name)
                    return props.description.author.name;
            }
            return 'User';
        }
    }
});
