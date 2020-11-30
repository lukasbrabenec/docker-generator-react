import { ImageState } from '../types/image/imageTypes';
import { ImageActionTypes } from '../types/image/imageActionTypes';

const initState: ImageState = {
  isLoaded: false,
  images: [],
  imagesErr: null,
};

const imageReducer = (
  state = initState,
  action: ImageActionTypes,
): ImageState => {
  switch (action.type) {
    case 'INIT_IMAGES_SUCCESS':
      return {
        isLoaded: true,
        imagesErr: null,
        images: action.images,
      };
    case 'INIT_IMAGES_ERROR':
      return {
        ...state,
        imagesErr: action.imagesError,
      };
    default:
      return state;
  }
};

export default imageReducer;
