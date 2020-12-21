import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import profileReducer from './profileReducer';
import modalsReducer from './modalsReducer';
import alertsReducer from './alertsReducer'

export default combineReducers({
  posts: postsReducer,
  profile: profileReducer,
  modal: modalsReducer,
  alert: alertsReducer,
});
