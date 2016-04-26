'use strict';
var React = require('react');

var TabsComponent = require('./ff_module-tabs-component');

var data = {
	modifier: 'constrained-height',
	tabs: [{
		state: 'is-active',
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
};

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-tabs-component]'), function(domElement) {
			if(domElement){
				React.render(<TabsComponent {...data}/>, domElement);
			}
		});
	});
};