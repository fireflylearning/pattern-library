'use strict';
var React = require('react');

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect;

var FormSummary = require('../blocks/core/ff_module/ff_module-form-summary/ff_module-form-summary'),
    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, FormSummary);

var props = [{
    title: 'Task Summary',
    list: [
        { title: 'Title 1', content: 'Item 1' },
        { title: 'Title 2', content: 'Item 2', url: '#' }
    ]
}];

var expected = [{
    title: 'Task Summary',
    list: ['Title 1','Item 1', 'Title 2','Item 2']
}];

describe('FormSummary', function() {

    it('should render correct title', function() {
        var root = getElementByClass(props[0], 'ff_module-form-summary');
        var text = root.querySelector('.ff_module-form-summary__title');
        expect(text.textContent).to.equal(expected[0].title);
    });

    it('should render correct datalist', function() {
        var list = getElementByClass(props[0], 'ff_module-form-summary__list');
        expect(list.textContent).to.equal(expected[0].list.join(''));
    });

    it('should render datalist content as link when url prop present', function() {
        var list = getElementByClass(props[0], 'ff_module-form-summary__list__link');
        expect(list).to.exist;
        expect(list.textContent).to.equal(expected[0].list[3]);
    });
});
