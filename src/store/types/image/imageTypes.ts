export interface Image {
  id: number;
  name: string;
  code: string;
  group: ImageGroup;
  imageVersions: ImageVersion[] | undefined;
  error: string | undefined;
  dependencies: Image[];
}

export interface ImageGroup {
  id: number;
  name: string;
}

export interface ImageVersion {
  id: number;
  imageName?: string;
  version?: string;
  extensions?: Extension[];
  environments?: Environment[];
  volumes?: Volume[];
  ports?: Port[];
  restartType?: RestartType;
  dependsOn?: number[];
}

export interface Extension {
  id: number;
  name: string;
  special?: boolean;
}

export interface Environment {
  id: number;
  code?: string;
  defaultValue?: string;
  required?: boolean;
  hidden?: boolean;
  value?: string;
}

export interface Volume {
  id: number;
  hostPath: string;
  containerPath: string;
}

export interface Port {
  id: number;
  inward: number | string;
  outward: number | string;
  exposedToHost?: boolean | undefined;
  exposedToContainers?: boolean | undefined;
}

export interface RestartType {
  id: number;
  type: string;
}

export interface ImagesState {
  images: Image[];
  restartTypes: RestartType[];
  error: string | undefined;
}
