import * as types from './types';

const initialState = {
  authLoading: false,
  user: null,
  colorMode: 'light',
  notes: []
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

    case types.CHANGE_COLOR_MODE:
      return {
        ...state,
        colorMode: action.colorMode
      };

    case types.REORDER_LOCAL_NOTES:
      return {
        ...state,
        notes: action.notes
      };

    case types.SAVE_LOCAL_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.note]
      };

    default:
      return state;
  }
};

export default appReducer;

export const selectUser = (state) => state.app.user;
export const selectColorMode = (state) => state.app.colorMode;
export const selectNotes = (state) => state.app.notes;
