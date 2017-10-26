'use strict';

var React = require('react'),
    _ = require('underscore');

var ContainerControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar');
var ControlBarSet = require('../../ff_container/ff_container-control-bar/_src/ControlBarSet.js');
var Button = require('../../ff_module/ff_module-button/ff_module-button');
var events = require('../../ff_module/ff_module-task-event/_src/events' );
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;

var textValues = {};
textValues[events.types.markAsDone] = () => 'Mark as Done';
textValues[events.types.markAsUndone] = () => 'Mark as To Do';
textValues[events.types.comment] = (props) => `${getSendTypeText(props)} a Comment`;
textValues[events.types.addFile] = (props) => `${getSendTypeText(props)} a File`;

var presentationList = {
    completeStatus: events.types.markAsDone,
    commentStatus: events.types.comment,
    fileStatus: events.types.addFile
};

function getText(type, props) {
    return textValues[type](props) || '';
}

function getSendTypeText(props) {
    return props.isPersonalTask ? 'Save' : 'Send';
}

function getList(state) {
    var newList = _.extend({}, presentationList);
    if (state.complete) {
        newList.completeStatus = events.types.markAsUndone;
    }

    return newList;
}

module.exports = React.createClass({
    displayName: 'TaskResponseActionsIndividual',
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        onToggleCompleteStatus: React.PropTypes.func.isRequired,
        addEvent: React.PropTypes.func.isRequired,
        state: React.PropTypes.object,
        isPersonalTask: React.PropTypes.bool.isRequired,
        isCompletedTask: React.PropTypes.bool.isRequired
    },
    render: function(){
        var state = this.props.state || {},
            props = this.props,
            list = getList(state);

        if (state.userCanCreate === false) return null;
        var completeStatusModifier = (list.completeStatus === events.types.markAsDone) ?
            'primary-compact' :
            'tertiary-compact';

        return (
            <div className={generateClasses('ff_module-task-response-actions', this.props)}>
                <ContainerControlBar
                    key="controlBarUpper">
                    <ControlBarSet>
                        <Button
                            key={list.fileStatus}
                            modifier="primary-compact"
                            text={getText(list.fileStatus, props)}
                            onClick={()=>this.onClick(list.fileStatus)}
                        />
                        { !props.isCompletedTask ? <Button
                            key={list.completeStatus}
                            modifier={completeStatusModifier}
                            text={getText(list.completeStatus, props)}
                            onClick={this.props.onToggleCompleteStatus}
                        /> : null }
                        <Button
                            key={list.commentStatus}
                            modifier="primary-compact"
                            text={getText(list.commentStatus, props)}
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
