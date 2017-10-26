'use strict';

var React = require('react');
var Modal = require('react-modal'),
    generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;

module.exports = React.createClass({
    displayName: 'ContainerModal',
    componentWillUpdate: function(nextProps, nextState) {
        let body = document.body.classList;
        (nextProps.isOpen) ? body.add('ff_container-modal--is-attached') : body.remove('ff_container-modal--is-attached');
    },
    componentWillMount() {
        if (typeof document !== 'undefined' && document.body) {
            Modal.setAppElement(document.body);
        }
    },
    render: function() {
        var className = generateClass('ff_container-modal__content', this.props),
            overlayClassName = generateClass('ff_container-modal__overlay', this.props);

        return <Modal className={className} overlayClassName={overlayClassName} ref={this.bindRef} {...this.props }> { this.props.children } </Modal>;
    },
    bindRef:function(component){
        this.ffContainerModal = component;
    },
    getOverlay: function() {
        var ref = this.ffContainerModal;
        if (ref) return ref.portal;
        return null;
    }
});
