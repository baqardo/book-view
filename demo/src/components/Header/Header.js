import React from 'react';
import Nav from '../Nav/Nav';
import './Header.scss';

const Header = props => {
  return (
    <header className="header">
      <Nav isAuthenticated={props.isAuthenticated} />
    </header>
  );
};

export default Header;
