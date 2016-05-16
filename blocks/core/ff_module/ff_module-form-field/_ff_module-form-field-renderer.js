'use strict';

var ReactDOM = require('react-dom');

import FF_Field from './ff_module-form-field';
import { connect } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer, actions, Field } from 'react-redux-form';

import FormInput from '../../ff_module/ff_module-form-input/ff_module-form-input';
import FormLabel from '../../ff_module/ff_module-form-label/ff_module-form-label';
import CheckableList from '../../ff_module/ff_module-form-checkable-list/ff_module-form-checkable-list';
// import ContainerFormLine from '../../ff_module/ff_module-form-checkable-list/ff_module-form-checkable-list';


const initialState = {
    username: '',
    email: '',
    password: '',
    selectedColour: '',
    story: '',
    isAllowed: '',
    otherlist: { 'one': false, 'two': true },
    items: [{
        label: 'Label text',
        required: true,
        modifier: 'inline',
        type: 'checkbox',
        id: 'react-checkbox-id-1',
        value: 'checkbox-value-1',
        name: 'react-checkbox-list-group'
    }, {
        label: 'Label text',
        required: true,
        type: 'checkbox',
        modifier: 'inline',
        id: 'react-checkbox-id-2',
        value: 'checkbox-value-2',
        name: 'react-checkbox-list-group'
    }, {
        label: 'Label text',
        required: true,
        type: 'checkbox',
        modifier: 'inline',
        id: 'react-checkbox-id-3',
        value: 'checkbox-value-3',
        name: 'react-checkbox-list-group'
    }]
};


const store = createStore(combineReducers({
    user: modelReducer('user', initialState),
    userForm: formReducer('user', initialState)
}));


class LoginForm extends React.Component {
    render() {
        let { user, userForm, validators } = this.props;

        return (
            <form>

            <FF_Field model='user.username'>

                <FormLabel required={true}>Username</FormLabel>

                <FormInput
                    type="text"
                    required={true}
                    value={user.username}
                    />

            </FF_Field>

            <FF_Field model='user.selectedColour'>

              <FormLabel>Colours</FormLabel>

              <FormInput
                type="select"
                value={user.selectedColour}
                options={[{ value: '', text: 'Select a colour' }, { value: 'red', text: 'Red' }, { value: 'blue', text: 'Blue' }]}
                />

            </FF_Field>

            <FF_Field model='user.story'>

              <FormLabel>Story</FormLabel>

              <FormInput
                type="textarea"
                value={user.story}
                />

            </FF_Field>

            <FF_Field model='user.password'>

              <FormLabel required={true}>Password</FormLabel>

              <FormInput
                required={true}
                type="password"
                value={user.password}
                />

            </FF_Field>

            <FF_Field model='user.isAllowed'>

              <FormLabel required={true}>Allowed?: </FormLabel>

              <FormInput
                required={true}
                type="checkbox"
                value={user.isAllowed}
                // checked={user.isAllowed}
                />

            </FF_Field>



              <FormLabel required={true}>Otherlist: </FormLabel>

                <FF_Field model='user.otherlist.one'>
              <input
                required={true}
                type="checkbox"
                value={user.otherlist.one}
                checked={user.otherlist.one === true}
                />
                </FF_Field>

                <FF_Field model='user.otherlist.two'>
                <FormInput
                required={true}
                type="checkbox"
                value={user.otherlist.two}
                checked={user.otherlist.two === true}
                />

                </FF_Field>

            <FF_Field model='user.checklistItems'>

              <FormLabel required={true}>Checklist</FormLabel>

              <CheckableList
                required={true}
                type="checkbox"
                modifier='inline'
                model='user.items[].checked'
                items={user.items}
                />

            </FF_Field>

            <button>
              Log in
            </button>


            <p>Username (text): {user.username}</p>
            <p>SelectedColour (select): {user.selectedColour}</p>
            <p>Password (password): {user.password}</p>
            <p>Story (textarea): {user.story}</p>
            <p>Is allowed?: {(user.isAllowed).toString()}</p>

            <p>Otherlist: {(user.otherlist.one).toString()}, {(user.otherlist.two).toString()}</p>

            <p>Checklist (checkablelist-checkbox): {user.items.map((item)=>item.checked? 'true': 'false').join(', ')}</p>

          </form>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        userForm: state.userForm
    };
}


const ConnectedLoginForm = connect(
    mapStateToProps
)(LoginForm);

class App extends React.Component {
    render() {
        return (<Provider store = { store }>
            <ConnectedLoginForm />
            </Provider>)
    }
}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector('[data-ff_module-form-field]');
        if (element) {
            ReactDOM.render(<App/>, element);
        }
    });
};
