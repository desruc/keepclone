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

export const bulkUpdateFbLabels = async (userId, labels) => {
  const batch = db.batch();

  labels.forEach((l) => {
    const ref = db
      .collection('users')
      .doc(userId)
      .collection('labels')
      .doc(l.id);
    batch.update(ref, 'label', l.label);
  });

  await batch.commit();
};

export const deleteFbLabel = async (userId, label, notes) => {
  const { id, label: labelText } = label;

  const batch = db.batch();
  const labelRef = db
    .collection('users')
    .doc(userId)
    .collection('labels')
    .doc(id);

  batch.delete(labelRef);

  notes.forEach((note) => {
    if (note.labels.some((l) => l === labelText)) {
      const ref = db
        .collection('users')
        .doc(userId)
        .collection('labels')
        .doc(note.id);

      batch.update(
        ref,
        'labels',
        note.labels.filter((l) => l !== labelText)
      );
    }
  });

  await batch.commit();
};
