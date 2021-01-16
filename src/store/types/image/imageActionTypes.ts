import { Image, ImageVersion } from './imageTypes';

export const INIT_IMAGES_SUCCESS = 'INIT_IMAGES_SUCCESS';
export const INIT_IMAGES_ERROR = 'INIT_IMAGES_ERROR';

export const INIT_IMAGE_VERSIONS_SUCCESS = 'INIT_IMAGE_VERSIONS_SUCCESS';
export const INIT_IMAGE_VERSIONS_ERROR = 'INIT_IMAGE_VERSIONS_ERROR';

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

interface InitImageDetailSuccessAction {
  type: typeof INIT_IMAGE_VERSIONS_SUCCESS;
  imageId: number;
  imageVersions: ImageVersion[];
  isLoaded: boolean;
}

interface InitImageDetailErrorAction {
  type: typeof INIT_IMAGE_VERSIONS_ERROR;
  isLoaded: boolean;
  imageId: number;
  error: any;
}

export type ImageActionTypes =
  | InitImagesSuccessAction
  | InitImagesErrorAction
  | InitImageDetailSuccessAction
  | InitImageDetailErrorAction;
