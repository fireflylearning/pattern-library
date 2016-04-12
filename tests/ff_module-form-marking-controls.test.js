'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var MarkingControls = require('../blocks/core/ff_module/ff_module-form-marking-controls/ff_module-form-marking-controls');
var data = {
	controls: {
		buttons: [{
			text: '[button]'
		},
		{
			text: '[button]'
		},
		{
			text: '[button]'
		}],
		checkableList: {
			items: [{
				label: '[label]',
				type: 'radio'
			},
			{
				label: '[label]',
				type: 'radio'
			}]
		}
	}
}

describe('MarkingControls', function() {
	it('should render a marking controls component', function() {
		var element = React.createElement(MarkingControls, data);
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});

	it('should render a marking controls component with ' + data.controls.buttons.length +' buttons', function() {
		var element = React.createElement(MarkingControls, data);
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-button');
		expect(root.length).to.equal(data.controls.buttons.length);
	});

	it('should render a marking controls component with a checkableList', function() {
		var element = React.createElement(MarkingControls, data);
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-checkable-list');
		expect(root).to.exist;
	});

	it('should render a marking controls component with a checkableList with ' + data.controls.checkableList.items.length + ' items', function() {
		var element = React.createElement(MarkingControls, data);
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-checkable-list__item');
		expect(root.length).to.equal(data.controls.checkableList.items.length);
	});
});