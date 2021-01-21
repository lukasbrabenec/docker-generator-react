import {
  GenerateEnvironment,
  GenerateExtension,
  GeneratePort,
  GenerateVolume,
} from './generateTypes';
import { RestartType } from '../image/imageTypes';

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

interface ChangeProjectNameAction {
  type: typeof CHANGE_PROJECT_NAME;
  projectName: string;
}

interface ChangeDockerVersionAction {
  type: typeof CHANGE_DOCKER_VERSION;
  versionId: number;
}

interface UpdateImageName {
  type: typeof UPDATE_IMAGE_NAME;
  imageVersionId: number;
  imageName: string;
}

interface UpdateImageVersionAction {
  type: typeof UPDATE_IMAGE_VERSION;
  newImageVersionId: number;
  previousImageVersionId: number | undefined;
}

interface RemoveImageVersionAction {
  type: typeof REMOVE_IMAGE_VERSION;
  imageVersionId: number;
}

interface ChangeExtensionsAction {
  type: typeof CHANGE_EXTENSIONS;
  imageVersionId: number;
  extensions: GenerateExtension[];
}

interface ChangeEnvironmentsAction {
  type: typeof CHANGE_ENVIRONMENTS;
  imageVersionId: number;
  environments: GenerateEnvironment[];
}

interface ChangePortsAction {
  type: typeof CHANGE_PORTS;
  imageVersionId: number;
  ports: GeneratePort[];
}

interface ChangeVolumesAction {
  type: typeof CHANGE_VOLUMES;
  imageVersionId: number;
  volumes: GenerateVolume[];
}

interface ChangeRestartTypeAction {
  type: typeof CHANGE_RESTART_TYPE;
  imageVersionId: number;
  restartType: RestartType;
}

export type GenerateActionTypes =
  | ChangeProjectNameAction
  | UpdateImageName
  | ChangeDockerVersionAction
  | UpdateImageVersionAction
  | RemoveImageVersionAction
  | ChangeExtensionsAction
  | ChangeEnvironmentsAction
  | ChangePortsAction
  | ChangeVolumesAction
  | ChangeRestartTypeAction;
