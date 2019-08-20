import React, { Component } from 'react';
import Joi from 'joi-browser';

import Form from './form';
import { registrate } from '../services/userService';
import { loginWithJwt } from '../services/authService';

export default class Register extends Form {

  state = {
    data: {
      email: '',
      password: '',
      username: ''
    },
    errors: {}
  }

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label('Email'),
    password: Joi.string()
      .min(6)
      .required()
      .label('Password'),
    username: Joi.string()
      .required()
      .label('Username')
  }

  doSubmit = () => {
    registrate(this.state.data)
      .then((res) => {
        loginWithJwt(res.headers['x-auth-token']);
        window.location = '/';
      })
      .catch((ex) => {
        if (ex.response && ex.response.status === 400) {
          const errors = {...this.state.errors};
          errors.username = ex.response.data;
          this.setState({errors})
        }
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Register</h2>
        {this.renderInput('email', 'Email', 'email')}
        {this.renderInput('password', 'Password', 'password')}
        {this.renderInput('username', 'Username')}
        {this.renderButton('Sign up')}
      </form>
    )
  }
}