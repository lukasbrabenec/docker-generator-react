import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { Image } from '../types/image/imageTypes';

export const initImages = (): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    axios
      .get('http://localhost:8080/api/v1/images')
      .then((res) => {
        dispatch({ type: 'INIT_IMAGES_SUCCESS', images: res.data.data });
      })
      .catch(() => {
        dispatch({
          type: 'INIT_IMAGES_ERROR',
          imagesError: 'Loading images failed!',
        });
      });
  };
};

export const initImageDetail = (
  image: Image,
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    axios
      .get(`http://localhost:8080/api/v1/images/${image.id}`)
      .then((res) => {
        console.log(res);
        dispatch({
          type: 'INIT_IMAGE_VERSIONS_SUCCESS',
          imageId: image.id,
          imageVersions: res.data.data[0].imageVersions,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'INIT_IMAGE_VERSIONS_ERROR',
          imageId: image.id,
          error: `Loading ${image.name} detail failed!`,
        });
      });
  };
};
