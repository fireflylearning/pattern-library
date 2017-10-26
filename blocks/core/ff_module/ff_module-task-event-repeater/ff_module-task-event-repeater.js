'use strict';

var React = require('react'),
    _ = require('underscore');

var TaskEventGroup = require('../ff_module-task-event-group/ff_module-task-event-group'),
    TaskEvent = require('../ff_module-task-event/ff_module-task-event'),
    ensureIsDate = require('../../_lib/_ui/date-utils').ensureIsDate,
    getEventsInOrder = TaskEventGroup.getEventsInOrder;


function getEventGroupsInOrder(eventGroups) {
    eventGroups = eventGroups || [];
    if (_.isArray(eventGroups)) {
        eventGroups = eventGroups
            .map(getEventsInOrder)
            .sort(function(a, b) {
                a = a[0];
                b = b[0];
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
    return eventGroups;
}

module.exports = React.createClass({
    displayName: 'TaskEventRepeater',
    render: function(){
        return <div className="ff_container-task-event-repeater">
            <ol className="ff_container-task-event-repeater__items">
                {this.getGroups().map(events=>{
                    return  <li className="ff_container-task-event-repeater__item"
                                key={this.getKey(events)}>
                                <TaskEventGroup events={events}
                                    loggedInUserGuid={this.props.loggedInUserGuid}
                                    recipient={this.props.recipient}
                                    setTransitionFinished={this.props.setTransitionFinished}
                                    setTaskDetails={this.props.setTaskDetails} />
                            </li>
                })}
            </ol>
        </div>
    },
    propTypes: {
        eventGroups: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.shape(TaskEvent.PropTypes))).isRequired,
        loggedInUserGuid: React.PropTypes.string,
        recipient: React.PropTypes.object,
        setTransitionFinished: React.PropTypes.func.isRequired,
        setTaskDetails: React.PropTypes.object.isRequired
    },
    getKey:function(events){
        return events.reduce((memo, event)=> '' + memo + event.localEventId, 'group-');
    },
    getGroups: function() {
        return getEventGroupsInOrder(this.props.eventGroups);
    }
});
