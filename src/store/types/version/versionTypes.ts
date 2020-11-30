export interface Version {
  id: number;
  composeVersion: string;
  dockerEngineRelease: string;
}

export interface VersionState {
  isLoaded: boolean;
  versions: Version[];
  versionsError: any;
}
