'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var FormLine = require('../blocks/core/ff_container/ff_container-form-line/ff_container-form-line');

describe('FormLine', function() {
	it('should render a container with items', function() {
		var element = React.createElement(FormLine, {
        	    formLine: []
            })
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});
    
    var contentItem1 = 'item 1',
        contentItem2 = 'item 2';
    var items = [{
    		content: contentItem1,
    	}, 
    	{
    		content: contentItem2,
    	}
    ];
	it('should render a container with 2 items', function() {
		var element = React.createElement(FormLine, {
        	    formLine: items
            })
		var component = TestUtils.renderIntoDocument(element);
        var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-form-line');
        expect(root.getElementsByTagName('*').length).to.equal(items.length);
        expect(root.textContent).to.equal(contentItem1 + contentItem2);
	});
});