'use strict';

var React = require('react');
var TabsControl = require('../ff_module-tabs/_ff_module-tabs-renderer.js');

function generateClass(base, props) {
	var classNames = [];
	props = props || {};
	classNames.push(base);
	if (!!props.modifier) classNames.push(base + '--' + props.modifier);
	if (!!props.state) classNames.push(base + '--' + props.state);
	if (!!props.classes) classNames.push(props.classes);
	if (!!props.className) classNames.push(props.className);
	return classNames.join(' ');
}
module.exports = React.createClass({
	displayName: 'TabsNavigation',
	componentDidMount: function() {
		var options = {
			root: this.root
		}
		TabsControl(options);
	},
	render: function() {
		return <ul ref={(ref) => this.root = ref}  className='ff_module-tabs-navigation'>
			{this.props.tabs.map(function(tab) { 
			return <li key={tab.key} className={generateClass('ff_module-tabs-navigation__tab', tab)} data-ff-tabs-target={tab.id}>
				<a href={'#' + tab.id} className='ff_module-tabs-navigation__link' >{tab.label}</a></li>;
		})} </ul>;	
	}
});