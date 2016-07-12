'use strict';

var React = require('react'),
    generateIconClass = require('../../_lib/_ui/class-utils').generateIconClass,
    generateTextClass = require('../../_lib/_ui/class-utils').generateTextClass;

function generateClass(base, props) {
    var classNames = [base];
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    if (!!props.disabled) classNames.push(base + '--is-disabled');
    if (!!props.classes && !!props.disabled) classNames.push(props.classes + '--is-disabled');
    return classNames.join(' ');
}

module.exports = React.createClass({
    displayName: 'Button',
    render: function(){

        var iconSpan = this.props.icon ? <span className = {generateIconClass('ff_module-button', this.props)} /> : null;

        var leftAlignedIcon = null,
            rightAlignedIcon = null;

        if (iconSpan) {
            if (this.props.iconAlign==='right') {
                rightAlignedIcon = iconSpan;
            } else {
                leftAlignedIcon = iconSpan;
            }
        }

        var text = <span className = {generateTextClass('ff_module-button__content', this.props)}>{this.props.text}</span>;

        return <button
                type="button"
                title = {this.props.text}
                id = {this.props.id}
                disabled = {this.props.disabled}
                className = {generateClass('ff_module-button', this.props)}
                onClick = {this.props.onClick}
                >
                {leftAlignedIcon}
                {text}
                {rightAlignedIcon}
                {this.props.children}
            </button>;
    }
});
