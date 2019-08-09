import React from 'react';
import { BrowserRouter as Router, 
         Route, Switch, Redirect } from 'react-router-dom';

import MoviesList from './movies-list';
import MovieItem from './movie-item';
import Characters from './characters';
import Rentals from './rentals';
import Navigation from './navigation';
import NotFound from './not-found';
import Login from './login';


const App = () => {
  return(
    <Router>
      <Navigation />

      <div className="container">
        <Switch>
          <Route path='/movies/:id' component={MovieItem} />
          <Route path='/movies' component={MoviesList} />
          <Route path='/characters' component={Characters} />
          <Route path='/rentals' component={Rentals} />
          <Route path='/login' component={Login} />
          <Redirect exact from='/' to='/movies' component={Rentals} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;