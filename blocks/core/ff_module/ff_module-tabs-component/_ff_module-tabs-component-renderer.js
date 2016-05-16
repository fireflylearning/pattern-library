'use strict';
var ReactDOM = require('react-dom');
var createStore = require('redux').createStore;
var ReactRedux = require('react-redux');
var Provider = ReactRedux.Provider;
var connect = ReactRedux.connect;

var TabsComponent = require('./ff_module-tabs-component');

const SWITCH_TAB = 'SWITCH_TAB';

function reducer(state=1, action) {
	switch (action.type) {
		case SWITCH_TAB:
			return action.tabKey;
		default:
			return state;
	}
}

function switchTabAction(tabKey) {
	return {
		type: SWITCH_TAB,
		tabKey
	}
}

function mapStateToProps(state) {
	return {
		modifier: 'constrained-height',
		selectedTabKey: state,
		tabs: [{
			label: "Overview",
			content: <p>Overview tab</p>,
			id: "tab1",
			key: 1
		},
		{
			state: '',
			label: "Details",
			content: <p>Details tab</p>,
			id: "tab2",
			key: 2
		},
		{
			state: '',
			label: "Tasks",
			content: <p>Tasks tab</p>,
			id: "tab3",
			key: 3
		},
		{
			state: '',
			label: "Students",
			content: <p>Students tab</p>,
			id: "tab4",
			key: 4
		}]
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onTabSelected: function(tabKey) {
			var action = switchTabAction(tabKey);
			dispatch(action)
		}
	}
}

var TabsComponentConnected = connect(mapStateToProps,mapDispatchToProps)(TabsComponent);


module.exports = function() {
	document.addEventListener('DOMContentLoaded', function() {
		Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-tabs-component]'), function(domElement) {
			var store = createStore(reducer);
			if(domElement){
				ReactDOM.render(
					<Provider store={store}>
						<TabsComponentConnected />
					</Provider>, domElement);
			}
		});
	});
};
