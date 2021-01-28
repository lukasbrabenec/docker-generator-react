import { AppThunkAction, AppThunkDispatch } from '../types/root/rootState';
import { VersionState } from '../types/version/versionTypes';
import {
  INIT_VERSIONS_ERROR,
  INIT_VERSIONS_SUCCESS,
} from '../types/version/versionActionTypes';

export const initVersions = (): AppThunkAction => {
  return (dispatch: AppThunkDispatch<VersionState>) => {
    fetch('http://localhost:8080/api/v1/versions')
      .then((res: Response) => {
        if (!res.ok) {
          throw new Error('Loading compose versions failed!');
        }
        return res.json();
      })
      .then((data) => {
        dispatch({ type: INIT_VERSIONS_SUCCESS, versions: data.data });
      })
      .catch((err) => {
        dispatch({ type: INIT_VERSIONS_ERROR, versionsError: err.message });
      });
  };
};
