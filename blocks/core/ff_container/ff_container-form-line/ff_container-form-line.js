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
            clonedSubChildren,
            className;

        if (children) {

            if (React.Children.count(children) === 1) singleNode = true;

            clonedDirectChildren = React.Children.map(children, child=>{
                if (!child) return null;
                if (isFormField(child)) {
                    if (singleNode) {
                        className = formlineClass;
                    } else {
                        className = formlineSectionClass;
                    }
                    clonedSubChildren = React.Children.map(child.props.children, addClassesToNode);
                    return React.cloneElement(child, { className: className, 'data-anchor': this.props.dataAnchor }, clonedSubChildren)
                } else {
                    return addClassesToNode(child);
                }
            });

            if (singleNode && isFormField(children)) {
                return clonedDirectChildren[0];
            } else {
                // more than one direct child, so formline class must be added to new wrapper root, and direct children skipped if they are formfields
                return <div className={formlineClass} data-anchor={this.props.dataAnchor} >{clonedDirectChildren}</div>;
            }
        }

        return null;
    }
});
