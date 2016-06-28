'use strict';
var React = require('react');

var Responses = require('./ff_module-responses');

var data = {
	recipientList: <span className='crate_util-block'>Recipients</span>,
	responseDetails: <span className='crate_util-block'>Details</span>,
	currentTaskResponse: <span className='crate_util-block'>CurrentResponse</span>,
};

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-responses]'), function(domElement) {
			if(domElement){
				React.render(<Responses {...data} />,domElement);
			}

		});
	});
};
