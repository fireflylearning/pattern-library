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

        var commentModel = this.props.models && this.props.models['comment'] || null,
            commentValidation = this.props.validation && this.props.validation['comment'] || null;

        return (
            <div>
                <ContainerFormLine>
                    <FormField
                        model={commentModel}
                        validation={commentValidation}
                        >
                        <FormInput modifier="fullwidth" key="i0" type='textarea' onChange={this.props.onMessageChange} />
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
