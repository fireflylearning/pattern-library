'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');



var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var props = [
    { title: '[]', isOpen: true, onClose: function(){} },
    { title: '[Component Title]', isOpen: true, onClose: function(){} }
];

var ContainerModalWithDialog = require('../blocks/core/ff_container/ff_container-modal-with-dialog/ff_container-modal-with-dialog.js');

describe('ContainerModalWithDialog', function() {

    it('should render', function() {
        var element = React.createElement(ContainerModalWithDialog, props[0], <p>[Body text]</p>);
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    it('should have \'getOverlay\' method', function() {
        var element = React.createElement(ContainerModalWithDialog, props[0], <p>[Body text]</p>);
        var component = TestUtils.renderIntoDocument(element);
        expect(component.getOverlay).to.be.a('function');
        expect(component.getOverlay()).to.be.a('object');
    });

    it('should have render correct components and children', function() {
        var element = <ContainerModalWithDialog {...props[1]}>
            <p>[Body text]</p>
        </ContainerModalWithDialog>;

        var component = TestUtils.renderIntoDocument(element);
        var portal = component.getOverlay();
        var overlay = TestUtils.findRenderedDOMComponentWithClass(portal, 'ff_container-modal__overlay');
        var content = TestUtils.findRenderedDOMComponentWithClass(portal, 'ff_container-modal__content');
        expect(overlay).to.exist;
        expect(content).to.exist;

        var title = TestUtils.findRenderedDOMComponentWithClass(portal, 'ff_container-dialog__title');
        var body = TestUtils.findRenderedDOMComponentWithClass(portal, 'ff_container-dialog__body');
        expect(title).to.exist;
        expect(body).to.exist;

        expect(title.textContent).to.equal(props[1].title);
        expect(body.textContent).to.equal('[Body text]');
    });
});
