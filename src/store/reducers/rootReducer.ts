import { combineReducers } from 'redux';
import imageReducer from './imageReducer';
import requestReducer from './requestReducer';
import versionReducer from './versionReducer';

const rootReducer = combineReducers({
  image: imageReducer,
  request: requestReducer,
  version: versionReducer,
});

export default rootReducer;
