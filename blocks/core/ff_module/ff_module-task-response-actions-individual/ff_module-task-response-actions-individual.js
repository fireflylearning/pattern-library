'use strict';

var React = require('react'),
    _ = require('underscore');

var ContainerControlBar = require("../../ff_container/ff_container-control-bar/ff_container-control-bar");
var ControlBarSet = require("../../ff_container/ff_container-control-bar/_src/ControlBarSet.js");
var Button = require("../../ff_module/ff_module-button/ff_module-button");
var DropdownButton = require("../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component");
var TaskEvent = require('../../ff_module/ff_module-task-event/ff_module-task-event');
var events = require("../../ff_module/ff_module-task-event/_src/events" );
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;

var textValues = {};
textValues[events.types.confirmTaskIsComplete] = 'Mark as Done';
textValues[events.types.confirmTaskIsToDo] = 'Mark as To Do';
textValues[events.types.comment] = 'Send a Comment';
textValues[events.types.addFile] = 'Send a File';

var presentationList = {
    completeStatus: events.types.confirmTaskIsComplete,
    commentStatus: events.types.comment,
    fileStatus: events.types.addFile
};


function getText(type) {
    return textValues[type] || '';
}

function getList(state) {
    var newList = _.extend({}, presentationList);

    if (state.complete) {
        newList.completeStatus = events.types.confirmTaskIsToDo;
    }

    return newList;
}

module.exports = React.createClass({
    displayName: 'TaskResponseActionsIndividual',
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        state: React.PropTypes.object
    },
    render: function(){
        var state = this.props.state || {},
            list = getList(state);

        if (state.userCanEdit === false) return null;

        return (
            <div className={generateClasses("ff_module-task-response-actions", this.props)}>
                <ContainerControlBar
                    key="controlBarUpper">
                    <ControlBarSet>
                        <Button
                            key={list.fileStatus}
                            modifier="primary-compact"
                            text={getText(list.fileStatus, state)}
                            onClick={()=>this.onClick(list.fileStatus)}
                        />
                        <Button
                            key={list.completeStatus}
                            modifier="primary-compact"
                            text={getText(list.completeStatus, state)}
                            onClick={()=>this.onClick(list.completeStatus)}
                        />
                        <Button
                            key={list.commentStatus}
                            modifier="primary-compact"
                            text={getText(list.commentStatus, state)}
                            onClick={()=>this.onClick(list.commentStatus)}
                        />
                    </ControlBarSet>
                </ContainerControlBar>
            </div>
        );
    },
    createEvent: function(type) {
        return {
            description: { type: type },
            state: {}
        };
    },
    onClick: function(type) {
        this.props.onClick(this.createEvent(type));
    }
});
