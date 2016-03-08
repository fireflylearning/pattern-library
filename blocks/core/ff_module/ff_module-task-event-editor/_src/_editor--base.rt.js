'use strict';
var React = require('react/addons');
var _ = require('lodash');
var Button = require('../../ff_module-button/ff_module-button');
module.exports = function () {
    return React.createElement('div', {}, React.createElement('h1', {}, this.props.title), '\n    ', this.props.children, '\n    ', React.createElement(Button, {
        'onClick': this.props.onSend,
        'text': this.props.sendText
    }));
};