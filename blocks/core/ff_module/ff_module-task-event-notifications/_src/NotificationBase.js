'use strict';

var React = require('react'),
    Button = require('../../ff_module-button/ff_module-button'),
    ContainerDialog = require('../../../ff_container/ff_container-dialog/ff_container-dialog');


module.exports = React.createClass({
    displayName: 'NotificationBase',
    render: function(){
        return <ContainerDialog
            title={this.props.title}
            showCloseIcon={false}
            body={this.props.children}
            controls={[
                <Button key="send" onClick={this.props.onConfirm} text={this.props.sendText} modifier={this.props.sendModifier ? this.props.sendModifier : "primary"}/>,
                <Button key="close" onClick={this.props.onClose} text={this.props.closeText} modifier="tertiary"/>
            ]}
        />;
    }
});
