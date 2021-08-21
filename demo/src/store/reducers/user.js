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
  wantToReadBooks: [],
  name: null,
  email: null,
  passwordChangedAt: null,
  id: null,
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
    wantToReadBooks: [...data.wantToReadBooks],
    name: data.name,
    email: data.email,
    passwordChangedAt: data.passwordChangedAt,
    id: data.id,
  };

  return updateObject(state, properties);
};

const loginFail = (state, action) => {
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
    default:
      return state;
  }
};

export default reducer;
