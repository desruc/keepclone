import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fb from './firebase/fbAuth';
import { streamNotes, streamLabels } from './firebase/fbDb';

import AppShell from './components/AppShell';

import { selectUser } from './redux/reducer';

import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_FIREBASE_LABELS,
  UPDATE_FIREBASE_NOTES
} from './redux/types';

const App = () => {
  const dispatch = useDispatch();

  // Redux
  const authUser = useSelector((state) => selectUser(state));

  // When firebase authentication changes - update redux
  useEffect(() => {
    fb.auth().onAuthStateChanged((user) => {
      if (!user) dispatch({ type: LOGOUT_SUCCESS });
      else dispatch({ type: LOGIN_SUCCESS, user: user.uid });
    });
  }, []);

  // Watch firestore for changes while authenticated
  useEffect(() => {
    if (authUser) {
      streamLabels(authUser, {
        next: (querySnapshot) => {
          if (querySnapshot.docs) {
            const labels = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));
            dispatch({ type: UPDATE_FIREBASE_LABELS, labels });
          }
        }
      });

      streamNotes(authUser, {
        next: (querySnapshot) => {
          if (querySnapshot.docs) {
            const notes = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));
            dispatch({ type: UPDATE_FIREBASE_NOTES, notes });
          }
        }
      });
    }
  }, [authUser]);

  return <AppShell />;
};

export default App;
