import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootStateOrAny } from 'react-redux';
import {
  Environment,
  Extension,
  Image,
  ImageVersion,
  Port,
  RestartType,
  Volume,
} from '../types/image/imageTypes';

export const changeProjectName = (
  projectName: string,
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_PROJECT_NAME', projectName });
  };
};

export const updateImageName = (
  imageVersionID: number,
  imageName: string,
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_IMAGE_NAME',
      imageVersionID,
      imageName,
    });
  };
};

export const changeDockerVersion = (
  versionID: number,
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_DOCKER_VERSION', versionID });
  };
};

export const updateImageVersion = (
  newImageVersion: ImageVersion,
  previousImageVersionID: number | undefined,
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_IMAGE_VERSION',
      newImageVersion,
      previousImageVersionID,
    });
  };
};

export const removeImageVersionInRequest = (
  imageVersion: ImageVersion | undefined,
  image: Image,
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_IMAGE_VERSION', imageVersion, image });
  };
};

export const changeExtensions = (
  imageVersionID: number,
  extensions: Extension[],
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_EXTENSIONS',
      imageVersionID,
      extensions,
    });
  };
};

export const changeEnvironments = (
  imageVersionID: number,
  environments: Environment[],
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_ENVIRONMENTS',
      imageVersionID,
      environments,
    });
  };
};

export const changePorts = (
  imageVersionID: number,
  ports: Port[],
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_PORTS', imageVersionID, ports });
  };
};

export const changeVolumes = (
  imageVersionID: number,
  volumes: Volume[],
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_VOLUMES',
      imageVersionID,
      volumes,
    });
  };
};

export const changeRestartType = (
  imageVersionID: number,
  restartType: RestartType,
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_RESTART_TYPE',
      imageVersionID,
      restartType,
    });
  };
};

export const changeDependencies = (
  imageVersion: ImageVersion,
  dependencies: Image[],
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_DEPENDENCIES',
      imageVersion,
      dependencies,
    });
  };
};

export const generate = (): ThunkAction<
  void,
  RootStateOrAny,
  {},
  Action<string>
> => {
  return (dispatch, getState) => {
    const request = {
      generate: getState().request,
    };
    axios
      .post('http://localhost:8080/api/v1/generate', request, {
        responseType: 'blob',
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${request.generate.projectName}.zip`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'GENERATE_ERROR',
          error: 'Generation failed!',
        });
      });
  };
};
