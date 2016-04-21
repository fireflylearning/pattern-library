'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var TaskEventStatus = require('./ff_module-task-event-status');
var eventStates = require('../ff_module-task-event/_src/events').states;
var eventTypes = require('../ff_module-task-event/_src/events').events;

var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

var errorEvent = {};
errorEvent[eventStates.error] = true;

var pendingEvent = {};
pendingEvent[eventStates.pending] = true;

var releasedEvent = {};
releasedEvent[eventStates.released] = true;

var unreleasedEvent = {};
unreleasedEvent[eventStates.unreleased] = true;

var savedEvent = {};
savedEvent[eventStates.saved] = true;

var events = [errorEvent, pendingEvent, releasedEvent, unreleasedEvent, savedEvent];

var statuses = [eventStates.default, eventStates.pending, eventStates.error, eventStates.saved, eventStates.released, eventStates.unreleased];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {

        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-task-event-status]'), function(domElement, index) {
            var root = <ul style={{ listStyle: 'none', margin: 0, padding: '5px', backgroundColor:'#fff' }}>
                {events.map(function(event, index){
                    return <li key={'li'+index} style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' }}>
                    <TaskEventStatus event={event} />
                    </li>;
                })}
            </ul>;

            ReactDOM.render(root, domElement);
        });
    });
};
