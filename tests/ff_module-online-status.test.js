'use strict';
var React = require('react');

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect;

var OnlineStatus = require('../blocks/core/ff_module/ff_module-online-status/ff_module-online-status'),
    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, OnlineStatus);

var props = [{
    state: {
        offline: true
    }
}, {
    state: {}
}, {
    state: {
        online: false
    }
}];

var expected = ['You\'re offline - changes may not be saved.'];

describe('OnlineStatus', function() {

    it('should render correct text and icon when state: \'offline\' == \'true\'', function() {
        var root = getElementByClass(props[0], 'ff_module-online-status');
        var text = root.querySelector('.ff_module-online-status__text');
        var icon = root.querySelector('.ff_module-online-status__icon');
        expect(text.textContent).to.equal(expected[0]);
        expect(icon).to.exist;
    });

    it('should not render when state != \'offline\'', function() {
        var attemptToFindNode = function() {
           getElementByClass(props[1], 'ff_module-online-status__text');
        };
        expect(attemptToFindNode).to.throw(Error, /Did not find/);
    });

    it('should render correct text and icon when state: \'online\' == \'false\'', function() {
        var root = getElementByClass(props[2], 'ff_module-online-status');
        var text = root.querySelector('.ff_module-online-status__text');
        var icon = root.querySelector('.ff_module-online-status__icon');
        expect(text.textContent).to.equal(expected[0]);
        expect(icon).to.exist;
    });

});
