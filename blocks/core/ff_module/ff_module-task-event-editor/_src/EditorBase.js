'use strict';

var React = require('react'),
    Button = require('../../ff_module-button/ff_module-button'),
    ContainerDialog = require('../../../ff_container/ff_container-dialog/ff_container-dialog');


module.exports = React.createClass({
    displayName: 'EditorBase',
    render: function(){
        return <ContainerDialog
            title={this.props.title}
            showCloseIcon={true}
            onCloseIconClick={this.props.onClose}
            body={this.props.children}
            controls={<Button onClick={this.props.onSend} text={this.props.sendText} modifier="primary"/>}
        />;
    }
});
