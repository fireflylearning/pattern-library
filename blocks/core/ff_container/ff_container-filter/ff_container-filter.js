'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'FilterContainer',
	render: function() {
		return <div className='ff_container-filter'>
			<div className='ff_container-filter__heading'>
				<label className='ff_container-filter__label'>{this.props.label}</label>
			</div>
			<div className={'ff_container-filter__items' + (this.props.modifier ? ' ff_container-filter__items--' + this.props.modifier : '')}>
				{this.props.filters.map(function(filter){
					return filter.content;
				})}
			</div>
		</div>;	
	}
});