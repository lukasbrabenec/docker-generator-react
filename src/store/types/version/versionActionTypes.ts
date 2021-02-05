import { Version } from './versionTypes';

export const INIT_VERSIONS_SUCCESS = 'INIT_VERSIONS_SUCCESS';
export const INIT_VERSIONS_ERROR = 'INIT_VERSIONS_ERROR';

interface InitVersionsSuccessAction {
  type: typeof INIT_VERSIONS_SUCCESS;
  versions: Version[];
}

interface InitVersionsErrorAction {
  type: typeof INIT_VERSIONS_ERROR;
  versionsError: string;
}

export type VersionActionTypes = InitVersionsSuccessAction | InitVersionsErrorAction;
