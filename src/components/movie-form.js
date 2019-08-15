import React, { Component } from 'react';
import Joi from 'joi-browser';

import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

import Form from './form';

export default class MovieForm extends Form {

  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '' 
    },
    genre: [],
    errors: {}
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required(),
    genreId: Joi.string()
      .required(),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required(),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required(),
  }

  componentDidMount() {
    getGenres()
      .then(({ data }) => this.setState({genre: data}));

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;
    
    getMovie(movieId)
      .then(({ data }) => {
        const movie = data;
        if(!movie) return this.props.history.replace('/not-found');

        this.setState({data: this.mapToViewModel(movie)})
      })
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  doSubmit() {
    saveMovie(this.state.data)
    
    this.props.history.push("/movies");
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <h2>Movie Form</h2>
        {this.renderInput('title', 'Title')}
        {this.renderSelect('genreId', 'Genre', this.state.genre)}
        {this.renderInput('numberInStock', 'Number in Stock', 'number')}
        {this.renderInput('dailyRentalRate', 'Rate', 'number')}
        {this.renderButton('Save')}
      </form>
    )
  }
}