import * as actionTypes from './actionTypes';
import * as queries from '../../utils/axiosQueries';
import { loadUser, removeUser } from './user';

export const startAuth = () => {
  return {
    type: actionTypes.AUTH_ACTION_START,
  };
};

export const failAuth = err => {
  const { message, status } = err.response.data;
  return {
    type: actionTypes.AUTH_ACTION_FAIL,
    error: {
      message,
      status,
    },
  };
};

export const successLogin = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
};

const successLogout = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

const successUpdatePassword = () => {
  return {
    type: actionTypes.UPDATE_PASSWORD_SUCCESS,
  };
};

export const login = (email, password) => {
  return async dispatch => {
    dispatch(startAuth());
    try {
      const data = { email, password };
      const result = await queries.login(data);

      dispatch(successLogin());
      dispatch(loadUser(result.data.data));
    } catch (err) {
      dispatch(failAuth(err));
    }
  };
};

export const restoreSession = () => {
  return async dispatch => {
    dispatch(startAuth());
    try {
      const result = await queries.restoreSession();
      dispatch(successLogin());
      dispatch(loadUser(result.data.data));
    } catch (err) {
      dispatch(failAuth(err));
    }
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch(startAuth());
    try {
      await queries.logout();
      dispatch(successLogout());
      dispatch(removeUser());
    } catch (err) {
      dispatch(failAuth(err));
    }
  };
};

export const updateUserPassword = passwords => {
  return async dispatch => {
    dispatch(startAuth());
    try {
      await queries.patchPassword(passwords);
      dispatch(successUpdatePassword());
    } catch (err) {
      dispatch(failAuth(err));
    }
  };
};
