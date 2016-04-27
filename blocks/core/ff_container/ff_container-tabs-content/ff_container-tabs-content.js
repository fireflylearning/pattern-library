'use strict';

var React = require('react');

function generateClass(base, props) {
	var classNames = [];
	props = props || {};
	classNames.push(base);
	if (!!props.modifier) classNames.push(base + '--' + props.modifier);
	if (!!props.tabs.state) classNames.push(base + '--' + props.tabs.state);
	return classNames.join(' ');
}
module.exports = React.createClass({
	displayName: 'ContainerTabsContent',
	propTypes: {
		modifier: React.PropTypes.string,
		tabs: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				state: React.PropTypes.string,
				content: React.PropTypes.element.isRequired,
				id: React.PropTypes.string.isRequired,
				key: React.PropTypes.number.isRequired
			})
		).isRequired
	},
	render: function() {
		return <div>{this.props.tabs.map(function(tab) { 
			return <div key={tab.key} className={generateClass('ff_container-tabs-content', this.props)} data-ff_module-tabs-react-content={tab.id} id={tab.id}>
				{tab.content}
			</div>;
		}, this)} </div>;	
	}
});