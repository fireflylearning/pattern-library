'use strict';

var React = require('react');
var ItemRepeater = require('../../ff_container/ff_container-item-repeater/ff_container-item-repeater');
var ResponseButton = require('../ff_module-profile-response-button/ff_module-profile-response-button');
var TaskResponses = require('../ff_module-task-responses/ff_module-task-responses');

module.exports = React.createClass({
	render: function() {
		return <div className='ff_module-responses'>
			<ItemRepeater modifier="separated ">
			{this.props.responses.map((response)=>{
				var isResponseSelected = !!response.isSelected ? <TaskResponses {...response}/> : '';
				return <div className="ff_module-responses__response">
					<div className='ff_module-responses__recipient'><ResponseButton {...response}/></div>
					<div className='ff_module-responses__content'>{isResponseSelected}</div>
				</div>
			})}
			</ItemRepeater>
		</div>
	}
});
