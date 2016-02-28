'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var wrap = require('./lib/utils').wrap;
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;
var _ = require('lodash');

var TaskEvent = require('../blocks/core/ff_module/ff_module-task-event/ff_module-task-event.js');
var WrappedTaskEvent = wrap(TaskEvent);
var eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];

//TODO: Update tests to account for date/time of test run


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
    author: { name: 'Terry Teacher' },
    comment: '“Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!”'
}];

var testProps = _.omit(events, 'type');

var classes = {
    [eventTypes.setTask]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', taskTitle: 'ff_module-task-event__task-title' },
    [eventTypes.stampResponseAsSeen]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action' },
    [eventTypes.comment]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', comment: 'ff_module-task-event__comment' }
};

var expectedValues = [{
    sent: 'Saturday at 3:24 AM',
    author: 'Sally Student set a task:',
    taskTitle: 'Write an Essay'
}, {
    sent: 'Saturday at 3:28 AM',
    author: 'Terry Teacher stamped response as seen.'
}, {
    sent: '7 hours ago',
    author: 'Terry Teacher added a comment:',
    comment: '“Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!”'
}];

describe('TaskEvent', function() {
    var component;

    before(function() {
        var element = React.createElement(WrappedTaskEvent, { event: events[0] });
        component = TestUtils.renderIntoDocument(element);
    });

    it('should render', function() {
        expect(component).to.exist;
    });

    _.each(events, function(_event, index) {

        describe(_event.type, function() {

            _.each(testProps[index], function(prop, key, __event) {
                var element, component;
                var testClass = classes[_event.type][key];

                if (!testClass) return null;

                it('should render \'' + expectedValues[index][key] + '\' for prop \'' + key + '\' with value \'' + prop.toString() + '\'', function() {
                    element = React.createElement(WrappedTaskEvent, { event: _event });
                    component = TestUtils.renderIntoDocument(element);

                    var node = TestUtils.findRenderedDOMComponentWithClass(component, testClass);
                    expect(node.textContent).to.equal(expectedValues[index][key]);
                });
            });
        })
    })

});
