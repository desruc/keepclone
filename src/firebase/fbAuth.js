import * as firebase from 'firebase/app';
import 'firebase/auth';

export const loginWithEmail = async (email, password) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    // TODO: Catch different error codes
    console.log('loginUser -> error', error);
  }
};

export const logout = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.log('logout -> error', error);
  }
};

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const scopes = ['profile', 'email'];
  scopes.forEach((scope) => provider.addScope(scope));
  try {
    return await firebase.auth().signInWithPopup(provider);
  } catch (error) {
    console.log('signInWithGoogle -> error', error);
  }
};
