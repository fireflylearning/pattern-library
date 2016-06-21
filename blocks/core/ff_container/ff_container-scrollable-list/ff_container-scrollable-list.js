'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName:'ScrollableList',
    render: function() {
        return (
            <div className="ff_container-scrollable-list">
                <div className="ff_container-scrollable-list__item ff_container-scrollable-list__item--sidebar">{this.props.sidebar}</div>
                <div className="ff_container-scrollable-list__item ff_container-scrollable-list__item--main">{this.props.main}</div>
            </div>
        );
    }
});
