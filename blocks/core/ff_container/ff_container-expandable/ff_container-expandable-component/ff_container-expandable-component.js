'use strict';

var React = require('react');
var Expandable = require('../../ff_container-expandable/ff_container-expandable.js');

module.exports = React.createClass({
	displayName: 'Expandable',
	render: function() {
		return <div data-ff='expandable' className={'ff_container-expandable' + (this.props.modifier ? ' ff_container-expandable--' + this.props.modifier : '')}>
		<div data-ff-action='expandable-dropdown' className='ff_container-expandable__header'>
			<span data-ff='expandable-text' data-expanded-text={this.props.expandedText} data-collapsed-text={this.props.collapsedText}>
				{this.props.collapsedText}
			</span>
			<span data-icon='expandable-icon' data-collapsed-icon={this.props.collapsedIcon} data-expanded-icon={this.props.expandadeIcon} className={'ff_icon ff_container-expandable__icon ' + this.props.collapsedIcon}></span>
		</div>
		<div className='ff_container-expandable__content' data-ff='expandable-content'>
			{this.props.content}
		</div>
		</div>;	
	},
	componentDidMount: function() {
		Expandable();
	}

});