'use strict';

var React = require('react');

function generateClass(base, props) {
    var classNames = [];
    props = props || {};
    classNames.push(base);
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    return classNames.join(' ');
}

module.exports = React.createClass({
    displayName: 'FormLine',
    render: function() {

        return <div className='ff_container-form-line'>{this.props.formLine.map(function(formLine) {
                var itemClassName = generateClass('ff_container-form-line__item', { modifier: formLine.modifier });
                if (React.isValidElement(formLine.content)){
                    return React.cloneElement(formLine.content, { className: itemClassName });
                } else {
                    return <span className={itemClassName}>{formLine.content}</span>;
                }
            })}</div>;
    }
});
