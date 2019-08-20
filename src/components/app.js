import React, { Component } from 'react';
import { BrowserRouter as Router, 
         Route, Switch, Redirect } from 'react-router-dom';

import MoviesList from './movies-list';
import Characters from './characters';
import Rentals from './rentals';
import Navigation from './navigation';
import NotFound from './not-found';
import Login from './login-form';
import Logout from './logout';
import Register from './register-form';
import MovieForm from './movie-form';
import ProtectedRoute from './protected-route';

import { getCurrentUser } from '../services/authService';

class App extends Component {

  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({user});
  }

  render() {
    const { user } = this.state;
    return(
      <Router>
        <Navigation user={user} />

        <div className="container">
          <Switch>
            <ProtectedRoute 
              path='/movies/:id'
              component={MovieForm} />
            <Route 
              path='/movies/' 
              render={(props) => <MoviesList {...props} user={user}/>} />
            <Route path='/characters' component={Characters} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={Register} />
            <Redirect exact from='/' to='/movies/' component={Rentals} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;