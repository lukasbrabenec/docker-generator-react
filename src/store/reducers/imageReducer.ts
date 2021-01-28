import { Image, ImagesState, ImageVersion } from '../types/image/imageTypes';
import {
  ImageActionTypes,
  INIT_IMAGE_VERSIONS_ERROR,
  INIT_IMAGE_VERSIONS_SUCCESS,
  INIT_IMAGES_ERROR,
  INIT_IMAGES_SUCCESS,
  INIT_RESTART_TYPES_ERROR,
  INIT_RESTART_TYPES_SUCCESS,
} from '../types/image/imageActionTypes';

const initImageState: ImagesState = {
  images: [],
  restartTypes: [],
  error: undefined,
};

const imageReducer = (
  state = initImageState,
  action: ImageActionTypes,
): ImagesState => {
  const getImageFromState = (imageID: number): Image | undefined => {
    return state.images.find((image: Image) => image.id === imageID);
  };
  const getImageFromStateWithoutSelected = (imageID: number): Image[] => {
    return state.images.filter((image: Image) => image.id !== imageID);
  };

  switch (action.type) {
    case INIT_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.images,
      };
    case INIT_IMAGES_ERROR:
      return {
        ...state,
        error: action.imagesError,
      };
    case INIT_IMAGE_VERSIONS_SUCCESS: {
      const otherImages = getImageFromStateWithoutSelected(action.image.id);
      const selectedImage = getImageFromState(action.image.id);
      const imageVersions = action.imageVersions.map(
        (imageVersion: ImageVersion) => {
          return {
            ...imageVersion,
            imageName: action.image.name,
          };
        },
      );
      if (selectedImage !== undefined) {
        selectedImage.imageVersions = imageVersions;
        return {
          ...state,
          images: [...otherImages, selectedImage],
        };
      }
      return state;
    }
    case INIT_IMAGE_VERSIONS_ERROR: {
      const otherImages = getImageFromStateWithoutSelected(action.imageID);
      const selectedImage = getImageFromState(action.imageID);
      if (selectedImage !== undefined) {
        selectedImage.error = action.error;
        return {
          ...state,
          images: [...otherImages, selectedImage],
        };
      }
      return state;
    }
    case INIT_RESTART_TYPES_SUCCESS: {
      return {
        ...state,
        restartTypes: action.restartTypes,
      };
    }
    case INIT_RESTART_TYPES_ERROR: {
      return {
        ...state,
        error: action.restartTypesError,
      };
    }
    default:
      return state;
  }
};

export default imageReducer;
