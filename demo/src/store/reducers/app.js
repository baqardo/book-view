import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  loading: false,
  error: null,
  asyncError: null,
};

const addAsyncError = (state, action) => {
  const asyncError = updateObject(state.asyncError, action.error);
  return updateObject(state, { asyncError });
};

const startLoading = state => {
  return updateObject(state, { loading: true, asyncError: null, error: null });
};

const endLoading = state => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ASYNC_ERROR:
      return addAsyncError(state, action);
    case actionTypes.START_LOADING:
      return startLoading(state);
    case actionTypes.END_LOADING:
      return endLoading(state);
    default:
      return state;
  }
};

export default reducer;
