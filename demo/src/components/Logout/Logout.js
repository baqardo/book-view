import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  });

  return <Redirect to="/" />;
};

export default Logout;
