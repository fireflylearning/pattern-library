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
    return author + ' excused ' + student;
}

var defaultState = React.createClass({
    displayName: 'ConfirmedStudentExcusedTaskEventDefault',
    render: taskEventWithOptionalMessage(text)
});

var deletedState = React.createClass({
    displayName: 'ConfirmedStudentExcusedTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted('deleted a confirmation of excuse.')
});

var editedState = React.createClass({
    displayName: 'ConfirmedStudentExcusedTaskEventEdited',
    render: taskEventWithOptionalMessageEdited(text)
});


module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
