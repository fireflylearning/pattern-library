'use strict';

var React = require('react');
var TaskEventBase = require('./TaskEventBase');

module.exports = React.createClass({
    displayName: 'AddedCommentEvent',
    render: function(){
        var commentText = this.props.event.message;
        var comment = commentText ? <blockquote className="ff_module-task-event__comment">&#8220;{commentText}&#8221;</blockquote> : null;

        return  <TaskEventBase event={this.props.event}>
                    <p className="ff_module-task-event__author-action">{this.props.event.author.name} added a comment:</p>
                    {comment}
                </TaskEventBase>
    }
});
