'use strict';

var React = require('react');
var TaskEventBase = require('./TaskEventBase'),
    ModuleFileList = require('../../ff_module-file-list/ff_module-file-list'),
    taskEventWithOptionalMessage = require('./taskEventWithOptionalMessage');

module.exports.defaultState = React.createClass({
    displayName: 'AddedFileTaskEventDefault',
    render: defaultState
});

module.exports.deletedState = React.createClass({
    displayName: 'AddedFileTaskEventDeleted',
    render: taskEventWithOptionalMessage(function(props) {
        return props.description.author.name + ' deleted ' + getFileText(props.description.files) + '.';
    })
});

function defaultState(){
    var description = this.props.description,
        files = description.files || [],
        name = description.author.name,
        fileText = getFileText(files);

    return <TaskEventBase description={description}>
        <p className="ff_module-task-event__author-action">{name + ' added ' + fileText}:</p>
        <ModuleFileList files={files} classes="ff_module-task-event__files"/>
    </TaskEventBase>
}

function getFileText(files) {
    return (files.length > 1) ? files.length + ' files' : 'a file';
}
