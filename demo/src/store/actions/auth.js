import * as actionTypes from './actionTypes';
import * as queries from '../../utils/axiosQueries';
import { loadUser, removeUser } from './user';
import { addAsyncError, removeAsyncError } from './error';

const startAuth = () => {
  return {
    type: actionTypes.AUTH_ACTION_START,
  };
};

const successLogin = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
};

const successLogout = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

export const login = (email, password) => {
  return async dispatch => {
    dispatch(startAuth());
    dispatch(removeAsyncError());
    try {
      const result = await queries.login({ email, password });

      dispatch(successLogin());
      dispatch(loadUser(result.data.data));
    } catch (err) {
      dispatch(addAsyncError(err));
    }
  };
};

export const restoreSession = () => {
  return async dispatch => {
    dispatch(startAuth());
    dispatch(removeAsyncError());
    try {
      const result = await queries.restoreSession();
      dispatch(successLogin());
      dispatch(loadUser(result.data.data));
    } catch (err) {
      dispatch(addAsyncError(err));
    }
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch(startAuth());
    dispatch(removeAsyncError());
    try {
      await queries.logout();
      dispatch(successLogout());
      dispatch(removeUser());
    } catch (err) {
      dispatch(addAsyncError(err));
    }
  };
};
