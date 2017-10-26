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
textValues[events.types.confirmTaskIsComplete] = 'Confirm as Completed';
textValues[events.types.revertTaskToToDo] = 'Revert to To Do';
textValues[events.types.markAndGrade] = 'Add Mark, Grade or Feedback';
textValues[events.types.stampResponseAsSeen] = 'Stamp Response as Seen';
textValues[events.types.requestResubmission] = 'Request Resubmission';
textValues[events.types.confirmStudentIsExcused] = 'Confirm Student is Excused';
textValues[events.types.confirmStudentIsUnexcused] = 'Confirm Student is Unexcused';
textValues[events.types.comment] = 'Add Comment';
textValues[events.types.addFile] = 'Add File';

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

    if (state.complete) {
        newList.completeStatus = events.types.revertTaskToToDo;
    }
    if (state.excused) {
        newList.excusedStatus = events.types.confirmStudentIsUnexcused;
    }

    return newList;
}

module.exports = React.createClass({
    displayName: 'TaskResponseActions',
    propTypes: {
        onClick: React.PropTypes.func.isRequired,
        state: React.PropTypes.shape({
            userCanEdit: React.PropTypes.bool,
            userCanCreate: React.PropTypes.bool,
            excused: React.PropTypes.bool,
            confirmedCompletion: React.PropTypes.bool,
            complete: React.PropTypes.bool
        }),
        allStudentsSelected: React.PropTypes.bool,
        isCompletedTask: React.PropTypes.bool.isRequired
    },
    render: function(){
        var state = this.props.state || {},
            list = getList(state);

        if (!state.userCanCreate) return null;

        return (
            <div className={generateClasses("ff_module-task-response-actions", this.props)}>
                <ContainerControlBar
                    modifier= "right"
                    key="controlBarUpper">
                    <ControlBarSet>
                        {this.renderCompletedToggleButton(list.completeStatus, state)}
                        <Button
                            key={list.markStatus}
                            modifier="tertiary-compact"
                            text={getText(list.markStatus, state)}
                            onClick={()=>this.onClick(list.markStatus)}
                        />
                        <DropdownButton
                            id="more-actions"
                            key="more-actions"
                            modifier="tertiary-compact"
                            classes="ff_module-task-response-actions__dropdown"
                            text="More"
                            list={this.getDropDownButtons(list)}
                        />
                    </ControlBarSet>
                </ContainerControlBar>
            </div>
        );
    },
    renderCompletedToggleButton(completeStatus, state) {
        if (this.props.isHiddenFromRecipients && !this.props.isShownInParentPortal) return null;
        return <Button
            key={completeStatus}
            modifier="tertiary-compact"
            text={getText(completeStatus, state)}
            onClick={()=>this.onClick(completeStatus)}
        />;
    },
    createEvent: function(type) {
        return {
            description: { type: type },
            state: {}
        };
    },
    onClick: function(type) {
        this.props.onClick(this.createEvent(type));
    },
    getDropDownButtons: function(list) {
        let dropDownList = [{
                text: getText(list.commentStatus, this.props.state),
                key: list.commentStatus,
                onClick: ()=>this.onClick(list.commentStatus)
            },{
                text: getText(list.fileStatus, this.props.state),
                key: list.fileStatus,
                onClick: ()=>this.onClick(list.fileStatus)
            }
        ];

        if (!this.props.allStudentsSelected) {
            dropDownList.unshift({
                text: getText(list.excusedStatus, this.props.state),
                key: list.excusedStatus,
                onClick: ()=>this.onClick(list.excusedStatus)
            });
        }

        if (!this.props.isHiddenFromRecipients) {
            dropDownList.unshift({
                text: getText(list.resubmissionStatus, this.props.state),
                key: list.resubmissionStatus,
                onClick: ()=>this.onClick(list.resubmissionStatus)
            });
        }

        return dropDownList;
    }
});
