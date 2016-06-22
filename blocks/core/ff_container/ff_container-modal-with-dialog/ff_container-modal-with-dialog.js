'use strict';

var React = require('react');

var ContainerDialog = require('../ff_container-dialog/ff_container-dialog'),
    ContainerModal = require('../ff_container-modal/ff_container-modal');

module.exports = React.createClass({
    displayName: 'ContainerModalWithDialog',
    props: {
        onClose: React.PropTypes.func.isRequired,
        title: React.PropTypes.string.isRequired,
        isOpen: React.PropTypes.bool,
        controls: React.PropTypes.node
    },
    render: function() {
        return (
            <ContainerModal
                modifier={this.props.modifier}
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onClose}
                ref={this.bindRef}
                >
                <ContainerDialog
                    title={this.props.title}
                    showCloseIcon={true}
                    onCloseIconClick={this.props.onClose}
                    body={this.props.children}
                    controls={this.props.controls}
                />
            </ContainerModal>
        );
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
