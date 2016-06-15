'use strict';

var React = require('react');
var template = require('./_ff_module-profile-response-button.rt.js');
var eventTypes = require('../ff_module-task-event/_src/events').types,
    dateFormatting = require('../../_lib/_ui/dateFormatting')();

// lastEventWasAuthoredByCurrentUser
// lastEventWasReleased

module.exports = React.createClass({
    displayName: 'ProfileTaskResponseButton',
    render: template,
    propTypes: {
        onSelect: React.PropTypes.func.isRequired,
        label: React.PropTypes.string.isRequired,
        markAndGrade: React.PropTypes.object,
        isSelected: React.PropTypes.bool,
        isRead: React.PropTypes.bool,
        event: React.PropTypes.object,
        pic_href: React.PropTypes.string.isRequired,
        lastEventWasAuthoredByCurrentUser: React.PropTypes.bool
    },
    generateClass: function(base) {
        var classNames = [],
            props = this.props;
        classNames.push(base);
        if (!!props.modifier) classNames.push(base + '--' + props.modifier);
        if (!!props.isRead && !props.isSelected) classNames.push(base + '--is-read');
        if (!!props.isSelected) classNames.push(base + '--is-selected');
        if (!!props.classes) classNames.push(props.classes);
        return classNames.join(' ');
    },
    generateIconClass: function(){
        var classNames = ['ff_icon'],
            props = this.props;
        if (!!props.isRead && !props.isSelected) classNames.push('ff_icon-task-outgoing-grey');
        if (!!props.isSelected) classNames.push('ff_icon-task-outgoing-extradarkgrey');
        if (!props.isSelected && !props.isRead) classNames.push('ff_icon-task-outgoing-brightblue');
        classNames.push('ff_module-profile-response-button__incoming-icon');
        return classNames.join(' ');
    },
    renderMarkAndGrade: function() {
        var props = this.props,
            marksAll = props.markAndGrade;
        if (!marksAll) return '';
        if (marksAll.grade && marksAll.mark && marksAll.markMax) {
            return marksAll.mark + '/' + marksAll.markMax + ', ' + marksAll.grade;
        } else if (marksAll.grade) {
            return marksAll.grade;
        } else if (marksAll.mark && marksAll.markMax) {
            return marksAll.mark + '/' + marksAll.markMax;
        }
        return '';
    },
    renderStatus: function() {
        var event = this.props.event;
        if (event) {
            return statusSummaryText(this.props);
        } else {
            return '';
        }
    },
    renderTime: function(){
        var event = this.props.event;
        if (event && event.description.sent){
            return dateFormatting.niceDate(event.description.sent);
        } else {
            return '';
        }
    }
});

var statusTextsForEventByCurrentUser = {};
statusTextsForEventByCurrentUser[eventTypes.setTask] = "Awaiting Response";
statusTextsForEventByCurrentUser[eventTypes.stampResponseAsSeen] = "Task stamped as seen";
statusTextsForEventByCurrentUser[eventTypes.requestResubmission] = "Resubmission requested";
statusTextsForEventByCurrentUser[eventTypes.confirmTaskIsComplete] = "Confirmed as complete";
statusTextsForEventByCurrentUser[eventTypes.confirmStudentIsExcused] = "Student excused";
statusTextsForEventByCurrentUser[eventTypes.comment] = "Comment sent";
statusTextsForEventByCurrentUser[eventTypes.markAndGrade] = "Marked";
statusTextsForEventByCurrentUser[eventTypes.addFile] = "File sent";

var statusTextsForEventByOtherUser = {};
statusTextsForEventByOtherUser[eventTypes.setTask] = statusTextsForEventByCurrentUser[eventTypes.setTask];
statusTextsForEventByOtherUser[eventTypes.stampResponseAsSeen] = statusTextsForEventByCurrentUser[eventTypes.stampResponseAsSeen];
statusTextsForEventByOtherUser[eventTypes.requestResubmission] = statusTextsForEventByCurrentUser[eventTypes.requestResubmission];
statusTextsForEventByOtherUser[eventTypes.confirmTaskIsComplete] = statusTextsForEventByCurrentUser[eventTypes.confirmTaskIsComplete];
statusTextsForEventByOtherUser[eventTypes.confirmStudentIsExcused] = statusTextsForEventByCurrentUser[eventTypes.confirmStudentIsExcused];
statusTextsForEventByOtherUser[eventTypes.comment] = "Comment received";
statusTextsForEventByOtherUser[eventTypes.markAndGrade] = statusTextsForEventByCurrentUser[eventTypes.markAndGrade];
statusTextsForEventByOtherUser[eventTypes.addFile] = "File received";

function statusSummaryText(props) {
    var event = props.event;
    return props.lastEventWasAuthoredByCurrentUser
        ? statusTextsForEventByCurrentUser[event.description.type]
        : statusTextsForEventByOtherUser[event.description.type];
}
