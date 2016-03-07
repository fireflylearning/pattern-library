'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var FormLabel = require('../blocks/core/ff_module/ff_module-form-label/ff_module-form-label');

describe('FormLabel', function() {
    it('should render', function() {
        var element = React.createElement(FormLabel);
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });
});