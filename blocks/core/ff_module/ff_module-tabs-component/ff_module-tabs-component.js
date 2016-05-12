'use strict';

var React = require('react');
var TabsContent = require('../../ff_container/ff_container-tabs-content/ff_container-tabs-content.js');
var TabsNavigation = require('..//ff_module-tabs-navigation-component/ff_module-tabs-navigation-component.js');

module.exports = React.createClass({
	displayName: 'TabsComponent',
	propTypes: {
		modifier: React.PropTypes.string,
		tabs: React.PropTypes.arrayOf(
			React.PropTypes.shape({
				state: React.PropTypes.string,
				label: React.PropTypes.string.isRequired,
				content: React.PropTypes.element.isRequired,
				id: React.PropTypes.string.isRequired,
				key: React.PropTypes.number.isRequired
			})
		).isRequired
	},
	render: function() {
		return <div>
			<TabsNavigation {...this.props}/>
			<TabsContent {...this.props}/>
		</div>;
	}

});
