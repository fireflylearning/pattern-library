'use strict';

var React = require('react'),
	getGeneratedClass = require('../../_lib/_ui/class-utils').generateStandardClass;

function ContainerFormErrors(props) {
    return (
        <div className={getGeneratedClass('ff_container-form-errors', props)}>
            {props.children}
        </div>
    );
}


module.exports = ContainerFormErrors;
