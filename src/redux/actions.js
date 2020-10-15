import * as types from './types';
import { addNote, addLabel } from '../firebase/fbDb';

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

export const attemptSaveLabel = (userId, note) => async (dispatch) => {
  try {
    // TODO: Saving states
    await saveLabel(userId, note);
  } catch (error) {
    console.log('attemptSaveLabel -> error', error);
    // TODO: Saving states - toast notification
  }
};
