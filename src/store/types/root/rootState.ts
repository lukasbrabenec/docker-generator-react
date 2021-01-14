import { GenerateState } from '../generate/generateTypes';
import { ImageState } from '../image/imageTypes';
import { VersionState } from '../version/versionTypes';

export interface RootState {
  generate: GenerateState;
  image: ImageState;
  version: VersionState;
}
