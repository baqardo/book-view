import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
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

const updateDataSuccess = (state, action) => {
  const resultData = action.result;
  const data = updateObject(state.data, {
    name: resultData.name,
    email: resultData.email,
  });

  return updateObject(state, { loading: false, data });
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
    passwordChangedAt: resultData.passwordChangedAt,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_ACTION_START:
      return userStart(state);
    case actionTypes.USER_ACTION_FAIL:
      return userFail(state, action);
    case actionTypes.UPDATE_DATA_SUCCESS:
      return updateDataSuccess(state, action);
    case actionTypes.USER_LOAD_SUCCESS:
      return loadUserSuccess(state, action);
    case actionTypes.USER_REMOVE_SUCCESS:
      return removeUserSuccess(state);
    default:
      return state;
  }
};

export default reducer;
