'use strict';

var React = require('react');

var ContainerModalWithDialog = require('../../ff_container/ff_container-modal-with-dialog/ff_container-modal-with-dialog');

module.exports = React.createClass({
    displayName: 'ModuleSetPersonalTask',
    props: {
        onClose: React.PropTypes.func.isRequired,
        title: React.PropTypes.string.isRequired,
        isOpen: React.PropTypes.bool,
        controls: React.PropTypes.node
    },
    render: function() {
        var className = this.generateClass('ff_module-set-personal-task');
        return (
            <ContainerModalWithDialog {...this.props}></ContainerModalWithDialog>
        );

    },
    bindRef:function(component){
        this.ffContainerModal = component;
    },
    getOverlay: function() {
        var ref = this.ffContainerModal;
        if (ref) return ref.portal;
    },
    generateClass:function(base) {
        var classNames = [],
            props = this.props;
        classNames.push(base);
        if (!!props.modifier) classNames.push(base + '--' + props.modifier);
        if (!!props.classes) classNames.push(props.classes);
        return classNames.join(' ');
    }
});
