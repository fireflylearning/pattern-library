'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'ControlBarSet',
    render: function() {
        return (
            <div className="ff_container-control-bar__group">
                {this.props.title ? <h3 className="ff_container-control-bar__title" >{this.props.title}</h3> : null}
                {this.props.children}
            </div>
        );
    }
});
