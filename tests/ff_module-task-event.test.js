'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;
var _ = require('lodash');

var TaskEvent = require('../blocks/core/ff_module/ff_module-task-event/ff_module-task-event.js');
var eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types;
var dStrings = ['27 Feb 2016 03:24:00', '27 Feb 2016 03:28:00', '28 Feb 2016 13:24:00'];
var dExpected = ['27/2/2016 at 3:24 AM', '27/2/2016 at 3:28 AM', '28/2/2016 at 1:24 PM'];
//TODO: Update tests to account for date/time of test run

var classes = {
    [eventTypes.setTask]: { author: 'ff_module-task-event__author-action', taskTitle: 'ff_module-task-event__task-title' },
    [eventTypes.stampResponseAsSeen]: { author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.requestResubmission]: { author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.confirmTaskIsComplete]: { author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.confirmStudentIsExcused]: { author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.comment]: { author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__comment' },
    [eventTypes.markAndGrade]: { author: 'ff_module-task-event__author-action', mark: 'ff_module-task-event__mark', grade: 'ff_module-task-event__grade', markAndGrade: 'ff_module-task-event__mark-and-grade', message: 'ff_module-task-event__message' },
    [eventTypes.confirmStudentIsUnexcused]: { author: 'ff_module-task-event__author-action', message: 'ff_module-task-event__message' },
    [eventTypes.deleteResponse]: { author: 'ff_module-task-event__author-action', files: 'ff_module-task-event__files', message: 'ff_module-task-event__message' },
    [eventTypes.addFile]: { author: 'ff_module-task-event__author-action', files: 'ff_module-task-event__files', message: 'ff_module-task-event__message' }
};

var shouldntExist = 'shouldnt-exist';

var events = [{
    props: {
        type: eventTypes.setTask,
        author: { name: 'Sally Student' },
        taskTitle: 'Write an Essay'
    },
    expected: {
        author: 'Sally Student set a task:',
        taskTitle: 'Write an Essay'
    }
}, {
    props: {
        type: eventTypes.markAndGrade,
        author: { name: 'Sally MarkAndGrade' },
        mark: 7,
        markMax: 10,
        grade: 'B',
        markAndGrade: ''
    },
    expected: {
        author: 'Sally MarkAndGrade added a mark and grade:',
        mark: '7/10',
        grade: 'B',
        markAndGrade: '7/10 B'
    }
}, {
    props: {
        type: eventTypes.markAndGrade,
        author: { name: 'Sally Grade' },
        grade: 'B',
        markAndGrade: ''
    },
    expected: {
        author: 'Sally Grade added a grade:',
        mark: '',
        grade: 'B',
        markAndGrade: 'B'
    }
}, {
    props: {
        type: eventTypes.markAndGrade,
        author: { name: 'Sally GradeAndMessage' },
        grade: 'B',
        message: 'Good work',
        markAndGrade: ''
    },
    expected: {
        author: 'Sally GradeAndMessage added a grade:',
        mark: '',
        grade: 'B',
        markAndGrade: 'B',
        message: 'Good work'
    }
}, {
    props: {
        type: eventTypes.markAndGrade,
        author: { name: 'Sally MarkAndMessage' },
        mark: 6,
        markMax: 10,
        message: 'Good work',
        markAndGrade: ''
    },
    expected: {
        author: 'Sally MarkAndMessage added a mark:',
        mark: '6/10',
        markAndGrade: '6/10',
        message: 'Good work'
    }
}, {
    props: {
        type: eventTypes.markAndGrade,
        author: { name: 'Sally Student' },
        mark: 7,
        markMax: 10,
        markAndGrade: ''
    },
    expected: {
        author: 'Sally Student added a mark:',
        mark: '7/10',
        grade: '',
        markAndGrade: '7/10',
    }
}, {
    props: {
        type: eventTypes.stampResponseAsSeen,
        author: { name: 'Terry Teacher' },
        message: 'Message from the teacher'
    },
    expected: {
        author: 'Terry Teacher stamped response as seen.',
        message: 'Message from the teacher'
    }
}, {
    props: {
        type: eventTypes.comment,
        author: { name: 'Terry Teacher' },
        message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!'
    },
    expected: {
        author: 'Terry Teacher added a comment:',
        message: '“Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!”'
    }
}, {
    props: {
        type: eventTypes.requestResubmission,
        author: { name: 'Terry Teacher' },
        message: 'Message from the teacher'
    },
    expected: {
        author: 'Terry Teacher requested resubmission.',
        message: 'Message from the teacher'
    }
}, {
    props: {
        type: eventTypes.confirmTaskIsComplete,
        author: { name: 'Terry Teacher' },
        message: 'Message from the teacher'
    },
    expected: {
        author: 'Terry Teacher confirmed completion.',
        message: 'Message from the teacher'
    }
}, {
    props: {
        type: eventTypes.confirmStudentIsExcused,
        author: { name: 'Terry Teacher' },
        message: 'Message from the teacher'
    },
    expected: {
        author: 'Terry Teacher confirmed student is excused.',
        message: 'Message from the teacher'
    }
}, {
    props: {
        type: eventTypes.deleteResponse,
        author: { name: 'Terry Teacher' }
    },
    expected: {
        author: 'Terry Teacher deleted a response.'
    }
}, {
    props: {
        type: eventTypes.confirmStudentIsUnexcused,
        author: { name: 'Terry Teacher' }
    },
    expected: {
        author: 'Terry Teacher unexcused student.'
    }
}, {
    props: {
        type: eventTypes.addFile,
        author: { name: 'Sally StudentFiles' },
        files: [{
            title: 'File one',
            href: '#'
        }, {
            title: 'File two',
            type: 'page',
            href: '#'
        }, {
            title: 'File two'
        }]
    },
    expected: {
        author: 'Sally StudentFiles added 3 files:',
        files: 'File oneFile twoFile two'
    }
}, {
    props: {
        type: eventTypes.addFile,
        author: { name: 'Sally StudentFile' },
        files: [{
            title: 'File one',
            href: '#'
        }]
    },
    expected: {
        author: 'Sally StudentFile added a file:',
        files: 'File one'
    }
}];





describe('TaskEvent', function() {
    var component;

    before(function() {
        var element = React.createElement(TaskEvent, { description: events[0].props });
        component = TestUtils.renderIntoDocument(element);
    });

    it('should render', function() {
        expect(component).to.exist;
    });

    _.each(events, function(_event, index) {
        var testProps = _.omit(_event.props, ['type', 'maxMark']);
        describe(_event.props.type, function() {

            _.each(testProps, function(prop, key) {
                var element, component;
                var testClass = classes[_event.props.type][key];

                if (!testClass) return null;

                it('should render \'' + _event.expected[key] + '\' for prop \'' + key + '\' with value \'' + prop.toString() + '\'', function() {
                    element = React.createElement(TaskEvent, { description: _event.props });
                    component = TestUtils.renderIntoDocument(element);

                    if (_event.expected[key] === shouldntExist) {
                        var attemptToFindNode = function() {
                            TestUtils.findRenderedDOMComponentWithClass(component, testClass);
                        };
                        expect(attemptToFindNode).to.throw(Error, /Did not find/);
                    } else {
                        var node = TestUtils.findRenderedDOMComponentWithClass(component, testClass);
                        expect(node.textContent).to.equal(_event.expected[key]);
                    }


                });
            });
        });
    });

});
