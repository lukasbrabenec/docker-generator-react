import { VersionState } from '../types/version/versionTypes';
import {
  INIT_VERSIONS_ERROR,
  INIT_VERSIONS_SUCCESS,
  VersionActionTypes,
} from '../types/version/versionActionTypes';

const initState: VersionState = {
  versions: [],
  versionsError: undefined,
};

const versionReducer = (
  state: VersionState = initState,
  action: VersionActionTypes,
): VersionState => {
  switch (action.type) {
    case INIT_VERSIONS_SUCCESS:
      return {
        versionsError: undefined,
        versions: action.versions,
      };
    case INIT_VERSIONS_ERROR:
      return {
        ...state,
        versionsError: action.versionsError,
      };
    default:
      return state;
  }
};

export default versionReducer;
