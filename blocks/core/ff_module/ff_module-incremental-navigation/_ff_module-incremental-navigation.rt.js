'use strict';
var React = require('react/addons');
var _ = require('lodash');
var Button = require('../ff_module-button/ff_module-button.js');
var ContainerControlBar = require('../../ff_container/ff_container-control-bar/ff_container-control-bar');
var ControlBarSet = require('../../ff_container/ff_container-control-bar/_src/_ControlBarSet');
module.exports = function () {
    return React.createElement(ContainerControlBar, {
        'modifier': 'split',
        'classes': 'ff_module-incremental-navigation'
    }, React.createElement(ControlBarSet, {}, React.createElement(Button, {
        'modifier': 'link',
        'icon': 'page-back-blue',
        'classes': 'ff_module-incremental-navigation__previous',
        'text': this.props.previousText,
        'disabled': this.props.isFirst,
        'onClick': this.props.onPrevious
    })), React.createElement(ControlBarSet, {}, React.createElement(Button, {
        'modifier': 'link',
        'icon': 'page-forward-blue',
        'iconAlign': 'right',
        'classes': 'ff_module-incremental-navigation__next',
        'text': this.props.nextText,
        'disabled': this.props.isLast,
        'onClick': this.props.onNext
    })));
};