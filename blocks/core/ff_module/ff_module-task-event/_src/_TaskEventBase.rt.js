'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('div', { 'className': _.keys(_.pick(this.generateClass('ff_module-task-event', this.props.event), _.identity)).join(' ') }, React.createElement('time', { 'className': 'ff_module-task-event__sent' }, this.formatDate(this.props.event.sent)), this.props.children);
};