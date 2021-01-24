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
        dispatch({
          type: 'INIT_IMAGE_VERSIONS_SUCCESS',
          image,
          imageVersions: res.data.data[0].imageVersions,
        });
      })
      .catch(() => {
        dispatch({
          type: 'INIT_IMAGE_VERSIONS_ERROR',
          imageID: image.id,
          error: `Loading ${image.name} detail failed!`,
        });
      });
  };
};

export const initRestartTypes = (): ThunkAction<
  void,
  {},
  {},
  Action<string>
> => {
  return (dispatch) => {
    axios
      .get('http://localhost:8080/api/v1/restart-types')
      .then((res) => {
        dispatch({
          type: 'INIT_RESTART_TYPES_SUCCESS',
          restartTypes: res.data.data,
        });
      })
      .catch(() => {
        dispatch({
          type: 'INIT_RESTART_TYPES_ERROR',
          restartTypesError: 'Loading images failed!',
        });
      });
  };
};
