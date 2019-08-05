import React, { Component } from 'react';

import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

import MovieItem from './movie-item';
import ListGroup from './list-group';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';

export default class MoviesList extends Component {

  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    likes: [],
    pageSize: 4,
    currentPage: 1
  }

  componentDidMount() {
    const genres = [{name: 'All movies'}, ...getGenres()]

    this.setState({
      movies: getMovies(),
      genres,
      selectedGenre: genres[0]
    })
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

  onGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1
    })
  }

  render() {
    const { movies, genres, 
            likes, pageSize, 
            currentPage, selectedGenre } = this.state;

    const filteredMovies = selectedGenre && selectedGenre._id
      ? movies.filter(({ genre }) => genre._id === selectedGenre._id)
      : movies;
            
    const currentMovies = paginate(filteredMovies, currentPage, pageSize);

    return(
      <div className='row'>

        <div className="col-3">
          <ListGroup items={genres}
                     onItemSelect={this.onGenreSelect}
                     selectedItem={selectedGenre} />
        </div>

        <div className="col">
          <h2>Movies count: {filteredMovies.length}</h2>
          <table className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th>Favorite</th>
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

          <Pagination itemTotal={filteredMovies.length} 
                      pageSize={pageSize}
                      currentPage={currentPage} 
                      onPageChange={this.onPageChange} />
        </div>

      </div>
    )
  }
}