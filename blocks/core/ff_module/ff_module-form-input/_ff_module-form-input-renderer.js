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
	getInitialState: function() {
		return {
			value: this.props.value
		};
	},
	render: function() {
		return <FormInput {...this.props} onChange={event => this.setValue(event)} value={this.state.value} />;
	},
	setValue: function(event) {
		this.setState({
			value: event.target.value
		});
	}
});

module.exports = function() {
	document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector('[data-ff_module-form-input]');
        if (element) {
            React.render(<InputContainer {...data} />, element);
        }
	});
};
