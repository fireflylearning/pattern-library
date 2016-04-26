'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var ContainerTabsContent = require('./ff_container-tabs-content');

var data = {
	modifier: '',
	tabs: [{
		state: 'is-active',
		label: "Overview",
		content: <p>Overview Tab</p>,
		id: "tab1a",
		key: 1
	},
	{
		state: '',
		label: "Details",
		content: <p>Details Tab</p>,
		id: "tab2a",
		key: 2
	},
	{
		state: '',
		label: "Tasks",
		content: <p>Tasks Tab</p>,
		id: "tab3a",
		key: 3
	},
	{
		state: '',
		label: "Students",
		content: <p>Students Tab</p>,
		id: "tab4a",
		key: 4
	}]
}

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		var element = document.querySelector('[data-ff_container-tabs-content]');
		if (element) {
			ReactDOM.render(<ContainerTabsContent {...data} />, element);
		}
	});
};
