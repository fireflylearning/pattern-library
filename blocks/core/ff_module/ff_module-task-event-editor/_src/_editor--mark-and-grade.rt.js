'use strict';
var React = require('react/addons');
var _ = require('lodash');
module.exports = function () {
    return React.createElement('div', {}, React.createElement('p', {}, '\n        Mark:\n        ', React.createElement('input', {
        'value': this.props.event.mark,
        'onChange': this.props.onMarkChange
    }), '\n        out of\n        ', React.createElement('input', {
        'value': this.props.event.markMax,
        'onChange': this.props.onMarkMaxChange
    })), React.createElement('p', {}, '\n        Grade: ', React.createElement('input', {
        'value': this.props.event.grade,
        'onChange': this.props.onGradeChange
    })), React.createElement('p', {}, 'Feedback Summary (optional)'), React.createElement('textarea', {
        'value': this.props.event.message,
        'onChange': this.props.onMessageChange
    }));
};