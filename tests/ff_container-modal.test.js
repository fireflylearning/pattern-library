'use strict';

var React = require('react');
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

});
