'use strict';

var React = require('react'),
    FormLabel = require('../../ff_module-form-label/ff_module-form-label'),
    FormInput = require('../../ff_module-form-input/ff_module-form-input'),
    FormField = require('../../ff_module-form-field/ff_module-form-field'),
    FormFieldErrors = require('../../ff_module-form-errors/ff_module-form-errors').FormFieldErrors,
    ContainerFormErrors = require('../../../ff_container/ff_container-form-errors/ff_container-form-errors'),
    ContainerFormLine = require('../../../ff_container/ff_container-form-line/ff_container-form-line');


module.exports = React.createClass({
    displayName: 'EditorComment',
    render: function(){

        var commentModel = this.props.models && this.props.models['event.description.message'] || null,
            commentValidation = this.props.validation && this.props.validation['event.description.message'] || null;

        return (
            <div>
                <ContainerFormLine>
                    <FormField model={commentModel}
                        validators={commentValidation.rules}
                        validateOn={commentValidation.validateOn}
                        >
                        <FormInput modifier="fullwidth" key="i0" type='textarea' onChange={this.props.onMessageChange} value={this.props.event.description.message} />
                    </FormField>
                </ContainerFormLine>
                <ContainerFormErrors>
                    <FormFieldErrors
                        model={commentModel}
                        showErrorsOn={commentValidation.showErrorsOn}
                        messages={commentValidation.messages}/>
                </ContainerFormErrors>
            </div>
        );
    }
});
