var React = require('react');
require('./lib/utils').bootstrapBrowser();

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    sinon = require('sinon');

var ProfileResponseButton = require("../blocks/core/ff_module/ff_module-profile-response-button/ff_module-profile-response-button.js");

var data = {
        onSelect: function() {
            console.log("onSelect is0");
        },
        isSelected: true,
        isRead: true,
        label: "Sally Student",
        status: "Marked",
        markAndGrade: {
            mark: 7,
            markMax: 10,
            grade: "A"
        },
        pic_href: "/images/default_picture.png"
    },
    expectedClass = 'ff_module-profile-response-button ff_module-profile-response-button--is-selected';



describe('ProfileResponseButton', function() {
    var component;
    before(function() {
        var element = React.createElement(ProfileResponseButton, data);
        component = TestUtils.renderIntoDocument(element);
    });

    it('should render', function() {
        expect(component).to.exist;
    });
    it('should have a class of \'' + expectedClass + '\'', function() {
        var node = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
        expect(node.className).to.equal(expectedClass);
    });
    it('should have a label of \'' + data.label + '\'', function() {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-profile-response-button__label');
        expect(node.textContent).to.equal(data.label);
    });
    it('should have a status of \'' + data.status + '\'', function() {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-profile-response-button__status');
        expect(node.textContent).to.equal(data.status);
    });
    it('should have a mark of \'' + data.markAndGrade.mark+'/'+data.markAndGrade.markMax + '\'', function() {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-profile-response-button__mark');
        expect(node.textContent).to.equal(data.markAndGrade.mark+'/'+data.markAndGrade.markMax);
    });
    it('should have a grade of \'' + data.markAndGrade.grade + '\'', function() {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-profile-response-button__grade');
        expect(node.textContent).to.equal(', '+data.markAndGrade.grade);
    });
    it('should have an image with src attribute of \'' + data.pic_href + '\'', function() {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-profile-response-button__image');
        expect(node.getAttribute('src')).to.equal(data.pic_href);
    });
});
