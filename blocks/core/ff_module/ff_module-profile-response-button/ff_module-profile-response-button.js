'use strict';

var React = require('react');
var template = require('./_ff_module-profile-response-button.rt.js');

module.exports = React.createClass({
    displayName: 'ProfileTaskResponseButton',
    render: template,
    generateClass: function(props){

        if (props.isSelected) {
            return 'ff_module-profile-response-button ff_module-profile-response-button--is-selected';
        }
        if (props.isRead) {
            return 'ff_module-profile-response-button ff_module-profile-response-button--is-read';
        }

        return 'ff_module-profile-response-button';
    }
});
