import { AppThunkAction, AppThunkDispatch } from '../types/root/rootState';
import { VersionState } from '../types/version/versionTypes';
import { INIT_VERSIONS_ERROR, INIT_VERSIONS_SUCCESS } from '../types/version/versionActionTypes';

export const initVersions = (): AppThunkAction => (dispatch: AppThunkDispatch<VersionState>) => {
  fetch(`${process.env.REACT_APP_API_HOST}/api/v1/compose-versions`)
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
