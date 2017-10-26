'use strict';

var React = require('react');
var eventStates = require('./events').states,
    TaskEventBase = require('./TaskEventBase'),
    Utils = require('./utils'),
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;

var defaultState = React.createClass({
    displayName: 'AddedCommentEventDefault',
    render: renderDefault
});

var deletedState = React.createClass({
    displayName: 'AddedCommentEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted a comment.')
});

var editedState = React.createClass({
    displayName: 'AddedCommentEventEdited',
    render: renderDefault
});

function getEditedFlag(props) {
    var state = props.state || {};
    var isEdited = !!state[eventStates.edited];
    return isEdited ? <span className="ff_module-task-event__editedflag"> [Edited]</span> : null;
}

function getCommentEl(props){
    var description = props.description || {},
        commentText = description.message,
        editedFlag = getEditedFlag(props);

    return commentText ? <blockquote className="ff_module-task-event__comment">&#8220;{Utils.breakifyComponents(Utils.urlifyText(commentText))}&#8221;{editedFlag}</blockquote> : null;
}

function renderDefault(){
    var name = TaskEventBase.getAuthor(this.props),
        comment = getCommentEl(this.props);

    return  <TaskEventBase
                {...this.props}>
                <p className="ff_module-task-event__author-action">{name} added a comment:</p>
                {comment}
            </TaskEventBase>
}

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
