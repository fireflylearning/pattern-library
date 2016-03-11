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
		return <input className={'ff_module-form-input' + (this.props.modifier ? ' ff_module-form-input--' + this.props.modifier : '')} name={this.props.name} type={this.props.type ? this.props.type : 'text'} value={this.state.value} 
onChange={event => this.setValue(event)}  id={this.props.id}></input>;
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
