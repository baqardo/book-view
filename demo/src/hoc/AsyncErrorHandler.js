import { useEffect } from 'react';

const AsyncErrorHandler = ({ children, error }) => {
  useEffect(() => {
    if (error) console.log(error.message);
  }, [error]);

  return children;
};

export default AsyncErrorHandler;
