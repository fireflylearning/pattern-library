'use strict';

var React = require('react');

function generateClass(base, props) {
    var classNames = [];
    props = props || {};
    classNames.push(base);
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    if (!!props.className) classNames.push(props.className);
    return classNames.join(' ');
}

module.exports = React.createClass({
    displayName: 'FormLine',
    render: function() {

        var clonedElements = null;

        if (this.props.children){
            clonedElements = React.Children.map(this.props.children, function(child) {
                if (!child) return null;
                var itemClassName = generateClass('ff_container-form-line__item', (child.props || {}));

                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { className: itemClassName });
                } else {
                    return <span className={itemClassName}>{child}</span>;
                }
            });
        }

        return <div className='ff_container-form-line'>{clonedElements}</div>;
    }
});
