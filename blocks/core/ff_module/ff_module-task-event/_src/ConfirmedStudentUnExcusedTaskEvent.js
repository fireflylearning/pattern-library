'use strict';

var React = require('react');
var TaskEventBase = require('./TaskEventBase.js');
var eventStates = require('./events').states,
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage').defaultState,
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState,
    taskEventWithOptionalMessageEdited = require('./taskEventWithOptionalMessage').editedState;

function text(props) {
    var author = TaskEventBase.getAuthor(props);
    var student = props.loggedInUserGuid == props.recipient.guid ? "you" : props.recipient.name;
    return author + ' unexcused ' + student;
}

var defaultState = React.createClass({
    displayName: 'ConfirmedUnStudentExcusedTaskEventDefault',
    render: taskEventWithOptionalMessage(text)
});

var deletedState = React.createClass({
    displayName: 'ConfirmedUnStudentExcusedTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted an unexcused confirmation.')
});

var editedState = React.createClass({
    displayName: 'ConfirmedUnStudentExcusedTaskEventDeleted',
    render: taskEventWithOptionalMessageEdited(text)
});

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
