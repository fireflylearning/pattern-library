'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var Progress = require('../blocks/core/ff_module/ff_module-progress/ff_module-progress.js');

describe('Progress', function() {

    it('should always render a progress bar', function() {
        var element = React.createElement(Progress, {});
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    it('should always render a progress bar from minimal data', function() {
        var element = React.createElement(Progress, {
            sentTo: 20,
            completedBy: 2,
            marked: 2
        });
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    it('completed should be 25%, marked should be 0% when none are marked', function() {
        var element = React.createElement(Progress, {
            sentTo: 20,
            completedBy: 5,
            marked: 0
        });
        var component = TestUtils.renderIntoDocument(element);
        var completed = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-progress__bar--completed');
        var marked = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-progress__bar--marked');
        expect(completed.style.width).to.equal('25%');
        expect(marked.style.width).to.equal('0%');
    });

    it('completed should be 50%, marked should be 50% when half are marked', function() {
        var element = React.createElement(Progress, {
            sentTo: 20,
            completedBy: 20,
            marked: 10
        })
        var component = TestUtils.renderIntoDocument(element);
        var completed = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-progress__bar--completed');
        var marked = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-progress__bar--marked');
        expect(completed.style.width).to.equal('50%');
        expect(marked.style.width).to.equal('50%');
    });

    it('completed should be 0%, marked should be 100% when all are marked', function() {
        var element = React.createElement(Progress, {
            sentTo: 20,
            completedBy: 20,
            marked: 20
        });
        var component = TestUtils.renderIntoDocument(element);
        var completed = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-progress__bar--completed');
        var marked = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-progress__bar--marked');
        expect(completed.style.width).to.equal('0%');
        expect(marked.style.width).to.equal('100%');
    });

    it('marked should be lonely, Case 1: marked === completed', function() {
        var element = React.createElement(Progress, {
            sentTo: 20,
            completedBy: 5,
            marked: 5
        });
        var component = TestUtils.renderIntoDocument(element);
        var marked = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-progress__bar--marked');
        expect(marked.className).to.contain('--lonely');
    });

    it('marked should be lonely, Case 2: completed === 0', function() {
        var element = React.createElement(Progress, {
            sentTo: 20,
            completedBy: 0,
            marked: 0
        });
        var component = TestUtils.renderIntoDocument(element);
        var marked = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-progress__bar--marked');
        expect(marked.className).to.contain('--lonely');
    });

    it('completed should be lonely, Case 1: marked === 0', function() {
        var element = React.createElement(Progress, {
            sentTo: 20,
            completedBy: 10,
            marked: 0
        });
        var component = TestUtils.renderIntoDocument(element);
        var completed = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-progress__bar--completed');
        expect(completed.className).to.contain('--lonely');
    });

    it('completed should be lonely, Case 2: marked ~ 0 AND sentTo is very large', function() {
        var element = React.createElement(Progress, {
            sentTo: 20000,
            completedBy: 10,
            marked: 3
        });
        var component = TestUtils.renderIntoDocument(element);
        var completed = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-progress__bar--completed');
        expect(completed.className).to.contain('--lonely');
    });

})
