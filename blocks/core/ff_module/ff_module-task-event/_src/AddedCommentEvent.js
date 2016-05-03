'use strict';

var React = require('react');
var eventStates = require('./events').states,
    TaskEventBase = require('./TaskEventBase'),
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

    return commentText ? <blockquote className="ff_module-task-event__comment">&#8220;{commentText}&#8221;{editedFlag}</blockquote> : null;
}

function getName(props){
    var description = props.description || {};
    return description.author && description.author.name || 'User';
}

function renderDefault(){
    var name = getName(this.props),
        comment = getCommentEl(this.props);

    return  <TaskEventBase
                description={this.props.description}
                actions={this.props.actions}
                state={this.props.state}
                onRetryAfterStatusError={this.props.onRetryAfterStatusError}>
                <p className="ff_module-task-event__author-action">{name} added a comment:</p>
                {comment}
            </TaskEventBase>
}

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
