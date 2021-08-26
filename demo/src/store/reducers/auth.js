import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  isAuthenticated: false,
};

const loginSuccess = state => {
  return updateObject(state, { isAuthenticated: true });
};

const logoutSuccess = state => {
  return updateObject(state, { isAuthenticated: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state);
    case actionTypes.LOGOUT_SUCCESS:
      return logoutSuccess(state);

    default:
      return state;
  }
};

export default reducer;
