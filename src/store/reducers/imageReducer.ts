import { Image, ImagesState } from '../types/image/imageTypes';
import { ImageActionTypes } from '../types/image/imageActionTypes';

const initImageState: ImagesState = {
  isLoaded: false,
  images: [],
  restartTypes: [],
  error: false,
};

const imageReducer = (
  state = initImageState,
  action: ImageActionTypes,
): ImagesState => {
  switch (action.type) {
    case 'INIT_IMAGES_SUCCESS':
      return {
        ...state,
        isLoaded: true,
        images: action.images,
      };
    case 'INIT_IMAGES_ERROR':
      return {
        ...state,
        isLoaded: false,
        error: action.imagesError,
      };
    case 'INIT_IMAGE_VERSIONS_SUCCESS': {
      const otherImages = state.images.filter(
        (image: Image) => image.id !== action.imageId,
      );
      const selectedImage = state.images.find(
        (image: Image) => image.id === action.imageId,
      );
      if (selectedImage !== undefined) {
        selectedImage.imageVersions = action.imageVersions;
        return {
          ...state,
          images: [...otherImages, selectedImage],
        };
      }
      return state;
    }
    case 'INIT_IMAGE_VERSIONS_ERROR': {
      const otherImages = state.images.filter(
        (image: Image) => image.id !== action.imageId,
      );
      const selectedImage = state.images.find(
        (image: Image) => image.id === action.imageId,
      );
      if (selectedImage !== undefined) {
        selectedImage.error = action.error;
        return {
          ...state,
          images: [...otherImages, selectedImage],
        };
      }
      return state;
    }
    case 'INIT_RESTART_TYPES_SUCCESS': {
      return {
        ...state,
        restartTypes: action.restartTypes,
      };
    }
    case 'INIT_RESTART_TYPES_ERROR': {
      return {
        ...state,
        isLoaded: false,
        error: action.restartTypesError,
      };
    }
    default:
      return state;
  }
};

export default imageReducer;
