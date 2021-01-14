export interface GenerateEnvironment {
  id: number;
  value: string;
}

export interface GenerateExtension {
  id: number;
  name: string;
}

export interface GeneratePort {
  id: number;
  inward: number;
  outward?: number;
  exposeToHost?: boolean | undefined;
}

export interface GenerateImageVersion {
  imageVersionId: number;
  extensions?: GenerateExtension[];
  environments?: GenerateEnvironment[];
  ports?: GeneratePort[];
}

export interface GenerateState {
  projectName?: string | undefined;
  dockerVersionId: number | null;
  imageVersions: GenerateImageVersion[];
}
