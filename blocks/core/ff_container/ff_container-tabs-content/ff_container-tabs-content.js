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
	render: function() {
		return <div>{this.props.tabs.map(function(tab) { 
			return <div key={tab.key} className={generateClass('ff_container-tabs-content', this.props)} data-ff-tabs-content={tab.id} id={tab.id}>
				{tab.content}
			</div>;
		}, this)} </div>;	
	}
});