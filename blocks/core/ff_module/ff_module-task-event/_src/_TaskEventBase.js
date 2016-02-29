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
        var classNames = {};
        classNames[base] = true;
        classNames[base + '--' + event.type] = event.type;
        classNames[base + '--is-pending'] = event.pending;
        classNames[base + '--has-error'] = event.error;
        return classNames;
    }
});
