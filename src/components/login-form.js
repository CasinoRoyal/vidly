import React, { Component } from 'react';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';

import Form from './form';
import { login, getCurrentUser } from '../services/authService';

export default class Login extends Form {

  state = {
    data: {
      email: '',
      password: ''
    },
    errors: {}
  }

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label('Email'),
    password: Joi.string()
      .required()
      .min(6)
      .label('Password')
  }

  doSubmit = () => {
    const { data } = this.state;
    login(data.email, data.password)
      .then(() => {
        const { state } = this.props.location
        window.location = state ? state.from.pathname : '/';
      })
      .catch((ex) => {
        if (ex.response && ex.response.status === 400) {
          const errors = {...this.state.errors};
          errors.email = ex.response.data;
          this.setState({errors})
        }
      })
  }

  render() {
    const { data, errors } = this.state;

    if (getCurrentUser()) return <Redirect to='/' />

    return(
      <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Sign in')}
      </form>
    )
  }
}