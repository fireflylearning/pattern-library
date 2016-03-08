'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('div', {}, this.props.messageLabel ? React.createElement('p', {}, this.props.messageLabel) : null, React.createElement('textarea', {
        'onChange': this.props.onMessageChange,
        'value': this.props.event.message
    }));
};