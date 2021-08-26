import * as actionTypes from './actionTypes';
import * as queries from '../../utils/axiosQueries';
import { loadUser, removeUser } from './user';
import { addAsyncError, startLoading, endLoading } from './app';

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
    dispatch(startLoading());
    try {
      const result = await queries.login({ email, password });

      dispatch(successLogin());
      dispatch(loadUser(result.data.data));
    } catch (err) {
      dispatch(addAsyncError(err));
    }
    dispatch(endLoading());
  };
};

export const restoreSession = () => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const result = await queries.restoreSession();
      dispatch(successLogin());
      dispatch(loadUser(result.data.data));
    } catch (err) {
      dispatch(addAsyncError(err));
    }
    dispatch(endLoading());
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch(startLoading());
    try {
      await queries.logout();
      dispatch(successLogout());
      dispatch(removeUser());
    } catch (err) {
      dispatch(addAsyncError(err));
    }
    dispatch(endLoading());
  };
};
