import { ImageVersion } from '../image/imageTypes';

export interface GenerateState {
  projectName?: string | undefined;
  dockerVersionID: number | null;
  imageVersions: ImageVersion[];
  errors: undefined | string;
}
