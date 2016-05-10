'use strict';

var React = require('react'),
    FormLabel = require('../../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../../ff_module-form-input/ff_module-form-input'),
    ContainerFormLine = require('../../../ff_container/ff_container-form-line/ff_container-form-line');


module.exports = React.createClass({
    displayName: 'EditorCommon',
    render: function(){
        var label = this.props.messageLabel ? <FormLabel key="l0" modifier="stacked">{this.props.messageLabel}</FormLabel> : null,
            input = <FormInput modifier="fullwidth" key="i0" type='textarea' onChange={this.props.onMessageChange} value={this.props.event.description.message} />;

        return  <ContainerFormLine>
                    {label}
                    {input}
                </ContainerFormLine>;
    }
});
