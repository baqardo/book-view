import * as actionTypes from './actionTypes';
import * as queries from '../../utils/axiosQueries';

const startUser = () => {
  return {
    type: actionTypes.USER_ACTION_START,
  };
};

const failUser = err => {
  const { message, status } = err.response.data;
  return {
    type: actionTypes.USER_ACTION_FAIL,
    error: {
      message,
      status,
    },
  };
};

const successLoadUser = res => {
  return {
    type: actionTypes.USER_LOAD_SUCCESS,
    result: res,
  };
};

export const loadUser = data => {
  return async dispatch => {
    dispatch(startUser());
    dispatch(successLoadUser(data));
  };
};

const successRemoveUser = () => {
  return {
    type: actionTypes.USER_REMOVE_SUCCESS,
  };
};

export const removeUser = () => {
  return async dispatch => {
    dispatch(startUser());
    dispatch(successRemoveUser());
  };
};

const successUpdateData = res => {
  return {
    type: actionTypes.UPDATE_DATA_SUCCESS,
    result: res,
  };
};

export const updateUserData = (name, email) => {
  return async dispatch => {
    dispatch(startUser());
    try {
      const data = { name, email };
      await queries.patchUserData(data);
      dispatch(successUpdateData(data));
    } catch (err) {
      dispatch(failUser(err));
    }
  };
};
