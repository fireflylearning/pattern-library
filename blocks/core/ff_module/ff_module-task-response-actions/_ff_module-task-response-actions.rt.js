'use strict';
var React = require('react/addons');
var _ = require('lodash');
var ContainerControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar');
var ControlBarSet = require('../../ff_container/ff_container-control-bar/_src/ControlBarSet.js');
var Button = require('../../ff_module/ff_module-button/ff_module-button');
var DropdownButton = require('../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component');
var events = require('../../ff_module/ff_module-task-event/_src/events');
function onClick1() {
    this.props.onClick({ type: events.types.comment });
}
function onClick2() {
    this.props.onClick({ type: events.types.markAndGrade });
}
module.exports = function () {
    return React.createElement('div', { 'className': 'ff_module-task-response-actions' }, React.createElement(ContainerControlBar, {
        'modifier': 'right',
        'key': 'controlBarUpper'
    }, React.createElement(ControlBarSet, {}, React.createElement(Button, {
        'key': events.types.comment,
        'modifier': 'primary-compact',
        'text': 'Comment',
        'onClick': onClick1.bind(this)
    }), React.createElement(Button, {
        'key': events.types.markAndGrade,
        'modifier': 'primary-compact',
        'text': 'Mark/Grade',
        'onClick': onClick2.bind(this)
    }), React.createElement(DropdownButton, {
        'id': 'more-actions',
        'key': 'more-actions',
        'modifier': 'primary-compact-right',
        'classes': 'ff_module-task-response-actions__dropdown',
        'text': 'More',
        'list': [
            {
                text: 'Stamp Response as Seen',
                key: events.types.stampResponseAsSeen,
                onClick: () => this.props.onClick({ type: events.types.stampResponseAsSeen })
            },
            {
                text: 'Request Resubmission',
                key: events.types.requestResubmission,
                onClick: () => this.props.onClick({ type: events.types.requestResubmission })
            },
            {
                text: 'Confirm Student is Excused',
                key: events.types.confirmStudentIsExcused,
                onClick: () => this.props.onClick({ type: events.types.confirmStudentIsExcused })
            },
            {
                text: 'Confirm Task is Complete',
                key: events.types.confirmTaskIsComplete,
                onClick: () => this.props.onClick({ type: events.types.confirmTaskIsComplete })
            }
        ]
    }))));
};