'use strict';

var React = require('react');
var TaskEventBase = require('./TaskEventBase'),
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage');

module.exports.defaultState = React.createClass({
    displayName: 'AddedCommentEventDefault',
    render: defaultState
});

module.exports.deletedState = React.createClass({
    displayName: 'AddedCommentEventDeleted',
    render: taskEventWithOptionalMessage('deleted a comment.')
});


function defaultState(){
    var description = this.props.description || {},
        commentText = description.message,
        name = description.author && description.author.name || 'User',
        comment = commentText ? <blockquote className="ff_module-task-event__comment">&#8220;{commentText}&#8221;</blockquote> : null;


    return  <TaskEventBase description={description} actions={this.props.actions}>
                <p className="ff_module-task-event__author-action">{name} added a comment:</p>
                {comment}
            </TaskEventBase>
}
