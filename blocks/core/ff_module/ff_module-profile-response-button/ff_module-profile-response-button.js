'use strict';

import { taskReleaseModes as releaseMode } from '../../_lib/constants.js';

var React = require('react');
var eventTypes = require('../ff_module-task-event/_src/events').types,
    dateFormatting = require('../../_lib/_ui/dateFormatting')();

var MarkAndGrade = require('../ff_module-mark-and-grade/ff_module-mark-and-grade');
var IconSVG =  require('../../ff_icons/ff_icon-svg/ff_icon-svg').default;

var defaultLabel = 'Account not found';

module.exports = React.createClass({
    displayName: 'ProfileTaskResponseButton',
    propTypes: {
        onSelect: React.PropTypes.func.isRequired,
        label: React.PropTypes.string,
        markAndGrade: React.PropTypes.object,
        isSelected: React.PropTypes.bool,
        isRead: React.PropTypes.bool,
        event: React.PropTypes.object,
        pic_href: React.PropTypes.string.isRequired,
        lastEventWasAuthoredByCurrentUser: React.PropTypes.bool
    },
    render: function(){
        return (
            <button
                type="button"
                className={this.generateClass('ff_module-profile-response-button')}
                onClick={this.props.onSelect}>

                <figure className="ff_module-profile-response-button__picture">
                    <img className="ff_module-profile-response-button__image" src={this.props.pic_href} />
                </figure>

                <dl className="ff_module-profile-response-button__caption">
                    <dt className="ff_module-profile-response-button__heading">
                        <span className="ff_module-profile-response-button__label">{this.props.label ? this.props.label : defaultLabel}</span>
                    </dt>
                    <dd className="ff_module-profile-response-button__status" rt-if="this.props.event">
                        <span className="ff_module-profile-response-button__status-text">{this.renderStatus()}</span>
                    </dd>
                     {this.props.status && this.props.status.complete ? <IconSVG name="task-complete" classes="ff_module-profile-response-button__icon-completed"/> : null}
                    {this.props.markAndGrade ? <dd className="ff_module-profile-response-button__mark-and-grade"><MarkAndGrade modifier="recipients" {...this.props.markAndGrade}/></dd> : null}
                </dl>
                {this.props.lastEventWasAuthoredByCurrentUser ? <IconSVG {...this.generateIconProps()} /> : null}
            </button>

        );
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
    generateIconProps: function(){
        var props = this.props;
        if (!props.event.state.released && props.releaseMode === releaseMode.batched) {
            return  {
                name: "task-response-ready-to-send",
                classes: "ff_module-profile-response-button__status-icon ff_module-profile-response-button__status-icon--ready-to-send"
            }
        }
        if (props.event.state.released) {
            return {
                name: "task-response-sent",
                classes: "ff_module-profile-response-button__status-icon ff_module-profile-response-button__status-icon--sent"
             }
         }
        if (props.event.state.error) {
            return {
                name: "task-response-send-error",
                classes: "ff_module-profile-response-button__status-icon ff_module-profile-response-button__status-icon--error"
            }
        }
    },
    renderStatus: function() {
        var event = this.props.event;
        if (event) {
           return statusSummaryText(this.props);
        } else {
            return '';
        }
    }
});

var statusTextsForEventByCurrentUser = {};
statusTextsForEventByCurrentUser[eventTypes.stampResponseAsSeen] = "Task stamped as seen";
statusTextsForEventByCurrentUser[eventTypes.requestResubmission] = "Resubmission requested";
statusTextsForEventByCurrentUser[eventTypes.confirmTaskIsComplete] = "Confirmed as complete";
statusTextsForEventByCurrentUser[eventTypes.confirmStudentIsExcused] = "Student excused";
statusTextsForEventByCurrentUser[eventTypes.comment] = "Comment sent";
statusTextsForEventByCurrentUser[eventTypes.markAndGrade] = "Marked";
statusTextsForEventByCurrentUser[eventTypes.addFile] = "File sent";

var statusTextsForEventByOtherUser = {};
statusTextsForEventByOtherUser[eventTypes.stampResponseAsSeen] = statusTextsForEventByCurrentUser[eventTypes.stampResponseAsSeen];
statusTextsForEventByOtherUser[eventTypes.requestResubmission] = statusTextsForEventByCurrentUser[eventTypes.requestResubmission];
statusTextsForEventByOtherUser[eventTypes.confirmTaskIsComplete] = statusTextsForEventByCurrentUser[eventTypes.confirmTaskIsComplete];
statusTextsForEventByOtherUser[eventTypes.confirmStudentIsExcused] = statusTextsForEventByCurrentUser[eventTypes.confirmStudentIsExcused];
statusTextsForEventByOtherUser[eventTypes.comment] = "Comment received";
statusTextsForEventByOtherUser[eventTypes.markAndGrade] = statusTextsForEventByCurrentUser[eventTypes.markAndGrade];
statusTextsForEventByOtherUser[eventTypes.addFile] = "File received";
statusTextsForEventByOtherUser[eventTypes.markAsDone] = "Claimed as completed";

var defaultStatus = "Awaiting response";
var batchedModeStatus = "Response ready to send";

function statusSummaryText(props) {
    var event = props.event;
    var status;
    if(props.lastEventWasAuthoredByCurrentUser === true) {
        if(event.state.released === false && props.releaseMode === releaseMode.batched){
            status = batchedModeStatus;
        } else {
                   status = statusTextsForEventByCurrentUser[event.description.type];
        }
    } else {
        status = statusTextsForEventByOtherUser[event.description.type];
    }
    return status || defaultStatus;
}
