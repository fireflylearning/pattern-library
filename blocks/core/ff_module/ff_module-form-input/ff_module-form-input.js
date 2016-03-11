'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'FormInput',
	render: function() {
		attributes = {};
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
				return React.createElement('option', {
					value: option.value
				}, option.text);
			});
			return React.createElement('select', attributes, options);
		}
		else
		{
			return <input className={'ff_module-form-input' + (this.props.modifier ? ' ff_module-form-input--' + this.props.modifier : '')} name={this.props.name} type={this.props.type ? this.props.type : 'text'} value={this.state.value} 
onChange={event => this.setValue(event)}  {...this.props.attributes} id={this.props.id}></input>;

		}
	}
});