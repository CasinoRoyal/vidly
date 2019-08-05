import React, { Component, Fragment } from 'react';


import MoviesList from './movies-list';


export default class GenresFilter extends Component {
  state = {
    genres: genres,
    filtredMovies: []
  }

  render(){
    const { filtredMovies, genres } = this.state;

    return(
      <Fragment>
        <div className="list-group">
          <a className="list-group-item list-group-item-action">
            All genres
          </a>
          {
            genres.map((genre) => {
              return <a key={genre._id} 
                        className="list-group-item list-group-item-action">
                        {genre.name}
                      </a>
            })
          }
        </div>

        <MoviesList movies={filtredMovies} />
      </Fragment>
    )
  }
}