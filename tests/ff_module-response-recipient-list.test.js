'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    getTestFramework = require('./lib/framework').setUpTestFramework(React, TestUtils, expect),
    eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types;

var ResponseRecipientList = require("../blocks/core/ff_module/ff_module-response-recipient-list/ff_module-response-recipient-list.js");

var responses = [{
    guid: 1,
    isSelected: false,
    isRead: true,
    label: "Sally Student",
    latestEvent: {
        type: eventTypes.markAndGrade,
        sent: new Date()
    },
    markAndGrade: {
        mark: 7,
        markMax: 10,
        grade: "A"
    },
    pic_href: "/images/default_picture.png"
}, {
    guid: 2,
    isSelected: true,
    isRead: true,
    label: "Terry Teacher",
    latestEvent: {
        type: eventTypes.requestResubmission,
        sent: new Date()
    },
    markAndGrade: {
        mark: 7,
        markMax: 10
    },
    pic_href: "/images/default_picture.png"
}, {
    onSelect: sinon.spy(),
    guid: 3,
    isSelected: true,
    isRead: false,
    label: "Terry Trilobite",
    latestEvent: {
        type: eventTypes.requestResubmission,
        sent: new Date()
    },
    pic_href: "/images/default_picture.png"
}, {
    onSelect: sinon.spy(),
    guid: 4,
    isSelected: false,
    isRead: false,
    label: "Joshua Teacher",
    latestEvent: {
        type: eventTypes.confirmTaskIsComplete,
        sent: new Date()
    },
    markAndGrade: {
        grade: 'A'
    },
    pic_href: "/images/group-icon.png"
}, {
    onSelect: sinon.spy(),
    guid: 5,
    label: "Joshua No State",
    latestEvent: {
        type: eventTypes.confirmTaskIsComplete,
        sent: new Date()
    },
    markAndGrade: {
        grade: 'A'
    },
    pic_href: "/images/group-icon.png"
}];


describe('ResponseRecipientList', function() {
    var component;

    before(function() {
        var element = React.createElement(ResponseRecipientList, {
            responses: responses,
            onSelect: sinon.spy()
        });
        component = TestUtils.renderIntoDocument(element);
    });

    it('should render', function() {
        expect(component).to.exist;
    });

    it('should have ' + responses.length + ' items', function() {
        var items = TestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
        expect(items.length).to.equal(responses.length);
    });

});
