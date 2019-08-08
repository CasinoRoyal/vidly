import React from 'react';
import { BrowserRouter as Router, 
         Route, Switch, Redirect } from 'react-router-dom';

import MoviesList from './movies-list';
import MovieItem from './movie-item';
import Characters from './characters';
import Rentals from './rentals';
import Navigation from './navigation';
import NotFound from './not-found';


const App = () => {
  return(
    <Router>
      <Navigation />

      <Switch>
        <Route path='/movies/:id' component={MovieItem} />
        <Route path='/movies' component={MoviesList} />
        <Route path='/characters' component={Characters} />
        <Route path='/rentals' component={Rentals} />
        <Redirect exact from='/' to='/movies' component={Rentals} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App;