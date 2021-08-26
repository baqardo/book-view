import * as actionTypes from './actionTypes';
import * as queries from '../../utils/axiosQueries';
import { loadUser, removeUser } from './user';
import catchAsync from '../../utils/catchAsync';

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
  return catchAsync(async dispatch => {
    const result = await queries.login({ email, password });
    dispatch(successLogin());
    dispatch(loadUser(result.data.data));
  });
};

export const restoreSession = () => {
  return catchAsync(async dispatch => {
    const result = await queries.restoreSession();
    dispatch(successLogin());
    dispatch(loadUser(result.data.data));
  });
};

export const logout = () => {
  return catchAsync(async dispatch => {
    await queries.logout();
    dispatch(successLogout());
    dispatch(removeUser());
  });
};
