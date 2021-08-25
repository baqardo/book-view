import * as actionTypes from './actionTypes';
import * as queries from '../../utils/axiosQueries';

const startUser = () => {
  return {
    type: actionTypes.USER_ACTION_START,
  };
};

const failUser = err => {
  return {
    type: actionTypes.USER_ACTION_FAIL,
    error: err.response.data,
  };
};

const successLoadUser = res => {
  return {
    type: actionTypes.USER_LOAD_SUCCESS,
    result: res,
  };
};

const successRemoveUser = () => {
  return {
    type: actionTypes.USER_REMOVE_SUCCESS,
  };
};

const successUpdateData = res => {
  return {
    type: actionTypes.UPDATE_DATA_SUCCESS,
    result: res,
  };
};

export const loadUser = data => {
  return async dispatch => {
    dispatch(startUser());
    dispatch(successLoadUser(data));
  };
};

export const removeUser = () => {
  return async dispatch => {
    dispatch(startUser());
    dispatch(successRemoveUser());
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
