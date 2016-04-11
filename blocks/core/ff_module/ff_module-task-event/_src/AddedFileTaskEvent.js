'use strict';

var React = require('react');
var TaskEventBase = require('./TaskEventBase'),
    FileList = require('../../ff_module-file-list/ff_module-file-list');

module.exports = React.createClass({
    displayName: 'AddedFileTaskEvent',
    render: function(){
        var files = this.props.event.files || [];
        var fileText = (files && files.length > 1) ? 'files': 'a file';

        return <TaskEventBase event={this.props.event}>
            <p className="ff_module-task-event__author-action">{this.props.event.author.name} added {fileText}:</p>
            <FileList files={files} classes="ff_module-task-event__files"/>
        </TaskEventBase>
    }
});
