import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navigation = () => {
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Vidly</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/movies/">Movies</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/characters/">Characters</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/rentals/">Rentals</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Register</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;