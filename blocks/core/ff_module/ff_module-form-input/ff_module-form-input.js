'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'FormInput',
    render: function() {
        var attributes = {
            id: this.props.id,
            name: this.props.name,
            type: this.props.type != null ? this.props.type : 'text',
            value: this.props.value,
            className: 'ff_module-form-input' + (this.props.modifier != null ? ' ff_module-form-input--' + this.props.modifier : '')
        };
		
        if (this.props.type == 'checkbox' || this.props.type == 'radio') {
            if (this.props.checked == 'true') {
                attributes['checked'] = true;
            }
            if (this.props.disabled == 'true') {
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
            return React.createElement('input', attributes);
        }
    }
});