'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var FormPreview = require('../blocks/core/ff_module/ff_module-form-preview/ff_module-form-preview');

describe('FormPreview', function() {
	it('should render a form preview', function() {
		var element = React.createElement(FormPreview, {items:[]});
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});

	var items = [{ title: 'item' }, { title: 'item' }, { title: 'item' }];
	it('should render a form preview with ' + items.length + ' items', function() {
		var element = React.createElement(FormPreview, {items: items});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-preview__list__title');
		expect(root.length).to.equal(items.length);
	});

	var items = [{
		title: 'item' ,
		html: '<div>hello</div>'
	}];

	it('should render a form preview with a description', function() {
		var element = React.createElement(FormPreview, {items: items});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-preview__list__description');
		expect(root).to.exist;
	});

	var items = [{
		title: 'item' ,
		list: [{
			title: "Title",
			value: "Volcano formation"
		}]
	}];
	it('should render a form preview with a sublist', function() {
		var element = React.createElement(FormPreview, {items: items});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-preview__sublist');
		expect(root).to.exist;
	});

	var items = [{
		title: 'item' ,
		list: [{
			title: "Title",
			value: "Volcano formation"
		},
		{
			title: "Title",
			value: "Volcano formation"
		}]
	}];
	console.log(items);
	it('should render a form preview with a sublist with ' + items[0].list.length + ' sublist items', function() {
		var element = React.createElement(FormPreview, {items: items});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-preview__sublist__title');
		expect(root.length).to.equal(items[0].list.length);
	});

});