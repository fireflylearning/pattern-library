'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;
var _ = require('lodash');

var TaskEvent = require('../blocks/core/ff_module/ff_module-task-event/ff_module-task-event.js');
var eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];
var dExpected = ['27/2/2016 at 3:24 AM', '27/2/2016 at 3:28 AM', '28/2/2016 at 1:24 PM'];
//TODO: Update tests to account for date/time of test run


var events = [{
    type: eventTypes.setTask,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Student' },
    taskTitle: 'Write an Essay'
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Student' },
    mark: 7,
    markMax: 10,
    grade: 'B'
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Student' },
    grade: 'B'
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Student' },
    mark: 7,
    markMax: 10
}, {
    type: eventTypes.stampResponseAsSeen,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    message: 'Message from the teacher'
}, {
    type: eventTypes.comment,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!'
}, {
    type: eventTypes.requestResubmission,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' },
    message: 'Message from the teacher'
}, {
    type: eventTypes.confirmTaskIsComplete,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' },
    message: 'Message from the teacher'
}, {
    type: eventTypes.confirmStudentIsExcused,
    sent: new Date(dStrings[2]),
    author: { name: 'Terry Teacher' },
    message: 'Message from the teacher'
}];


var testProps = _.omit(events, ['type', 'maxMark']);

var classes = {
    [eventTypes.setTask]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', taskTitle: 'ff_module-task-event__task-title' },
    [eventTypes.stampResponseAsSeen]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.requestResubmission]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.confirmTaskIsComplete]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.confirmStudentIsExcused]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.comment]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', comment: 'ff_module-task-event__comment' },
    [eventTypes.markAndGrade]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', mark: 'ff_module-task-event__mark', grade: 'ff_module-task-event__grade' }
};

var expectedValues = [{
    sent: dExpected[0],
    author: 'Sally Student set a task:',
    taskTitle: 'Write an Essay'
}, {
    sent: dExpected[0],
    author: 'Sally Student added a mark:',
    mark:'7/10',
    grade: ', B'
}, {
    sent: dExpected[0],
    author: 'Sally Student added a mark:',
    mark: '',
    grade: 'B'
}, {
    sent: dExpected[0],
    author: 'Sally Student added a mark:',
    mark: '7/10',
    grade: ''
}, {
    sent: dExpected[1],
    author: 'Terry Teacher stamped response as seen.',
    message: 'Message from the teacher'
}, {
    sent: dExpected[2],
    author: 'Terry Teacher added a comment:',
    comment: '“Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!”'
}, {
    sent: dExpected[0],
    author: 'Terry Teacher requested resubmission.',
    message: 'Message from the teacher'
}, {
    sent: dExpected[1],
    author: 'Terry Teacher confirmed completion.',
    message: 'Message from the teacher'
}, {
    sent: dExpected[2],
    author: 'Terry Teacher confirmed student is excused.',
    message: 'Message from the teacher'
}];

describe('TaskEvent', function() {
    var component;

    before(function() {
        var element = React.createElement(TaskEvent, { event: events[0] });
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
                    element = React.createElement(TaskEvent, { event: _event });
                    component = TestUtils.renderIntoDocument(element);

                    var node = TestUtils.findRenderedDOMComponentWithClass(component, testClass);
                    expect(node.textContent).to.equal(expectedValues[index][key]);
                });
            });
        });
    });

});
