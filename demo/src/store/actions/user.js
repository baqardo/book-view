import * as actionTypes from './actionTypes';
import * as queries from '../../utils/axiosQueries';
import catchAsync from '../../utils/catchAsync';

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
  return dispatch => {
    dispatch(successLoadUser(data));
  };
};

export const removeUser = () => {
  return dispatch => {
    dispatch(successRemoveUser());
  };
};

export const updateUserData = (name, email) => {
  return catchAsync(async dispatch => {
    const data = { name, email };
    await queries.patchUserData(data);
    dispatch(successUpdateData(data));
  });
};

export const updateUserPassword = passwords => {
  return catchAsync(async dispatch => {
    await queries.patchPassword(passwords);
  });
};
