'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var MarkingControls = require('../blocks/core/ff_module/ff_module-form-marking-controls/ff_module-form-marking-controls');
var data = {
	controls: {
		buttons: [{
			text: '[button]',
			key: 1
		},
		{
			text: '[button]',
			key: 2
		},
		{
			text: '[button]',
			key: 3
		}],
		checkableList: {
			items: [{
				label: '[label]',
				type: 'radio',
				key: 1,
				id: 'id1'
			},
			{
				label: '[label]',
				type: 'radio',
				key: 2,
				id: 'id2'
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
