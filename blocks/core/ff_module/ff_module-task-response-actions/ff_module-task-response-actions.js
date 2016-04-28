'use strict';

var React = require('react');
var template = require('./_ff_module-task-response-actions.rt.js');

module.exports = React.createClass({
    displayName: 'TaskResponseActions',
    render: template,
    propTypes: {
        onClick: React.PropTypes.func.isRequired
    },

    createEvent: function(type) {
        return {
            description: { type: type }
        };
    }
});
