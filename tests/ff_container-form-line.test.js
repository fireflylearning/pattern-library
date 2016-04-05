'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var ContainerFormLine = require('../blocks/core/ff_container/ff_container-form-line/ff_container-form-line');

var contentItem1 = 'item 1',
    contentItem2 = 'item 2';



describe('ContainerFormLine', function() {
	it('should render a container with items', function() {
		var element = React.createElement(ContainerFormLine);
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});

	it('should render a container with 2 items', function() {
		var element = <ContainerFormLine>
                        <span>{contentItem1}</span>
                        <span>{contentItem2}</span>
                    </ContainerFormLine>;
		var component = TestUtils.renderIntoDocument(element);
        var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-form-line');
        expect(root.getElementsByTagName('*').length).to.equal(2);
        expect(root.textContent).to.equal(contentItem1 + contentItem2);
	});

});
