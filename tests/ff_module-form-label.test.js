'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var FormLabel = require('../blocks/core/ff_module/ff_module-form-label/ff_module-form-label');

describe('FormLabel', function() {
    it('should render', function() {
        var element = React.createElement(FormLabel);
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });
	
	var content = '[Label Text]';
	var modifier = '[Modifier]';
	var testFor = '[For]';
	var attributeName = 'data-ff-attribute-name';
	var attributeValue = '[Attribute Value]';
	it('should make a label element with the content ' + content, function() {
        var element = React.createElement(FormLabel, {required: true, modifier: modifier, id: testFor, data: [{attr: attributeName, value: attributeValue}]}, content);
        var component = TestUtils.renderIntoDocument(element);
        var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-form-label');
        expect(root.textContent).to.equal(content);
        expect(root.className).to.equal('ff_module-form-label ff_module-form-label--' + modifier);
        expect(root.htmlFor).to.equal(testFor);
        expect(root.getAttribute(attributeName)).to.equal(attributeValue);
	});
});