import { Image, ImagesState } from '../types/image/imageTypes';
import { AppThunkAction, AppThunkDispatch } from '../types/root/rootState';
import {
  INIT_IMAGE_VERSIONS_ERROR,
  INIT_IMAGE_VERSIONS_SUCCESS,
  INIT_IMAGES_ERROR,
  INIT_RESTART_TYPES_ERROR,
  INIT_RESTART_TYPES_SUCCESS,
} from '../types/image/imageActionTypes';

export const initImages = (): AppThunkAction => {
  return (dispatch: AppThunkDispatch<ImagesState>) => {
    fetch('http://localhost:8080/api/v1/images')
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error('Loading images failed!');
        }
        return res.json();
      })
      .then((data) => {
        dispatch({ type: 'INIT_IMAGES_SUCCESS', images: data.data });
      })
      .catch((err) => {
        dispatch({
          type: INIT_IMAGES_ERROR,
          imagesError: err.message,
        });
      });
  };
};

export const initImageDetail = (image: Image): AppThunkAction => {
  return (dispatch: AppThunkDispatch<ImagesState>) => {
    fetch(`http://localhost:8080/api/v1/images/${image.id}`)
      .then((res: Response) => {
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: INIT_IMAGE_VERSIONS_SUCCESS,
          image,
          imageVersions: data.data[0].imageVersions,
        });
      })
      .catch(() => {
        dispatch({
          type: INIT_IMAGE_VERSIONS_ERROR,
          imageID: image.id,
          error: `Loading ${image.name} detail failed!`,
        });
      });
  };
};

export const initRestartTypes = (): AppThunkAction => {
  return (dispatch: AppThunkDispatch<ImagesState>) => {
    fetch('http://localhost:8080/api/v1/restart-types')
      .then((res: Response) => {
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: INIT_RESTART_TYPES_SUCCESS,
          restartTypes: data.data,
        });
      })
      .catch(() => {
        dispatch({
          type: INIT_RESTART_TYPES_ERROR,
          restartTypesError: 'Loading images failed!',
        });
      });
  };
};
