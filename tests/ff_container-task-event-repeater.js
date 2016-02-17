var React = require('react');
require('./utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;
var _ = require('lodash');

var TaskEventRepeater = require('../blocks/core/ff_container/ff_container-task-event-repeater/ff_container-task-event-repeater');


var events = [
    { type: 'set-task', sent: '20:40', author: { name: 'Sally Student' }, taskTitle: 'Write an Essay' }, {
        type: 'stamp-response-as-seen',
        sent: '21:47',
        author: { name: 'Terry Teacher' }
    }
];

describe('TaskEventRepeater', function() {
    var component;

    before(function() {
        var element = React.createElement(TaskEventRepeater, { events: events });
        component = TestUtils.renderIntoDocument(element);
    });

    it('should render', function() {
        expect(component).to.exist;
    });

    it('should have ' + events.length + ' items', function() {
        var items = TestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
        expect(items.length).to.equal(events.length);
    });

});

