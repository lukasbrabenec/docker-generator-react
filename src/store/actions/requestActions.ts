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
import { AppThunkAction, AppThunkDispatch } from '../types/root/rootState';
import { RequestState } from '../types/request/requestTypes';
import {
  CHANGE_DEPENDENCIES,
  CHANGE_DOCKER_VERSION,
  CHANGE_ENVIRONMENTS,
  CHANGE_EXTENSIONS,
  CHANGE_PORTS,
  CHANGE_RESTART_TYPE,
  CHANGE_VOLUMES,
  REMOVE_IMAGE_VERSION,
  UPDATE_IMAGE_NAME,
  UPDATE_IMAGE_VERSION,
} from '../types/request/requestActionTypes';

export const changeProjectName = (projectName: string): AppThunkAction => {
  return (dispatch: AppThunkDispatch<RequestState>) => {
    dispatch({ type: 'CHANGE_PROJECT_NAME', projectName });
  };
};

export const updateImageName = (
  imageVersionID: number,
  imageName: string,
): AppThunkAction => {
  return (dispatch: AppThunkDispatch<RequestState>) => {
    dispatch({
      type: UPDATE_IMAGE_NAME,
      imageVersionID,
      imageName,
    });
  };
};

export const changeDockerVersion = (versionID: number): AppThunkAction => {
  return (dispatch: AppThunkDispatch<RequestState>) => {
    dispatch({ type: CHANGE_DOCKER_VERSION, versionID });
  };
};

export const updateImageVersion = (
  newImageVersion: ImageVersion,
  previousImageVersionID: number | undefined,
): AppThunkAction => {
  return (dispatch: AppThunkDispatch<RequestState>) => {
    dispatch({
      type: UPDATE_IMAGE_VERSION,
      newImageVersion,
      previousImageVersionID,
    });
  };
};

export const removeImageVersionInRequest = (
  imageVersion: ImageVersion | undefined,
  image: Image,
): AppThunkAction => {
  return (dispatch: AppThunkDispatch<RequestState>) => {
    dispatch({ type: REMOVE_IMAGE_VERSION, imageVersion, image });
  };
};

export const changeExtensions = (
  imageVersionID: number,
  extensions: Extension[],
): AppThunkAction => {
  return (dispatch: AppThunkDispatch<RequestState>) => {
    dispatch({
      type: CHANGE_EXTENSIONS,
      imageVersionID,
      extensions,
    });
  };
};

export const changeEnvironments = (
  imageVersionID: number,
  environments: Environment[],
): AppThunkAction => {
  return (dispatch: AppThunkDispatch<RequestState>) => {
    dispatch({
      type: CHANGE_ENVIRONMENTS,
      imageVersionID,
      environments,
    });
  };
};

export const changePorts = (
  imageVersionID: number,
  ports: Port[],
): AppThunkAction => {
  return (dispatch: AppThunkDispatch<RequestState>) => {
    dispatch({ type: CHANGE_PORTS, imageVersionID, ports });
  };
};

export const changeVolumes = (
  imageVersionID: number,
  volumes: Volume[],
): AppThunkAction => {
  return (dispatch: AppThunkDispatch<RequestState>) => {
    dispatch({
      type: CHANGE_VOLUMES,
      imageVersionID,
      volumes,
    });
  };
};

export const changeRestartType = (
  imageVersionID: number,
  restartType: RestartType,
): AppThunkAction => {
  return (dispatch: AppThunkDispatch<RequestState>) => {
    dispatch({
      type: CHANGE_RESTART_TYPE,
      imageVersionID,
      restartType,
    });
  };
};

export const changeDependencies = (
  imageVersion: ImageVersion,
  dependencies: Image[],
): AppThunkAction => {
  return (dispatch: AppThunkDispatch<RequestState>) => {
    dispatch({
      type: CHANGE_DEPENDENCIES,
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
  return (dispatch: AppThunkDispatch, getState) => {
    fetch('http://localhost:8080/api/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ generate: getState().request }),
    })
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error('Generation failed!');
        }
        return res.blob();
      })
      .then((data: Blob) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${getState().request.projectName}.zip`);
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
