import React from 'react';

import Input from './input';

const Search = ({ queryString, onSearchChange }) => {

  return <Input name='search' 
                value={queryString} 
                type='search' 
                label='Search'
                onChange={(e) => onSearchChange(e.target.value)} />
}

export default Search;