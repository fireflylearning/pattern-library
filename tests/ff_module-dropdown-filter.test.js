'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect,
    sinon = require('sinon'),
    getTestFramework = require('./lib/framework').setUpTestFramework(React, TestUtils, expect);

var DropdownFilters = require('../blocks/core/ff_module/ff_module-dropdown-filters/ff_module-dropdown-filters');


var testProps = [{
    text: '[DropdownFilter basic props]',
    filters: [{ name: '[Filter title A1]', id:'filterA1' }, { name: '[Filter title A2]', id:'filterA2' }],
        onAddFilter: sinon.spy(),
    onRemoveFilter: sinon.spy()
}, {
    text: '[DropdownFilter isOpen]',
    filters: [{ name: '[Filter title B1]' , id:'filterB1'}],
    isOpen: true,
        onAddFilter: sinon.spy(),
    onRemoveFilter: sinon.spy()
}, {
    text: '[DropdownFilter isDisabled]',
    filters: [{ name: '[Filter title C1]', id:'filterC1' }],
    isDisabled: true,
    onAddFilter: sinon.spy(),
    onRemoveFilter: sinon.spy()
}, {
    text: '[Filter onClick handlers]',
    filters: [{ name: '[Filter title D1]', id:'filterD1' }],
    onAddFilter: sinon.spy(),
    onRemoveFilter: sinon.spy()
}];

var testDefs = {
    text: function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-dropdown-button__button');
        expect(node.textContent).to.equal(value);
    },
    filters: function(component, value, props) {
        var nodeList = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-dropdown-button__list-item');
        if (props.isDisabled) {
            expect(nodeList.length).to.equal(0);
        } else {
            expect(nodeList.length).to.equal(value.length);
            expect(nodeList[0].textContent).to.equal(value[0].name);
        }
    },
    isOpen: function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-dropdown-button__list-container');
        expect(node.className).to.equal('ff_module-dropdown-button__list-container ff_module-dropdown-button__list-container--is-open ff_module-dropdown-button__list-container--is-enabled ff_module-dropdown-button__list-container--is-open--is-enabled');
    },
    isDisabled: function(component, value, props) {
        var fn = function() {
            TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-dropdown-button__list-container');
        };
        expect(fn).to.throw('Did not find exactly one match (found: 0)');
    },
    onAddFilter: function(component, value, props) {
        var inputs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-input');
         if (props.isDisabled) {
            expect(inputs.length).to.equal(0);
        } else {
            var input = inputs[0];
            input.checked = true;
            TestUtils.Simulate.change(input);
            expect(value.called).to.be.true;
        }
    },
    onRemoveFilter: function(component, value, props) {
        var inputs = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-input');
         if (props.isDisabled) {
            expect(inputs.length).to.equal(0);
        } else {
            var input = inputs[0];
            input.checked = false;
            TestUtils.Simulate.change(input);
            expect(value.called).to.be.true;
        }
    }
}

describe('DropdownFilters', getTestFramework(DropdownFilters, testProps, testDefs, 'text'));
