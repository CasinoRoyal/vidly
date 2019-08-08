import React from 'react';

const MovieItem = ({ match, history }) => {
  return(
    <div >
      <h1>{`Movie id:${match.params.id}`}</h1>
      <button className="btn btn-primary"
              onClick={() => history.push('/')}>Save</button>
    </div>
  )
}

export default MovieItem;