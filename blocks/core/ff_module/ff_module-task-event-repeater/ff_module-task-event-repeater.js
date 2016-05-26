'use strict';

var React = require('react');
var TaskEventGroup = require('../ff_module-task-event-group/ff_module-task-event-group');
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
        groups: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.shape(TaskEvent.PropTypes))).isRequired
    },
    getKey:function(events){
        var o = events.reduce((memo, event)=> memo + event.localEventId, 'group-');
        return o;
    },
    getGroups: function() {
        var groups = this.props.groups || [];
        // if (isArray(events)) {
        //     events = events.sort(function(a, b) {
        //         // Reverse chronological order
        //         return ensureIsDate(b.description.sent) - ensureIsDate(a.description.sent);
        //     });
        // }
        return groups;
    }
});
