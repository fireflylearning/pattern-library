'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

require('./lib/utils').bootstrapBrowser();

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var Modal = require('../blocks/core/ff_container/ff_container-modal/ff_container-modal.js');

describe('Modal', function() {

    it('should render', function() {
        var element = React.createElement(Modal, { isOpen: true });
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    it('should have \'getOverlay\' method', function() {
        var element = React.createElement(Modal, { isOpen: true });
        var component = TestUtils.renderIntoDocument(element);

        expect(component.getOverlay).to.be.a('function');
        expect(component.getOverlay()).to.be.a('object');
    });

    it('should have correct class when modifiers are specified', function() {
        var element = React.createElement(Modal, { isOpen: true, modifier: 'compact' });
        var component = TestUtils.renderIntoDocument(element);
        var portal = component.getOverlay();
        var overlay = TestUtils.findRenderedDOMComponentWithClass(portal, 'ff_container-modal__overlay');
        var content = TestUtils.findRenderedDOMComponentWithClass(portal, 'ff_container-modal__content');
        expect(overlay).to.exist;
        expect(content).to.exist;

        expect(overlay.className).to.equal('ReactModal__Overlay ReactModal__Overlay--after-open ff_container-modal__overlay ff_container-modal__overlay--compact');
        expect(content.className).to.equal('ReactModal__Content ReactModal__Content--after-open ff_container-modal__content ff_container-modal__content--compact');
    });
});
