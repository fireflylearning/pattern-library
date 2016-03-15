'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'FormLine',
	render: function() {
		return <div className={'ff_container-form-line'}>
			{this.props.formLine.map(function(formLine) {
				return formLine.content;
			})}
		</div>;
	}
});