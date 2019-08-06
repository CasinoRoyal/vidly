import React, { Component } from 'react';
import _ from 'lodash';

import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

import ListGroup from './list-group';
import MoviesTable from './movies-table';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';

export default class MoviesList extends Component {

  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: {path: 'title', order: 'asc'}
  }

  componentDidMount() {
    const genres = [{name: 'All movies'}, ...getGenres()]

    this.setState({
      movies: getMovies(),
      genres,
      selectedGenre: genres[0]
    })
  }

  onDeleteMovie = (id) => {
    const { movies } = this.state;
    const newMoviesList = movies.filter(({ _id }) => _id !== id);

    this.setState({
      movies: newMoviesList
    })
  }

  onLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });     
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

  onSort = (sortColumn) => {
    this.setState({sortColumn})       
  }

  render() {
    const { movies, genres,  pageSize, 
            currentPage, selectedGenre, 
            sortColumn } = this.state;
            
    const filteredMovies = selectedGenre && selectedGenre._id
      ? movies.filter(({ genre }) => genre._id === selectedGenre._id)
      : movies;

    const sortedMovies = 
      _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);

    const currentMovies = paginate(sortedMovies, currentPage, pageSize);

    return(
      <div className='row'>

        <div className="col-3">
          <ListGroup items={genres}
                     onItemSelect={this.onGenreSelect}
                     selectedItem={selectedGenre} />
        </div>

        <div className="col">
          <h2>Movies count: {filteredMovies.length}</h2>
          
          <MoviesTable movies={currentMovies}
                       onLike={this.onLike}
                       onDeleteMovie={this.onDeleteMovie}
                       onSort={this.onSort} 
                       sortColumn={sortColumn}/>

          <Pagination itemTotal={filteredMovies.length} 
                      pageSize={pageSize}
                      currentPage={currentPage} 
                      onPageChange={this.onPageChange} />
        </div>

      </div>
    )
  }
}