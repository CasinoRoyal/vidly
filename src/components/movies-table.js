import React from 'react';

import MovieItem from './movie-item';

const MovieTable = (props) => {
  const { movies, likes, 
          onLike, onDeleteMovie } = props;

  return(
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
          movies.map((movie) => {
            const isLiked = likes
              .find((likedMovie) => likedMovie._id === movie._id);

            return (
              <tr key={movie._id}>
                <MovieItem movie={movie} 
                           isLiked={isLiked} 
                           removeMovie={onDeleteMovie}
                           onLike={onLike} />
              </tr>
            )
          }) 
        }
      </tbody>
    </table>
  )
}

export default MovieTable;