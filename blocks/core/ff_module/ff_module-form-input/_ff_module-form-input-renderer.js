'use strict';
var React = require('react');

var FormInput = require('./ff_module-form-input');

var data = {
    id: 'input-id',
    value: 'Form input',
    name: 'input-name',
    data: [{
        attr: 'data-ff-attr',
        value: true
	}]
}

var InputContainer = React.createClass({
    getInitialState: function(props) {
		return {
			value: this.props.value
		};
    },
	render: function(props) {
		var inputProps = {
			id: this.props.id,
			type: this.props.type,
			name: this.props.name,
			data: this.props.data,
			value: this.state.value,
			onChange: (event) => this.setValue(event)
		};
		return React.createElement(FormInput, inputProps);
	},
	setValue: function(event) {
		this.setState({
			value: event.target.value
		});
	}
});

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        React.render(React.createElement(InputContainer, data), document.querySelector('[data-ff_module-form-input]'));
    });
};
