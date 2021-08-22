import * as actionTypes from './actionTypes';
import axios from 'axios';

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

const startLogout = () => {
  return {
    type: actionTypes.LOGOUT_START,
  };
};

const successLogout = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    // result: 'success',
  };
};

const failLogout = err => {
  return {
    type: actionTypes.LOGOUT_FAIL,
    error: err,
  };
};

export const login = (email, password) => {
  return async dispatch => {
    dispatch(startLogin());
    try {
      const result = await axios.post(
        'http://localhost:8080/api/v1/users/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );

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
      const result = await axios.get('http://localhost:8080/api/v1/users/me', { withCredentials: true });

      dispatch(successLogin(result.data.data));
    } catch (err) {
      console.log(err);
      dispatch(failLogin(err));
    }
  };
};

export const logout = () => {
  return async dispatch => {
    // dispatch(startLogout());
    try {
      const result = await axios.get('http://localhost:8080/api/v1/users/logouts', { withCredentials: true });
      // dispatch(successLogout());
    } catch (err) {
      console.log(err);
      // dispatch(failLogout(err));
    }
  };
};
