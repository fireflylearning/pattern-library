'use strict';
var React = require('react/addons');
var _ = require('lodash');
var ContainerControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar');
var ControlBarSet = require('../../ff_container/ff_container-control-bar/_src/ControlBarSet.js');
var Button = require('../../ff_module/ff_module-button/ff_module-button');
var DropdownButton = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component');
var events = require('../../ff_module/ff_module-task-event/_src/events');
function onClick1() {
    this.onClick(events.types.confirmTaskIsComplete);
}
function onClick2() {
    this.onClick(events.types.markAndGrade);
}
module.exports = function () {
    return React.createElement('div', { 'className': 'ff_module-task-response-actions' }, React.createElement(ContainerControlBar, {
        'modifier': 'right',
        'key': 'controlBarUpper'
    }, React.createElement(ControlBarSet, {}, React.createElement(Button, {
        'key': events.types.confirmTaskIsComplete,
        'modifier': 'primary-compact',
        'text': 'Confirm As Completed',
        'onClick': onClick1.bind(this)
    }), React.createElement(Button, {
        'key': events.types.markAndGrade,
        'modifier': 'primary-compact',
        'text': 'Send Mark/Grade',
        'onClick': onClick2.bind(this)
    }), React.createElement(DropdownButton, {
        'id': 'more-actions',
        'key': 'more-actions',
        'modifier': 'primary-compact-right-widelist',
        'classes': 'ff_module-task-response-actions__dropdown',
        'text': 'More',
        'list': [
            {
                text: 'Stamp Response as Seen',
                key: events.types.stampResponseAsSeen,
                onClick: () => this.onClick(events.types.stampResponseAsSeen)
            },
            {
                text: 'Request Resubmission',
                key: events.types.requestResubmission,
                onClick: () => this.onClick(events.types.requestResubmission)
            },
            {
                text: 'Confirm Student is Excused',
                key: events.types.confirmStudentIsExcused,
                onClick: () => this.onClick(events.types.confirmStudentIsExcused)
            },
            {
                text: 'Send Comment',
                key: events.types.comment,
                onClick: () => this.onClick(events.types.comment)
            },
            {
                text: 'Send File',
                key: events.types.addFile,
                onClick: () => this.onClick(events.types.addFile)
            }
        ]
    }))));
};