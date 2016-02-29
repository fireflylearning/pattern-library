'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;
var _ = require('lodash');

var ContainerOverlay = require('../blocks/core/ff_container/ff_container-overlay/ff_container-overlay');

var content = {
    body: 'The body for the page',
    bar: 'The overlay bar for the page'
};

var tests = [
    { modifier: 'fixed-bottom' },
    { modifier: 'fixed-top' },
    { modifier: 'absolute-bottom' },
    { modifier: 'absolute-top' },
    { modifier: 'fixed-bottom', classes: 'ff_other-class' },
    { modifier: 'fixed-top', classes: 'ff_other-class' },
    { modifier: 'absolute-bottom', classes: 'ff_other-class' },
    { modifier: 'absolute-top', classes: 'ff_other-class' }
];

var expected = [
    'ff_container-overlay ff_container-overlay--fixed-bottom',
    'ff_container-overlay ff_container-overlay--fixed-top',
    'ff_container-overlay ff_container-overlay--absolute-bottom',
    'ff_container-overlay ff_container-overlay--absolute-top',
    'ff_container-overlay ff_container-overlay--fixed-bottom ff_other-class',
    'ff_container-overlay ff_container-overlay--fixed-top ff_other-class',
    'ff_container-overlay ff_container-overlay--absolute-bottom ff_other-class',
    'ff_container-overlay ff_container-overlay--absolute-top ff_other-class'
];

function getSets(datum) {
    datum.modules = datum.modules.map(function(module) {
        return React.createElement('span', { className: 'crate_util-block', key: module.key },
            module.text);
    });
    return datum;
}

describe('ContainerOverlay', function() {

    it('should render', function() {
        var element = React.createElement(ContainerOverlay, {
            modifier: 'split',
            body: React.createElement('span', { className: 'crate_util-block' },
                content.body),
            bar: React.createElement('span', { className: 'crate_util-block' },
                content.bar)
        });
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    describe('content', function() {
        var component;
        before(function() {
            var element = React.createElement(ContainerOverlay, {
                modifier: 'split',
                body: React.createElement('span', { className: 'crate_util-block' },
                    content.body),
                bar: React.createElement('span', { className: 'crate_util-block' },
                    content.bar)
            });
            component = TestUtils.renderIntoDocument(element);
        });
        it('should render correct content for the body (\'' + content.body + '\')', function() {
            var body = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-overlay__body');
            expect(body.textContent).to.equal(content.body);
        });

        it('should render correct content for the bar (\'' + content.bar + '\')', function() {
            var bar = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-overlay__bar-content');
            expect(bar.textContent).to.equal(content.bar);
        });
    });

    describe('css classnames', function() {
        tests.forEach(function(test, i) {
            it('should generate correct class of \'' + expected[i] + '\' for modifier \'' + test.modifier + (test.classes ? ' ' + test.classes : '') + '\'', function() {
                var element = React.createElement(ContainerOverlay, _.extend(test, {
                    body: React.createElement('span', { className: 'crate_util-block' },
                        content.body),
                    bar: React.createElement('span', { className: 'crate_util-block' },
                        content.bar)
                }));
                var component = TestUtils.renderIntoDocument(element);
                var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-overlay');
                expect(root.className).to.equal(expected[i]);
            });
        });
    });

});
