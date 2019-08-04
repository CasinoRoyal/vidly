import React, { Component, Fragment } from 'react';

import { getMovies } from '../services/fakeMovieService';
import MovieItem from './movie-item';

export default class MoviesList extends Component {

  state = {
    movies: getMovies(),
    likes: []
  }

  removeMovie = (id) => {
    const { movies } = this.state;
    const newMoviesList = movies.filter(({ _id }) => _id !== id);

    this.setState({
      movies: newMoviesList
    })
  }

  onLike = (movie) => {
    const { likes } = this.state;

    const isNew = likes.find((likedMovie) => {
     return likedMovie._id === movie._id})

    if (isNew) {
      const newLikes = likes.filter((likedMovie) => likedMovie._id !== isNew._id);

      return this.setState({
        likes: [...newLikes]
      })      
    }

    return this.setState({
      likes: [...this.state.likes, movie]
    })
  }

  render() {

    const { movies, likes } = this.state;

    return(
      <Fragment>
        <h2>Movies count: {movies.length}</h2>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
            </tr>
            {
              movies.map((movie) => {
                const isLiked = likes.find((likedMovie) => likedMovie._id === movie._id);

                return (
                  <tr key={movie._id}>
                    <MovieItem movie={movie} isLiked={isLiked} removeMovie={this.removeMovie}
                               onLike={this.onLike} />
                  </tr>
                  )
              }) 
            }
          </tbody>
        </table>
      </Fragment>
    )
  }
}