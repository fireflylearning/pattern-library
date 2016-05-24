'use strict';

var React = require('react');
var generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;

var formFieldDisplayName = 'FormField',
    formlineClass = 'ff_container-form-line',
    formlineItemClass = 'ff_container-form-line__item',
    formlineSectionClass= 'ff_container-form-line__section';

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
    return node.displayName || node.type.displayName || node.type.name || node.type;
}

function isFormField(node) {
    return getNodeName(node) === formFieldDisplayName;
}

module.exports = React.createClass({
    displayName: 'ContainerFormLine',
    render: function() {

        var children = this.props.children,
            newProps = {},
            singleNode = false,
            clonedDirectChildren,
            clonedSubChildren;


        if (children) {

            if (React.Children.count(children) === 1) singleNode = true;

            if (singleNode) {
                // single direct child, so formline class can be added directly to it
                newProps = { className: formlineClass };
            } else {
                newProps = { className: formlineSectionClass };
            }

            clonedDirectChildren = React.Children.map(children, child=>{
                if (!child) return null;
                if (isFormField(child)) {
                    clonedSubChildren = React.Children.map(child.props.children, addClassesToNode);
                    return React.cloneElement(child, newProps, clonedSubChildren)
                } else {
                    return addClassesToNode(child);
                }
            });

            if (singleNode) {
                return clonedDirectChildren[0];
            } else {
                // more than one direct child, so formline class must be added to new wrapper root, and direct children skipped if they are formfields
                return <div className={formlineClass}>{clonedDirectChildren}</div>;
            }
        }

        return null;
    }
});
