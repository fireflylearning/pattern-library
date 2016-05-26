'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { LoginForm } from './login-form-pres';

function emailIsValid(email) {
    // terrible validation, I know
    return email && email.length > 0 && /@/.test(email);
}

function colourIsValid(colour) {
    return colour === 'blue';
}

function isRequired(value) {
    return value && value.length;
}

var validators = {
    'user.email': {
        on: 'blur',
        rules: {
            required: isRequired,
            valid: emailIsValid
        }
    },
    'user.username': {
        on: 'blur',
        rules: {
            required: isRequired
        }
    },
    'user.password': {
        on: 'blur',
        rules: {
            required: isRequired
        }
    },
    'user.selectedColour': {
        on: 'change',
        rules: {
            valid: colourIsValid
        }
    }
};


function mapStateToProps(state) {
    return {
        user: state.user,
        userForm: state.userForm,
        validators: validators,
        colours: [{ value: '', text: 'Select a colour' }, { value: 'red', text: 'Red' }, { value: 'blue', text: 'Blue' }]
    };
}


function mapDispatchToProps(dispatch) {
    return {
        onBlur: (type) => dispatch(actions.validate(type, validators[type])),
        onChange: (type, e) => dispatch(actions.change(type, e))
    };
}




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
