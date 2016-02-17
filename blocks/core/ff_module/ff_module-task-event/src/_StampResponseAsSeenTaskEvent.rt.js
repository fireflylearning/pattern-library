'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('div', { 'className': 'ff_module-task-event' }, React.createElement('p', {}, this.props.event.sent), React.createElement('p', {}, this.props.event.author.name, ' stamped response as seen'));
};