'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

import CountIndicator from './ff_module-count-indicator';

var data = {
	items: [
		{"latest_read": true},
		{"latest_read": false},
		{"latest_read": true},
		{"latest_read": true},
		{"latest_read": false},
		{"latest_read": true},
		{"latest_read": false},
		{"latest_read": true}
	]
}

function getCount(data) {
	let count = 0;
	data.items.forEach((item) => {
		if (!item.latest_read) count++;
	})
	return count;
}

var props = {
	count: getCount(data),
	title: 'You have ' + getCount(data) + ' unread responses'
}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-count-indicator-component]'), function(domElement, index) {
            var root = React.createElement(CountIndicator, props);
            ReactDOM.render(root, domElement);
        });
    });
};