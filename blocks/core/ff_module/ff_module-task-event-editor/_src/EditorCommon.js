'use strict';

var React = require('react');


module.exports = React.createClass({
    displayName: 'EditorCommon',
    render: function(){
        var label = this.props.messageLabel ? <p>{this.props.messageLabel}</p> : null;

        return <div>
            {label}
            <textarea onChange={this.props.onMessageChange} value={this.props.event.message}></textarea>
        </div>
    }
});
