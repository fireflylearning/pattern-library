'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var ContainerTabsContent = require('./ff_container-tabs-content');

var data = {
	modifier: '',
	selectedTabKey: 1,
	isContentLoading: false,
	spinnerHref: '/images/loading_spinner.gif',
	tabs: [{
		content: <p>Overview Tab</p>,
		id: "tab1a",
		key: 1
	},
	{
		content: <p>Details Tab</p>,
		id: "tab2a",
		key: 2
	},
	{
		content: <p>Tasks Tab</p>,
		id: "tab3a",
		key: 3
	},
	{
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
