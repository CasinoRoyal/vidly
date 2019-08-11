import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './input';
import Select from './select';

export default class Form extends Component {
  state = {
    data: {},
    errors: {}
  }

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
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

    const data = {...this.state.data}
    data[name] = value;

    this.setState({data, errors})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({
      errors: errors || {}
    })

    if (errors) return;

    this.doSubmit();
  }

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary mt-3">
        {label}
      </button>
    );
  }

  renderInput = (name, label, type = 'text') => {
    return (
      <Input 
        name={name}
        label={label}
        value={this.state.data[name]}
        type={type}
        onChange={this.handleChange}
        error={this.state.errors[name]} />
    );
  }

  renderSelect = (name, label, options) => {
    return (
      <Select  
        name={name}
        label={label}
        value={this.state.data[name]}
        options={options}
        onChange={this.handleChange}
        error={this.state.errors[name]} />
    )
  }

}