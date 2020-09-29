import * as types from './types';

const initialState = {
  authLoading: false,
  user: null
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_LOADING_STATE:
      return {
        ...state,
        authLoading: action.state
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user
      };

    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
};

export default appReducer;
