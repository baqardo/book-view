import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  loading: false,
  error: null,
  photo: null,
  role: null,
  verified: null,
  wantReadBooks: [],
  currentlyReadingBooks: [],
  haveReadBooks: [],
  likedBooks: [],
  name: null,
  email: null,
  passwordChangedAt: null,
  id: null,
  isAuthenticated: false,
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
  const data = action.result;
  const properties = {
    loading: false,
    photo: data.photo,
    role: data.role,
    verified: data.verified,
    wantReadBooks: [...data.wantReadBooks],
    currentlyReadingBooks: [...data.currentlyReadingBooks],
    haveReadBooks: [...data.haveReadBooks],
    likedBooks: [...data.likedBooks],
    name: data.name,
    email: data.email,
    passwordChangedAt: data.passwordChangedAt,
    id: data.id,
    isAuthenticated: true,
  };

  return updateObject(state, properties);
};

const logoutSuccess = state => {
  return updateObject(state, initialState);
};

const updateSuccess = (state, action) => {
  const { name, email } = action.result;

  return updateObject(state, { loading: false, name, email });
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
    case actionTypes.UPDATE_SUCCESS:
      return updateSuccess(state, action);
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return updatePasswordSuccess(state);
    default:
      return state;
  }
};

export default reducer;
