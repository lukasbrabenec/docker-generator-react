export interface Image {
  id: number;
  name: string;
  code: string;
  imageVersions: ImageVersion[];
}

export interface ImageVersion {
  id: number;
  version: string;
  extensions: Extension[];
  environments: Environment[];
  volumes: Volume[];
  ports: Port[];
}

export interface Extension {
  id: number;
  name: string;
  special: boolean;
}

export interface Environment {
  id: number;
  code?: string;
  defaultValue?: string;
  required?: boolean;
  hidden?: boolean;
}

export interface Volume {
  id: number;
  hostPath: string;
}

export interface Port {
  id: number;
  inward: number;
  outward: number;
  exposeToHost?: boolean | undefined;
}

export interface ImageState {
  isLoaded: boolean;
  images: Image[];
  imagesErr: any;
}