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
        return props.event.author.name + ' deleted ' + getFileText(props) + '.';
    })
});

function defaultState(){
    var files = this.props.event.files || [];
    var fileText = getFileText(this.props);

    return <TaskEventBase event={this.props.event}>
        <p className="ff_module-task-event__author-action">{this.props.event.author.name + ' added ' + fileText}:</p>
        <ModuleFileList files={files} classes="ff_module-task-event__files"/>
    </TaskEventBase>
}

function getFileText(props) {
    return (props.event.files && props.event.files.length > 1) ? 'files' : 'a file';
}
