import axios from 'axios';
import { returnErrors } from './messages';

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispath, getState) => {
  // User Loading
  dispath({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
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

// LOGTIN USER
export const login = (username, password) => (dispath) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Bosy
  const body = JSON.stringify({ username, password });

  axios
    .post('/api/auth/login', body, config)
    .then((res) => {
      dispath({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispath(returnErrors(err.response.data, err.response.status));
      dispath({
        type: LOGIN_FAIL,
      });
    });
};

// LOGOUT USER
export const logout = () => (dispath, getState) => {
  axios
    .post('/api/auth/logout', null, tokenConfig(getState))
    .then((res) => {
      dispath({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispath(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
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

  return config;
};
