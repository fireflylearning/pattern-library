'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    _ = require('lodash'),
    sinon = require('sinon'),
    getTestFramework = require('./lib/framework').setUpTestFramework(React, TestUtils, expect);

var Button = require('../blocks/core/ff_module/ff_module-button/ff_module-button');

var buttonProps = [{
    text: 'Button default',
    id: 'btn-default',
    onClick: sinon.spy()
}, {
    text: 'Large button with icon',
    id: 'btn-icon',
    modifier: 'large',
    icon: 'calendar',
    onClick: sinon.spy()
}, {
    text: 'Large button with icon right aligned',
    id: 'btn-lg-icon',
    modifier: 'large',
    icon: 'calendar',
    iconAlign: 'right',
    onClick: sinon.spy()
}, {
    text: 'Button with icon & hidden text',
    id: 'btn-lg-icon-hidden',
    modifier: 'large',
    icon: 'calendar',
    hideText: true,
    onClick: sinon.spy()
}, {
    text: 'Button modifier: tertiary',
    id: 'btn-tertiary',
    modifier: 'tertiary',
    icon: 'calendar',
    onClick: sinon.spy()
}, {
    text: 'Button with classes',
    id: 'btn-classes',
    classes: 'ff_other-class',
    onClick: sinon.spy()
}, {
    text: 'Button modifier: link',
    id: 'btn-link',
    modifier: 'link',
    onClick: sinon.spy()
}, {
    text: 'Button modifier: block',
    id: 'btn-block',
    modifier: 'block',
    onClick: sinon.spy()
}, {
    text: 'Button modifier: link-block',
    id: 'btn-link-block',
    modifier: 'link-block',
    onClick: sinon.spy()
}, {
    text: 'Disabled Button primary',
    id: 'btn-dis-primary',
    modifier: 'primary',
    disabled: true,
    onClick: sinon.spy()
}, {
    text: 'Disabled Button with classes',
    id: 'btn-dis-primary',
    classes: 'ff_other-class',
    disabled: true,
    onClick: sinon.spy()
}];



var testDefs = {
    'id': function(component, value, props) {
        var node = getButton(component);
        expect(node.getAttribute('id')).to.equal(value);
    },
    'text': function(component, value, props) {
        var node = getButton(component);
        expect(node.textContent).to.equal(value);
    },
    'modifier': function(component, value, props) {
        var node = getButton(component);
        testClass(node, props);
    },
    'classes': function(component, value, props) {
        var node = getButton(component);
        testClass(node, props);
    },
    'icon': function(component, value, props) {
        var node = getIcon(component);
        if (props.hideText) {

            expect(node.className).to.equal('ff_icon ff_icon-' + value + ' ff_module-button__icon ff_module-button__icon--no-text');
        } else {
            expect(node.className).to.equal('ff_icon ff_icon-' + value + ' ff_module-button__icon ' + (props.iconAlign ? 'ff_icon-' + props.iconAlign : 'ff_icon-left'));
        }
    },
    'iconAlign': function(component, value, props) {
        var node = getIcon(component);
        if (props.hideText) {
            expect(node.className).to.equal('ff_icon ff_icon-' + props.icon+ ' ff_module-button__icon ');
        } else {
            expect(node.className).to.equal('ff_icon ff_icon-' + props.icon+ ' ff_module-button__icon ff_icon-right');
        }
    },
    'disabled': function(component, value, props) {
        var node = getButton(component);
        expect(node.getAttribute('disabled')).to.exist;
    },
    'hideText': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-button__content');
        expect(node.className).to.equal('ff_module-button__content ff_module-button__content--hidden');
    },
    'onClick': function(component, value, props) {
        var node = getButton(component);
        TestUtils.Simulate.click(node);
        if (props.disabled) {
            expect(props.onClick.called).to.be.false;
        } else {
            expect(props.onClick.called).to.be.true;
        }

    }
}

describe('Button', getTestFramework(Button, buttonProps, testDefs, 'text'));

function getButton(component){
    return TestUtils.findRenderedDOMComponentWithTag(component, 'button');
}

function getIcon(component) {
    return TestUtils.findRenderedDOMComponentWithClass(component, 'ff_icon');
}

function testClass(node, props) {
    var classNames = [], base='ff_module-button';
    classNames.push(base);
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    if (!!props.disabled) classNames.push(base + '--is-disabled');
    if (!!props.classes && !!props.disabled) classNames.push(props.classes+'--is-disabled');
    expect(node.className).to.equal(classNames.join(' '));
}
