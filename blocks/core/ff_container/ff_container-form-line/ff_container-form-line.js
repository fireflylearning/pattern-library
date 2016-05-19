'use strict';

var React = require('react');
var generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;

var formFieldDisplayName = 'FormField',
    formlineClass = 'ff_container-form-line',
    formlineItemClass = 'ff_container-form-line__item';

function addClassesToNode(node) {
    if (!node) return null;

    var nodeClass = generateClass(formlineItemClass, (node.props || {}));

    if (React.isValidElement(node)) {
        return React.cloneElement(node, { className: nodeClass });
    } else {
        return <span className={nodeClass}>{node}</span>;
    }
}

function getNodeName(node){
    return node.displayName || node.type.name;
}

function isFormField(node) {
    return getNodeName(node) === formFieldDisplayName;
}

module.exports = React.createClass({
    displayName: 'ContainerFormLine',
    render: function() {

        var clonedChildren = null;
        var children = this.props.children,
            child,
            clonedDirectChildren,
            clonedSubChildren;

        if (children) {
            // single direct child, so formline class can be added directly to it
            if (React.Children.count(children) === 1) {
                child = children;

                if (isFormField(child)) {
                    clonedDirectChildren = React.Children.map(child.props.children, addClassesToNode);
                    return React.cloneElement(child, { className: formlineClass }, clonedDirectChildren)
                } else {
                    clonedDirectChildren = addClassesToNode(child);
                    return <div className={formlineClass}>{clonedDirectChildren}</div>;
                }
            // more than one direct child, so formline class must be added to new wrapper root, and direct children skipped
            } else {
                clonedDirectChildren = React.Children.map(children, child=>{
                    if (isFormField(child)) {
                        clonedSubChildren = React.Children.map(child.props.children, addClassesToNode);
                        return React.cloneElement(child, {}, clonedSubChildren)
                    } else {
                        return addClassesToNode(child);
                    }
                });
                return <div className={formlineClass}>{clonedDirectChildren}</div>;
            }
        }
        return null;
    }
});
