import React from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = props => {
  let links = (
    <>
      <li className="nav__list-item">
        <Link to="/">Home</Link>
      </li>
      <li className="nav__list-item">
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  if (props.isAuthenticated)
    links = (
      <>
        <li className="nav__list-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav__list-item">
          <Link to="/logout">Logout</Link>
        </li>
        <li className="nav__list-item">
          <Link to="/myProfile">My Profile</Link>
        </li>
        <li className="nav__list-item">
          <Link to="/myBookcase">My Bookcase</Link>
        </li>
      </>
    );

  return (
    <nav className="nav">
      <ul className="nav__list">{links}</ul>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Nav);
