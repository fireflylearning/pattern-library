'use strict';
var React = require('react');

var Expandable = require('./ff_container-expandable-component');

var data = {
	expandedText: 'Hide content',
	collapsedText: 'Show content',
	collapsedIcon: 'ff_container-expandable__icon--closed',
	expandedIcon: 'ff_container-expandable__icon--open'
};

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
		Array.prototype.forEach.call(document.querySelectorAll('[data-ff_container-expandable-component]'), function(domElement) {
			if(domElement){
                React.render(<Expandable {...data}>
                    <span className='crate_util-block'>Content</span>
                </Expandable>,
                domElement);
            }

		});
	});
};
