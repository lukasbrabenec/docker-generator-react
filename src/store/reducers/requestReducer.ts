import {
  CHANGE_DEPENDENCIES,
  CHANGE_DOCKER_VERSION,
  CHANGE_ENVIRONMENTS,
  CHANGE_EXTENSIONS,
  CHANGE_PORTS,
  CHANGE_PROJECT_NAME,
  CHANGE_RESTART_TYPE,
  CHANGE_VOLUMES,
  GENERATE_ERROR,
  REMOVE_IMAGE_VERSION,
  RequestActionTypes,
  UPDATE_IMAGE_NAME,
  UPDATE_IMAGE_VERSION,
} from '../types/request/requestActionTypes';
import { RequestState } from '../types/request/requestTypes';
import { Extension, Image, ImageVersion } from '../types/image/imageTypes';

const initState: RequestState = {
  dockerVersionID: undefined,
  imageVersions: [],
  projectName: undefined,
  error: undefined,
};

const requestReducer = (
  state: RequestState = initState,
  action: RequestActionTypes,
): RequestState => {
  const getImageVersionFromState = (
    imageVersionID: number,
  ): ImageVersion | undefined => {
    return state.imageVersions.find(
      (imageVersion: ImageVersion): boolean =>
        imageVersion.id === imageVersionID,
    );
  };
  const getImageVersionsWithoutSelected = (
    imageVersionID: number,
  ): ImageVersion[] => {
    return state.imageVersions.filter(
      (imageVersion: ImageVersion) => imageVersion.id !== imageVersionID,
    );
  };

  switch (action.type) {
    case CHANGE_PROJECT_NAME: {
      return {
        ...state,
        projectName: action.projectName,
      };
    }
    case UPDATE_IMAGE_NAME: {
      const selectedImageVersion = getImageVersionFromState(
        action.imageVersionID,
      );
      if (selectedImageVersion !== undefined) {
        const otherImageVersions = getImageVersionsWithoutSelected(
          action.imageVersionID,
        );
        return {
          ...state,
          imageVersions: [
            ...otherImageVersions,
            { ...selectedImageVersion, imageName: action.imageName },
          ],
        };
      }
      return state;
    }
    case UPDATE_IMAGE_VERSION: {
      const { newImageVersion } = action;
      delete newImageVersion.extensions;
      if (action.previousImageVersionID !== undefined) {
        return {
          ...state,
          imageVersions: [...state.imageVersions, newImageVersion],
        };
      }
      return {
        ...state,
        imageVersions: [...state.imageVersions, newImageVersion],
      };
    }
    case REMOVE_IMAGE_VERSION: {
      if (action.imageVersion === undefined) {
        // remove image dependency from other images
        const filteredImageVersions = state.imageVersions.map(
          (imageVersion: ImageVersion) => {
            return {
              ...imageVersion,
              dependsOn: imageVersion.dependsOn?.filter(
                (dependency: number) => dependency !== action.image.id,
              ),
            };
          },
        );
        return {
          ...state,
          imageVersions: filteredImageVersions,
        };
      }
      const otherImageVersions = getImageVersionsWithoutSelected(
        action.imageVersion.id,
      ).map((otherImageVersion: ImageVersion) => {
        return {
          ...otherImageVersion,
          dependsOn: otherImageVersion.dependsOn?.filter(
            (dependency: number) => dependency !== action.image.id,
          ),
        };
      });
      return {
        ...state,
        imageVersions: otherImageVersions,
      };
    }
    case CHANGE_EXTENSIONS: {
      const selectedImageVersion = getImageVersionFromState(
        action.imageVersionID,
      );
      const otherImageVersions = getImageVersionsWithoutSelected(
        action.imageVersionID,
      );
      if (selectedImageVersion !== undefined) {
        // merge extensions and remove duplicates
        const updatedExtensions = (selectedImageVersion.extensions !== undefined
          ? [...selectedImageVersion.extensions, ...action.extensions]
          : [...action.extensions]
        ).filter(
          (a: Extension, index: number, self: Extension[]) =>
            self.findIndex((b: Extension) => {
              return b.id === a.id;
            }) === index,
        );
        return {
          ...state,
          imageVersions: [
            ...otherImageVersions,
            {
              ...selectedImageVersion,
              extensions: updatedExtensions,
            },
          ],
        };
      }
      return state;
    }
    case CHANGE_ENVIRONMENTS: {
      const selectedImageVersion = getImageVersionFromState(
        action.imageVersionID,
      );
      const otherImageVersions = getImageVersionsWithoutSelected(
        action.imageVersionID,
      );
      if (selectedImageVersion !== undefined) {
        return {
          ...state,
          imageVersions: [
            ...otherImageVersions,
            { ...selectedImageVersion, environments: action.environments },
          ],
        };
      }
      return state;
    }
    case CHANGE_PORTS: {
      const selectedImageVersion = getImageVersionFromState(
        action.imageVersionID,
      );
      const otherImageVersions = getImageVersionsWithoutSelected(
        action.imageVersionID,
      );
      if (selectedImageVersion !== undefined)
        return {
          ...state,
          imageVersions: [
            ...otherImageVersions,
            { ...selectedImageVersion, ports: action.ports },
          ],
        };
      return state;
    }
    case CHANGE_VOLUMES: {
      const selectedImageVersion = getImageVersionFromState(
        action.imageVersionID,
      );
      const otherImageVersions = getImageVersionsWithoutSelected(
        action.imageVersionID,
      );
      if (selectedImageVersion !== undefined) {
        return {
          ...state,
          imageVersions: [
            ...otherImageVersions,
            { ...selectedImageVersion, volumes: action.volumes },
          ],
        };
      }
      return state;
    }
    case CHANGE_RESTART_TYPE: {
      const selectedImageVersion = getImageVersionFromState(
        action.imageVersionID,
      );
      const otherImageVersions = getImageVersionsWithoutSelected(
        action.imageVersionID,
      );
      if (selectedImageVersion !== undefined) {
        return {
          ...state,
          imageVersions: [
            ...otherImageVersions,
            { ...selectedImageVersion, restartType: action.restartType },
          ],
        };
      }
      return state;
    }
    case CHANGE_DEPENDENCIES: {
      const selectedImageVersion = getImageVersionFromState(
        action.imageVersion.id,
      );
      const otherImageVersions = getImageVersionsWithoutSelected(
        action.imageVersion.id,
      );
      const formattedDependencies = action.dependencies.map(
        (image: Image) => image.id,
      );
      if (selectedImageVersion !== undefined) {
        return {
          ...state,
          imageVersions: [
            ...otherImageVersions,
            { ...selectedImageVersion, dependsOn: formattedDependencies },
          ],
        };
      }
      return state;
    }
    case CHANGE_DOCKER_VERSION: {
      return {
        ...state,
        dockerVersionID: action.versionID,
      };
    }
    case GENERATE_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default requestReducer;
