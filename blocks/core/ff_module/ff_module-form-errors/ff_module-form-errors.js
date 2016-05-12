'use strict';

var React = require('react'),
    getGeneratedClass = require('../../_lib/_ui/class-utils').generateStandardClass;

function FormError(props) {
    return <li className='ff_module-form-errors__message'>{props.children}</li>;
}

function FormErrors(props) {
    return (
        <ul className={getGeneratedClass('ff_module-form-errors', props)}>
            {props.messages.map((message, index)=>{return <FormError key={'message'+index}>{message}</FormError>})}
        </ul>
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
        return (
            this.props.messages ?
            <FormErrors {...this.props}/> :
            null
        );
    }
})

module.exports.FormError = FormError;
module.exports.FormErrors = FormErrors;
