import React from 'react';
import { BrowserRouter as Router, 
         Route, Switch, Redirect } from 'react-router-dom';

import MoviesList from './movies-list';
import Characters from './characters';
import Rentals from './rentals';
import Navigation from './navigation';
import NotFound from './not-found';
import Login from './login-form';
import Register from './register-form';
import MovieForm from './movie-form';


const App = () => {
  return(
    <Router>
      <Navigation />

      <div className="container">
        <Switch>
          <Route path='/movies/:id' component={MovieForm} />
          <Route path='/movies/' component={MoviesList} />
          <Route path='/characters' component={Characters} />
          <Route path='/rentals' component={Rentals} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Redirect exact from='/' to='/movies/' component={Rentals} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;