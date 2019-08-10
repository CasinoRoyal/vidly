import React, { Component } from 'react';
import Joi from 'joi-browser';

import Form from './form';


export default class Login extends Form {

  state = {
    data: {
      username: '',
      password: ''
    },
    errors: {}
  }

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().min(6).label('Password')
  }

  doSubmit = () => {
    console.log('submited')
  }

  render() {
    const { data, errors } = this.state;

    return(
      <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Sign in')}
          {this.renderButton('hello')}
      </form>
    )
  }
}