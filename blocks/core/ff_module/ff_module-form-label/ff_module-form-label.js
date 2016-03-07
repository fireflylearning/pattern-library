'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'FormLabel',
	render: function() {
		var attributes = {
			htmlFor: this.props.id,
			className: 'ff_module-form-label' + (this.props.modifier != null ? ' ff_module-form-label--' + this.props.modifier : ''),
		};

		if (this.props.data)
		{
			this.props.data.forEach(function(attribute) {
				attributes[attribute.attr] = attribute.value;
			});	
		}

		var content = [this.props.children];

		if (!this.props.required) {
			content.push(React.createElement('span', {className: 'ff_module-form-label__optional'}, ' (optional)'));
		} 
		return React.createElement('label', attributes, content);
		
	}
});