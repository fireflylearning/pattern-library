'use strict';

import React from 'react';
import { Field, Errors, Form, actions, createFieldClass, controls } from 'react-redux-form';

import FormInput from '../../../ff_module/ff_module-form-input/ff_module-form-input';
import FormLabel from '../../../ff_module/ff_module-form-label/ff_module-form-label';
import ContainerFormLine from '../../../ff_container/ff_container-form-line/ff_container-form-line';


const FF_Field = createFieldClass({
    'FormInput': controls.text,
    'FormInput': controls.select,
});

// FF_Field could be wrapped inside ContainerFormLine, adding here for testing purposes
class FF_ContainerFormLine extends React.Component {
    render() {
        return (
            <FF_Field {...this.props}>
            <ContainerFormLine modifier="stacked">
            {this.props.children}
            </ContainerFormLine>

            {
            // can wrap this into custom error comp
            }
            <Errors model={this.props.model}
                show={(field) => field.touched && !field.focus}
                messages={this.props.messages}/>
            </FF_Field>
        );
    }
}

export class LoginForm extends React.Component {
    render() {
        let { user, userForm, validators } = this.props;

        return (
            <Form model="user">

            <FF_ContainerFormLine
                model='user.username'
                validators={validators['user.username'].rules}
                validateOn={validators['user.username'].on}
                messages={{
                    required: 'Please provide a username.'
                  }}>

                <FormLabel required={true}>Username</FormLabel>

                <FormInput
                    type="text"
                    required={true}
                    value={user.username}
                    />

            </FF_ContainerFormLine>

            <FF_ContainerFormLine
                model='user.selectedColour'
                validators={validators['user.selectedColour'].rules}
                validateOn={validators['user.selectedColour'].on}
                messages={{
                    valid: (val) => `"${val}" is not the correct colour.`
                  }}>

              <FormLabel>Colours</FormLabel>

              <FormInput
                type="select"
                value={user.selectedColour}
                options={this.props.colours}
                />

            </FF_ContainerFormLine>

            <FF_ContainerFormLine
                model='user.email'
                validators={validators['user.email'].rules}
                validateOn={validators['user.email'].on}
                messages={{
                    required: 'Please provide an email address.',
                    valid: (val) => `"${val}" is not a valid email.`,
                  }}
                >

              <FormLabel required={true}>Email</FormLabel>

              <FormInput
                type="text"
                required={true}
                value={user.email}
                />

            </FF_ContainerFormLine>

            <FF_ContainerFormLine
                model='user.password'
                validators={validators['user.password'].rules}
                validateOn={validators['user.password'].on}
                messages={{
                    required: 'Please provide a password.'
                  }}
                >

              <FormLabel required={true}>Password</FormLabel>

              <FormInput
                required={true}
                type="password"
                value={user.password}
                />

            </FF_ContainerFormLine>

            <button>
              Log in as { user.username }
            </button>
          </Form>
        )
    }
}
