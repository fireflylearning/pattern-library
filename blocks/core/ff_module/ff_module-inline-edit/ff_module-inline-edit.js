'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'InlineEdit',
	generateClass: function(base) {
		var classNames = [],
		props = this.props;
		classNames.push(base);
		if(this.props.modifier) {
			classNames.push(base + '--' + this.props.modifier);
		}
		return classNames.join(' ');
	},
	render: function() {
		return <a className={this.generateClass('ff_module-inline-edit' )} id={this.props.id} href={this.props.url} data-hash={this.props.hash}>{this.props.text}</a>;
	}
});