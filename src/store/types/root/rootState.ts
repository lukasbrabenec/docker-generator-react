import { GenerateState } from '../generate/generateTypes';
import { ImagesState } from '../image/imageTypes';
import { VersionState } from '../version/versionTypes';

export interface RootState {
  generate: GenerateState;
  image: ImagesState;
  version: VersionState;
}
