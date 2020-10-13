import * as types from './types';

const initialState = {
  authLoading: false,
  user: null,
  colorMode: 'light',
  notes: [],
  labels: []
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

    case types.SAVE_LOCAL_LABEL:
      return {
        ...state,
        labels: [...state.labels, action.label]
      };

    case types.UPDATE_LOCAL_LABEL:
      return {
        ...state,
        labels: state.labels.map((label) => {
          if (label.id === action.label.id) return action.label;
          return label;
        })
      };

    case types.BULK_UPDATE_LOCAL_LABELS:
      return {
        ...state,
        labels: action.labels
      };

    case types.DELETE_LOCAL_LABEL:
      return {
        ...state,
        labels: state.labels.filter((l) => l.id !== action.labelId)
      };

    default:
      return state;
  }
};

export default appReducer;

export const selectUser = (state) => state.app.user;
export const selectColorMode = (state) => state.app.colorMode;
export const selectActiveNotes = (state) => state.app.notes;
export const selectArchivedNotes = (state) =>
  state.app.notes.filter(({ archived }) => archived);
export const selectTrashedNotes = (state) =>
  state.app.notes.filter(({ trashed }) => trashed);
export const selectLabels = (state) => state.app.labels;
