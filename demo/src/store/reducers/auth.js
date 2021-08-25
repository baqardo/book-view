import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authStart = state => {
  return updateObject(state, { error: null, loading: true });
};

const authFail = (state, action) => {
  const error = updateObject(state.error, action.error);
  return updateObject(state, { loading: false, error });
};

const loginSuccess = state => {
  return updateObject(state, { loading: false, isAuthenticated: true });
};

const logoutSuccess = state => {
  return updateObject(state, initialState);
};

const updatePasswordSuccess = state => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_ACTION_START:
      return authStart(state);
    case actionTypes.AUTH_ACTION_FAIL:
      return authFail(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state);
    case actionTypes.LOGOUT_SUCCESS:
      return logoutSuccess(state);
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return updatePasswordSuccess(state);
    default:
      return state;
  }
};

export default reducer;
