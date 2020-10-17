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

export const saveLabel = (userId, labelDocId, label) =>
  db
    .collection('users')
    .doc(userId)
    .collection('labels')
    .doc(labelDocId)
    .update(label);

export const saveNote = (userId, noteDocId, note) =>
  db
    .collection('users')
    .doc(userId)
    .collection('notes')
    .doc(noteDocId)
    .update(note);

export const addNote = async (userId, note) =>
  db.collection('users').doc(userId).collection('notes').add(note);

export const addLabel = async (userId, label) =>
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