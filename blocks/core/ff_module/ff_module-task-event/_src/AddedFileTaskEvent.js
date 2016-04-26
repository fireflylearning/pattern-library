'use strict';

var React = require('react');
var eventStates = require('./events').states,
    TaskEventBase = require('./TaskEventBase'),
    ModuleFileList = require('../../ff_module-file-list/ff_module-file-list'),
    taskEventWithOptionalMessageDeleted = require('./taskEventWithOptionalMessage').deletedState;

var defaultState = React.createClass({
    displayName: 'AddedFileTaskEventDefault',
    render: defaultState
});

var deletedState = React.createClass({
    displayName: 'AddedFileTaskEventDeleted',
    render: taskEventWithOptionalMessageDeleted(function(props) {
        return props.description.author.name + ' deleted ' + getFileText(props.description.files) + '.';
    })
});

var editedState = 'p';

function defaultState(){
    var description = this.props.description,
        files = description.files || [],
        name = description.author.name,
        fileText = getFileText(files);

    return <TaskEventBase description={description} actions={this.props.actions} state={this.props.state}>
        <p className="ff_module-task-event__author-action">{name + ' added ' + fileText}:</p>
        <ModuleFileList files={files} classes="ff_module-task-event__files"/>
    </TaskEventBase>
}

function getFileText(files) {
    return (files.length > 1) ? files.length + ' files' : 'a file';
}

module.exports = {};
module.exports[eventStates.default] = defaultState;
module.exports[eventStates.deleted] = deletedState;
module.exports[eventStates.edited] = editedState;
