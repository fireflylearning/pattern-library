var React = require('react');
require('./utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var ProfileResponseButton = require("../blocks/core/ff_module/ff_module-profile-response-button/ff_module-profile-response-button.js");

var data = {
        onSelect: function() {
            console.log("onSelect is0");
        },
        uiState: "is-selected",
        guid: "u42",
        label: "Sally Student",
        status: "Marked",
        mark: "B, 76%",
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
    it('should have a mark of \'' + data.mark + '\'', function() {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-profile-response-button__mark');
        expect(node.textContent).to.equal(data.mark);
    });
    it('should have an image with src attribute of \'' + data.pic_href + '\'', function() {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-profile-response-button__image');
        expect(node.getAttribute('src')).to.equal(data.pic_href);
    });
});
