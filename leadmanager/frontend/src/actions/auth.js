import axios from 'axios';
import { returnErrors } from './messages';

import { USER_LOADING, USER_LOADED, AUTH_ERROR } from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispath, getState) => {
  // User Loading
  dispath({ type: USER_LOADING });

  // Get token from state
  const { token } = getState().auth;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  axios
    .get('/api/auth/user', config)
    .then((res) => {
      dispath({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispath(returnErrors(err.response.data, err.response.status));
      dispath({
        type: AUTH_ERROR,
      });
    });
};