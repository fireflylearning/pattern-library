'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'InlineEdit',
	render: function() {
		return <a className={'ff_module-inline-edit' + (this.props.modifier ? ' ff_module-inline-edit--'+ this.props.modifier: '')} id={this.props.id} href={this.props.url}>{this.props.text}</a>;
	}
});