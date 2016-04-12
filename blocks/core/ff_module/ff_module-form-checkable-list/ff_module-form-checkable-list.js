'use strict';

var React = require('react');
var FormInput = require('../ff_module-form-input/ff_module-form-input');
var FormLabel = require('../ff_module-form-label/ff_module-form-label');

module.exports = React.createClass({
	displayName: 'CheckableList',
	generateClass: function(base, props) {
		var classNames = [];
		props = props || {};
		classNames.push(base);
		if (!!props.modifier) classNames.push(base + '--' + props.modifier);
		if (!!props.classes) classNames.push(props.classes);
		if (!!props.className) classNames.push(props.className);
		return classNames.join(' ');
	},
	render: function() {
		return <ul className='ff_module-form-checkable-list'>
				{this.props.items.map((item)=>{
					return <li key={item.key} className={this.generateClass('ff_module-form-checkable-list__item', this.props)}>
					<div className={this.generateClass('ff_module-form-pair' , this.props)}>
					<FormInput checked={item.checked} id={item.id} value={item.value} modifier={this.props.modifier} name={item.name} type={item.type || 'radio'} />
					<FormLabel id={item.id} required={item.required} modifier={this.props.modifier}>{item.label}</FormLabel>
					</div>
					</li>;
				})}
		</ul>;
	}
});
