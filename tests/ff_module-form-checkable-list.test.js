'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var CheckableList = require('../blocks/core/ff_module/ff_module-form-checkable-list/ff_module-form-checkable-list');

describe('CheckableList', function() {

	//Checking that component renders correctly
	it('should render', function() {
		var element = React.createElement(CheckableList, {items:[]});
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});

	//Checking modifier
	var modifier = '[Modifier]';
	it('should make a checkable list item with modifier ' + modifier, function() {
		var element = React.createElement(CheckableList, {
            modifier: modifier,
			items: [{}]
		});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-form-checkable-list__item');
		expect(root.className).to.equal('ff_module-form-checkable-list__item ff_module-form-checkable-list__item--' + modifier);
	});

	// Checking that it renders the right number of items
	var items = [{ name: 'item' }, { name: 'item' }, { name: 'item' }];
	it('should make a checkable list with ' + items.length + ' items', function() {
		var element = React.createElement(CheckableList, {
			items: items
		});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-checkable-list__item');
		expect(root.length).to.equal(items.length);
	});
});
