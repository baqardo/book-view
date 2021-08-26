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
  const resultData = action.result;
  const data = {
    id: resultData.id,
    name: resultData.name,
    email: resultData.email,
    photo: resultData.photo,
    role: resultData.role,
    verified: resultData.verified,
    wantReadBooks: [...resultData.wantReadBooks],
    currentlyReadingBooks: [...resultData.currentlyReadingBooks],
    haveReadBooks: [...resultData.haveReadBooks],
    likedBooks: [...resultData.likedBooks],
  };

  return updateObject(state, data);
};

const removeUserSuccess = state => {
  return updateObject(state, initialState);
};

const updateDataSuccess = (state, action) => {
  const data = updateObject(state, {
    name: action.result.name,
    email: action.result.email,
  });

  return updateObject(state, data);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOAD_SUCCESS:
      return loadUserSuccess(state, action);
    case actionTypes.USER_REMOVE_SUCCESS:
      return removeUserSuccess(state);
    case actionTypes.UPDATE_DATA_SUCCESS:
      return updateDataSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
