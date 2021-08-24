import * as actionTypes from './actionTypes';
import * as queries from '../../utils/axiosQueries';

const startUser = () => {
  return {
    type: actionTypes.USER_START,
  };
};

const failUser = err => {
  const { message, status } = err.response.data;
  return {
    type: actionTypes.USER_FAIL,
    error: {
      message,
      status,
    },
  };
};

const successLogin = res => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    result: res,
  };
};

export const login = (email, password) => {
  return async dispatch => {
    dispatch(startUser());
    try {
      const data = { email, password };
      const result = await queries.login(data);

      dispatch(successLogin(result.data.data));
    } catch (err) {
      dispatch(failUser(err));
    }
  };
};

export const restoreSession = () => {
  return async dispatch => {
    dispatch(startUser());
    try {
      const result = await queries.restoreSession();
      dispatch(successLogin(result.data.data));
    } catch (err) {
      dispatch(failUser(err));
    }
  };
};

const successLogout = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch(startUser());
    try {
      await queries.logout();
      dispatch(successLogout());
    } catch (err) {
      dispatch(failUser(err));
    }
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

const successUpdatePassword = () => {
  return {
    type: actionTypes.UPDATE_PASSWORD_SUCCESS,
  };
};

export const updateUserPassword = passwords => {
  return async dispatch => {
    dispatch(startUser());
    try {
      await queries.patchPassword(passwords);
      dispatch(successUpdatePassword());
    } catch (err) {
      dispatch(failUser(err));
    }
  };
};
