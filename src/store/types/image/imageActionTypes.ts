import { Image, ImageVersion, RestartType } from './imageTypes';

export const INIT_IMAGES_SUCCESS = 'INIT_IMAGES_SUCCESS';
export const INIT_IMAGES_ERROR = 'INIT_IMAGES_ERROR';

export const INIT_IMAGE_VERSIONS_SUCCESS = 'INIT_IMAGE_VERSIONS_SUCCESS';
export const INIT_IMAGE_VERSIONS_ERROR = 'INIT_IMAGE_VERSIONS_ERROR';

export const INIT_RESTART_TYPES_SUCCESS = 'INIT_RESTART_TYPES_SUCCESS';
export const INIT_RESTART_TYPES_ERROR = 'INIT_RESTART_TYPES_ERROR';

interface InitImagesSuccessAction {
  type: typeof INIT_IMAGES_SUCCESS;
  images: Image[];
  isLoaded: boolean;
}

interface InitImagesErrorAction {
  type: typeof INIT_IMAGES_ERROR;
  isLoaded: boolean;
  imagesError: string;
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
  error: string;
}

interface InitRestartTypesSuccessAction {
  type: typeof INIT_RESTART_TYPES_SUCCESS;
  isLoaded: boolean;
  restartTypes: RestartType[];
}

interface InitRestartTypesErrorAction {
  type: typeof INIT_RESTART_TYPES_ERROR;
  isLoaded: boolean;
  restartTypesError: string;
}

export type ImageActionTypes =
  | InitImagesSuccessAction
  | InitImagesErrorAction
  | InitImageDetailSuccessAction
  | InitImageDetailErrorAction
  | InitRestartTypesSuccessAction
  | InitRestartTypesErrorAction;
