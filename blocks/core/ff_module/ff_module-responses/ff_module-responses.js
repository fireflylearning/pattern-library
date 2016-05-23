'use strict';

var React = require('react');
var ItemRepeater = require('../../ff_container/ff_container-item-repeater/ff_container-item-repeater');
var ResponseButton = require('../ff_module-profile-response-button/ff_module-profile-response-button');
var TaskResponses = require('../ff_module-task-responses/ff_module-task-responses');

module.exports = React.createClass({
	render: function() {
		return <div className='ff_module-responses'>
			<div className='ff_module-responses__recipients'>
				<ItemRepeater modifier="separated ">
				{this.props.responses.map((response)=>{
					var isSelected = response.isSelected ? <div className=' ff_module-responses__content ff_module-responses__content--smallscreen'><TaskResponses {...response}/></div> : '';
					return <div>
						<div className='ff_module-responses__recipient'><ResponseButton {...response}/></div>
						{isSelected}
					</div>;
				})}
				</ItemRepeater>
			</div>
			<div className='ff_module-responses__content'>
				{this.props.responses.map((response)=>{
					if (response.isSelected) return  <div><TaskResponses {...response}/></div>;
				})}
			</div>
		</div>
	}
});
