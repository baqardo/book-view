import * as actionTypes from './actionTypes';
import axios from 'axios';

export const startLogin = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const successLogin = res => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    result: res,
  };
};

export const failLogin = err => {
  return {
    type: actionTypes.LOGIN_FAIL,
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
