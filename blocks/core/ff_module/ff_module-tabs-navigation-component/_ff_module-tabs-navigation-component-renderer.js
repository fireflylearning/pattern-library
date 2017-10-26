'use strict';

var ReactDOM = require('react-dom');
var createStore = require('redux').createStore;
var ReactRedux = require('react-redux');
var Provider = ReactRedux.Provider;
var connect = ReactRedux.connect;

var TabsNavigation = require('./ff_module-tabs-navigation-component');

function mapStateToProps(state) {
	return {
		selectedTabKey: state,
		modifier: '',
		tabs: [{
			label: "Overview",
			id: "tab1-react",
			key: 1,
			unread: true
		},
		{
			label: "Details",
			id: "tab2-react",
			key: 2
		},
		{
			label: "Tasks",
			id: "tab3-react",
			badge: "33",
			key: 3
		},
		{
			label: "Students",
			id: "tab4-react",
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

var TabsNavigationConnected = connect(mapStateToProps,mapDispatchToProps)(TabsNavigation);

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

var store = createStore(reducer);

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-tabs-navigation]'), function(element) {
			if (element) {
				ReactDOM.render(
					<Provider store={store}>
						<TabsNavigationConnected />
					</Provider>
				, element);
			}
		});
	});
};
