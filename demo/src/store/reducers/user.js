import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  data: {
    id: null,
    name: null,
    email: null,
    photo: null,
    role: null,
    verified: null,
    passwordChangedAt: null,
    wantReadBooks: [],
    currentlyReadingBooks: [],
    haveReadBooks: [],
    likedBooks: [],
  },
};

const userStart = state => {
  return updateObject(state, { error: null, loading: true });
};

const userFail = (state, action) => {
  const { message, status } = action.error;
  const error = updateObject(state.error, { message, status });
  const properties = { loading: false, error };
  return updateObject(state, properties);
};

const loginSuccess = (state, action) => {
  const resultData = action.result;
  const data = updateObject(state.data, {
    id: resultData.id,
    name: resultData.name,
    email: resultData.email,
    photo: resultData.photo,
    role: resultData.role,
    verified: resultData.verified,
    passwordChangedAt: resultData.passwordChangedAt,
    wantReadBooks: [...resultData.wantReadBooks],
    currentlyReadingBooks: [...resultData.currentlyReadingBooks],
    haveReadBooks: [...resultData.haveReadBooks],
    likedBooks: [...resultData.likedBooks],
  });

  return updateObject(state, { loading: false, isAuthenticated: true, data });
};

const logoutSuccess = state => {
  return updateObject(state, initialState);
};

const updateDataSuccess = (state, action) => {
  const resultData = action.result;
  const data = updateObject(state.data, {
    name: resultData.name,
    email: resultData.email,
  });

  return updateObject(state, { loading: false, data });
};

const updatePasswordSuccess = state => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_START:
      return userStart(state);
    case actionTypes.USER_FAIL:
      return userFail(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGOUT_SUCCESS:
      return logoutSuccess(state);
    case actionTypes.UPDATE_DATA_SUCCESS:
      return updateDataSuccess(state, action);
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return updatePasswordSuccess(state);
    default:
      return state;
  }
};

export default reducer;
