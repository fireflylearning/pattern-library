'use strict';

var React = require('react'),
    _ = require('underscore'),
    FormLabel = require('../../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../../ff_module-form-input/ff_module-form-input'),
    FormField = require('../../ff_module-form-field/ff_module-form-field'),
    FormFieldErrors = require('../../ff_module-form-errors/ff_module-form-errors').FormFieldErrors,
    ContainerFormErrors = require('../../../ff_container/ff_container-form-errors/ff_container-form-errors'),
    ContainerFormLine = require('../../../ff_container/ff_container-form-line/ff_container-form-line'),
    maxLength = require('../../../_lib/simpleValidation').maxLength;

var max = 255,
    _validation = {
        validateOn: 'blur',
        validators: {
            valid: maxLength(max)
        },
        showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
        messages: {
            valid: (val) => val ? '' + max + ' characters maximum' : '',
        }
    };

module.exports = React.createClass({
    displayName: 'EditorCommon',
    render: function() {
        var label = this.props.messageLabel ? <FormLabel key="l0" modifier="stacked">{this.props.messageLabel}</FormLabel> : null,

            messageModel = this.props.models && this.props.models['message'] || null,
            messageValidation = this.props.validation && this.props.validation['message'] || {},
            messageValidation = messageModel ? _.defaults(messageValidation, _validation) : null,
            messageValue = this.props.event && this.props.event.description && this.props.event.description.message;

        return (
            <div>
                <ContainerFormLine>
                    <FormField
                        model={messageModel}
                        validation={messageValidation}
                        >
                        {label}
                        <FormInput modifier="fullwidth" key="i0" type='textarea' value={messageValue} onChange={this.props.onMessageChange} autoFocus={true}/>
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
