'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    _ = require('lodash'),
    sinon = require('sinon'),
    getTestFramework = require('./lib/framework').setUpTestFramework(React, TestUtils, expect);

var TaskEventActions = require('../blocks/core/ff_module/ff_module-task-event-actions/ff_module-task-event-actions');
var eventTypes = require('../blocks/core/ff_module/ff_module-task-event/_src/events').types;


var testProps = [{
    def: 'should pass the correct onClick handler to all 6 of its buttons',
    onClick: sinon.spy()
}];

var testDefs = {
    'onClick': function(component, value, props) {
        var nodes = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button');
        _.forEach(nodes, function(node){
            TestUtils.Simulate.click(node);
        });

        expect(props.onClick.callCount).to.equal(6);

    }
};


describe('TaskEventActions', getTestFramework(TaskEventActions, testProps, testDefs, 'def'));
