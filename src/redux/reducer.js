import * as types from './types';

import { initialNotes, initialLabels } from '../constants/initialData';

const initialState = {
  initialized: false,
  authLoading: false,
  user: null,
  colorMode: 'light',
  notes: [],
  labels: [],
  selectedLabel: null,
  selectedNote: null,
  toastProps: {
    open: false,
    message: '',
    actionType: ''
  },
  editModalOpen: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_APP_INITIALIZED:
      return {
        ...state,
        initialized: true
      };

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
        user: null,
        notes: initialNotes,
        labels: initialLabels
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
        labels: state.labels.map((l) => {
          const change = action.labels.find((c) => c.id === l.id);
          if (change) return change;
          return l;
        })
      };

    case types.DELETE_LOCAL_LABEL:
      return {
        ...state,
        labels: state.labels.filter((l) => l.id !== action.label.id),
        notes: state.notes.map((n) => ({
          ...n,
          labels: n.labels.filter((l) => l !== action.label.label)
        }))
      };

    case types.ARCHIVE_LOCAL_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.noteId) return { ...note, archived: true };
          return note;
        })
      };

    case types.UNARCHIVE_LOCAL_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.noteId) return { ...note, archived: false };
          return note;
        })
      };

    case types.DELETE_LOCAL_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.noteId) return { ...note, trashed: true };
          return note;
        })
      };

    case types.RESTORE_LOCAL_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.id === action.noteId) return { ...note, trashed: false };
          return note;
        })
      };

    case types.PERMANETLY_DELETE_LOCAL_NOTE:
      return {
        ...state,
        notes: state.notes.filter(({ id }) => id !== action.noteId)
      };

    case types.SET_SELECTED_LABEL:
      return {
        ...state,
        selectedLabel: action.label
      };

    case types.UPDATE_FIREBASE_NOTES:
      return {
        ...state,
        notes: action.notes
      };

    case types.UPDATE_FIREBASE_LABELS:
      return {
        ...state,
        labels: action.labels
      };

    case types.SET_TOAST_PROPS:
      return {
        ...state,
        toastProps: {
          open: action.open,
          message: action.message,
          actionType: action.actionType
        }
      };

    case types.CLOSE_TOAST:
      return {
        ...state,
        toastProps: {
          ...state.toastProps,
          open: false
        }
      };

    case types.SET_SELECTED_NOTE:
      return {
        ...state,
        selectedNote: action.note
      };

    case types.CHANGE_LOCAL_NOTE_BACKGROUND:
      return {
        ...state,
        notes: state.notes.map((n) => {
          if (n.id === action.noteId)
            return { ...n, backgroundColor: action.backgroundColor };
          return n;
        })
      };

    case types.TOGGLE_LOCAL_NOTE_LABEL:
      return {
        ...state,
        notes: state.notes.map((n) => {
          if (n.id === action.note.id) return action.note;
          return n;
        })
      };

    case types.EDIT_NOTE_MODAL_OPEN_STATE:
      return {
        ...state,
        editModalOpen: action.state
      };

    case types.UPDATE_LOCAL_NOTE:
      return {
        ...state,
        notes: state.notes.map((n) => {
          if (n.id === action.note.id) return action.note;
          return n;
        })
      };

    default:
      return state;
  }
};

export default appReducer;

export const selectUser = (state) => state.app.user;
export const selectColorMode = (state) => state.app.colorMode;
export const selectAllNotes = (state) => state.app.notes;
export const selectActiveNotes = (state) =>
  state.app.notes.filter(({ archived, trashed }) => !archived && !trashed);
export const selectArchivedNotes = (state) =>
  state.app.notes.filter(({ archived, trashed }) => archived && !trashed);
export const selectTrashedNotes = (state) =>
  state.app.notes.filter(({ trashed }) => trashed);
export const selectLabels = (state) => state.app.labels;
export const selectSelectedLabel = (state) => state.app.selectedLabel;
export const selectSelectedNote = (state) => state.app.selectedNote;
export const selectToastProps = (state) => state.app.toastProps;
export const selectAppInitialized = (state) => state.app.initialized;
export const selectEditModalOpen = (state) => state.app.editModalOpen;
