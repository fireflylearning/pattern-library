'use strict';
var React = require('react');

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect;

var TaskEventGroup = require('../blocks/core/ff_module/ff_module-task-event-group/ff_module-task-event-group'),
    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, TaskEventGroup),
    getElementsByClass = require('./lib/framework').setupGetElementsByClass(React, TestUtils, TaskEventGroup),
    eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types;

var eventsEmpty = [];

var events = [{
    localEventId: 'event-1',
    description: {
        type: eventTypes.confirmTaskIsComplete,
        author: { name: 'Terry Teacher' },
        message: 'Message from the teacher',
        sent: new Date("July 11, 2016 11:13:00")
    }
}, {
    localEventId: 'event-2',
    description: {
        type: eventTypes.confirmTaskIsComplete,
        author: { name: 'Terry Teacher' },
        message: 'Message from the teacher',
        sent: new Date("July 11, 2016 11:13:00")

    }
}];

var deletedEvents = [{
    localEventId: 'event-3',
    description: {
        type: eventTypes.confirmTaskIsComplete,
        author: { name: 'Terry Teacher' },
        message: 'Message from the teacher',
        sent: new Date("July 11, 2016 11:13:00")
    },
    state: {
        deleted: true
    }
}];

describe('TaskEventGroup', function() {

    it('should render', function() {
        var element = React.createElement(TaskEventGroup, { events: eventsEmpty });
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    it('should render the correct number of events', function() {
        var domEvents = getElementsByClass({ events: events }, 'ff_module-task-event');
        expect(domEvents.length).to.equal(events.length);
    });

    it('should add deleted class for single event with deleted state', function() {
        var domEvent = getElementByClass({ events: deletedEvents }, 'ff_module-task-event');
        expect(domEvent).to.exist;
        expect(domEvent.className).to.contain('--is-deleted');
    });

});
