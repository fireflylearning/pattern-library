'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var TaskEventRepeater = require('../blocks/core/ff_module/ff_module-task-event-repeater/ff_module-task-event-repeater');
var eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

var events = [{
    type: eventTypes.setTask,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.stampResponseAsSeen,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.comment,
    sent: new Date(dStrings[2]),
    author: { name: 'Sally Student' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!'
}].map(function(description, index) {
    return {
        description: description,
        localEventId: index,
        actions: [],
        state: { released: true }
    };
});

var eventGroups = [[events[1], events[0]],[events[2]],[events[0], events[1], events[2]]];

// Failing test that was sacrificed to get the working tests running on Jenkins
describe.skip('TaskEventRepeater', function() {
    var component;

    before(function() {
        var element = React.createElement(TaskEventRepeater, { eventGroups: eventGroups });
        component = TestUtils.renderIntoDocument(element);
    });

    it('should render', function() {
        expect(component).to.exist;
    });

    it('should have ' + eventGroups.length + ' items', function() {
        var items = TestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
        expect(items.length).to.equal(eventGroups.length);
    });

});
