'use strict';
var React = require('react'),
	ReactDOM = require('react-dom'),
	selector = 'data-ff-crate-block-react-item';

import PlannerGridDay from './ff_module-planner-grid-day';
var createHeading = require("../../_lib/ff-core/_ff-core.js").createHeading;

var props = {
	events: [{
		startDate: "9:00",
		endDate: "9:35"
	},{
		subject: "English",
		class: "Class 7D/En",
		color: "pink",
		url: "#",
		guid: "testGuid",
		location: "Room 6",
		startDate: "10:15",
		endDate: "11:35",
		note: <span className="crate_util-block">Editor goes here</span>
	},
	{
		startDate: "11:35",
		endDate: "12:15"
	},
	{
		subject: "English",
		class: "Class 9D/En",
		color: "Yellow",
		url: "#",
		guid: "testGuid",
		location: "Room 6",
		startDate: "12:15",
		endDate: "13:35",
		note: <span className="crate_util-block">Editor goes here</span>
	},
	{
		subject: "Mathematics",
		class: "Class 8D/En",
		color: "red",
		url: "#",
		guid: "testGuid",
		location: "Room 8",
		startDate: "14:00",
		endDate: "14:35",
		note: <span className="crate_util-block">Editor goes here</span>
	}]
}

module.exports = function() {

	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
			if (domElement) {
				ReactDOM.render(React.createElement(PlannerGridDay, props), domElement);
				createHeading(domElement);
			}
		});
	}); 
};  