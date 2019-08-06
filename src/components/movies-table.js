import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Table from './table';


class MovieTable extends Component {

  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "Favorite", 
      render: (movie) => 
        <FontAwesomeIcon icon={faHeart} 
                         color={movie.liked ? 'green' : ''} 
                         size='lg' 
                         onClick={() => this.props.onLike(movie)}/> },
    { key: "Delete",
      render: (movie) => 
        <button onClick={() => this.props.onDeleteMovie(movie._id)}>X</button> }
  ]

  render() {
    const { movies, onSort, sortColumn} = this.props;

    return(
      <Table data={movies}
             columns={this.columns}
             sortColumn={sortColumn}
             onSort={onSort} />
    )
  }
}

export default MovieTable;