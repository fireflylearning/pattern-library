import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { LoginForm } from './login-form-pres';

function emailIsValid(email) {
  // terrible validation, I know
  return email && email.length > 0 && /@/.test(email);
}


function mapStateToProps(state) {
    return {
        user: state.user,
        userForm: state.userForm
    };
}
var validators = {
    'user.email': {
        required: (value) => value && value.length,
        valid: emailIsValid
    },
    'user.username': {
        required: (value) => value && value.length,
    }
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
