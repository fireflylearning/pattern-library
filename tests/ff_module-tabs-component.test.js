'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;
var sinon = require('sinon');

var TabsComponent = require('../blocks/core/ff_module/ff_module-tabs-component/ff_module-tabs-component');

var tabs = [{
		state: 'is-active',
		label: 'test label 1',
		content: <p>test content 1</p>,
		id: "tab1a",
		key: 1
	},
	{
		state: '',
		label: 'test label 2',
		content: <p>test content 2</p>,
		id: "tab2a",
		key: 2
	}
];
var modifier = '[Modifier]';

describe('TabsComponent', function() {
	
	it('should render a set of tabs', function() {
		var element = React.createElement(TabsComponent, {tabs: tabs});
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});

	it('should render ' + tabs.length + ' tabs', function() {
		var element = React.createElement(TabsComponent, {tabs: tabs});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-tabs-navigation__tab');
		expect(root.length).to.equal(tabs.length);
	});

	it('should render tabs with a modifier: ' + modifier, function() {
		var element = React.createElement(TabsComponent, {modifier: modifier, tabs: tabs});
		var component = TestUtils.renderIntoDocument(element);
		var root = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_container-tabs-content');
		expect(root[0].className).to.contain('ff_container-tabs-content ff_container-tabs-content--' + modifier);
	});

	it('should call the on onTabSelected and select the right tab', function(){
		var element = React.createElement(TabsComponent, {selectedTabKey: 1, onTabSelected: sinon.spy(), tabs:tabs});
		var component = TestUtils.renderIntoDocument(element);
		var tabsLi = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-tabs-navigation__tab');
		var tabsLink = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ff_module-tabs-navigation__link');
		var clickedTab = tabsLink[1];
		TestUtils.Simulate.click(clickedTab);
		expect(element.props.onTabSelected.called).to.be.true;
		setTimeout(function(){
			expect(tabsLi[1].className).to.contain('--is-active');
		}, 100);
	});
});