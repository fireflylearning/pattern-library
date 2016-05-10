'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'OnlineStatus',
    propTypes: {
        state: React.PropTypes.shape({
            offline: React.PropTypes.string,
            online: React.PropTypes.string
        }).isRequired
    },
    render: function(){
        var state = this.props.state || {};
        var isOffline = state.offline || !state.online;
        return isOffline ? <p className="ff_module-online-status"><span className='ff_icon ff_icon-left ff_icon-warning-error'></span><b>You're offline</b> - changes may not be saved.</p> : null;
    }
});
