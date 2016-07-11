'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;
var sinon = require('sinon');

var TabsComponent = require('../blocks/core/ff_module/ff_module-tabs-component/ff_module-tabs-component');

var tabs = [{
		label: 'test label 1',
		content: <p>test content 1</p>,
		id: "tab1a",
		key: 1
	},
	{
		label: 'test label 2',
		content: <p>test content 2</p>,
		id: "tab2a",
		key: 2
	}
];
var modifier = '[Modifier]';
var selectedTabKey = 1; 

describe('TabsComponent', function() {

	it('should render a set of tabs', function() {
		var element = React.createElement(TabsComponent, {selectedTabKey: selectedTabKey, tabs: tabs});
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});

	it('should render ' + tabs.length + ' tabs', function() {
		var element = React.createElement(TabsComponent, {selectedTabKey: selectedTabKey, tabs: tabs});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-tabs-navigation__tab');
		expect(root.length).to.equal(tabs.length);
	});

	it('should render tabs with a modifier: ' + modifier, function() {
		var element = React.createElement(TabsComponent, {selectedTabKey: selectedTabKey, modifier: modifier, tabs: tabs});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_container-tabs-content');
		expect(root[0].className).to.contain('ff_container-tabs-content ff_container-tabs-content--' + modifier);
	});

	it('should call the on onTabSelected with the right key', function(){
		var element = React.createElement(TabsComponent, {selectedTabKey: selectedTabKey, onTabSelected: sinon.spy(), tabs:tabs});
		var component = TestUtils.renderIntoDocument(element);
		var tabsLink = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-tabs-navigation__link');
		var clickedTab = tabsLink[1];
		TestUtils.Simulate.click(clickedTab);
		expect(element.props.onTabSelected.calledWith(2)).to.be.true;
	});
});
