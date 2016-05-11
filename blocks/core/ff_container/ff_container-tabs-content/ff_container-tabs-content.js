'use strict';

var React = require('react');

function generateClass(base, props) {
	var classNames = [];
	props = props || {};
	classNames.push(base);
	if (!!props.modifier) classNames.push(base + '--' + props.modifier);
	return classNames.join(' ');
}

function isSelectedTab(tabKey, selectedTabKey) {
	var selectedTab = tabKey == selectedTabKey ? ' ff_container-tabs-content--is-active' : '';
	return selectedTab;
}
module.exports = React.createClass({
	displayName: 'ContainerTabsContent',
	propTypes: {
		selectedTabKey: React.PropTypes.number.isRequired,
		modifier: React.PropTypes.string,
		tabs: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				content: React.PropTypes.element.isRequired,
				id: React.PropTypes.string.isRequired,
				key: React.PropTypes.number.isRequired
			})
		).isRequired
	},
	render: function() {
		return <div>{this.props.tabs.map(function(tab) { 
			return <div key={tab.key} className={generateClass('ff_container-tabs-content', this.props) + isSelectedTab(tab.key, this.props.selectedTabKey)}  data-ff_module-tabs-react-content={tab.id} id={tab.id}>
				{tab.content}
			</div>;
		}, this)} </div>;	
	}
});