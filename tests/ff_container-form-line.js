'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var FormLine = require('../blocks/core/ff_container/ff_container-form-line/ff_container-form-line');

var items = {
	formLine: [{
		content: 'item 1',
	}, 
	{
		content: 'item 2',
	}]
}

describe('FormLine', function() {
	it('should render a container with items', function() {
		var element = React.createElement(FormLine, items)
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});
});