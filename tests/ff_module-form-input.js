'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var FormInput = require('../blocks/core/ff_module/ff_module-form-input/ff_module-form-input');

describe('FormInput', function() {
    it('should render', function() {
        var element = React.createElement(FormInput);
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });
    
    // [id, name, value, modifier, data-attr]
    // test a text input
	var id = '[Input Id]',
	    name = '[Input Name]',
	    value = '[Input Value]',
	    modifier = '[Modifier]',
	    attributeName = 'data-ff-attribute-name',
	    attributeValue = '[Attribute Value]';
	it('should make an input element with correct properties set', function() {
        var element = React.createElement(FormInput, {id: id, name: name, value: value, modifier: modifier, data: [{attr: attributeName, value: attributeValue}], disabled: true});
        var component = TestUtils.renderIntoDocument(element);
        var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-form-input');
        expect(root.id).to.equal(id);
        expect(root.name).to.equal(name);
        expect(root.value).to.equal(value);
        expect(root.className).to.equal('ff_module-form-input ff_module-form-input--' + modifier);
        expect(root.getAttribute(attributeName)).to.equal(attributeValue);
	});
    
    // [type=checkbox, checked, disabled]
    // check checked on checkbox
	it('should make a checkbox input element that is checked and disabled', function() {
        var element = React.createElement(FormInput, {type: "checkbox", checked: true, disabled: true});
        var component = TestUtils.renderIntoDocument(element);
        var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-form-input');
        expect(root.getAttribute("type")).to.equal("checkbox");
        expect(root.getAttribute("checked")).to.exist;
        expect(root.getAttribute("disabled")).to.exist;
	});
    
    // [type=select]
    // test a select input
    var optionText = "[Option Text]",
        optionValue = "[Option Value]";
	it('should make a select element with a single option', function() {
        var element = React.createElement(FormInput, {
            type: "select",
            options: [{
                text: optionText,
                value: optionValue
            }]
        });
        var component = TestUtils.renderIntoDocument(element);
        var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-form-input');
        expect(root.tagName).to.equal("SELECT");
        expect(root.getElementsByTagName('option')[0].innerHTML).to.equal(optionText);
        expect(root.getElementsByTagName('option')[0].getAttribute("value")).to.equal(optionValue);
	});
    
    // [onClick, onChange]
    // check onClick and onChange event handlers
    var onClickRan = false,
        onChangeRan = false;
    var onClick = function() {
        onClickRan = true;
    };
    var onChange = function() {
        onChangeRan = true;
    };
	it('should make a an input element and attach onClick and onChange event handlers', function() {
        var element = React.createElement(FormInput, { onClick: onClick, onChange: onChange });
        var component = TestUtils.renderIntoDocument(element);
        var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-form-input');
        React.addons.TestUtils.Simulate.click(root);
        React.addons.TestUtils.Simulate.change(root);
        expect(onClickRan).to.be.ok;
        expect(onChangeRan).to.be.ok;
	});
});