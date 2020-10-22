import {combineReducers} from "redux";
import imageReducer from "./imageReducer";
import generateReducer from "./generateReducer";
import versionReducer from "./versionReducer";

const rootReducer = combineReducers( {
  image: imageReducer,
  generate: generateReducer,
  version: versionReducer
})

export default rootReducer;