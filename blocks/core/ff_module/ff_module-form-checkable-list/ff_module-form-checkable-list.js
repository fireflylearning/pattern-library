'use strict';

var React = require('react');
var FormInput = require('../ff_module-form-input/ff_module-form-input');
var FormLabel = require('../ff_module-form-label/ff_module-form-label');

module.exports = React.createClass({
	displayName: 'CheckableList',
	render: function() {
		return <ul className='ff_module-form-checkable-list'>
				{this.props.items.map(function(list_item) {
					return <li className={'ff_module-form-checkable-list__item' + (list_item.modifier != null ? ' ff_module-form-checkable-list__item--' + list_item.modifier : '')}>
					<div className={'ff_module-form-pair' + (list_item.modifier != null ? ' ff_module-form-pair--' + list_item.modifier : '')}>
					<FormInput {...list_item} />
					<FormLabel id={list_item.id} required={list_item.required} modifier={list_item.modifier}>{list_item.label}</FormLabel>
					</div>
					</li>;
				})}
		</ul>;	
	}
});