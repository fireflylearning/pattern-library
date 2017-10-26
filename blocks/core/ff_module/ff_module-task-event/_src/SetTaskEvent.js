'use strict';

var React = require('react');
var eventStates = require('./events').states,
    TaskEventBase = require('./TaskEventBase'),
    Button = require('../../ff_module-button/ff_module-button'),
    FileList = require("../../ff_module-file-list/ff_module-file-list.js"),
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState,
    convertToDateObjectIfDateString = require('../../../_lib/_ui/date-utils').convertToDateObjectIfDateString,
    toLongMonthDateString = require('../../../_lib/_ui/dateFormatting')().toLongMonthDateString;

var defaultState = React.createClass({
    displayName: 'SetTaskEventDefault',
    render: renderDefault
});

var deletedState = React.createClass({
    displayName: 'SetTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted this task.')
});

var editedState = React.createClass({
    displayName: 'SetTaskEventEdited',
    render: renderDefault
});

function renderDefault(){
    var description = this.props.description,
        name = TaskEventBase.getAuthor(this.props),
        taskTitle = description.taskTitle,
        setTaskDetails = this.props.setTaskDetails,
        editedFlag = getEditedFlag(this.props);

    var dueDate = convertToDateObjectIfDateString(setTaskDetails.dueDate);

    return  <TaskEventBase {...this.props}>
                <p className="ff_module-task-event__author-action">{name} set a task:</p>
                <p className="ff_module-task-event__task-title">{taskTitle}{editedFlag}</p>
                { dueDate ? `Due: ${toLongMonthDateString(dueDate)}` : null }
                { renderViewDescriptionButton(setTaskDetails.descriptionPageUrl) }
                { renderAttachments(setTaskDetails.attachments) }
            </TaskEventBase>;
}

function renderViewDescriptionButton(descriptionPageUrl) {
    if (descriptionPageUrl == null) {
        return;
    }

    return <Button
        text="View Description"
        modifier="tertiary"
        icon="task-description"
        onClick={() => { window.open(descriptionPageUrl, "_blank"); }}/>;
}

function renderAttachments(attachments) {
    if (attachments == null || attachments.length <= 0) {
        return;
    }

    return <FileList files={attachments} ></FileList>;
}

function getEditedFlag(props) {
    var state = props.state || {};
    var isEdited = !!state[eventStates.edited];
    return isEdited ? <span className="ff_module-task-event__editedflag"> [Edited]</span> : null;
}

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
