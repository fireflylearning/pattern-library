'use strict';

import React from 'react';
import { combineReducers, createStore,
  applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer, actions } from 'react-redux-form';

import LoginForm from './_src/login-form-container';

const initialState = {
  username: '',
  email: '',
  password: '',
  selectedColour: ''
};

const store = createStore(combineReducers({
    user: modelReducer('user', initialState),
    userForm: formReducer('user', initialState)
}));


export class App extends React.Component {
    render() {
        return ( <Provider store = { store }>
            <LoginForm />
            </Provider>
        )
    }
}


module.exports = App;
