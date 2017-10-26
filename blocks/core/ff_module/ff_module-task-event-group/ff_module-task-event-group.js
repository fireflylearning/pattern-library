'use strict';

var React = require('react'),
    _ = require('underscore');
var $ = require('jquery');

var ReactDOM = require('react-dom');
var ReactTransitionGroup = require('react-addons-transition-group');

var dateFormatting = require('../../_lib/_ui/dateFormatting')();
var ensureIsDate = require('../../_lib/_ui/date-utils').ensureIsDate,
    TaskEvent = require('../ff_module-task-event/ff_module-task-event'),
    toDay = dateFormatting.toShortDayString,
    toMonth = dateFormatting.toShortMonthString,
    toTime = dateFormatting.to24HourTimeString;

var generateClass = require('../ff_module-task-event/_src/utils').generateClass;

function getDate(date) {
    return [[toDay(date), date.getDate(), toMonth(date)].join(' '), toTime(date)].join(', ');
}

function formatDate(date) {
    var validDate = ensureIsDate(date);
    if (validDate) {
        var dateIsToday = dateFormatting.isToday(validDate);
        if (dateIsToday) return toTime(validDate);
        else return getDate(validDate);
    }
    return '';
}

function getEventsInOrder(events) {
    events = events || [];
    if (_.isArray(events)) {
        events = events.sort(function(a, b) {
            var aSent = ensureIsDate(a.description.sent).getTime();
            var bSent = ensureIsDate(b.description.sent).getTime();
            var aId = a.description.eventVersionId;
            var bId = b.description.eventVersionId;
            return (
              aSent < bSent ? 1
            : aSent > bSent ? -1
            : aId < bId ? 1
            : aId > bId ? -1
            : 0
            );
        });
    }
    return events;
}

function skipDeleted(events) {
    return events.filter(event => !event.state.deleted);
}

var LeavingSlideUpGroupChild = React.createClass({
    componentWillLeave: function(done) {
        var node = ReactDOM.findDOMNode(this);
        $(node).slideUp(500, done);
    },
    render: function() {
        return this.props.children;
    }
});

var LeavingSlideUpGroup = React.createClass({
    displayName: 'LeavingSlideUpGroup',

    _wrapChild: function (child) {
        return React.createElement(LeavingSlideUpGroupChild, {}, child);
    },

    render: function () {
        return (<ReactTransitionGroup {...this.props} childFactory={this._wrapChild} />);
    }
});


module.exports = React.createClass({
    displayName: 'TaskEventGroup',
    propTypes: {
        events: React.PropTypes.arrayOf(React.PropTypes.shape(TaskEvent.PropTypes)).isRequired,
        loggedInUserGuid: React.PropTypes.string,
        recipient: React.PropTypes.object,
        setTransitionFinished: React.PropTypes.func.isRequired,
        setTaskDetails: React.PropTypes.object.isRequired
    },
    render: function() {
        var events = this.props.events;
        if (!events) return null;

        events = skipDeleted(events);

        events = getEventsInOrder(events);

        var single = events.length === 1;
        var className = single ? generateClass('ff_module-task-event-group', events[0]) : 'ff_module-task-event-group';

        return (
            <LeavingSlideUpGroup>
                {events.length > 0 && (
                <div className={className} key="group">
                    <LeavingSlideUpGroup>
                        {this.renderTime(events)}
                        {this.renderEvents(events)}
                    </LeavingSlideUpGroup>
                </div>)}
            </LeavingSlideUpGroup>
        );
    },
    renderTime: function(events) {
        var date = events[0].description.sent;
        return (
            <time className="ff_module-task-event-group__sent">{formatDate(date)}</time>
        );
    },
    renderEvents: function(events) {
        return events.map((event, index) =>
            <TaskEvent
                {...event}
                key={event.localEventId}
                loggedInUserGuid={this.props.loggedInUserGuid}
                recipient={this.props.recipient}
                setTransitionFinished={this.props.setTransitionFinished}
                setTaskDetails={this.props.setTaskDetails}
            />
        );
    }
});

module.exports.getEventsInOrder = getEventsInOrder;
