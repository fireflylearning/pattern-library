'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var ExpandableComponent = require('../blocks/core/ff_container/ff_container-expandable/ff_container-expandable-component/ff_container-expandable-component');

describe('ExpandableComponent', function() {
	it('should render an expandable component', function() {
		var element = React.createElement(ExpandableComponent);
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});
	var expandedText = '[Expanded state header]';
	it('should render an expandable component with the expanded-state header ' + expandedText, function() {
		var element = React.createElement(ExpandableComponent, {expandedText: expandedText, data:'simone'});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-expandable');
		expect(root.querySelectorAll('expandable-text')).to.equal(expandedText);
	});
});