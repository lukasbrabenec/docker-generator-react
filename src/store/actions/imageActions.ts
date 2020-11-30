import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export const initImages = (): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    axios
      .get('http://localhost:8080/api/v1/images')
      .then((res) => {
        dispatch({ type: 'INIT_IMAGES_SUCCESS', images: res.data.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: 'INIT_IMAGES_ERROR', err });
      });
  };
};
