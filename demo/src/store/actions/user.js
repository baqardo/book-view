import * as actionTypes from './actionTypes';
import * as queries from '../../utils/axiosQueries';
import { addAsyncError, removeAsyncError } from './error';

const startUser = () => {
  return {
    type: actionTypes.USER_ACTION_START,
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

const successUpdatePassword = () => {
  return {
    type: actionTypes.UPDATE_PASSWORD_SUCCESS,
  };
};

export const loadUser = data => {
  return dispatch => {
    dispatch(startUser());
    dispatch(successLoadUser(data));
  };
};

export const removeUser = () => {
  return dispatch => {
    dispatch(startUser());
    dispatch(successRemoveUser());
  };
};

export const updateUserData = (name, email) => {
  return async dispatch => {
    dispatch(startUser());
    dispatch(removeAsyncError());
    try {
      const data = { name, email };
      await queries.patchUserData(data);
      dispatch(successUpdateData(data));
    } catch (err) {
      dispatch(addAsyncError(err));
    }
  };
};

export const updateUserPassword = passwords => {
  return async dispatch => {
    dispatch(startUser());
    dispatch(removeAsyncError());
    try {
      await queries.patchPassword(passwords);
      dispatch(successUpdatePassword());
    } catch (err) {
      dispatch(addAsyncError(err));
    }
  };
};
