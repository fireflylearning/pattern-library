'use strict';

var React = require('react');
var template = require('./_TaskEventBase.rt.js');
var dateFormatting = require('../../../_lib/_ui/dateFormatting')();
var ensureIsDate = require('../../../_lib/_ui/date-utils').ensureIsDate;

module.exports = React.createClass({
    displayName: 'TaskEventBase',
    render: template,
    formatDate: function(date) {
        var validDate = ensureIsDate(date);
        if (validDate) {
            return dateFormatting.niceDate(date);
        }
        return '';
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
