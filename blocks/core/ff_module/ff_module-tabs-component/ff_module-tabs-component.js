'use strict';

var React = require('react');
var TabsContent = require('../../ff_container/ff_container-tabs-content/ff_container-tabs-content.js');
var TabsNavigation = require('..//ff_module-tabs-navigation-component/ff_module-tabs-navigation-component.js');
var TabsControl = require('../ff_module-tabs/ff_module-tabs.js');
var TabsValidator = require('../ff_module-tabs/_ff_module-tabs-control')();


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
	componentDidMount: function() {
		var options = {
			root: this.root,
		}
		TabsControl(TabsValidator, options);
	},
	render: function() {
		return <div ref={(ref) => this.root = ref}  data-ff-tabs="">
			<TabsNavigation {...this.props}/>
			<TabsContent {...this.props}/>
		</div>;
	}

});
