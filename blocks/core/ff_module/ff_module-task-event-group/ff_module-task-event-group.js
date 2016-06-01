'use strict';

var React = require('react');
var dateFormatting = require('../../_lib/_ui/dateFormatting')();
var ensureIsDate = require('../../_lib/_ui/date-utils').ensureIsDate;
var TaskEvent = require('../ff_module-task-event/ff_module-task-event');

var formatDate = require('../ff_module-task-event/_src/utils').formatDate;
var generateClass = require('../ff_module-task-event/_src/utils').generateClass;

module.exports = React.createClass({
    displayName: 'TaskEventGroup',
    propTypes: {
        events: React.PropTypes.arrayOf(React.PropTypes.shape(TaskEvent.PropTypes)).isRequired
    },
    render: function() {

        if (!this.props.events || this.props.events.length === 0) return null;

        var date = this.props.events[0].description.sent;
        var single = this.props.events.length === 1;
        var className = single ? generateClass('ff_module-task-event-group', this.props.events[0]) : 'ff_module-task-event-group';

        return (
            <div className={className}>
                <time className="ff_module-task-event-group__sent">{formatDate(date)}</time>
                {this.props.events.map((event, index)=> <TaskEvent {...event} key={event.localEventId}/> )}
            </div>
        );

    }
});
