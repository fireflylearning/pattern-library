'use strict';

var React = require('react');
var template = require('./_TaskEventBase.rt.js');
var dateFormatting = require('../../../_lib/_ui/dateFormatting')();

module.exports = React.createClass({
    displayName: 'TaskEventBase',
    render: template,
    formatDate: function(date) {
        if (typeof date === 'string') {
            return date;
        }
        if (typeof date === 'object' && date.getTime) {
            return dateFormatting.niceDate(date);
        }
    },
    generateClass: function(base, event) {
        var classNames = [];
        classNames.push(base);
        if (event.type) classNames.push(base + '--' + event.type);
        if (event.pending) classNames.push(base + '--is-pending');
        if (event.error) classNames.push(base + '--has-error');
        return classNames.join(' ');
    }
});
