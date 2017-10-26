'use strict';

var React = require('react'),
    _ = require('underscore'),
    FormLabel = require('../../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../../ff_module-form-input/ff_module-form-input'),
    FormField = require('../../ff_module-form-field/ff_module-form-field'),
    FormFieldErrors = require('../../ff_module-form-errors/ff_module-form-errors').FormFieldErrors,
    ContainerFormErrors = require('../../../ff_container/ff_container-form-errors/ff_container-form-errors'),
    ContainerFormLine = require('../../../ff_container/ff_container-form-line/ff_container-form-line'),
    isRequired = require('../../../_lib/simpleValidation').isRequired;

var _validation = {
    validateOn: 'blur',
    validators: {
        required: isRequired
    },
    showErrorsOn: (field) => field.touched && !field.focus && !field.valid,
    messages: {
        required: 'Please add a comment'
    }
};

module.exports = React.createClass({
    displayName: 'EditorComment',
    render: function(){
        var commentModel = this.props.models && this.props.models['comment'] || null,
            commentValidation = this.props.validation && this.props.validation['comment'] || {},
            commentValidation = commentModel ? _.defaults(commentValidation, _validation) : null,
            commentValue = this.props.event && this.props.event.description && this.props.event.description.message;

        return (
            <div>
                <ContainerFormLine>
                    <FormField
                        model={commentModel}
                        validation={commentValidation}
                        >
                        <FormInput modifier="fullwidth" key="i0" type='textarea' value={commentValue} onChange={this.props.onMessageChange} autoFocus={true} />
                    </FormField>
                </ContainerFormLine>
                <ContainerFormErrors>
                    <FormFieldErrors
                        model={commentModel}
                        validation={commentValidation}/>
                </ContainerFormErrors>
            </div>
        );
    }
});
