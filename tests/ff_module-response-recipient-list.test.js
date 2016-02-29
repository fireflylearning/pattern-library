var React = require('react');
require('./lib/utils').bootstrapBrowser();

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    sinon = require('sinon'),
    getTestFramework = require('./lib/framework').setUpTestFramework(React, TestUtils, expect);

var ResponseRecipientList = require("../blocks/core/ff_module/ff_module-response-recipient-list/ff_module-response-recipient-list.js");

var responses = [{
        onSelect: sinon.spy(),
        guid: 1,
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
        guid: 2,
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
        guid: 3,
        isSelected: true,
        isRead: false,
        label: "Terry Trilobite",
        status: "Response Requested",
        pic_href: "/images/default_picture.png"
    }, {
        onSelect: sinon.spy(),
        guid: 4,
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
        guid: 5,
        label: "Joshua No State",
        status: "Response Requested",
        markAndGrade: {
            grade: 'A'
        },
        pic_href: "/images/group-icon.png"
    }];


describe('ResponseRecipientList', function() {
    var component;

    before(function() {
        var element = React.createElement(ResponseRecipientList, { responses: responses });
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
