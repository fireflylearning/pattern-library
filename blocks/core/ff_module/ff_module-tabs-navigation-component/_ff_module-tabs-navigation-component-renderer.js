'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TabsNavigation = require('./ff_module-tabs-navigation-component');

var data = {
	tabs: [{
		modifier: '',
		state: 'is-active',
		label: "Overview",
		id: "tab1-react",
		key: 1
	},
	{
		modifier: '',
		state: '',
		label: "Details",
		id: "tab2-react",
		key: 2
	},
	{
		modifier: '',
		state: '',
		label: "Tasks",
		id: "tab3-react",
		key: 3
	},
	{
		modifier: '',
		state: '',
		label: "Students",
		id: "tab4-react",
		key: 4
	}]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-tabs-navigation]'), function(element) {
			if (element) {
				ReactDOM.render(<TabsNavigation {...data} />, element);
			}
		});
	});
};