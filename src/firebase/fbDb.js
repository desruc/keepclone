import * as firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore();

const streamData = (userId, collection, observer) =>
  db
    .collection('users')
    .doc(userId)
    .collection(collection)
    .onSnapshot(observer);

export const streamNotes = (userId, observer) =>
  streamData(userId, 'notes', observer);

export const streamLabels = (userId, observer) =>
  streamData(userId, 'labels', observer);

export const updateFbLabel = (userId, labelDocId, label) =>
  db
    .collection('users')
    .doc(userId)
    .collection('labels')
    .doc(labelDocId)
    .update(label);

export const updateFbNote = (userId, noteDocId, note) =>
  db
    .collection('users')
    .doc(userId)
    .collection('notes')
    .doc(noteDocId)
    .update(note);

export const addFbNote = async (userId, note) =>
  db.collection('users').doc(userId).collection('notes').add(note);

export const addFbLabel = async (userId, label) =>
  db.collection('users').doc(userId).collection('labels').add(label);

export const reorderFbNotes = (firstItem, secondItem, userId) => {
  const batch = db.batch();
  const firstRef = db
    .collection('users')
    .doc(userId)
    .collection('notes')
    .doc(firstItem.id);

  const secondRef = db
    .collection('users')
    .doc(userId)
    .collection('notes')
    .doc(secondItem.id);

  batch.update(firstRef, 'index', firstItem.index);
  batch.update(secondRef, 'index', secondItem.index);
  batch.commit();
};

export const deleteFbNote = async (userId, noteId) =>
  db.collection('users').doc(userId).collection('notes').doc(noteId).delete();
