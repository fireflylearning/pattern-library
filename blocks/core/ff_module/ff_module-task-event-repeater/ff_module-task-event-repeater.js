'use strict';

var React = require('react');
var TaskEvent = require('../ff_module-task-event/ff_module-task-event');
var ensureIsDate = require('../../_lib/_ui/date-utils').ensureIsDate;


function isArray(array){
    return array && array.constructor === Array;
}

module.exports = React.createClass({
    displayName: 'TaskEventRepeater',
    render: function(){
        return <div className="ff_container-task-event-repeater">
            <ol className="ff_container-task-event-repeater__items">
                {this.getEvents().map(event=>{
                    return  <li className="ff_container-task-event-repeater__item"
                                key={'event-'+event.localEventId}>
                                <TaskEvent {...event}/>
                            </li>
                })}
            </ol>
        </div>
    },
    propTypes: {
        events: React.PropTypes.arrayOf(React.PropTypes.shape(TaskEvent.PropTypes)).isRequired
    },
    getEvents: function() {
        var events = this.props.events;
        if (isArray(events)) {
            events = events.sort(function(a, b) {
                // Reverse chronological order
                return ensureIsDate(b.description.sent) - ensureIsDate(a.description.sent);
            });
        }
        return events;
    }
});
