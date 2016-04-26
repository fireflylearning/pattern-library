'use strict';

var React = require('react');

function generateClass(base, props) {
	var classNames = [];
	props = props || {};
	classNames.push(base);
	if (!!props.modifier) classNames.push(base + '--' + props.modifier);
	if (!!props.tabs.state) classNames.push(base + '--' + props.state);
	return classNames.join(' ');
}
module.exports = React.createClass({
	displayName: 'TabsNavigation',
	propTypes: {
		modifier: React.PropTypes.string,
		tabs: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				state: React.PropTypes.string,
				label: React.PropTypes.string.isRequired,
				id: React.PropTypes.string.isRequired,
				key: React.PropTypes.number.isRequired
			})
		).isRequired
	},
	render: function() {
		return <ul className='ff_module-tabs-navigation'>
			{this.props.tabs.map(function(tab) { 
				return <li key={tab.key} className={generateClass('ff_module-tabs-navigation__tab', this.props)} data-ff-tabs-target={tab.id}>
						<a href={'#' + tab.id} className='ff_module-tabs-navigation__link' >{tab.label}</a>
					</li>;
			}, this)} </ul>;	
	}
});