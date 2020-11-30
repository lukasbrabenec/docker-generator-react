import { VersionState } from '../types/version/versionTypes';
import { VersionActionTypes } from '../types/version/versionActionTypes';

const initState: VersionState = {
  isLoaded: false,
  versions: [],
  versionsError: null,
};

const versionReducer = (
  state = initState,
  action: VersionActionTypes,
): VersionState => {
  switch (action.type) {
    case 'INIT_VERSIONS_SUCCESS':
      return {
        isLoaded: true,
        versionsError: null,
        versions: action.versions,
      };
    case 'INIT_VERSIONS_ERROR':
      return {
        ...state,
        versionsError: action.versionsError,
      };
    default:
      return state;
  }
};

export default versionReducer;
