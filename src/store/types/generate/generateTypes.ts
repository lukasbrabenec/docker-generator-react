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
  exposedToHost?: boolean | undefined;
  exposedToContainers?: boolean | undefined;
}

export interface GenerateVolume {
  id: number;
  hostPath: string;
  containerPath: string;
  active: boolean;
}

export interface GenerateImageVersion {
  imageVersionId: number;
  extensions?: GenerateExtension[];
  environments?: GenerateEnvironment[];
  ports?: GeneratePort[];
  volumes?: GenerateVolume[];
}

export interface GenerateState {
  projectName?: string | undefined;
  dockerVersionId: number | null;
  imageVersions: GenerateImageVersion[];
}
