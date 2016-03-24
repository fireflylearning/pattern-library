'use strict';

var React = require('react');
var Modal = require('react-modal');

module.exports = React.createClass({
    displayName: 'ContainerModal',
    render: function() {
        var className = this.generateClass('ff_container-modal__content'),
        overlayClassName = this.generateClass('ff_container-modal__overlay');

        return <Modal className={className} overlayClassName={overlayClassName} ref={this.bindRef} {...this.props }> { this.props.children } </Modal>;
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
