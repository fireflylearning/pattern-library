'use strict';

var React = require('react');
var ItemRepeater = require('../../ff_container/ff_container-item-repeater/ff_container-item-repeater');
var ResponseButton = require('../ff_module-profile-response-button/ff_module-profile-response-button');
var TaskResponses = require('../ff_module-task-responses/ff_module-task-responses');

module.exports = React.createClass({
	render: function() {
		return <div className='ff_module-responses'>
			<div className='ff_module-responses__recipients'>
				
			</div>
			<div className='ff_module-responses__content'>
				
			</div>
		</div>
	}
});
