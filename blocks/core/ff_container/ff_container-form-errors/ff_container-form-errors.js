'use strict';

var React = require('react');

function ContainerFormErrors(props) {
    console.log(props.children);
    return (
        <div className='ff_container-form-errors'>
            {props.children}
        </div>
    );
}

module.exports = ContainerFormErrors;
