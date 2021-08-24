import * as actionTypes from './actionTypes';
import * as queries from '../../utils/axiosQueries';

const startLogin = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

const successLogin = res => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    result: res,
  };
};

const failLogin = err => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: err,
  };
};

export const login = (email, password) => {
  return async dispatch => {
    dispatch(startLogin());
    try {
      const data = { email, password };
      const result = await queries.login(data);

      dispatch(successLogin(result.data.data));
    } catch (err) {
      console.log(err);
      dispatch(failLogin(err));
    }
  };
};

export const restoreSession = () => {
  return async dispatch => {
    dispatch(startLogin());
    try {
      const result = await queries.restoreSession();
      dispatch(successLogin(result.data.data));
    } catch (err) {
      console.log(err);
      dispatch(failLogin(err));
    }
  };
};

const startLogout = () => {
  return {
    type: actionTypes.LOGOUT_START,
  };
};

const successLogout = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

const failLogout = err => {
  return {
    type: actionTypes.LOGOUT_FAIL,
    error: err,
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch(startLogout());
    try {
      await queries.logout();
      dispatch(successLogout());
    } catch (err) {
      console.log(err);
      dispatch(failLogout(err));
    }
  };
};

const startUpdate = () => {
  return {
    type: actionTypes.UPDATE_START,
  };
};

const successUpdate = res => {
  return {
    type: actionTypes.UPDATE_SUCCESS,
    result: res,
  };
};

const failUpdate = err => {
  return {
    type: actionTypes.UPDATE_FAIL,
    error: err,
  };
};

export const updateUserData = (name, email) => {
  return async dispatch => {
    dispatch(startUpdate());
    try {
      const data = { name, email };
      await queries.patchUserData(data);
      dispatch(successUpdate(data));
    } catch (err) {
      console.log(err);
      dispatch(failUpdate(err));
    }
  };
};

const startUpdatePassword = () => {
  return {
    type: actionTypes.UPDATE_PASSWORD_START,
  };
};

const successUpdatePassword = () => {
  return {
    type: actionTypes.UPDATE_PASSWORD_SUCCESS,
  };
};

const failUpdatePassword = err => {
  return {
    type: actionTypes.UPDATE_PASSWORD_FAIL,
    error: err,
  };
};

export const updateUserPassword = passwords => {
  return async dispatch => {
    dispatch(startUpdatePassword());
    try {
      await queries.patchPassword(passwords);
      dispatch(successUpdatePassword());
    } catch (err) {
      console.log(err);
      dispatch(failUpdatePassword(err));
    }
  };
};
