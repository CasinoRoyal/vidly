import React, {Fragment} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const MovieItem = ({ movie, removeMovie, onLike, isLiked }) => {
  
  const { title, genre, 
          numberInStock, dailyRentalRate, _id } = movie;

  const likeColor = isLiked ? 'green' : '';

  return(
    <Fragment>
      <td>{title}</td>
      <td>{genre.name}</td>
      <td>{numberInStock}</td>
      <td>{dailyRentalRate}</td>
      <td>
        <FontAwesomeIcon icon={faHeart} color={likeColor} size='lg'
                         onClick={() => onLike(movie)} />
      </td>
      <td><button onClick={() => removeMovie(_id)}>X</button></td>
    </Fragment>
  )
}

export default MovieItem;