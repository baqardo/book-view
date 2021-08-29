import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  id: null,
  name: null,
  email: null,
  photo: null,
  role: null,
  verified: null,
  wantReadBooks: [],
  currentlyReadingBooks: [],
  haveReadBooks: [],
  likedBooks: [],
};

const loadUserSuccess = (state, action) => {
  const { id, name, email, photo, role, verified } = action.result;
  const { wantReadBooks, currentlyReadingBooks, haveReadBooks, likedBooks } = action.result;
  const data = {
    id,
    name,
    email,
    photo,
    role,
    verified,
    wantReadBooks: [...wantReadBooks],
    currentlyReadingBooks: [...currentlyReadingBooks],
    haveReadBooks: [...haveReadBooks],
    likedBooks: [...likedBooks],
  };

  return updateObject(state, data);
};

const removeUserSuccess = state => {
  return updateObject(state, initialState);
};

const updateDataSuccess = (state, action) => {
  const { name, email, photo } = action.result;

  return updateObject(state, { name, email, photo });
};

const updateListSuccess = (state, action) => {
  return updateObject(state, action.result);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOAD_SUCCESS:
      return loadUserSuccess(state, action);
    case actionTypes.USER_REMOVE_SUCCESS:
      return removeUserSuccess(state);
    case actionTypes.UPDATE_DATA_SUCCESS:
      return updateDataSuccess(state, action);
    case actionTypes.UPDATE_LIST_SUCCESS:
      return updateListSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
