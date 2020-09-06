import {combineReducers} from "redux";
import imageReducer from "./imageReducer";
import generateReducer from "./generateReducer";

const rootReducer = combineReducers( {
  image: imageReducer,
  generate: generateReducer
})

export default rootReducer;