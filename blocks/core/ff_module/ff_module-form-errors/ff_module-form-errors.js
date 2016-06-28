'use strict';

var React = require('react'),
    getGeneratedClass = require('../../_lib/_ui/class-utils').generateStandardClass,
    Errors = require('react-redux-form').Errors;


function getErrorProps(props) {
    var validation = props.validation || null;
    var def = { show: false };
    if (validation) {
        def.show = validation.showErrorsOn;
        def.messages = validation.messages;
    }
    return def;
}

function FormError(props) {
    return <li className='ff_module-form-errors__message'>{props.children}</li>;
}

function FormErrorList(props) {
    return (
        <div className={getGeneratedClass('ff_module-form-errors', props)}>
            <ul className='ff_module-form-errors__list'>
                {props.children}
            </ul>
        </div>
    );
}

function FormFieldErrors(props) {
    return (props.model ?

            <Errors model={props.model}
                {...getErrorProps(props)}
                wrapper={FormErrorList}
                component={FormError}
                />
        :
        <span></span>
    );
}

module.exports = React.createClass({
    displayName: 'FormErrors',
    propTypes: {
        messages: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        modifier: React.PropTypes.string,
        classes: React.PropTypes.string
    },
    render: function(){

        var messages = this.props.messages ? this.props.messages.map((message, index) => <FormError key={'message'+index}>{message}</FormError>) : null;
        if (messages.length) {
            return <FormErrorList {...this.props}>{messages}</FormErrorList>;
        }
        return null;

    }
})

// expose stateless components for consumption by 3rd party validator component
module.exports.FormError = FormError;
module.exports.FormErrorList = FormErrorList;
module.exports.FormFieldErrors = FormFieldErrors;
