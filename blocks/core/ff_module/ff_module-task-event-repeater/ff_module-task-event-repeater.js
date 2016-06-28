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
            .sort(function(listA, listB) {
            // Reverse chronological order
                return ensureIsDate(listB[0].description.sent) - ensureIsDate(listA[0].description.sent);
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
                                <TaskEventGroup events={events}/>
                            </li>
                })}
            </ol>
        </div>
    },
    propTypes: {
        eventGroups: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.shape(TaskEvent.PropTypes))).isRequired
    },
    getKey:function(events){
        return events.reduce((memo, event)=> '' + memo + event.localEventId, 'group-');
    },
    getGroups: function() {
        return getEventGroupsInOrder(this.props.eventGroups);
    }
});
