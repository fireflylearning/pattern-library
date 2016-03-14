'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var FilterContainer = require('../blocks/core/ff_container/ff_container-filter/ff_container-filter');

describe('FilterContainer', function() {
	it('should render a filter container with filters in it', function() {
		var element = React.createElement(FilterContainer, { filters: []});
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});
	
	var filter1 = <span>filter1</span>,
	filter2 = <span>filter2</span>;

	var filters = [{
			content: filter1
		}, 
		{
			content: filter2
		}
	];
	it('should render a filter container with '+ filters.length + ' filters', function() {
		var element = React.createElement(FilterContainer, { filters: filters } );
		var component = TestUtils.renderIntoDocument(element);

		var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-filter');
		var items = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
		expect(items.length).to.equal(filters.length);
	});
});