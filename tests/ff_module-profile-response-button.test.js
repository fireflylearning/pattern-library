'use strict';

var React = require('react');


var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    getTestFramework = require('./lib/framework').setUpTestFramework(React, TestUtils, expect);

var ProfileResponseButton = require("../blocks/core/ff_module/ff_module-profile-response-button/ff_module-profile-response-button.js"),
    eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types,
    dateFormatting = require('../blocks/core/_lib/_ui/dateFormatting')();

var buttonProps = [{
        onSelect: sinon.spy(),
        isSelected: false,
        isRead: true,
        label: "Sally Student",
        markAndGrade: {
            mark: 7,
            markMax: 10,
            grade: "A"
        },
        event: {
            description: {
                type: eventTypes.markAndGrade,
                sent: new Date()
            }
        },
        pic_href: "/images/default_picture.png"
    }, {
        onSelect: sinon.spy(),
        isSelected: true,
        isRead: true,
        label: "Terry Teacher",
        markAndGrade: {
            mark: 7,
            markMax: 10
        },
        event: {
            description: {
                type: eventTypes.requestResubmission,
                sent: new Date()
            }
        },
        pic_href: "/images/default_picture.png"
    }, {
        onSelect: sinon.spy(),
        isSelected: true,
        isRead: false,
        label: "Terry Trilobite",
        event: {
            description: {
                type: eventTypes.confirmTaskIsComplete,
                sent: new Date()
            }
        },
        pic_href: "/images/default_picture.png"
    }, {
        onSelect: sinon.spy(),
        isSelected: false,
        isRead: false,
        label: "Joshua Teacher",
        markAndGrade: {
            grade: 'A'
        },
        event: {
            description: {
                type: eventTypes.stampResponseAsSeen,
                sent: new Date()
            }
        },
        pic_href: "/images/group-icon.png"
    }, {
        onSelect: sinon.spy(),
        label: "Joshua ConfirmExcused",
        event: {
            description: {
                type: eventTypes.confirmStudentIsExcused,
                sent: new Date()
            }
        },
        pic_href: "/images/group-icon.png"
    }, {
        onSelect: sinon.spy(),
        label: "Joshua CommentReceived",
        event: {
            description: {
                type: eventTypes.comment,
                sent: new Date()
            }
        },
        pic_href: "/images/group-icon.png"
    }, {
        onSelect: sinon.spy(),
        label: "Joshua CommentSent",
        lastEventWasAuthoredByCurrentUser: true,
        event: {
            description: {
                type: eventTypes.comment,
                sent: new Date()
            }
        },
        pic_href: "/images/group-icon.png"
    }, {
        onSelect: sinon.spy(),
        label: "Joshua Set Task",

        event: {
            description: {
                type: eventTypes.setTask,
                sent: new Date()
            }
        },
        pic_href: "/images/group-icon.png"
    }, {
        onSelect: sinon.spy(),
        label: "Joshua FileReceived",
        event: {
            description: {
                type: eventTypes.addFile,
                sent: new Date(),
                files: []
            }
        },
        pic_href: "/images/group-icon.png"
    }, {
        onSelect: sinon.spy(),
        label: "Joshua FileSent",
        lastEventWasAuthoredByCurrentUser: true,
        event: {
            description: {
                type: eventTypes.addFile,
                sent: new Date(),
                files: []
            }
        },
        pic_href: "/images/group-icon.png"
    }],
    defaultClass = 'ff_module-profile-response-button',
    selectedClass = 'ff_module-profile-response-button ff_module-profile-response-button--is-selected',
    readClass = 'ff_module-profile-response-button ff_module-profile-response-button--is-read';

function testClasses(component, value, props) {
    var node = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
    if (props.isSelected === true) {
        expect(node.className).to.equal(selectedClass);
    } else if (props.isRead === true) {
        expect(node.className).to.equal(readClass);
    } else {
        expect(node.className).to.equal(defaultClass);
    }
}

var statusTextsForEventByCurrentUser = {};
statusTextsForEventByCurrentUser[eventTypes.setTask] = "Awaiting Response";
statusTextsForEventByCurrentUser[eventTypes.stampResponseAsSeen] = "Task stamped as seen";
statusTextsForEventByCurrentUser[eventTypes.requestResubmission] = "Resubmission requested";
statusTextsForEventByCurrentUser[eventTypes.confirmTaskIsComplete] = "Confirmed as complete";
statusTextsForEventByCurrentUser[eventTypes.confirmStudentIsExcused] = "Student excused";
statusTextsForEventByCurrentUser[eventTypes.comment] = "Comment sent";
statusTextsForEventByCurrentUser[eventTypes.markAndGrade] = "Marked";
statusTextsForEventByCurrentUser[eventTypes.addFile] = "File sent";

var statusTextsForEventByOtherUser = {};
statusTextsForEventByOtherUser[eventTypes.setTask] = statusTextsForEventByCurrentUser[eventTypes.setTask];
statusTextsForEventByOtherUser[eventTypes.stampResponseAsSeen] = statusTextsForEventByCurrentUser[eventTypes.stampResponseAsSeen];
statusTextsForEventByOtherUser[eventTypes.requestResubmission] = statusTextsForEventByCurrentUser[eventTypes.requestResubmission];
statusTextsForEventByOtherUser[eventTypes.confirmTaskIsComplete] = statusTextsForEventByCurrentUser[eventTypes.confirmTaskIsComplete];
statusTextsForEventByOtherUser[eventTypes.confirmStudentIsExcused] = statusTextsForEventByCurrentUser[eventTypes.confirmStudentIsExcused];
statusTextsForEventByOtherUser[eventTypes.comment] = "Comment received";
statusTextsForEventByOtherUser[eventTypes.markAndGrade] = statusTextsForEventByCurrentUser[eventTypes.markAndGrade];
statusTextsForEventByOtherUser[eventTypes.addFile] = "File received";

function statusSummaryText(props) {
    var event = props.event;
    return (props.lastEventWasAuthoredByCurrentUser === true) ?
        statusTextsForEventByCurrentUser[event.description.type] :
        statusTextsForEventByOtherUser[event.description.type];
}

var testDefs = {
    'markAndGrade': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-profile-response-button__mark-and-grade');

        if (value.grade && value.mark && value.markMax) {
            expect(node.textContent).to.equal(value.mark + '/' + value.markMax + ', ' + value.grade);
        } else if (value.grade) {
            expect(node.textContent).to.equal(value.grade);
        } else if (value.mark && value.markMax) {
            expect(node.textContent).to.equal(value.mark + '/' + value.markMax);
        }
    },
    'label': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-profile-response-button__label');
        expect(node.textContent).to.equal(value);
    },
    'onSelect': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
        TestUtils.Simulate.click(node);
        expect(props.onSelect.called).to.be.true;
    },
    'pic_href': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-profile-response-button__image');
        expect(node.getAttribute('src')).to.equal(value);
    },
    'event':function(component, value, props){
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-profile-response-button__status');
        var expected = '';
        if (props.event) {
            expected = statusSummaryText(props) + " " + dateFormatting.niceDate(props.event.description.sent).toLowerCase();
        }
        expect(node.textContent).to.equal(expected);
    },
    'isSelected': testClasses,
    'isRead': testClasses
}

describe('ProfileResponseButton', getTestFramework(ProfileResponseButton, buttonProps, testDefs, function(props) {
    return props.label + ': ' + props.event.description.type;
}));
