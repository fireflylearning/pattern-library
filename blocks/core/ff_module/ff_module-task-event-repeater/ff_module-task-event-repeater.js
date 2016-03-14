'use strict';

var React = require('react');
var template = require('./_ff_module-task-event-repeater.rt.js');
var ensureIsDate = require('../../_lib/_ui/date-utils').ensureIsDate;


function isArray(array){
    return array && array.constructor === Array;
}

module.exports = React.createClass({
    displayName: 'TaskEventRepeater',
    render: template,
    propTypes: {
        events:React.PropTypes.array.isRequired
    },
    getEvents: function() {
        var events = this.props.events;
        if (isArray(events)) {
            events = events.sort(function(a, b) {
                // Reverse chronological order
                return ensureIsDate(b.sent) - ensureIsDate(a.sent);
            });
        }
        return events;

    }
});
