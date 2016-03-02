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
        var classNames = [];
        classNames.push(base);
        if (!!props.modifier) classNames.push(base + '--' + props.modifier);
        if (!!props.isOpen) classNames.push(base + '--is-open');
        if (!!props.isDisabled) classNames.push(base + '--is-disabled');
        if (!!props.classes) classNames.push(props.classes);
        return classNames.join(' ');
    }
});
