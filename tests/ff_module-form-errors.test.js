'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var FormErrors = require('../blocks/core/ff_module/ff_module-form-errors/ff_module-form-errors.js'),
    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, FormErrors),
    getElementsByClass = require('./lib/framework').setupGetElementsByClass(React, TestUtils, FormErrors);

var messageTexts = ['[Please provide a username]', '[Please provide a password]', '[Please provide an email address]'];

var props = {
    '1': { messages: [messageTexts[0]]},
    '3': { messages: [messageTexts[0], messageTexts[1], messageTexts[2]] }
}


describe('FormErrors', function() {

    it('should render', function() {
        var element = <FormErrors messages={[]}/>;
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    it('should render the correct number of messages', function() {
        var messages1 = getElementsByClass(props['1'], 'ff_module-form-errors__message');
        var messages3 = getElementsByClass(props['3'], 'ff_module-form-errors__message');
            expect(messages1.length).to.equal(1);
            expect(messages3.length).to.equal(3);
    });
});
