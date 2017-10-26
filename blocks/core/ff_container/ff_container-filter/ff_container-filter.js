'use strict';

var React = require('react');
var generateClasses = require('../../_lib/_ui/class-utils.js').generateStandardClass;
var Button = require('../../ff_module/ff_module-button/ff_module-button.js');

module.exports = React.createClass({
    displayName: 'FilterContainer',
    propTypes: {
        label: React.PropTypes.string.isRequired,
        modifier: React.PropTypes.string,
        clearFiltersButton: React.PropTypes.shape(Button.propTypes),
        filters: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                content: React.PropTypes.element.isRequired
            })
        ).isRequired
    },
    render: function() {
        var isClearFiltersEnabled = this.props.clearFiltersButton ? <div className='ff_container-filter__clear-button'><Button {...this.props.clearFiltersButton} /> </div> : '';
        return (
            <div className={generateClasses('ff_container-filter', this.props)}>
                    {isClearFiltersEnabled}
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
