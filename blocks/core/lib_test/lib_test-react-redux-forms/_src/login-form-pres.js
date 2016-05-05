import React from 'react';
import { Field, Errors, actions, createFieldClass, controls } from 'react-redux-form';

import FormInput from '../../../ff_module/ff_module-form-input/ff_module-form-input';
import FormLabel from '../../../ff_module/ff_module-form-label/ff_module-form-label';


import { connect } from 'react-redux';
class MyCustomInput extends React.Component {
  render() {
    let { model, dispatch } = this.props;

    return (
      <FormInput
        onChange={e => dispatch(actions.change(model, e))}
        onBlur={e => dispatch(actions.blur(model))}
      />
    );
  }
}

let CustomField = connect(s => s)(MyCustomInput);

const FFField = createFieldClass({
  'FormInput': controls.text
});


export class LoginForm extends React.Component {
      render() {
        let { user, userForm } = this.props;

        return (
          <form>
            <FFField model="user.username">

              <FormLabel>Username</FormLabel>

              <FormInput
                type="text"
                value={user.username}
                onChange={(e)=>{ this.props.onChange('user.username', e )}}
                onBlur={(e)=>{ this.props.onBlur('user.username')}}
                />
            </FFField>

            {
        // <CustomField
        //     model="user.username"
        //     type="text"
        //     value={user.username}
        //     onChange={(e)=>{ this.props.onChange('user.username', e )}}
        //     onBlur={(e)=>{ this.props.onBlur('user.username')}}>
        // </CustomField>
        }

            <Errors model="user.username"
              messages={{
                required: 'Please provide a username.'
              }}/>

            <Field model="user.email">
              <label>Email</label>

              <input type="text"
                onChange={(e)=>{ this.props.onChange('user.email', e )}}
                onBlur={(e)=>{ this.props.onBlur('user.email')}} />
            </Field>

            <Errors model="user.email"
              messages={{
                required: 'Please provide an email address.',
                valid: (val) => `${val} is not a valid email.`,
              }}/>

            <Field model="user.password">
              <label>Password</label>
              <input type="password" />
            </Field>

            <button>
              Log in as { user.username }
            </button>
          </form>
        )
      }
}
