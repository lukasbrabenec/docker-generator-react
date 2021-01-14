import { Image } from './imageTypes';

export const INIT_IMAGES_SUCCESS = 'INIT_IMAGES_SUCCESS';
export const INIT_IMAGES_ERROR = 'INIT_IMAGES_ERROR';

interface InitImagesSuccessAction {
  type: typeof INIT_IMAGES_SUCCESS;
  images: Image[];
  isLoaded: boolean;
  imagesError: null;
}

interface InitImagesErrorAction {
  type: typeof INIT_IMAGES_ERROR;
  isLoaded: boolean;
  imagesError: any;
}

export type ImageActionTypes = InitImagesSuccessAction | InitImagesErrorAction;
