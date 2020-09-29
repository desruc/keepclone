import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import fb from './firebase/fbAuth';

import AppShell from './components/AppShell';

import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './redux/types';

const App = () => {
  // Hooks
  const dispatch = useDispatch();

  // When firebase authentication changes - update redux
  useEffect(() => {
    fb.auth().onAuthStateChanged((user) => {
      if (!user) dispatch({ type: LOGOUT_SUCCESS });
      else dispatch({ type: LOGIN_SUCCESS, user: user.uid });
    });
  }, []);

  return <AppShell />;
};

export default App;
