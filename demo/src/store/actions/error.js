import * as actionTypes from './actionTypes';

export const addAsyncError = err => {
  return {
    type: actionTypes.ADD_ASYNC_ERROR,
    error: err.response.data,
  };
};

export const removeAsyncError = () => {
  return {
    type: actionTypes.REMOVE_ASYNC_ERROR,
  };
};
