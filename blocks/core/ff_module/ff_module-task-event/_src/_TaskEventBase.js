'use strict';

var React = require('react');
var template = require('./_TaskEventBase.rt.js');

module.exports = React.createClass({
    displayName: 'TaskEventBase',
    render: template,
    formatDate: function(date){
        if (typeof date === 'string') {
            return date;
        }
        if (typeof date === 'object' && date.getTime) {
            return date.getTime();
        }
    }
});
