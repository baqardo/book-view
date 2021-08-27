import * as actionTypes from './actionTypes';

export const addInternalAsyncError = err => {
  return {
    type: actionTypes.ADD_INTERNAL_ASYNC_ERROR,
    error: err.response.data,
  };
};
export const addExternalAsyncError = err => {
  return {
    type: actionTypes.ADD_EXTERNAL_ASYNC_ERROR,
    error: err.response,
  };
};
export const addNetworkAsyncError = err => {
  return {
    type: actionTypes.ADD_NETWORK_ASYNC_ERROR,
    error: err.response,
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
