'use strict';

var React = require('react'),
    _ = require('underscore');

var ContainerControlBar = require("../../ff_container/ff_container-control-bar/ff_container-control-bar");
var ControlBarSet = require("../../ff_container/ff_container-control-bar/_src/ControlBarSet.js");
var Button = require("../../ff_module/ff_module-button/ff_module-button");
var DropdownButton = require("../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component");
var TaskEvent = require('../../ff_module/ff_module-task-event/ff_module-task-event');
var events = require("../../ff_module/ff_module-task-event/_src/events" );

var textValues = {};
textValues[events.types.confirmTaskIsComplete] = 'Confirm as Completed';
textValues[events.types.confirmTaskIsToDo] = 'Confirm as To Do';
textValues[events.types.markAndGrade] = 'Send Mark/Grade';
textValues[events.types.stampResponseAsSeen] = 'Stamp Response as Seen';
textValues[events.types.requestResubmission] = 'Request Resubmission';
textValues[events.types.confirmStudentIsExcused] = 'Confirm Student is Excused';
textValues[events.types.confirmStudentIsUnexcused] = 'Confirm Student is Unexcused';
textValues[events.types.comment] = 'Send Comment';
textValues[events.types.addFile] = 'Send File';

var textValuesAllStudents = {};
textValuesAllStudents[events.types.confirmStudentIsExcused] = 'Confirm All Students are Excused';
textValuesAllStudents[events.types.confirmStudentIsUnexcused] = 'Confirm All Students are Unexcused';

var presentationList = {
    completeStatus: events.types.confirmTaskIsComplete,
    markStatus: events.types.markAndGrade,
    responseSeenStatus: events.types.stampResponseAsSeen,
    resubmissionStatus: events.types.requestResubmission,
    excusedStatus: events.types.confirmStudentIsExcused,
    commentStatus: events.types.comment,
    fileStatus: events.types.addFile
};


function getText(type, state) {
    var text = textValues[type] || '';
    if (state && state.allStudents) {
        if (type === events.types.confirmStudentIsUnexcused || type === events.types.confirmStudentIsExcused) {
            text = textValuesAllStudents[type] || '';
        }
    }
    return text;
}

function getList(state) {
    var newList = _.extend({}, presentationList);

    if (state) {
        if (state.complete) {
            newList.completeStatus = events.types.confirmTaskIsToDo;
        }
        if (state.excused) {
            newList.excusedStatus = events.types.confirmStudentIsUnexcused;
        }
    }

    return newList;
}

module.exports = React.createClass({
    displayName: 'TaskResponseActions',
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        state: React.PropTypes.object
    },
    render: function(){
        var state = this.props.state,
            list = getList(state);

        return (
            <div className="ff_module-task-response-actions">
                <ContainerControlBar
                    modifier= "right"
                    key="controlBarUpper">
                    <ControlBarSet>
                        <Button
                            key={list.completeStatus}
                            modifier="primary-compact"
                            text={getText(list.completeStatus, state)}
                            onClick={()=>this.onClick(list.completeStatus)}
                        />
                        <Button
                            key={list.markStatus}
                            modifier="primary-compact"
                            text={getText(list.markStatus, state)}
                            onClick={()=>this.onClick(list.markStatus)}
                        />
                        <DropdownButton
                            id="more-actions"
                            key="more-actions"
                            modifier="primary-compact-right-widelist"
                            classes="ff_module-task-response-actions__dropdown"
                            text="More"
                            list= {[
                                    {
                                        text: getText(list.responseSeenStatus, state),
                                        key: list.responseSeenStatus,
                                        onClick: ()=>this.onClick(list.responseSeenStatus)
                                    }, {
                                        text: getText(list.resubmissionStatus, state),
                                        key: list.resubmissionStatus,
                                        onClick: ()=>this.onClick(list.resubmissionStatus)
                                    }, {
                                        text: getText(list.excusedStatus, state),
                                        key: list.excusedStatus,
                                        onClick: ()=>this.onClick(list.excusedStatus)
                                    },{
                                        text: getText(list.commentStatus, state),
                                        key: list.commentStatus,
                                        onClick: ()=>this.onClick(list.commentStatus)
                                    },{
                                        text: getText(list.fileStatus, state),
                                        key: list.fileStatus,
                                        onClick: ()=>this.onClick(list.fileStatus)
                                    },
                                ]}
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
