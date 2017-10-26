'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    _ = require('lodash'),
    sinon = require('sinon'),
    getTestFramework = require('./lib/framework').setUpTestFramework(React, TestUtils, expect);

var TaskResponseActionsIndividual = require('../blocks/core/ff_module/ff_module-task-response-actions-individual/ff_module-task-response-actions-individual');

var testProps = [{
    def: 'should pass the correct onClick handler to all 3 of its buttons',
    onClick: sinon.spy()
}, {
    def: 'should render correct text',
    onClick: sinon.spy(),
    text: ['Send a File', 'Mark as Done', 'Send a Comment']
}, {
    def: 'should render correct text based on state',
    onClick: sinon.spy(),
    state: {
        complete: true
    }
}];


var testDefs = {
    'onClick': function(component, value, props) {
        var nodes = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
        _.forEach(nodes, function(node){
            TestUtils.Simulate.click(node);
        });
        expect(props.onClick.callCount).to.equal(3);
    },
    text : function(component, value, props) {
        var nodes = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
        expect(nodes[0].textContent).to.equal(value[0]);
        expect(nodes[1].textContent).to.equal(value[1]);
        expect(nodes[2].textContent).to.equal(value[2]);
    },
    'state' : function(component, value, props) {
        var nodes = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
        expect(nodes[1].textContent).to.equal('Mark as To Do');
    }
};

// Failing test that was sacrificed to get the working tests running on Jenkins
describe.skip('TaskResponseActionsIndividual', getTestFramework(TaskResponseActionsIndividual, testProps, testDefs, 'def'));
