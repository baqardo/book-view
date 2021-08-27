import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  loading: false,
  error: null,
  internalAsyncError: null,
  externalAsyncError: null,
  networkAsyncError: null,
};

const addInternalAsyncError = (state, action) => {
  const internalAsyncError = updateObject(state.internalAsyncError, action.error);
  return updateObject(state, { internalAsyncError });
};

const addExternalAsyncError = (state, action) => {
  const externalAsyncError = updateObject(state.externalAsyncError, action.error);
  return updateObject(state, { externalAsyncError });
};

const addNetworkAsyncError = (state, action) => {
  const networkAsyncError = updateObject(state.externalAsyncError, action.error);
  return updateObject(state, { networkAsyncError });
};

const startLoading = state => {
  return updateObject(state, {
    loading: true,
    error: null,
    internalAsyncError: null,
    externalAsyncError: null,
    networkAsyncError: null,
  });
};

const endLoading = state => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INTERNAL_ASYNC_ERROR:
      return addInternalAsyncError(state, action);
    case actionTypes.ADD_EXTERNAL_ASYNC_ERROR:
      return addExternalAsyncError(state, action);
    case actionTypes.ADD_NETWORK_ASYNC_ERROR:
      return addNetworkAsyncError(state, action);
    case actionTypes.START_LOADING:
      return startLoading(state);
    case actionTypes.END_LOADING:
      return endLoading(state);
    default:
      return state;
  }
};

export default reducer;
