import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './input';

export default class Login extends Component {

  state = {
    account: {
      username: '',
      password: ''
    },
    errors: {}
  }

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().min(6).label('Password')
  }

  validate = () => {
    const { error } = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message

    return errors;
  }

  validateOnChange = ({ name, value }) => {
    const obj = {[name]: value};
      
    const schema = {
      [name]: this.schema[name]
    }

    const { error } = Joi.validate(obj, schema)

    return error ? error.details[0].message : null;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const { errors } = this.state;
    const errorMsg = this.validateOnChange(target);

    if (errorMsg) errors[name] = errorMsg;
    else delete errors[name];

    const account = {...this.state.account}
    account[name] = value;

    this.setState({account, errors})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({
      errors: errors || {}
    })

    if (errors) return;

    console.log('submitted');
  }

  render() {
    const { account, errors } = this.state;

    return(
      <form onSubmit={this.handleSubmit}>
          <Input name="username"
                 label="Login"
                 value={account.username}
                 type="text"
                 onChange={this.handleChange}
                 error={errors.username} />

          <Input name="password"
                 label="Password"
                 value={account.password}
                 type="password"
                 onChange={this.handleChange}
                 error={errors.password} />

          <button disabled={this.validate()} className="btn btn-primary mt-3">Sign in</button>
      </form>
    )
  }
}