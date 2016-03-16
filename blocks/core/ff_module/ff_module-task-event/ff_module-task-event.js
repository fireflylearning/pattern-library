'use strict';

var React = require('react');
var StampResponseAsSeenTaskEvent = require('./_src/_StampResponseAsSeenTaskEvent.js');
var SetTaskEvent = require('./_src/_SetTaskEvent.js');
var AddedCommentEvent = require('./_src/_AddedCommentEvent.js');
var eventTypes = require('./_src/events').types;

var TaskEvent;

var eventComponents = {};
eventComponents[eventTypes.setTask]= SetTaskEvent;
eventComponents[eventTypes.stampResponseAsSeen]= StampResponseAsSeenTaskEvent;
eventComponents[eventTypes.comment]= AddedCommentEvent;

module.exports = TaskEvent = function(props){
    return React.createElement(eventComponents[props.event.type], {event: props.event});
};

