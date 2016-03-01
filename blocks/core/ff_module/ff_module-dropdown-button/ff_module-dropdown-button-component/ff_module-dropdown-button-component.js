'use strict';

var React = require('react');
var template = require('./_ff_module-dropdown-button-component.rt.js');

module.exports = React.createClass({
    displayName:'DropdownButton',
    propTypes: {
        list: React.PropTypes.array.isRequired,
        id: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired
    },
    render: template,
    generateClass: function(base, props) {
        var classNames = {};
        classNames[base] = true;
        classNames[base + '--' + props.modifier] = props.modifier;
        classNames[base + '--is-open'] = props.isOpen;
        classNames[base + '--is-disabled'] = props.isDisabled;
        classNames[props.classes] = props.classes;
        return classNames;
    }
});
