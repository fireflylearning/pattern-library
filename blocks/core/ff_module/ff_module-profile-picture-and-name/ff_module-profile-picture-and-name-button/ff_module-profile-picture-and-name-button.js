'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'ResultButton',
    render: function() {
        var className = "ff_module-profile-picture-and-name-button" + (this.props.isSelected ? ' ff_module-profile-picture-and-name-button--is-selected' : '');
        return (
            <button
                type="button"
                className={className}
                data-guid={this.props.guid}
                onClick={this.props.onSelect}
                disabled={this.props.isSelected}
                >
                <figure className="ff_module-profile-picture-and-name-button__picture">
                    <img className="ff_module-profile-picture-and-name-button__image" src={this.props.pic_href} />
                </figure>
                <span className="ff_module-profile-picture-and-name-button__title">{this.props.label}</span>
            </button>
        );
    },

});
