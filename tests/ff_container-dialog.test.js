'use strict';
var React = require('react');



var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    sinon = require('sinon');

var ContainerDialog = require('../blocks/core/ff_container/ff_container-dialog/ff_container-dialog'),
    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, ContainerDialog);

var textContent = {
        title: 'Title',
        body: 'Test body text',
        controls: ['Send', 'Close']
    },
    props = {
        title: textContent.title,
        showCloseIcon: true,
        onCloseIconClick: sinon.spy(),
        body: <p>{textContent.body}</p>,
        controls: [<button key="send">{textContent.controls[0]}</button>, <button key="close">{textContent.controls[1]}</button>]
    },
    propsNoButton = {
        title: textContent.title,
        showCloseIcon: false,
        body: <p>{textContent.body}</p>,
        controls: <button key="close">{textContent.controls[1]}</button>
    };

describe('ContainerDialog', function() {
    var component;

    it('should render', function() {
        var element = React.createElement(ContainerDialog, props);
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    it('should render a title element', function(){
        var root = getElementByClass(props, 'ff_container-dialog__title');
        expect(root.textContent).to.equal(textContent.title);
    });

    it('should render body element(s)', function(){
        var root = getElementByClass(props, 'ff_container-dialog__body');
        expect(root.textContent).to.equal(textContent.body);
    });

    it('should render control element(s)', function(){
        var firstRoot = getElementByClass(props, 'ff_container-dialog__controls');
        var firstButtons = firstRoot.getElementsByTagName('button');
        expect(firstButtons.length).to.equal(2);
        expect(firstButtons.item(0).textContent).to.equal(textContent.controls[0]);
        expect(firstButtons.item(1).textContent).to.equal(textContent.controls[1]);

        var secondRoot = getElementByClass(propsNoButton, 'ff_container-dialog__controls');
        var secondButtons = secondRoot.getElementsByTagName('button');
        expect(secondButtons.length).to.equal(1);
        expect(secondButtons.item(0).textContent).to.equal(textContent.controls[1]);
    });

    it('should render close button if prop specified', function(){
        var root = getElementByClass(props, 'ff_container-dialog__close-top');
        expect(root.textContent).to.equal('Close');
    });

    it('should not render close button if prop not specified', function(){
        var attemptToFindNode = function(){
            var root = getElementByClass(propsNoButton, 'ff_container-dialog__close-top');
        }
        expect(attemptToFindNode).to.throw(Error, /Did not find/);
    });

    it('should fire correct method when \'onCloseIconClick\' is clicked', function(){
        var root = getElementByClass(props, 'ff_container-dialog__close-top');
        TestUtils.Simulate.click(root);
        expect(props.onCloseIconClick.called).to.be.true;
    });

});
