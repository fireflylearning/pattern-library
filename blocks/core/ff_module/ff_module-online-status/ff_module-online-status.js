'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'OnlineStatus',
    propTypes: {
        state: React.PropTypes.shape({
            offline: React.PropTypes.bool
        }).isRequired
    },
    render: function(){
        var state = this.props.state || {};
        var isOffline = state.offline;
        return isOffline ? (
            <p className="ff_module-online-status">
                <span className='ff_icon ff_icon-left ff_icon-warning-error ff_module-online-status__icon'></span>
                <span className='ff_module-online-status__text'><b>You're offline</b> - changes may not be saved.</span>
            </p>
            ) : null;
    }
});
