'use strict';

var React = require('react');
var Modal = require('react-modal');

module.exports = React.createClass({
    displayName: 'ContainerModal',
    render: function() {
        return <Modal ref="ffContainerModal" {...this.props}>{this.props.children}</Modal>;
    },
    getOverlay: function(){
        var ref = this.refs.ffContainerModal;
        if (ref) return ref.portal;
    }
});
