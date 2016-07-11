'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var FormPreview = require('../blocks/core/ff_module/ff_module-form-preview/ff_module-form-preview');

var items = [{ title: 'item', key: 1 }, { title: 'item', key: 2 }, { title: 'item', key: 3}];
var itemWithDescription = [{ title: 'item' , html: <div>hello</div>, key: 1}];
var itemWithSublist = [{
	title: 'item' ,
	list: [{
		title: "Title",
		value: "Volcano formation"
	},
	{
		title: "Title",
		value: "Volcano formation"
	}],
	key: 1
}];

describe('FormPreview', function() {
	it('should render a form preview', function() {
		var element = React.createElement(FormPreview, {items:[]});
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});
	it('should render a form preview with ' + items.length + ' items', function() {
		var element = React.createElement(FormPreview, {items: items});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-preview__list__title');
		expect(root.length).to.equal(items.length);
	});

	it('should render a form preview with a description', function() {
		var element = React.createElement(FormPreview, {items: itemWithDescription});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-preview__list__description');
		expect(root).to.exist;
	});

	it('should render a form preview with a sublist', function() {
		var element = React.createElement(FormPreview, {items: itemWithSublist});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-preview__sublist');
		expect(root).to.exist;
	});

	it('should render a form preview with a sublist with ' + itemWithSublist[0].list.length + ' sublist items', function() {
		var element = React.createElement(FormPreview, {items: itemWithSublist});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-preview__sublist__title');
		expect(root.length).to.equal(itemWithSublist[0].list.length);
	});

});
