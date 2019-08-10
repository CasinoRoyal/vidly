import React, { Component } from 'react';
import Joi from 'joi-browser';

import Form from './form';

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
    console.log('register complete')
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