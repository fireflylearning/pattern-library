'use strict';

var React = require('react');
var StampResponseAsSeenTaskEvent = require('./src/_StampResponseAsSeenTaskEvent.js');
var SetTaskEvent = require('./src/_SetTaskEvent.js');
var AddedCommentEvent = require('./src/_AddedCommentEvent.js');

var TaskEvent;

var eventComponents = {
    'set-task': SetTaskEvent,
    'stamp-response-as-seen': StampResponseAsSeenTaskEvent,
    'added-comment': AddedCommentEvent
};

module.exports = TaskEvent = function(props){
    return React.createElement(eventComponents[props.event.type], {event: props.event});
}

