import * as types from './types';
import { addNote, addLabel, updateNote, deleteNote } from '../firebase/fbDb';

export const attemptAddNote = (userId, note) => async (dispatch) => {
  try {
    console.log('attemptSaveNote -> userId', userId);
    // TODO: Saving states
    await addNote(userId, note);
  } catch (error) {
    console.log('attemptSaveNote -> error', error);
    // TODO: Saving states - toast notification
  }
};

export const attemptAddLabel = (userId, note) => async (dispatch) => {
  try {
    // TODO: Saving states
    await addLabel(userId, note);
  } catch (error) {
    console.log('attemptSaveLabel -> error', error);
    // TODO: Saving states - toast notification
  }
};

export const archiveFirebaseNote = (userId, note) => async (dispatch) => {
  try {
    // TODO: Toast notifications
    const { id, ...rest } = note;
    await updateNote(userId, id, { ...rest, archived: true });
  } catch (error) {
    console.log('archiveFirebaseNote -> error', error);
  }
};

export const unarchiveFirebaseNote = (userId, note) => async (dispatch) => {
  console.log("unarchiveFirebaseNote -> note", note)
  try {
    // TODO: Toast notifications
    const { id, ...rest } = note;
    await updateNote(userId, id, { ...rest, archived: false });
  } catch (error) {
    console.log('archiveFirebaseNote -> error', error);
  }
};

export const deleteFirebaseNote = (userId, note) => async (dispatch) => {
  try {
    // TODO: Toast notifications
    const { id, ...rest } = note;
    await updateNote(userId, id, { ...rest, trashed: true });
  } catch (error) {
    console.log('archiveFirebaseNote -> error', error);
  }
};

export const restoreFirebaseNote = (userId, note) => async (dispatch) => {
  try {
    // TODO: Toast notifications
    const { id, ...rest } = note;
    await updateNote(userId, id, { ...rest, trashed: false });
  } catch (error) {
    console.log('archiveFirebaseNote -> error', error);
  }
};

export const permanentlyDeleteFirebaseNote = (userId, note) => async (
  dispatch
) => {
  try {
    // TODO: Toast notifications
    const { id } = note;
    await deleteNote(userId, id);
  } catch (error) {
    console.log('archiveFirebaseNote -> error', error);
  }
};
