export interface Version {
  id: number;
  composeVersion: string;
  dockerEngineRelease: string;
}

export interface VersionState {
  versions: Version[];
  versionsError: undefined | string;
}
