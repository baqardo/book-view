import React from 'react';
import Nav from '../Nav/Nav';
import './Header.scss';

const Header = ({ isAuthenticated }) => {
  return (
    <header className="header">
      <Nav isAuthenticated={isAuthenticated} />
    </header>
  );
};

export default Header;
