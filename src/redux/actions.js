import * as types from './types';
import * as fbAuth from '../firebase/fbAuth';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: types.AUTH_LOADING_STATE, state: true });
    await fbAuth.loginWithEmail(email, password);
    return dispatch({ type: types.AUTH_LOADING_STATE, state: false });
  } catch (error) {
    return dispatch({ type: types.AUTH_LOADING_STATE, state: false });
  }
};
