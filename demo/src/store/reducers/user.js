import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  loading: false,
  data: {
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
  },
};

const userStart = state => {
  return updateObject(state, { loading: true });
};

const loadUserSuccess = (state, action) => {
  const resultData = action.result;
  const data = updateObject(state.data, {
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
  });

  return updateObject(state, { loading: false, data });
};

const removeUserSuccess = state => {
  return updateObject(state, initialState);
};

const updateDataSuccess = (state, action) => {
  const data = updateObject(state.data, {
    name: action.result.name,
    email: action.result.email,
  });

  return updateObject(state, { loading: false, data });
};

const updatePasswordSuccess = state => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_ACTION_START:
      return userStart(state);
    case actionTypes.USER_LOAD_SUCCESS:
      return loadUserSuccess(state, action);
    case actionTypes.USER_REMOVE_SUCCESS:
      return removeUserSuccess(state);
    case actionTypes.UPDATE_DATA_SUCCESS:
      return updateDataSuccess(state, action);
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return updatePasswordSuccess(state);
    default:
      return state;
  }
};

export default reducer;
