'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    sinon = require('sinon');

var StatelessContainerTaskOverview = require('../blocks/core/ff_container/ff_container-task-overview/ff_container-task-overview'),
    ContainerTaskOverview = require('./lib/framework').wrapStatelessComponent(React, StatelessContainerTaskOverview),
    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, ContainerTaskOverview);

var props = {},
    children = <div><p>Child 1</p><p>Child 2</p></div>;

describe('ContainerTaskOverview', function() {
    var component;

    it('should render', function() {
        var element = <ContainerTaskOverview />;
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    it('should render with children', function(){
        var element = <ContainerTaskOverview {...props}>
                        {children}
                        </ContainerTaskOverview>;

        var component = TestUtils.renderIntoDocument(element);
        var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-task-overview');
        expect(root.textContent).to.equal('Child 1Child 2');
    });

});
