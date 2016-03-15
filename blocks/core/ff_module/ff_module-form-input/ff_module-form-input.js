'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'FormInput',
	render: function() {
		var attributes = {};
		if (this.props.type == 'checkbox' || this.props.type == 'radio') {
			if (this.props.checked) {
				attributes['checked'] = true;
			}
			if (this.props.disabled) {
				attributes['disabled'] = true;
			}
		}

		if (this.props.data)
		{
			this.props.data.forEach(function(attribute) {
				attributes[attribute.attr] = attribute.value;
			});
		}
		
		if (this.props.type == 'select')
		{
			var options = this.props.options.map(function(option) {
				return <option value={option.value} >{option.text}</option>;
			});
			return <select className={'ff_module-form-input' + (this.props.modifier ? ' ff_module-form-input--' + this.props.modifier : '')} name={this.props.name} {...attributes} onChange={this.props.onChange} onClick={this.props.onClick} >{options}</select>;
		}
		else
		{
			return <input className={'ff_module-form-input' + (this.props.modifier ? ' ff_module-form-input--' + this.props.modifier : '')} name={this.props.name} type={this.props.type ? this.props.type : 'text'} value={this.props.value} onChange={this.props.onChange} onClick={this.props.onClick} {...attributes} id={this.props.id}></input>;

		}
	}
});