import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootStateOrAny } from 'react-redux';
import { Environment, Extension, Port } from '../types/image/imageTypes';

export const changeProjectName = (
  projectName: string,
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_PROJECT_NAME', projectName });
  };
};

export const changeDockerVersion = (
  versionId: number,
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_DOCKER_VERSION', versionId });
  };
};

export const updateImageVersionInRequest = (
  newImageVersionId: number,
  previousImageVersionId: number | undefined,
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_IMAGE_VERSION',
      newImageVersionId,
      previousImageVersionId,
    });
  };
};

export const removeImageVersionInRequest = (
  imageVersionId: number,
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_IMAGE_VERSION', imageVersionId });
  };
};

export const changeExtensionsInRequest = (
  imageVersionId: number,
  extensions: Extension[],
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_EXTENSIONS', imageVersionId, extensions });
  };
};

export const changeEnvironmentsInRequest = (
  imageVersionId: number,
  environments: Environment[],
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_ENVIRONMENTS', imageVersionId, environments });
  };
};

export const changePortsInRequest = (
  imageVersionId: number,
  ports: Port[],
): ThunkAction<void, {}, {}, Action<string>> => {
  return (dispatch) => {
    dispatch({ type: 'CHANGE_PORTS', imageVersionId, ports });
  };
};

export const generate = (): ThunkAction<
  void,
  RootStateOrAny,
  {},
  Action<string>
> => {
  return (_dispatch, getState) => {
    const request = {
      generate: getState().generate,
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
      });
  };
};
