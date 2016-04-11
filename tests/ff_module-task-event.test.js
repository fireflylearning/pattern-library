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
    author: { name: 'Sally MarkAndGrade' },
    mark: 7,
    markMax: 10,
    grade: 'B',
    markAndGrade:''
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Grade' },
    grade: 'B',
    markAndGrade:''
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally GradeAndMessage' },
    grade: 'B',
    message: 'Good work',
    markAndGrade:''
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally MarkAndMessage' },
    mark: 6,
    markMax: 10,
    message: 'Good work',
    markAndGrade:''
}, {
    type: eventTypes.markAndGrade,
    sent: new Date(dStrings[0]),
    author: { name: 'Sally Student' },
    mark: 7,
    markMax: 10,
    markAndGrade:''
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
}, {
    type: eventTypes.deleteResponse,
    sent: new Date(dStrings[0]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.confirmStudentIsUnexcused,
    sent: new Date(dStrings[1]),
    author: { name: 'Terry Teacher' }
}, {
    type: eventTypes.addFile,
    sent: new Date(dStrings[2]),
    author: { name: 'Sally Student' },
    files:[{
        title: 'File one',
        href:'#'
    }, {
        title: 'File two',
        type: 'page',
        href:'#'
    }, {
        title: 'File two'
    }]
}];


var testProps = _.omit(events, ['type', 'maxMark']);

var classes = {
    [eventTypes.setTask]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', taskTitle: 'ff_module-task-event__task-title' },
    [eventTypes.stampResponseAsSeen]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.requestResubmission]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.confirmTaskIsComplete]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.confirmStudentIsExcused]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.comment]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__comment' },
    [eventTypes.markAndGrade]: { sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', mark: 'ff_module-task-event__mark', grade: 'ff_module-task-event__grade', markAndGrade: 'ff_module-task-event__mark-and-grade', message: 'ff_module-task-event__message' },
    [eventTypes.confirmStudentIsUnexcused]:{ sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message'},
    [eventTypes.deleteResponse]:{ sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', files: 'ff_module-task-event__files', message: 'ff_module-task-event__message'},
    [eventTypes.addFile]:{ sent: 'ff_module-task-event__sent', author: 'ff_module-task-event__author-action', files: 'ff_module-task-event__files', message: 'ff_module-task-event__message'}
};

var expectedValues = [{
    sent: dExpected[0],
    author: 'Sally Student set a task:',
    taskTitle: 'Write an Essay'
}, {
    sent: dExpected[0],
    author: 'Sally MarkAndGrade added a mark and a grade:',
    mark:'7/10',
    grade: 'B',
    markAndGrade: '7/10, B'
}, {
    sent: dExpected[0],
    author: 'Sally Grade added a grade:',
    mark: '',
    grade: 'B',
    markAndGrade: 'B'
}, {
    sent: dExpected[0],
    author: 'Sally GradeAndMessage added a grade:',
    mark: '',
    grade: 'B',
    markAndGrade: 'B',
    message: 'Good work'
}, {
    sent: dExpected[0],
    author: 'Sally MarkAndMessage added a mark:',
    mark: '6/10',
    markAndGrade: '6/10',
    message: 'Good work'
}, {
    sent: dExpected[0],
    author: 'Sally Student added a mark:',
    mark: '7/10',
    grade: '',
    markAndGrade: '7/10',
}, {
    sent: dExpected[1],
    author: 'Terry Teacher stamped response as seen.',
    message: 'Message from the teacher'
}, {
    sent: dExpected[2],
    author: 'Terry Teacher added a comment:',
    message: '“Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!”'
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
}, {
    sent: dExpected[0],
    author: 'Terry Teacher deleted response.'
}, {
    sent: dExpected[1],
    author: 'Terry Teacher unexcused student.'
}, {
    sent: dExpected[2],
    author: 'Sally Student added files:',
    files:'File oneFile twoFile two'
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
