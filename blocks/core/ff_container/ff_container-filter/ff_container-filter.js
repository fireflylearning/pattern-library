'use strict';

var React = require('react');
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;


module.exports = React.createClass({
	displayName: 'FilterContainer',
	render: function() {
		return (
            <div className={generateClasses('ff_container-filter', this.props)}>
    			<div className='ff_container-filter__heading'>
    				<label className='ff_container-filter__label'>{this.props.label}</label>
    			</div>
    			<div className={'ff_container-filter__items' + (this.props.modifier ? ' ff_container-filter__items--' + this.props.modifier : '')}>
    				{this.props.filters.map(function(filter){
    					return <div key={filter.key}>{filter.content}</div>;
    				})}
    			</div>
    		</div>
        );
	}
});
