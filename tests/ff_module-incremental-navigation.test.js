'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    _ = require('lodash'),
    sinon = require('sinon'),
    getTestFramework = require('./lib/framework').setUpTestFramework(React, TestUtils, expect);

var IncrementalNavigation = require('../blocks/core/ff_module/ff_module-incremental-navigation/ff_module-incremental-navigation');

var testProps = [{
    def: 'isFirst: true',
    nextText: 'Next Student',
    previousText: 'Previous Student',
    isFirst: true,
    onNext: sinon.spy(),
    onPrevious: sinon.spy()
}, {
    def: 'isLast: true',
    nextText: 'Next Student',
    previousText: 'Previous Student',
    isLast: true,
    onNext: sinon.spy(),
    onPrevious: sinon.spy()
}
];

var testDefs = {
    'nextText': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-incremental-navigation__next');
        expect(node.textContent).to.equal(value);
    },
    'previousText': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-incremental-navigation__previous');
        expect(node.textContent).to.equal(value);
    },
    'isFirst': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-incremental-navigation__previous');
        if (value) {
            expect(node.className).to.equal('ff_module-button ff_module-button--link ff_module-incremental-navigation__previous ff_module-button--is-disabled ff_module-incremental-navigation__previous--is-disabled');
        } else {
            expect(node.className).to.equal('ff_module-button ff_module-button--link ff_module-incremental-navigation__previous');
        }
    },
    'isLast': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-incremental-navigation__next');
        if (value) {
            expect(node.className).to.equal('ff_module-button ff_module-button--link ff_module-incremental-navigation__next ff_module-button--is-disabled ff_module-incremental-navigation__next--is-disabled');
        } else {
            expect(node.className).to.equal('ff_module-button ff_module-button--link ff_module-incremental-navigation__next');
        }
    },
    'onNext': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-incremental-navigation__next');
        TestUtils.Simulate.click(node);
        if (props.isLast) {
            expect(props.onNext.called).to.be.false;
        } else {
            expect(props.onNext.called).to.be.true;
        }

    },
    'onPrevious': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-incremental-navigation__previous');
        TestUtils.Simulate.click(node);
        if (props.isFirst) {
            expect(props.onPrevious.called).to.be.false;
        } else {
            expect(props.onPrevious.called).to.be.true;
        }

    }
}

describe('IncrementalNavigation', getTestFramework(IncrementalNavigation, testProps, testDefs, 'def'));
