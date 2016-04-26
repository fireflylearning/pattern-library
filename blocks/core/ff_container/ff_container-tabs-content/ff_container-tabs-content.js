'use strict';

var React = require('react');

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
	displayName: 'ContainerTabsContent',
	render: function() {
		return <div>{this.props.tabs.map(function(tab) { 
			return <div key={tab.key} className={generateClass('ff_container-tabs-content', tab)} data-ff-tabs-content={tab.id} id={tab.id}>
				{tab.content}
			</div>;
		})} </div>;	
	}
});