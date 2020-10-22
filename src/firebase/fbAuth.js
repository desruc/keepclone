import * as firebase from 'firebase/app';
import 'firebase/auth';

export const logout = async () => {
  try {
    return await firebase.auth().signOut();
  } catch (error) {
    // TODO: map error codes
    return error;
  }
};

export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const scopes = ['profile', 'email'];
  scopes.forEach((scope) => provider.addScope(scope));
  try {
    return await firebase.auth().signInWithPopup(provider);
  } catch (error) {
    // TODO: map error codes
    return error;
  }
};

export default firebase;
