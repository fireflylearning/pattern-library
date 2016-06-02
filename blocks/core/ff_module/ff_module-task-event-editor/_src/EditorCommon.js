'use strict';

var React = require('react'),
    FormLabel = require('../../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../../ff_module-form-input/ff_module-form-input'),
    FormField = require('../../ff_module-form-field/ff_module-form-field'),
    FormFieldErrors = require('../../ff_module-form-errors/ff_module-form-errors').FormFieldErrors,
    ContainerFormErrors = require('../../../ff_container/ff_container-form-errors/ff_container-form-errors'),
    ContainerFormLine = require('../../../ff_container/ff_container-form-line/ff_container-form-line');


module.exports = React.createClass({
    displayName: 'EditorCommon',
    render: function() {

        var label = this.props.messageLabel ? <FormLabel key="l0" modifier="stacked">{this.props.messageLabel}</FormLabel> : null,

            messageModel = this.props.models && this.props.models['message'] || null,
            messageValidation = this.props.validation && this.props.validation['message'] || null;

        return (
            <div>
                <ContainerFormLine>
                    <FormField
                        model={messageModel}
                        validation={messageValidation}
                        >
                        {label}
                        <FormInput modifier="fullwidth" key="i0" type='textarea' onChange={this.props.onMessageChange} />
                    </FormField>
                </ContainerFormLine>
                <ContainerFormErrors>
                    <FormFieldErrors
                        model={messageModel}
                        validation={messageValidation}/>
                </ContainerFormErrors>
            </div>
        );
    }
});
