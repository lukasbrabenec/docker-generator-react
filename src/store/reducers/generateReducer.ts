import { GenerateActionTypes } from '../types/generate/generateActionTypes';
import {
  GenerateImageVersion,
  GenerateState,
} from '../types/generate/generateTypes';

const initState: GenerateState = {
  dockerVersionId: null,
  imageVersions: [],
  projectName: undefined,
};

const generateReducer = (
  state: GenerateState = initState,
  action: GenerateActionTypes,
): GenerateState => {
  switch (action.type) {
    case 'CHANGE_PROJECT_NAME': {
      return {
        ...state,
        projectName: action.projectName,
      };
    }
    case 'UPDATE_IMAGE_VERSION': {
      // remove previous image version
      const imageVersions = action.previousImageVersionId
        ? state.imageVersions.filter(
            (imageVersion: GenerateImageVersion) =>
              imageVersion.imageVersionId !== action.previousImageVersionId,
          )
        : state.imageVersions;
      return {
        ...state,
        imageVersions: [
          ...imageVersions,
          { imageVersionId: action.newImageVersionId },
        ],
      };
    }
    case 'REMOVE_IMAGE_VERSION': {
      return {
        ...state,
        imageVersions: [
          ...state.imageVersions.filter(
            (imageVersion: GenerateImageVersion) =>
              imageVersion.imageVersionId !== action.imageVersionId,
          ),
        ],
      };
    }
    case 'CHANGE_EXTENSIONS': {
      const currentImageVersion: GenerateImageVersion = state.imageVersions.find(
        (imageVersion: GenerateImageVersion): boolean =>
          imageVersion.imageVersionId === action.imageVersionId,
      )!;
      const otherImageVersions: GenerateImageVersion[] = state.imageVersions.filter(
        (imageVersion: GenerateImageVersion) =>
          imageVersion.imageVersionId !== action.imageVersionId,
      );
      return {
        ...state,
        imageVersions: [
          ...otherImageVersions,
          { ...currentImageVersion, extensions: action.extensions },
        ],
      };
    }
    case 'CHANGE_ENVIRONMENTS': {
      const currentImageVersion: GenerateImageVersion = state.imageVersions.find(
        (imageVersion: GenerateImageVersion) =>
          imageVersion.imageVersionId === action.imageVersionId,
      )!;
      const otherImageVersions = state.imageVersions.filter(
        (imageVersion: GenerateImageVersion) =>
          imageVersion.imageVersionId !== action.imageVersionId,
      );
      return {
        ...state,
        imageVersions: [
          ...otherImageVersions,
          { ...currentImageVersion, environments: action.environments },
        ],
      };
    }
    case 'CHANGE_PORTS': {
      const currentImageVersion: GenerateImageVersion = state.imageVersions.find(
        (imageVersion: GenerateImageVersion) =>
          imageVersion.imageVersionId === action.imageVersionId,
      )!;
      const otherImageVersions = state.imageVersions.filter(
        (imageVersion: GenerateImageVersion) =>
          imageVersion.imageVersionId !== action.imageVersionId,
      );
      return {
        ...state,
        imageVersions: [
          ...otherImageVersions,
          { ...currentImageVersion, ports: action.ports },
        ],
      };
    }
    case 'CHANGE_VOLUMES': {
      const currentImageVersion: GenerateImageVersion = state.imageVersions.find(
        (imageVersion: GenerateImageVersion) =>
          imageVersion.imageVersionId === action.imageVersionId,
      )!;
      const otherImageVersions = state.imageVersions.filter(
        (imageVersion: GenerateImageVersion) =>
          imageVersion.imageVersionId !== action.imageVersionId,
      );
      return {
        ...state,
        imageVersions: [
          ...otherImageVersions,
          { ...currentImageVersion, volumes: action.volumes },
        ],
      };
    }
    case 'CHANGE_DOCKER_VERSION': {
      return {
        ...state,
        dockerVersionId: action.versionId,
      };
    }
    default:
      return state;
  }
};

export default generateReducer;
