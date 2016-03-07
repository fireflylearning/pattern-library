'use strict';

var React = require('react');
var template = require('./_ff_module-response-recipient-list.rt.js');

module.exports = React.createClass({
    displayName: 'TaskResponseRecipientList',
    propTypes:{
        responses: React.PropTypes.array.isRequired,
        onSelect: React.PropTypes.func.isRequired
    },
    render: template
});
