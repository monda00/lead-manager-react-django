import { combineReducers } from 'redux';
import leads from './leads';
import errors from './errors';
import messages from './message';

export default combineReducers({
  leads,
  errors,
  messages,
});
