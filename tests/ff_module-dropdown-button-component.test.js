'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect,
    sinon = require('sinon'),
    getTestFramework = require('./lib/framework').setUpTestFramework(React, TestUtils, expect);

var DropdownButton = require('../blocks/core/ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component');

var testProps = [{
    text: '[Button basic props]',
    list: [{ text: '[List title 1]', href: '#' }]
}, {
    text: '[Button isOpen]',
    list: [{ text: '[List title 1]', href: '#' }],
    isOpen: true
}, {
    text: '[Button isDisabled]',
    list: [{ text: '[List title 1]', href: '#' }],
    isDisabled: true
}, {
    text: '[Button types]',
    list: [{ type: 'link', text: '[List title 1]', href: '#' },
        { type: 'button', text: '[List title 2]' },
        { type: 'checkbox', text: '[List title 3]' }
    ],
    types: ['link', 'button', 'checkbox']
}, {
    text: '[List onClick handlers]',
    list: [{ type: 'button', text: '[List title 1]', onClick: sinon.spy() }],
    onClick: true
}, {
    text: '[List onChange handlers]',
    list: [{ type: 'checkbox', text: '[List title 1]', onChange: sinon.spy() }],
    onChange: true
}];

var testDefs = {
    text: function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-dropdown-button__button');
        expect(node.textContent).to.equal(value);
    },
    list: function(component, value, props) {
        var nodeList = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-dropdown-button__list-item');
        if (props.isDisabled) {
            expect(nodeList.length).to.equal(0);
        } else {
            expect(nodeList.length).to.equal(value.length);
            expect(nodeList[0].textContent).to.equal(value[0].text);
        }
    },
    isOpen: function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-dropdown-button__list-container');
        expect(node.className).to.equal('ff_module-dropdown-button__list-container ff_module-dropdown-button__list-container--is-open');
    },
    isDisabled: function(component, value, props) {
        var fn = function() {
            TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-dropdown-button__list-container');
        };
        expect(fn).to.throw('Did not find exactly one match (found: 0)');
    },
    types: function(component, value, props){
        var links = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-dropdown-button__link');
        var buttons = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-button ff_module-button--link');
        var checkboxes = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-form-pair');

        expect(links.length).to.equal(1);
        expect(buttons.length).to.equal(1);
        expect(checkboxes.length).to.equal(1);
    },
    onClick: function(component, value, props) {
        var button = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-button ff_module-button--link');
        TestUtils.Simulate.click(button);
        expect(props.list[0].onClick.called).to.be.true;
    },
    onChange: function(component, value, props) {
        var input = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-form-input');
        TestUtils.Simulate.change(input);
        expect(props.list[0].onChange.called).to.be.true;
    }
}

describe('DropdownButton', getTestFramework(DropdownButton, testProps, testDefs, 'text'));
