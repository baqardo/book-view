import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  isAuthenticated: false,
  loading: false,
};

const authStart = state => {
  return updateObject(state, { loading: true });
};

const loginSuccess = state => {
  return updateObject(state, { loading: false, isAuthenticated: true });
};

const logoutSuccess = state => {
  return updateObject(state, initialState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_ACTION_START:
      return authStart(state);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state);
    case actionTypes.LOGOUT_SUCCESS:
      return logoutSuccess(state);

    default:
      return state;
  }
};

export default reducer;
