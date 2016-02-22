var React = require('react');
require('./utils').bootstrapBrowser();

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    _ = require('lodash'),
    sinon = require('sinon');

var Button = require('../blocks/core/ff_module/ff_module-button/ff_module-button');

var buttonProps = [{
    text: 'Button default',
    id: 'btn-02',
    onClick: sinon.spy()
}, {
    text: 'Large button with icon',
    id: 'btn-03',
    modifier: 'large',
    icon: 'calendar',
    onClick: sinon.spy()
}, {
    text: 'Button with icon & hidden text',
    id: 'btn-04',
    modifier: 'large',
    icon: 'calendar',
    hide_text: true,
    onClick: sinon.spy()
}, {
    text: 'Button tertiary',
    id: 'btn-05',
    modifier: 'tertiary',
    icon: 'calendar',
    onClick: sinon.spy()
}, {
    text: 'Button primary',
    id: 'btn-06',
    modifier: 'primary',
    onClick: sinon.spy()
}, {
    text: 'Disabled Button primary',
    id: 'btn-07',
    modifier: 'primary',
    disabled: true,
    onClick: sinon.spy()
}];

var testDefs = {
    'id': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
        expect(node.getAttribute('id')).to.equal(value);
    },
    'text': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
        expect(node.textContent).to.equal(value);
    },
    'modifier': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
        if (props.disabled) {
            expect(node.className).to.equal('ff_module-button ff_module-button--' + value + ' ff_module-button--is-disabled');
        } else {
            expect(node.className).to.equal('ff_module-button ff_module-button--' + value);
        }
    },
    'icon': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_icon');
        if (props.hide_text) {
            expect(node.className).to.equal('ff_icon ff_icon-' + value);
        } else {
            expect(node.className).to.equal('ff_icon ff_icon-' + value + ' ff_icon-left');
        }
    },
    'disabled': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
        expect(node.getAttribute('disabled')).to.exist;
    },
    'hide_text': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-button__content');
        expect(node.className).to.equal('ff_module-button__content ff_module-button__content--hidden');
    },
    'onClick': function(component, value, props) {
        var node = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
        TestUtils.Simulate.click(node);
        if (props.disabled) {
            expect(props.onClick.called).to.be.false;
        } else {
            expect(props.onClick.called).to.be.true;
        }

    }
}

describe('Button', function() {

    it('should render', function() {
        var element = React.createElement(Button, buttonProps[0]);
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    buttonProps.forEach(function(props) {
        describe(props.text, function() {
            var component;

            before(function() {
                var element = React.createElement(Button, props);
                component = TestUtils.renderIntoDocument(element);
            });

            Object.keys(props).forEach(function(key) {
                it('should render \'' + key + '\' of \'' + props[key] + '\'', function() {

                    testDefs[key](component, props[key], props);
                });
            })


        })

    });
});
