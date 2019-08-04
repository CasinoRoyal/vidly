import React, { Component, Fragment } from 'react';

import { getMovies } from '../services/fakeMovieService';
import MovieItem from './movie-item';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';

export default class MoviesList extends Component {

  state = {
    movies: getMovies(),
    likes: [],
    pageSize: 4,
    currentPage: 1
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

  onPageChange = (page) => {
    this.setState({
      currentPage: page
    })
  }

  render() {

    const { movies, likes, pageSize, currentPage } = this.state;

    const currentMovies = paginate(movies, currentPage, pageSize);

    return(
      <Fragment>
        <h2>Movies count: {movies.length}</h2>
        <table className='table'>
          <thead className='thead-dark'>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              currentMovies.map((movie) => {
                const isLiked = likes
                  .find((likedMovie) => likedMovie._id === movie._id);

                return (
                  <tr key={movie._id}>
                    <MovieItem movie={movie} 
                               isLiked={isLiked} 
                               removeMovie={this.removeMovie}
                               onLike={this.onLike} />
                  </tr>
                )
              }) 
            }
          </tbody>
        </table>

        <Pagination itemTotal={movies.length} 
                    pageSize={pageSize}
                    currentPage={currentPage} 
                    onPageChange={this.onPageChange} />
      </Fragment>
    )
  }
}