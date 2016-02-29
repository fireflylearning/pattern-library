var React = require('react');
require('./lib/utils').bootstrapBrowser();

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    getTestFramework = require('./lib/framework').setUpTestFramework(React, TestUtils, expect);

var ProfileResponseButton = require("../blocks/core/ff_module/ff_module-profile-response-button/ff_module-profile-response-button.js");

var buttonProps = [{
        onSelect: sinon.spy(),
        isSelected: false,
        isRead: true,
        label: "Sally Student",
        status: "Marked",
        markAndGrade: {
            mark: 7,
            markMax: 10,
            grade: "A"
        },
        pic_href: "/images/default_picture.png"
    }, {
        onSelect: sinon.spy(),
        isSelected: true,
        isRead: true,
        label: "Terry Teacher",
        status: "Response Requested",
        markAndGrade: {
            mark: 7,
            markMax: 10
        },
        pic_href: "/images/default_picture.png"
    }, {
        onSelect: sinon.spy(),
        isSelected: true,
        isRead: false,
        label: "Terry Trilobite",
        status: "Response Requested",
        pic_href: "/images/default_picture.png"
    }, {
        onSelect: sinon.spy(),
        isSelected: false,
        isRead: false,
        label: "Joshua Teacher",
        status: "Response Requested",
        markAndGrade: {
            grade: 'A'
        },
        pic_href: "/images/group-icon.png"
    }, {
        onSelect: sinon.spy(),
        label: "Joshua No State",
        status: "Response Requested",
        markAndGrade: {
            grade: 'A'
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
    'status': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-profile-response-button__status');
        expect(node.textContent).to.equal(value);
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
    'isSelected': testClasses,
    'isRead': testClasses
}

describe('ProfileResponseButton', getTestFramework(ProfileResponseButton, buttonProps, testDefs, function(props) {
    return props.label + ': ' + props.status;
}));
