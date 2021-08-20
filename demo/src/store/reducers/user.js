import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  photo: null,
  role: null,
  verified: null,
  wantReadBooks: [],
  currentlyReadingBooks: [],
  haveReadBooks: [],
  likedBooks: [],
  wantToReadBooks: [],
  name: null,
  email: null,
  passwordChangedAt: null,
  id: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      const data = action.result;
      const newState = {
        loading: false,
        photo: data.photo,
        role: data.role,
        verified: data.verified,
        wantReadBooks: [...data.wantReadBooks],
        currentlyReadingBooks: [...data.currentlyReadingBooks],
        haveReadBooks: [...data.haveReadBooks],
        likedBooks: [...data.likedBooks],
        wantToReadBooks: [...data.wantToReadBooks],
        name: data.name,
        email: data.email,
        passwordChangedAt: data.passwordChangedAt,
        id: data.id,
      };
      return {
        ...state,
        ...newState,
      };
    case actionTypes.LOGIN_FAIL:
      const { message, name } = action.error;
      return {
        ...state,
        loading: false,
        error: {
          message,
          name,
        },
      };
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
