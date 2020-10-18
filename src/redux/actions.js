import * as types from './types';
import {
  addFbNote,
  addFbLabel,
  updateFbNote,
  deleteFbNote
} from '../firebase/fbDb';

export const attemptAddNote = (userId, note) => async (dispatch) => {
  try {
    const { id, ...rest } = note;

    if (userId) await addFbNote(userId, rest);
    else dispatch({ type: types.SAVE_LOCAL_NOTE, note });
  } catch (error) {
    console.log('attemptSaveNote -> error', error);
  }
};

export const attemptAddLabel = (userId, note) => async (dispatch) => {
  try {
    // TODO: Saving states
    await addFbLabel(userId, note);
  } catch (error) {
    console.log('attemptSaveLabel -> error', error);
    // TODO: Saving states - toast notification
  }
};

export const attemptArchiveNote = (userId, note) => async (dispatch) => {
  try {
    dispatch({ type: types.CLOSE_TOAST });
    dispatch({ type: types.SET_SELECTED_NOTE, note });

    const { id, ...rest } = note;

    if (userId) await updateFbNote(userId, id, { ...rest, archived: true });
    else dispatch({ type: types.ARCHIVE_LOCAL_NOTE, noteId: id });

    dispatch({
      type: types.SET_TOAST_PROPS,
      open: true,
      message: 'Note archived',
      actionType: types.UNARCHIVE_LOCAL_NOTE
    });
  } catch (error) {
    console.log('attemptArchiveNote -> error', error);
  }
};

export const attemptUnarchiveNote = (userId, note) => async (dispatch) => {
  try {
    dispatch({ type: types.CLOSE_TOAST });
    dispatch({ type: types.SET_SELECTED_NOTE, note });

    const { id, ...rest } = note;

    if (userId) await updateFbNote(userId, id, { ...rest, archived: false });
    else dispatch({ type: types.UNARCHIVE_LOCAL_NOTE, noteId: id });

    dispatch({
      type: types.SET_TOAST_PROPS,
      open: true,
      message: 'Note unarchived',
      actionType: ''
    });
  } catch (error) {
    console.log('attemptUnarchiveNote -> error', error);
  }
};

export const attemptDeleteNote = (userId, note) => async (dispatch) => {
  try {
    dispatch({ type: types.CLOSE_TOAST });
    dispatch({ type: types.SET_SELECTED_NOTE, note });

    const { id, ...rest } = note;

    if (userId) await updateFbNote(userId, id, { ...rest, trashed: true });
    else dispatch({ type: types.DELETE_LOCAL_NOTE, noteId: id });

    dispatch({
      type: types.SET_TOAST_PROPS,
      open: true,
      message: 'Note moved to trash',
      actionType: types.RESTORE_LOCAL_NOTE
    });
  } catch (error) {
    console.log('attemptDeleteNote -> error', error);
  }
};

export const attemptRestoreNote = (userId, note) => async (dispatch) => {
  try {
    dispatch({ type: types.CLOSE_TOAST });
    dispatch({ type: types.SET_SELECTED_NOTE, note });

    const { id, ...rest } = note;

    if (userId) await updateFbNote(userId, id, { ...rest, trashed: false });
    else dispatch({ type: types.RESTORE_LOCAL_NOTE, noteId: id });

    dispatch({
      type: types.SET_TOAST_PROPS,
      open: true,
      message: 'Note restored',
      actionType: ''
    });
  } catch (error) {
    console.log('attemptRestoreNote -> error', error);
  }
};

export const attemptPermenatlyDeleteNote = (userId, note) => async (
  dispatch
) => {
  try {
    dispatch({ type: types.CLOSE_TOAST });
    dispatch({ type: types.SET_SELECTED_NOTE, note });

    const { id } = note;

    if (userId) await deleteFbNote(userId, id);
    else dispatch({ type: types.PERMANETLY_DELETE_LOCAL_NOTE, noteId: id });

    dispatch({
      type: types.SET_TOAST_PROPS,
      open: true,
      message: 'Note deleted',
      actionType: ''
    });
  } catch (error) {
    console.log('attemptPermenatlyDeleteNote -> error', error);
  }
};
