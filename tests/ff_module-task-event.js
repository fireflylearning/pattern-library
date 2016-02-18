var React = require('react');
require('./utils').bootstrapBrowser();
var wrap = require('./utils').wrap;
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;
var _ = require('lodash');

var TaskEvent = require("../blocks/core/ff_module/ff_module-task-event/ff_module-task-event.js");
var WrappedTaskEvent = wrap(TaskEvent);

var events = [{
    type: 'set-task',
    sent: '20:40',
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: 'stamp-response-as-seen',
    sent: '21:47',
    author: { name: 'Terry Teacher' }
}];

var testProps = _.omit(events, 'type');

var classes = {
    'set-task': { type: '', sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', taskTitle: 'ff_module-task-event__task-title' },
    'stamp-response-as-seen': { type: '', sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action' }
};

var expectedValues = [{
    sent: '20:40',
    author: 'Sally Student set a task:',
    taskTitle: 'Write an Essay'
}, {
    sent: '21:47',
    author: 'Terry Teacher stamped response as seen'
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
