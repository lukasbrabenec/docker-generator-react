import { ImageVersion } from '../image/imageTypes';

export interface RequestState {
  projectName?: string | undefined;
  dockerVersionID: number | undefined;
  imageVersions: ImageVersion[];
  error: undefined | string;
}
