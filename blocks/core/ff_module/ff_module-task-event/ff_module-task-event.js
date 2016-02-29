'use strict';

var React = require('react');
var StampResponseAsSeenTaskEvent = require('./_src/_StampResponseAsSeenTaskEvent.js');
var SetTaskEvent = require('./_src/_SetTaskEvent.js');
var AddedCommentEvent = require('./_src/_AddedCommentEvent.js');
var eventTypes = require('./_src/events').types;

var eventComponents = {
    [eventTypes.setTask]: SetTaskEvent,
    [eventTypes.stampResponseAsSeen]: StampResponseAsSeenTaskEvent,
    [eventTypes.comment]: AddedCommentEvent,
};


module.exports = React.createClass({
    displayName: 'TaskEvent',
    render: function(){
        return React.createElement(
            eventComponents[this.props.event.type],
            {event: this.props.event});
    }
});
