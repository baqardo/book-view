import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  error: null,
  asyncError: null,
};

const addAsyncError = (state, action) => {
  const asyncError = updateObject(state.asyncError, action.error);
  return updateObject(state, { asyncError });
};

const removeAsyncError = state => {
  return updateObject(state, { asyncError: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ASYNC_ERROR:
      return addAsyncError(state, action);
    case actionTypes.REMOVE_ASYNC_ERROR:
      return removeAsyncError(state);
    default:
      return state;
  }
};

export default reducer;
