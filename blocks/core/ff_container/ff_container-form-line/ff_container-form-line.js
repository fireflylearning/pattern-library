'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'FormLabel',
	render: function() {

		return React.createElement('div', {className: 'ff_container-form-line'}, 
			this.props.formLine.map(function(formLine) {
				return formLine.content;
			}));
		
	}
});