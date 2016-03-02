'use strict';

var React = require('react');
var template = require('./_ff_module-button.rt.js');

module.exports = React.createClass({
    displayName: 'Button',
    render: template,
    generateClass: function(base, props) {
        var classNames = [];
        classNames.push(base);
        if (!!props.modifier) classNames.push(base + '--' + props.modifier);
        if (!!props.classes) classNames.push(props.classes);
        if (!!props.disabled) classNames.push(base + '--is-disabled');
        if (!!props.classes && !!props.disabled) classNames.push(props.classes+'--is-disabled');
        return classNames.join(' ');
    }
});
