import {
  Environment,
  Extension,
  Image,
  ImageVersion,
  Port,
  RestartType,
  Volume,
} from '../image/imageTypes';

export const CHANGE_PROJECT_NAME = 'CHANGE_PROJECT_NAME';
export const UPDATE_IMAGE_NAME = 'UPDATE_IMAGE_NAME';
export const CHANGE_DOCKER_VERSION = 'CHANGE_DOCKER_VERSION';
export const UPDATE_IMAGE_VERSION = 'UPDATE_IMAGE_VERSION';
export const REMOVE_IMAGE_VERSION = 'REMOVE_IMAGE_VERSION';
export const CHANGE_EXTENSIONS = 'CHANGE_EXTENSIONS';
export const CHANGE_ENVIRONMENTS = 'CHANGE_ENVIRONMENTS';
export const CHANGE_PORTS = 'CHANGE_PORTS';
export const CHANGE_VOLUMES = 'CHANGE_VOLUMES';
export const CHANGE_RESTART_TYPE = 'CHANGE_RESTART_TYPE';
export const CHANGE_DEPENDENCIES = 'CHANGE_DEPENDENCIES';
export const GENERATE_ERROR = 'GENERATE_ERROR';

interface ChangeProjectNameAction {
  type: typeof CHANGE_PROJECT_NAME;
  projectName: string;
}

interface ChangeDockerVersionAction {
  type: typeof CHANGE_DOCKER_VERSION;
  versionID: number;
}

interface UpdateImageName {
  type: typeof UPDATE_IMAGE_NAME;
  imageVersionID: number;
  imageName: string;
}

interface UpdateImageVersionAction {
  type: typeof UPDATE_IMAGE_VERSION;
  newImageVersion: ImageVersion;
  previousImageVersionID: number | undefined;
}

interface RemoveImageVersionAction {
  type: typeof REMOVE_IMAGE_VERSION;
  imageVersion: ImageVersion | undefined;
  image: Image;
}

interface ChangeExtensionsAction {
  type: typeof CHANGE_EXTENSIONS;
  imageVersionID: number;
  extensions: Extension[];
}

interface ChangeEnvironmentsAction {
  type: typeof CHANGE_ENVIRONMENTS;
  imageVersionID: number;
  environments: Environment[];
}

interface ChangePortsAction {
  type: typeof CHANGE_PORTS;
  imageVersionID: number;
  ports: Port[];
}

interface ChangeVolumesAction {
  type: typeof CHANGE_VOLUMES;
  imageVersionID: number;
  volumes: Volume[];
}

interface ChangeRestartTypeAction {
  type: typeof CHANGE_RESTART_TYPE;
  imageVersionID: number;
  restartType: RestartType;
}

interface ChangeDependenciesAction {
  type: typeof CHANGE_DEPENDENCIES;
  imageVersion: ImageVersion;
  dependencies: Image[];
}

interface GenerateErrorAction {
  type: typeof GENERATE_ERROR;
  error: string;
}

export type RequestActionTypes =
  | ChangeProjectNameAction
  | UpdateImageName
  | ChangeDockerVersionAction
  | UpdateImageVersionAction
  | RemoveImageVersionAction
  | ChangeExtensionsAction
  | ChangeEnvironmentsAction
  | ChangePortsAction
  | ChangeVolumesAction
  | ChangeRestartTypeAction
  | ChangeDependenciesAction
  | GenerateErrorAction;
