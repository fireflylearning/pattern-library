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

function isSelectedTab(tabKey, selectedTabKey) {
	var selectedTab = tabKey == selectedTabKey ? ' ff_module-tabs-navigation__tab--is-active' : '';
	return selectedTab;
}

function isUnread(tab, base) {
	var isUnread = tab.unread ? ' ' + base + '--is-unread' : '';
	return isUnread;
}

module.exports = React.createClass({
	displayName: 'TabsNavigation',
	propTypes: {
		modifier: React.PropTypes.string,
		selectedTabKey: React.PropTypes.number.isRequired,
		tabs: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				label: React.PropTypes.string.isRequired,
				id: React.PropTypes.string.isRequired,
				key: React.PropTypes.number.isRequired
			})
		).isRequired
	},
	onTabClick: function(event, tabKey) {
		event.preventDefault();
		this.props.onTabSelected(tabKey);
	},
	render: function() {
		var {onTabSelected, tabs} = this.props;
		return <ul className='ff_module-tabs-navigation'>
			{tabs.map(function(tab) {
				var badge = tab.badge ? <span className="ff_module-tabs-navigation__badge">{tab.badge}</span> : null;
				return <li key={tab.key} className={generateClass('ff_module-tabs-navigation__tab', this.props) + isUnread(tab, 'ff_module-tabs-navigation__tab') + isSelectedTab(tab.key, this.props.selectedTabKey)}>
						<a href="#" onClick={(event) => this.onTabClick(event, tab.key) } className={'ff_module-tabs-navigation__link' + isUnread(tab, 'ff_module-tabs-navigation__link') }>{tab.label}{badge}</a>
					</li>;
			}, this)} </ul>;
	}
});
