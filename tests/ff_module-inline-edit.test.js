'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var InlineEdit = require('../blocks/core/ff_module/ff_module-inline-edit/ff_module-inline-edit');

describe('InlineEdit', function() {
	it('should render an inline-edit', function() {
		var element = React.createElement(InlineEdit);
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});

	var url = '[url]';
	it('should render an inline-edit with url: ' + url , function() {
		var element = React.createElement(InlineEdit, {url: url});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-inline-edit');
		expect(root.getAttribute('href')).to.equal(url);
	});

	var id = '[id]';
	it('should render an inline-edit with id: ' + url , function() {
		var element = React.createElement(InlineEdit, {id: id});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-inline-edit');
		expect(root.getAttribute('id')).to.equal(id);
	});

	var modifier = '[modifier]';
	it('should render an inline-edit with modifier: ' + modifier , function() {
		var element = React.createElement(InlineEdit, {modifier: modifier});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-inline-edit');
		expect(root.className).to.equal('ff_module-inline-edit ff_module-inline-edit--' + modifier);
	});

	var text = '[text]';
	it('should render an inline-edit with text: ' + text , function() {
		var element = React.createElement(InlineEdit, {text: text});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-inline-edit');
		expect(root.textContent).to.equal(text);
	});
	
});