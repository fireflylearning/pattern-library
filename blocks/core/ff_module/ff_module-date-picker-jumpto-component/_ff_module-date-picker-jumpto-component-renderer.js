'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var DatePickerJumpTo = require('./ff_module-date-picker-jumpto-component');

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-date-picker-jumpto-component]'), function(domElement) {
			if(domElement){
                ReactDOM.render(<DatePickerJumpTo>
                    <span className='crate_util-block'>Content</span>
                </DatePickerJumpTo>,
                domElement);
            }
		});
	});
};
