'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var Responses = require('../blocks/core/ff_module/ff_module-responses/ff_module-responses');

describe('Responses', function() {
	it('should render', function() {
		var element = React.createElement(Responses, {recipientList:'list', responseDetails:'details'});
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});

	it('should render a response component with a recipients list', function() {
		var element = React.createElement(Responses, {recipientList:'list', responseDetails:'details'});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-responses__recipients');
		expect(root).to.exist;
	});

	it('should render a response component with response contentt', function() {
		var element = React.createElement(Responses, {recipientList:'list', responseDetails:'details'});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-responses__content');
		expect(root).to.exist;
	});
});
