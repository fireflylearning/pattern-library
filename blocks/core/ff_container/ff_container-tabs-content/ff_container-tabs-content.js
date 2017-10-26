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

function isContentLoading(props) {
	var isContentLoading = props.isContentLoading ? ' ff_container-tabs-content--is-loading' : '';
	return isContentLoading;
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
			let isTabSelected = tab.key === this.props.selectedTabKey;

			var tabContent = this.props.isContentLoading ? <img className="ff_container-tabs-content__spinner" src={this.props.spinner_href} /> : tab.content;

			return <div key={tab.key} className={generateClass('ff_container-tabs-content', this.props) + isSelectedTab(tab.key, this.props.selectedTabKey) +  isContentLoading(this.props)}  id={tab.id}>
				{isTabSelected ? tab.content : null}
			</div>;

		}, this)} </div>;	
	}
});