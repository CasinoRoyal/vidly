import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

import ListGroup from './list-group';
import MoviesTable from './movies-table';
import Search from './search';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';

export default class MoviesList extends Component {

  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: {path: 'title', order: 'asc'},
    queryString: ''
  }

  componentDidMount() {
    getGenres().then(({ data }) => {
      const genres = [{name: 'All movies'}, ...data];
      getMovies()
        .then(({ data }) => {
          this.setState({
            movies: data,
            genres,
            selectedGenre: genres[0]
          })
        })
    })
  }

  onDeleteMovie = (id) => {
    const { movies } = this.state;
    const originalMovies = movies;
    const newMoviesList = originalMovies.filter(({ _id }) => _id !== id);

    this.setState({
      movies: newMoviesList
    })

    deleteMovie(id)
      .catch((error) => {
        console.error(error);

        this.setState({movies: originalMovies})
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
      queryString: '',
      currentPage: 1
    })
  }

  onSort = (sortColumn) => {
    this.setState({sortColumn})       
  }

  onSearchChange = (queryString) => {
    this.setState({
      queryString, 
      selectedGenre: null,
      currentPage: 1
    })   
  }

  render() {
    const { movies, genres,  pageSize, 
            currentPage, selectedGenre, 
            sortColumn, queryString } = this.state;

    let filtered = movies;

    if (queryString) {
        filtered = movies
          .filter(({ title }) => ( 
            title.toLowerCase().startsWith(queryString.toLowerCase())
          ))
    } else if (selectedGenre && selectedGenre._id) {
        filtered = movies
          .filter(({ genre }) => genre._id === selectedGenre._id)
    }

    const sortedMovies = 
      _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const currentMovies = paginate(sortedMovies, currentPage, pageSize);

    return(
      <div className='row'>

        <div className="col-3">
          <ListGroup items={genres}
                     onItemSelect={this.onGenreSelect}
                     selectedItem={selectedGenre} />
        </div>

        <div className="col">
          <Link to='new' className="btn btn-primary mb-3">
            Add movie
          </Link>

          <Search queryString={queryString}
                  onSearchChange={this.onSearchChange} />

          <h2>Movies count: {filtered.length}</h2>
          
          <MoviesTable movies={currentMovies}
                       onLike={this.onLike}
                       onDeleteMovie={this.onDeleteMovie}
                       onSort={this.onSort} 
                       sortColumn={sortColumn} />

          <Pagination itemTotal={filtered.length} 
                      pageSize={pageSize}
                      currentPage={currentPage} 
                      onPageChange={this.onPageChange} />
        </div>

      </div>
    )
  }
}