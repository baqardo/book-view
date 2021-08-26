import * as actionTypes from './actionTypes';

export const addAsyncError = err => {
  return {
    type: actionTypes.ADD_ASYNC_ERROR,
    error: err.response.data,
  };
};

export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};

export const endLoading = () => {
  return {
    type: actionTypes.END_LOADING,
  };
};
