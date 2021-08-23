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

const loginStart = state => {
  return updateObject(state, { error: null, loading: true });
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

const loginFail = (state, action) => {
  const { message, name } = action.error;
  const error = updateObject(state.error, { message, name });
  const properties = { loading: false, error };
  return updateObject(state, properties);
};

const logoutStart = state => {
  return updateObject(state, { error: null, loading: true });
};

const logoutSuccess = state => {
  return updateObject(state, initialState);
};

const logoutFail = (state, action) => {
  const { message, name } = action.error;
  const error = updateObject(state.error, { message, name });
  const properties = { loading: false, error };
  return updateObject(state, properties);
};

const updateStart = state => {
  return updateObject(state, { error: null, loading: true });
};

const updateSuccess = (state, action) => {
  const { name, email } = action.result;

  return updateObject(state, { loading: false, name, email });
};

const updateFail = (state, action) => {
  const { message, name } = action.error;
  const error = updateObject(state.error, { message, name });
  const properties = { loading: false, error };
  return updateObject(state, properties);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return loginStart(state);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);
    case actionTypes.LOGOUT_START:
      return logoutStart(state);
    case actionTypes.LOGOUT_SUCCESS:
      return logoutSuccess(state);
    case actionTypes.LOGOUT_FAIL:
      return logoutFail(state, action);
    case actionTypes.UPDATE_START:
      return updateStart(state);
    case actionTypes.UPDATE_SUCCESS:
      return updateSuccess(state, action);
    case actionTypes.UPDATE_FAIL:
      return updateFail(state, action);
    default:
      return state;
  }
};

export default reducer;
