'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var DropdownButton = require('../blocks/core/ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component');

describe('DropdownButton', function() {
	it('should render a dropdown button', function() {
		var element = React.createElement(DropdownButton, { text: 'Yo', list: [{text: 'hi', href:'#'}]});
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});
});
