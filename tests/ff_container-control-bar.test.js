'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;
var _ = require('lodash');

var ContainerControlBar = require('../blocks/core/ff_container/ff_container-control-bar/ff_container-control-bar');

var sets = [
    [{
        title: 'Test title',
        modules: [
            { key: 'item1', text: 'Item 1' },
            { key: 'item2', text: 'Item 2' }
        ]
    }, {
        modules: [{ key: 'item3', text: 'Item 3' }]
    }],
    [{
        modules: [
            { key: 'item1', text: 'Item 1' },
            { key: 'item2', text: 'Item 2' }
        ]

    }],
    [{
        modules: [
            { key: 'item1', text: 'Item 1' },
            { key: 'item2', text: 'Item 2' }
        ]
    }, {
        modules: [{ key: 'item3', text: 'Item 3' }]
    }, {
        modules: [
            { key: 'item4', text: 'Item 4' },
            { key: 'item5', text: 'Item 5' }
        ]
    }]
];

var tests = [
    { modifier: 'left' },
    { modifier: 'split' },
    { modifier: 'right' },
    { modifier: 'centered' },
    { modifier: 'left', classes: 'ff_other-class' },
    { modifier: 'split', classes: 'ff_other-class' },
    { modifier: 'right', classes: 'ff_other-class' },
    { modifier: 'centered', classes: 'ff_other-class' }
];

var expected = [
    'ff_container-control-bar ff_container-control-bar--left',
    'ff_container-control-bar ff_container-control-bar--split',
    'ff_container-control-bar ff_container-control-bar--right',
    'ff_container-control-bar ff_container-control-bar--centered',
    'ff_container-control-bar ff_container-control-bar--left ff_other-class',
    'ff_container-control-bar ff_container-control-bar--split ff_other-class',
    'ff_container-control-bar ff_container-control-bar--right ff_other-class',
    'ff_container-control-bar ff_container-control-bar--centered ff_other-class'
];

function getSets(datum) {
    datum.modules = datum.modules.map(function(module) {
        return React.createElement('span', { className: 'crate_util-block', key: module.key },
            module.text);
    });
    return datum;
}

describe('ContainerControlBar', function() {
    var component;

    it('should render', function() {
        var element = React.createElement(ContainerControlBar, {
            modifier: 'split',
            sets: sets[0].map(getSets)
        });
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    tests.forEach(function(test, i) {
        it('should generate correct class of \'' + expected[i] + '\' for modifier \'' + test.modifier + (test.classes ? ' ' + test.classes : '') + '\'', function() {
            var element = React.createElement(ContainerControlBar, _.extend(test, {
                sets: sets[0].map(getSets)
            }));
            var component = TestUtils.renderIntoDocument(element);
            var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-control-bar');
            expect(root.className).to.equal(expected[i]);
        });
    });

    sets.forEach(function(set, i) {
        it('should render the correct number of groups (' + set.length + ')', function() {
            var element = React.createElement(ContainerControlBar, _.extend(tests[0], {
                sets: set.map(getSets)
            }));
            var component = TestUtils.renderIntoDocument(element);
            var items = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_container-control-bar__group');
            expect(items.length).to.equal(set.length);
        });
    })

});
