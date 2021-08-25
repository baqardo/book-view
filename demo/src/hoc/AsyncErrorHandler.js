import React from 'react';

const AsyncErrorHandler = ({ children, asyncError }) => {
  if (asyncError) console.log(asyncError.message);

  return children;
};

export default AsyncErrorHandler;
