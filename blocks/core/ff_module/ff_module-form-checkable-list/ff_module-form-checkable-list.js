'use strict';

var React = require('react');
var FormInput = require('../ff_module-form-input/ff_module-form-input');
var FormLabel = require('../ff_module-form-label/ff_module-form-label');

module.exports = React.createClass({
	displayName: 'CheckableList',
	render: function() {
		return <ul className='ff_module-form-checkable-list'>
				{this.props.items.map((item)=>{
					return <li className={'ff_module-form-checkable-list__item' + (this.props.modifier ? ' ff_module-form-checkable-list__item--'+this.props.modifier: '')}>
					<div className={'ff_module-form-pair' + (this.props.modifier ? ' ff_module-form-pair--'+this.props.modifier: '')}>
					<FormInput checked={item.checked} id={item.id} value={item.value} modifier={this.props.modifier} name={item.name} type={item.type || 'radio'} />
					<FormLabel id={item.id} required={item.required} modifier={this.props.modifier}>{item.label}</FormLabel>
					</div>
					</li>;
				})}
		</ul>;
	}
});
