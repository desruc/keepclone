import * as types from './types';
import * as fbAuth from '../firebase/fbAuth';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: types.AUTH_LOADING_STATE, state: true });

    const {
      user: { uid }
    } = await fbAuth.loginWithEmail(email, password);
    dispatch({ type: types.LOGIN_SUCCESS, user: uid });
  } catch (error) {
    dispatch({ type: types.AUTH_LOADING_STATE, state: false });
  }
};
