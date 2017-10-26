'use strict';

var React = require('react'),
    Button = require('../../ff_module-button/ff_module-button'),
    ContainerDialog = require('../../../ff_container/ff_container-dialog/ff_container-dialog');


module.exports = React.createClass({
    displayName: 'EditorBase',
    render: function(){

        return (
            <ContainerDialog
                title={this.props.title}
                subTitle={this.props.studentName}
                showCloseIcon={true}
                onCloseIconClick={e=>this.props.onClose(this.props.event)}
                body={this.props.children}
                controls={this.props.controls}
            />
        );
    }
});
